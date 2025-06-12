# HTTP 服务器

Impostor 1.9.0 起新增了玩家匹配专用的 HTTP 服务，客户端需通过此服务连接服务器。

然而，自 Among Us 16.0.5 版本开始，为了让玩家能连接到您的服务器，您需要配置 HTTPS。\
但很抱歉，Impostor 并不处理 SSL 证书，因此您需设置一个反向代理来实现这一需求。

## 使用反向代理

反向代理使您能够将用户的 HTTP 请求转发至多个服务。\
若您已拥有此类代理，应将其配置以添加 Impostor。

若您未曾配置过反向代理，我们建议您选用[Caddy](https://caddyserver.com)。\
其设置简便，且默认支持申请SSL证书。

为防止用户直接连接到 Impostor，我们建议将 `HttpServer` 部分中的 `ListenIp` 更改为 `127.0.0.1` 。\
这样可以确保除了通过您的反向代理之外，其他人无法连接到您的 HTTP 服务器。\
不过，请保持 `Server` 部分中的 `ListenIp` 为 `0.0.0.0` ，因为不支持通过代理传输正常的游戏流量。

### Caddy

要安装Caddy，请遵循[官方安装指南](https://caddyserver.com/docs/install)。\
然后，将以下内容用作您的`Caddyfile`配置文件：

```
example.com # 替换为您的域名

reverse_proxy :22023
```

现在，在此包含Caddyfile的文件夹中运行`caddy run`命令，它将为您搭建一个带有免费SSL证书的服务器。\
若运行成功，您应按照[后台运行Caddy的指南](https://caddyserver.com/docs/running)进行配置。

### Nginx

Nginx 是 Caddy 的一个替代方案，配置起来稍显复杂。\
如果您已经在使用 Nginx，可以参考我们的配置片段来集成 Impostor：

:::details Nginx 配置

```nginx
server {
    listen 443 ssl http2;
    server_name example.com; # 替换为您的域名

    # 假设您正在使用 Certbot，请将 example.com 替换为您的域名
    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
    ssl_trusted_certificate /etc/letsencrypt/live/example.com/fullchain.pem;

    location / {
        proxy_pass http://localhost:22023; # 将端口更改为您的 HTTP 服务器的（TCP）监听端口
        proxy_set_header X-Forwarded-For $remote_addr;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# 将所有流量重定向至 HTTPS
server {
    listen 80 default_server;
    location / {
        return 307 https://$host$request_uri;
    }
}
```

:::

## 不要直接将 Impostor 的 HTTP 服务器暴露在互联网上

为确保仅通过反向代理连接到 Impostor 的 HTTP 服务器，建议将 HTTP 服务器的 `ListenIp` 设置为 `127.0.0.1` ：

```json
{
 "HttpServer": {
   "ListenIp": "127.0.0.1"
 }
}
```

如果您正在使用环境变量配置 Impostor：

```
IMPOSTOR_HttpServer__ListenIp=127.0.0.1
```

有关服务器配置的更多信息，请参阅[服务器配置](ServerConfiguration)。