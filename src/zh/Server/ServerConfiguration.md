# 服务器配置

## 选项

### (必需)基础配置

| 配置项         | 默认值      | 介绍                                                                                                                                                                                                           |
| -------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **PublicIp**   | `127.0.0.1` | 这需要填写服务器的公网 IPv4 地址[^1]，供他人连接时使用。<br>除非你仅计划在本地网络内私下使用 Impostor，否则应将其更改为你的公网 IP。<br>此外，也可以使用主机名替代 IPv4 地址，这些主机名会被解析为 IPv4 地址。 |
| **PublicPort** | `22023`     | 您提供给他人连接的服务器公共端口,通常为 `22023` 。<br><mark>这是在端口转发时，您在网关上配置的外部端口。</mark>                                                                                                |
| **ListenIp**   | `0.0.0.0`   | 要监听的网络接口。<br>若不确定此处应填写何内容，请使用 `0.0.0.0` 。<br>自 1.2.2 版本起，也可使用主机名替代 IPv4 地址，但需确保该主机名能解析为有效的 IPv4 地址。                                               |
| **ListenPort** | `22023`     | 服务器的监听端口，通常为 `22023` 。<br>在端口转发配置中，这是一个 UDP 端口。                                                                                                                                   |

### HTTP 服务器

Impostor 拥有一个 HTTP 服务器，最新版本的 Among Us 会连接至该服务器。\
有关如何设置此服务器的更多详情，请参阅 [HTTP 服务器页面](HTTPServer)。

| 配置项         | 默认值    | 介绍                                                                                                                           |
| -------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------ |
| **Enabled**    | `true`    | 是否启用 HTTP 服务器。                                                                                                         |
| **ListenIp**   | `0.0.0.0` | 监听的网络接口。<br>如果使用反向代理或仅在本地运行，请使用 `127.0.0.1` 。<br>若直接将该服务器暴露于互联网，则使用 `0.0.0.0` 。 |
| **ListenPort** | `22023`   | 此服务器的监听端口。<br>在端口转发配置中，这是一个 TCP 端口。                                                                  |

### 反作弊

Impostor 内置反作弊系统，可自动踢出游戏中的作弊者。\
需注意的是，该反作弊机制针对游戏原版优化，若使用客户端修改版（模组）游玩，可能会触发反作弊。

| 配置项                        | 默认值    | 介绍                                                                                                                                                    |
| ----------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Enabled**                   | `true`    | 是否启用反作弊。                                                                                                                                        |
| **BanIpFromGame**             | `true`    | 当反作弊功能启用且玩家被发现作弊时，他们将被踢出服务器。<br>若此值设为 `true` ，该玩家将被封禁，无法再次加入该特定房间。                                |
| **AllowCheatingHosts**        | `"Never"` | 配置是否允许房主作弊。<br>`"Never"` 表示禁止； `"Always"` 表示允许； `"IfRequested"` 表示当房主连接时设置了 `DisableServerAuthorityFlag` 则允许其作弊。 |
| **EnableGameFlowChecks**      | `true`    | 启用检查功能以验证游戏中的特定动作是否按正确顺序或在适当时机触发。<br>这包括在游戏过程中更换皮肤或过快的击杀行为。                                      |
| **EnableInvalidObjectChecks** | `true`    | 启用对网络对象生成过程正确性的验证检查。<br>禁用此选项也将同时禁用 `EnableRoleChecks` 。                                                                |
| **EnableMustBeHostChecks**    | `true`    | 检查在执行需房主权限的操作（如开始游戏、生成物品等）前验证玩家是否为房主。                                                                              |
| **EnableColorLimitChecks**    | `true`    | 检查玩家是否请求了已被使用的颜色。                                                                                                                      |
| **EnableNameLimitChecks**     | `true`    | 验证玩家名称的长度是否可通过用户界面进行设置。                                                                                                          |
| **EnableOwnershipChecks**     | `true`    | 检查玩家是否被允许对自己或其他玩家执行特定操作。                                                                                                        |
| **EnableRoleChecks**          | `true`    | 检查玩家在执行特定角色能力（如进入通风管或击杀）时拥有正确的角色身份。                                                                                  |
| **EnableTargetChecks**        | `true`    | 确保某些本应仅发送给特定玩家的数据包未被错误地发送给所有人，反之亦然。<br>这包括投票信息或网络对象的发送。                                              |
| **ForbidProtocolExtensions**  | `true`    | 阻止玩家发送超出原版游戏限制的网络数据包。<br>大多数需要所有玩家安装的模组需要禁用此选项。                                                              |


### 兼容性

Impostor 提供了一些兼容性选项，虽能增加额外灵活性，但可能无法正常工作。\
不建议启用这些选项中的任何一个。\
在联系技术支持时，请说明已启用了此类的哪些选项。

