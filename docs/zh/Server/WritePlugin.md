# 编写插件

Impostor支持插件功能。\
本文将指导您搭建开发环境以便编写插件。

[[toc]]

## 安装 SDK

下载并安装最新版本的 [.NET SDK](https://dotnet.microsoft.com/download)。

## 新建 C# 项目

新建一个 C# 项目，该项目需为<mark>类库类型（目标框架选择 .NET Standard）</mark>。\
目标框架版本可以是任何兼容 .NET 8 的 .NET Standard 版本，但我们建议始终使用 <mark>.NET 8.0</mark>。

如需了解更多兼容性信息，请参阅 [Microsoft Learn](https://docs.microsoft.com/zh-cn/dotnet/standard/net-standard)。

项目创建完成后，您应该会看到 `Class.cs` 和 `Project.csproj` 文件。

你的 `Project.csproj` 看起来应该是这样的：

```xml
<Project Sdk="Microsoft.NET.Sdk">
    <PropertyGroup>
        <TargetFramework>net8.0</TargetFramework>
    </PropertyGroup>
</Project>
```

## 添加 Impostor.Api 库

您只需按照以下一种方式添加。

### 快速添加

安装 `Impostor.Api` NuGet 包。<br>
如果正在为服务器的开发版本编写插件，请确保获取预发布版本。

### Visual Studio

1. 右键你的项目。
2. 点击 `管理 Nuget 包` 。
3. 点击 `选择` 。
4. 搜索 `Impostor.Api` 。
5. 选中 `Impostor.Api` ，然后点击右侧安装按钮。

### Dotnet CLI

1. 在 cmd / bash 中打开您的项目文件夹。
2. 运行 `dotnet add package Impostor.Api` .

## 插件类

现在 `Impostor.Api` 已安装，您需要为您的插件创建一个类。\
一个插件<mark>必须且只有</mark>一个类。

请参考以下代码示例。

```csharp
using System.Threading.Tasks;
using Impostor.Api.Events.Managers;
using Impostor.Api.Plugins;
using Microsoft.Extensions.Logging;

namespace Impostor.Plugins.Example
{
    /// <summary>
    ///     您的插件元数据信息，这是必需的。
    /// </summary>
    [ImpostorPlugin(
        package: "gg.impostor.example",
        name: "Example",
        author: "AeonLucid",
        version: "1.0.0")]
    public class ExamplePlugin : PluginBase // 这也是必需的“：PluginBase”。
    {
        /// <summary>
        ///     与服务器无缝协作的日志记录器。
        /// </summary>
        private readonly ILogger<ExamplePlugin> _logger;

        /// <summary>
        ///     插件的构造函数。
        ///     您可以在此处添加一些参数，服务器会自动注入这些参数，这里使用了两个示例。
        ///
        ///     这些不是必须的，但我们推荐使用。
        /// </summary>
        /// <param name="logger">
        ///     一个用于在控制台写入消息的记录器。
        /// </param>
        /// <param name="eventManager">
        ///     事件管理器用于注册事件监听器。
        ///     如果您希望插件与游戏互动，这将非常有用。
        /// </param>
        public ExamplePlugin(ILogger<ExamplePlugin> logger, IEventManager eventManager)
        {
            _logger = logger;
        }

        /// <summary>
        ///     当服务器启用您的插件时，将调用此方法。
        /// </summary>
        /// <returns></returns>
        public override ValueTask EnableAsync()
        {
            _logger.LogInformation("Example is being enabled.");
            return default;
        }

        /// <summary>
        ///     当您的插件被服务器禁用时会调用此方法。
        ///     通常是因为服务器正在关闭，这是清理任何托管资源的地方。
        /// </summary>
        /// <returns></returns>
        public override ValueTask DisableAsync()
        {
            _logger.LogInformation("Example is being disabled.");
            return default;
        }
    }
}
```

## 添加事件监听器

目前，您应该有一个加载后无任何操作的插件。\
要实现一些实际功能，您需要添加一个事件监听器。

创建一个名为`GameEventListener`的新类。\
示例代码：

```csharp
using Impostor.Api.Events;
using Impostor.Api.Events.Player;
using Microsoft.Extensions.Logging;

namespace Impostor.Plugins.Example.Handlers
{
    /// <summary>
    ///     一个监听两个事件的类。  
    ///     可能不止两个，但这只是一个示例。
    ///
    ///     确保您的类实现了 <see cref="IEventListener"/>。
    /// </summary>
    public class GameEventListener : IEventListener
    {
        private readonly ILogger<ExamplePlugin> _logger;

        public GameEventListener(ILogger<ExamplePlugin> logger)
        {
            _logger = logger;
        }

        /// <summary>
        ///     一个示例监听器。
        /// </summary>
        /// <param name="e">
        ///     您想要监听的事件。
        /// </param>
        [EventListener]
        public void OnGameStarted(IGameStartedEvent e)
        {
            _logger.LogInformation($"Game is starting.");

            // 这将为所有玩家显示出他们是内鬼还是船员。
            foreach (var player in e.Game.Players)
            {
                var info = player.Character.PlayerInfo;
                var isImpostor = info.IsImpostor;
                if (isImpostor)
                {
                    _logger.LogInformation($"- {info.PlayerName} is an impostor.");
                }
                else
                {
                    _logger.LogInformation($"- {info.PlayerName} is a crewmate.");
                }
            }
        }

        [EventListener]
        public void OnGameEnded(IGameEndedEvent e)
        {
            _logger.LogInformation($"Game has ended.");
        }

        [EventListener]
        public void OnPlayerChat(IPlayerChatEvent e)
        {
            _logger.LogInformation($"{e.PlayerControl.PlayerInfo.PlayerName} said {e.Message}");
        }
    }
}
```

## 注册事件监听器

让插件正常工作的最后一步是注册事件监听器，这样服务器才能识别它。\
回到您的插件类并按照以下方式修改它。

```csharp
using System;
using System.Threading.Tasks;
using Impostor.Api.Events.Managers;
using Impostor.Api.Plugins;
using Impostor.Plugins.Example.Handlers;
using Microsoft.Extensions.Logging;

namespace Impostor.Plugins.Example
{
    [ImpostorPlugin(
        package: "gg.impostor.example",
        name: "Example",
        author: "AeonLucid",
        version: "1.0.0")]
    public class ExamplePlugin : PluginBase
    {
        private readonly ILogger<ExamplePlugin> _logger;
        // 添加以下行
        private readonly IEventManager _eventManager;
        // 添加以下行
        private IDisposable _unregister;

        public ExamplePlugin(ILogger<ExamplePlugin> logger, IEventManager eventManager)
        {
            _logger = logger;
            // 添加以下行
            _eventManager = eventManager;
        }

        public override ValueTask EnableAsync()
        {
            _logger.LogInformation("Example is being enabled.");
            // 添加以下行
            _unregister = _eventManager.RegisterListener(new GameEventListener(_logger));
            return default;
        }

        public override ValueTask DisableAsync()
        {
            _logger.LogInformation("Example is being disabled.");
            // 添加以下行
            _unregister.Dispose();
            return default;
        }
    }
}

```

## 构建并运行您的插件

现在您的插件已准备好进行测试。

1. 右键点击您的项目并按下 `构建` 。
2. 右键点击您的项目并选择 `在文件资源管理器中打开文件夹` 。
3. 进入 `bin/Debug/net8.0/` 目录。
4. 在此目录下，您应能找到名为 `Project.dll` 的插件文件。
5. 将 `Project.dll` 复制到您的 Impostor 服务器目录中的 `plugins` 文件夹内。
6. （重新）启动您的 Impostor 服务器。
7. 打开 Among Us，创建游戏并发送一条聊天消息。

在控制台中，您应能看到插件被加载及示例中的消息显示。

## 额外信息

这些额外信息可能对开发插件的人员有所帮助。

### 事件监听器

- 您可以在同一事件上设置多个事件监听器。
- 可以为事件监听器指定优先级 `[EventListener(EventPriority.Normal)]` ，并按顺序调用。
- 不建议在 `EventListener` 内部长时间阻塞，因为事件是从数据包处理程序内部调用的。阻塞时间过长会导致客户端超时。\
  对于耗时较长的操作，您应该创建一个新的 `Task` 。

### 依赖注入

- 主插件类由服务器的 `IServiceProvider` 构建，能够注入服务器使用的所有内容。\
  例如：  
  - `ILogger<T>`  
  - `IEventManager`  
  - `IClientManager`  
  - `IOptions<ServerConfig>`  
- 您可以通过创建新类并实现 `IPluginStartup`，将自己的类和 `EventListener` 实现添加到 `IServiceProvider` 中。\
  确保将它们注册为单例 `services.AddSingleton<IEventListener, GameEventListener>();`。

### 服务器配置

不断将插件 dll 复制到服务器目录可能会相当烦人。\
幸运的是，我们有一个解决方案。\
在你的 Impostor 服务器中打开 `config.json` ，并添加如下示例中的 `PluginLoader` ，将路径替换为你插件的构建目标路径。

```json
{
  "Server": {
    "PublicIp": "127.0.0.1",
    "PublicPort": 22023,
    "ListenIp": "0.0.0.0",
    "ListenPort": 22023
  },
  "PluginLoader": {
    "Paths": [
      "D:\\Projects\\Impostor\\src\\Impostor.Plugins.Example\\bin\\Debug\\net8.0"
    ],
    "LibraryPaths": []
  }
}
```

### 使用其他库

有时，您需要使用原版 Impostor 服务器未提供的库。\
这些库的 dll 文件必须放置在服务器可执行文件旁边的 `libraries` 文件夹中。\
您也可以通过修改 `config.json` 中的 `PluginLoader.LibraryPaths` 选项来提供这些库，类似于 `PluginLoader.Paths` 选项。

### Impostor 版本

在使用 `Impostor.Api` 预发布版和 `Impostor` 开发构建时，务必选用正确的版本，以降低程序集不匹配的风险。

#### 示例

预发布的 `Impostor.Api` 包 `1.2.0-ci.54` 属于 AppVeyor 上的构建 `54`，可在此处[找到](https://ci.appveyor.com/project/Impostor/Impostor/build/54)。\
请注意网址末尾的 `54`。

## 数据缺失 / 无效或需要更多功能？

`Impostor.Api`目前处于测试阶段。\
还有许多功能尚未完善，我们希望能听取您的意见，了解您开发插件所需的内容。

创建一个议题:

- [请求一个函数](https://github.com/Impostor/Impostor/issues/new?template=3--api-suggestion.md)
- [数据无效](https://github.com/Impostor/Impostor/issues/new?template=4--api-invalid.md)
- [数据无法使用](https://github.com/Impostor/Impostor/issues/new?template=5--api-missing.md)
- [其他](https://github.com/Impostor/Impostor/issues/new?template=6--api-other.md)