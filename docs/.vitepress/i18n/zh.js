import { defineConfig } from 'vitepress'
import { zhSidebarConfig } from './sidebar/zh.js'

export const zhLocaleConfig = defineConfig({
  label: '简体中文',
  description: "Impostor - Among Us 服务器的开源重实现",
  lang: 'zh-CN',
  themeConfig: {
    nav: [
      { text: '首页', link: '/zh/' },
      { text: '教程', link: '/zh/Server/GettingStarted', activeMatch: '/Server/' }
    ],
    sidebar: zhSidebarConfig,
    outline: {
      label: '页面导航',
      level: [2, 3]
    },
    footer: {
      message: '此语言部分内容由AI翻译,但已经过校对。',
      copyright: '© 2023 - 2025 By QingFeng'
    },
    editLink: {
      pattern: 'https://github.com/QingFengTechnology/ImpostorDocs/blob/main/:path',
      text: '在GitHub上查看此页'
    },
    lastUpdated: {
      text: '上次更新于'
    },
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    darkModeSwitchLabel: '颜色模式',
    lightModeSwitchTitle: '切换至浅色模式',
    darkModeSwitchTitle: '切换至深色模式',
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '返回顶部',
    langMenuLabel: '语言'
  }
})