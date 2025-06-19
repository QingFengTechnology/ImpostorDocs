# 故障排除

如果你看到这些信息，说明你遇到了些问题。\
不过别担心，这是最详尽的指南来帮助你！

## `./Impostor.Server: line 1: ELF: not found` （以及其他错误）

不知道你从哪里弄来的这个系统。\
但我们明确<mark>不支持</mark>它。

## `cannot execute binary file: Exec format error`

请确认您下载的是正确版本的 Impostor，因为我们维护了两种 CPU 架构（x64 和 ARM）。\
除非您是在类似树莓派这样的电脑上运行 Impostor，否则您很可能需要使用 x64 版本。

## `./Impostor.Server: Permission denied`

这是一个与Linux文件权限相关的错误。\
某些文件在下载过程中未能保留其可执行性（允许它们运行的权限）。\
您可以通过执行以下命令解决此问题：

```bash
chmod +x Impostor.Server
```

## 无法连接：`Your client is too new, please update your Impostor to play`

当您的游戏版本过新，导致当前使用的 Impostor 版本无法支持时，会出现此情况。\
若您使用的是 Impostor 正式发布版，请检查是否有支持您游戏版本的新版本发布。\
若没有，您可以尝试[从 CI 获取最新构建](https://nightly.link/Impostor/Impostor/workflows/ci/master)。  
即使该构建仍无法运行，您也可以查看 PR 中是否有旨在更新至下一版本的待合并请求，但请注意这些请求可能不稳定且包含恶意代码，因为它们尚未经过 Impostor 开发团队的审核。

## 无法连接：`Please update your game to play on this server`

这种情况发生在您使用的Impostor版本相对于游戏版本过新时。\
您可以从 [GitHub 发布页面](https://github.com/Impostor/Impostor/releases)下载旧版本。\
不过，我们不会为旧版 Impostor 提供新 API 支持或错误修复，因此建议您升级游戏版本。

## 无法连接：`You are using an older version of the game`

您当前使用的 Impostor 版本与所玩游戏版本不匹配。\
游戏本身并未准确检测哪一方版本过旧，而是将问题归咎于用户。\
较新版本（v1.5.0 及以上）会正确提示并发送准确信息。

请查看主界面左上角显示的游戏版本号，然后下载对应版本的Impostor。\
每个[发布页面的版本](https://github.com/Impostor/Impostor/releases)都标注了兼容的游戏版本号。\
若您的游戏版本比最新发布版更新，请尝试 [CI 构建的最新版本是否可用](https://nightly.link/Impostor/Impostor/workflows/ci/master)。

## 无法连接：`You disconnected from the server. Reliable Packet 1 ...`

请再次确认您已正确遵循[服务器配置](ServerConfiguration)指南。

:::warning

你的公网IP地址不是以 `10`, `127` 或 `192` 开头。

:::

同时，请检查 Impostor 所监听的端口是否正确地为 UDP（或TCP）进行了端口转发。

## `Could not load file or assembly...`

请检查您的 `plugins` 文件夹中是否只包含<mark>可正常运行</mark>的插件。\
此错误可能是由非插件文件或无法正常工作的插件引起的。

## 无法连接：`You disconnected from the server. If this happens often, check your network strength. This may also be a server issue.`

通常这意味着 Among Us 无法连接到 Impostor 的 HTTP 服务器。\
请在网页浏览器中打开您的服务器地址，它应该会显示一个小页面，确认 Impostor 是可用的。

## 我的问题尚未得到解答，我仍然遇到问题！

这真是不幸。\
加入 [Impostor Discord](https://discord.gg/Mk3w6Tb)，在那里提出您的问题，我们会尽力帮助您。\
请注意，我们并非随时在线，因此可能需要一些时间才能得到答复。\
为了更便于解答您的问题，请提供以下详细信息：
- 您使用的是哪个版本的 Impostor？
- 您使用的是哪个版本的 Among Us？
- 您在哪个操作系统上运行 Impostor？
- 如果有控制台日志，附上这些也会有所帮助。