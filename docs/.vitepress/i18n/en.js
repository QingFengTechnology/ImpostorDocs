import { defineConfig } from 'vitepress'
import { enSidebarConfig } from './sidebar/index.js'

export const enLocaleConfig = defineConfig({
  description: "Impostor - An open source reimplementation of the Among Us Server",
  lang: 'en-US',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/Server/' }
    ],
    sidebar: enSidebarConfig,
    editLink: {
      pattern: 'https://github.com/QingFengTechnology/ImpostorDocs/blob/main/:path',
      text: 'View this page on GitHub'
    }
  }
})