| 配置项                      | 默认值  | 介绍                                                                                                                                                                  |
| --------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **AllowFutureGameVersions** | `false` | <mark>将此选项设为 `true` 不受官方支持，且可能在 Among Us 发布大型更新时引发问题，但在小型补丁发布时可能有所帮助。</mark><br>允许未来版本的 Among Us 加入您的服务器。 |
| **AllowHostAuthority**      | `false` | 某些 Among Us 模组允许禁用部分服务端权威功能，这也会改变客户端中的一些代码路径。<br>这些代码路径未经充分测试且包含漏洞，服务端无法对其进行修复。<br>请谨慎使用。      |
| **AllowVersionMixing**      | `false` | 允许使用不同游戏版本的玩家在未被 Impostor 开发者标记为兼容的大厅中共同进行游戏。                                                                                      |

### 调试

此配置用于启用游戏回放录制功能，在开发 Impostor 时尤为实用。

| 配置项                  | 默认值  | 介绍                     |
| ----------------------- | ------- | ------------------------ |
| **GameRecorderEnabled** | `false` | 启用游戏回放录制功能。   |
| **GameRecorderPath**    | *无*    | 游戏回放录像的存储路径。 |


### Serilog (日志框架)

Impostor 使用 Serilog 作为日志框架，你可以在配置文件中进行配置。\
您可以调整默认的日志级别，同时还能添加额外的日志输出目标。

| Key              | Default       | Value                                                                                                                                                     |
| ---------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **MinimumLevel** | `Information` | 日志的输出级别。<br>若日志等级大于等于此级别，则会被打印出来。<br>日志级别从高到低依次为：`Fatal`,`Error`, `Warning`, `Information`, `Debug`, `Verbose`。 |
| **Using**        | `[]`          | 需要加载的额外 Serilog Sinks 程序集列表。                                                                                                                 |
| **WriteTo**      | `[]`          | 额外的日志输出目标。<br>请参阅 Serilog 文档或本节中的示例以了解更多。                                                                                     |

有关配置的更多信息，请参阅[Serilog.Settings.Configuration](https://github.com/serilog/serilog-settings-configuration)文档。

例如，若需将日志记录至文件，应在配置中添加以下代码片段：

```json
{
  "Serilog": {
    "Using": [
      "Serilog.Sinks.File"
    ],
    "WriteTo": [
      {
        "Name": "File",
        "Args": {
          "path": "logs/log.txt",
          "rollingInterval": "Day"
        }
      }
    ]
  }
}
```

此外，您还需从[NuGet](https://www.nuget.org/packages/Serilog.Sinks.File/)下载 `Serilog.Sinks.File.dll` 文件。\
可配置参数列表请参阅[Serilog.Sinks.File文档](https://github.com/serilog/serilog-sinks-file#json-appsettingsjson-configuration)。

其他Serilog Sinks同样受支持，但不在本文档的讨论范围内。

## 配置来源与设置方式

### 配置文件

`config.json` 文件包含了所有可配置的选项。

### 环境变量

若无法编辑 `config.json` 文件，您可通过设置环境变量来配置Impostor。\
各变量的通用格式为 `IMPOSTOR_节名__变量名` 。\
例如，要禁用反作弊功能，可设置环境变量 `IMPOSTOR_AntiCheat__Enabled=false` 。

这里是一些示例配置：

```
IMPOSTOR_Server__PublicIp=127.0.0.1
IMPOSTOR_Server__PublicPort=22023
IMPOSTOR_Server__ListenIp=0.0.0.0
IMPOSTOR_Server__ListenPort=22023
IMPOSTOR_AntiCheat__Enabled=true
IMPOSTOR_AntiCheat__BanIpFromGame=true
```

# systemd

Linux用户可能会希望创建一个systemd服务定义来管理Impostor应用程序的运行。\
使用systemd服务的好处包括：

- 服务器进程若意外崩溃，可自动重启
- 可设置 Impostor 开机自启（对于定期进行系统更新的用户尤为方便）
- 可利用 systemd target 确保在大部分系统服务启动后再运行 Impostor

请使用您喜欢的文本编辑器创建以下服务文件：

```bash
sudoedit /etc/systemd/system/impostor.service
```

根据您的需求修改以下模板，并填写服务文件内容。

```
[Unit]
Description=Impostor private Among Us server - https://github.com/Impostor/Impostor

[Service]
# Impostor 安装目录
WorkingDirectory=/opt/impostor
# Impostor 主程序（Impostor.Server）的路径
ExecStart=/opt/impostor/Impostor.Server
Restart=always
# 如果 dotnet 服务崩溃，10 秒后将重新启动 Impostor
RestartSec=10
KillSignal=SIGTERM
SyslogIdentifier=impostor

# 运行 Impostor 服务器进程的用户和组 —— 确保该用户有权运行 Impostor
User=impostor
Group=impostor
TimeoutStopSec=10

[Install]
# 在大多数系统服务启动后再启动 Impostor
After=multi-user.target
WantedBy=multi-user.target
```

重新加载所有 systemd 单元文件以应用您创建的新文件中的配置。

```bash
sudo systemctl daemon-reload
```

启动该服务。

```bash
sudo systemctl start impostor.service
```

检查服务日志并确认其已正确启动。
> 提示：使用 Q 键退出 journalctl。

```bash
sudo journalctl -u impostor.service
```

如果一切正常，那么使用以下命令设置服务为开机自启。

```bash
sudo systemctl enable impostor.service
```

[^1]: 你可以[在这个网站](http://whatismyip.host/)上找到你的 IPv4 地址。