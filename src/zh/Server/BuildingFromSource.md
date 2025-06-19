# 从源码构建

该解决方案包含 Impostor 服务器及其依赖项，例如 Hazel 和插件 API。\
服务器基于[.NET 8](https://dotnet.microsoft.com/download/dotnet/8.0)构建。

## 克隆 Impostor

您需要使用 git 克隆 Impostor：

```bash
git clone https://github.com/Impostor/Impostor.git
```

## 构建服务器

### 依赖项

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Rider](https://www.jetbrains.com/rider/) 或 [Visual Studio](https://visualstudio.microsoft.com/vs/) （可选，仅当您希望获得完整的集成开发环境体验时）

### 使用CLI构建

```bash
cd src/Impostor.Server/
dotnet build
# 或者，如果您需要一个可直接用于生产的单一文件：（若您使用 Windows，请将 linux-x64 更改为 win-x64）
dotnet publish -c Release -r linux-x64 -p:PublishSingleFile=true
```

要设置服务器，请参阅[快速开始](GettingStarted)。