# 快速开始

本节内容适用于常规安装及 Docker（Compose）安装两种方式。

要连接到服务器，您需要在[此网站](https://impostor.github.io/Impostor/)上配置并安装配置文件。

Among Us 通过两种网络服务连接服务器：首先，(TCP) HTTP 服务将游戏指向 UDP 服务，随后 UDP 服务承载实际的游戏流量。\
因此，Impostor <mark>同时</mark>使用 TCP 和 UDP 协议的 22023 端口。

要在另一台电脑上连接到您的 Among Us，需设置一个 HTTP 反向代理以支持 HTTPS 。\
若仅为测试运行 Impostor 版本，相关设置说明请参阅 [HTTP 服务器文档](HTTPServer)。

若想测试你的 Among Us HTTP 服务器是否正常运行，请在浏览器中打开 `http://localhost:22023`（假设你使用的是默认设置，否则请相应更改 IP 地址和端口）。

根据您的主机设置，可能还需要将 Impostor 端口转发到互联网或允许防火墙通过 Impostor 流量。\
想要加入服务器游戏的玩家需能访问 UDP 端口 22023。\
此外，若未使用反向代理，还需转发 HTTP 或 TCP 端口 22023。\
由于端口转发因主机或路由器配置而异，本指南不涵盖具体转发步骤。

## 常规安装

1. 安装 [.NET 8.0](https://dotnet.microsoft.com/download/dotnet/8.0)。\
  我们推荐安装 ASP.NET Core 运行时或 SDK。\
  若您打算开发 Impostor 或其插件，则需安装 SDK。
2. 下载[最新发行版](https://github.com/Impostor/Impostor/releases)或[最新的CI构建版本](https://nightly.link/Impostor/Impostor/workflows/ci/master)。\
  请注意，Impostor 支持多种 CPU 架构和操作系统，除非您是在树莓派或其他使用 Arm 处理器的设备 / VPS 上运行，否则您很可能需要 x64 版本。
3. 解压压缩包。
4. 配置 `config.json` 以符合您的要求。\
  配置文档可在[此处](ServerConfiguration)找到。\
  您至少需要将 `PublicIp` 更改为人们连接到您服务器的 IP 地址（如服务器公网 IP）。
1. 运行 `Impostor.Server` (Linux/macOS) 或 `Impostor.Server.exe` (Windows).
2. 设置反向代理以支持HTTPS，这样您就能从其他设备连接到服务器。\
  详情请参阅[反向代理配置](HTTPServer)。
1. （Linux端可选）配置一个systemd定义文件并设置服务开机自启，请参阅[systemd配置](ServerConfiguration#systemd)。

## 使用 Docker

Docker 是一个让你能在容器中运行如 Impostor 等程序的工具。

安装 Docker 后，只需使用 `docker run` 命令即可启动一个 Docker 容器：

```bash
docker run -p 127.0.0.1:22023:22023/tcp -p 22023:22023/udp -e IMPOSTOR_Server__PublicIp=your.public.ip.here aeonlucid/impostor:nightly
```

请将 `your.public.ip.here` 替换为您服务器的公网IP地址。\
这是 Among Us 尝试连接您的服务器时使用的地址。

要配置 Docker 容器，您可以使用环境变量或在容器中挂载 `config.json` 文件。

## 使用 Docker Compose

Docker Compose 允许您使用预定义的配置启动一个 Docker 容器。

以下是一个示例配置：

```yml
version: '3.4'

services:
  impostor:
    image: aeonlucid/impostor:nightly
    container_name: impostor
    ports:
      - 127.0.0.1:22023:22023/tcp # 建立自己的反向代理来处理 HTTPS 卸载
      - 22023:22023/udp
    environment: # 通过环境变量配置 Impostor，或者在容器中挂载 config.json 文件
      - IMPOSTOR_Server__PublicIp=your.public.ip.here
    volumes:
      - /path/to/local/config.json:/app/config.json # 挂载 config.json
      - /path/to/local/plugins:/app/plugins         # 仅在安装插件时需要
      - /path/to/local/libraries:/app/libraries     # 仅在需要外部库时使用（某些插件可能需要此项）
```