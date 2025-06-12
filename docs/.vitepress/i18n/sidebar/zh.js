import { defineConfig } from 'vitepress'

export const zhSidebarConfig = defineConfig([
  {
    text: '服务端',
    base: '/zh/Server/',
    items: [
      { text: '快速开始', link: 'GettingStarted' },
      { text: '服务器配置', link: 'ServerConfiguration' },
      { text: 'HTTP服务器', link: 'HTTPServer' },
      { text: '从源码构建', link: 'BuildingFromSource' },
      { text: '编写插件', link: 'WritePlugin' },
      { text: '常见疑难解答', link: 'FAQ' },
      { text: '故障排除', link: 'Troubleshooting' }
    ]
  }
]);