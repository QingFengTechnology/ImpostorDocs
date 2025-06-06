import { defineConfig } from 'vitepress'
import { enSidebarConfig } from './sidebar/index.js'

export const enLocaleConfig = defineConfig({
  label: 'English',
  description: "Impostor - An open source reimplementation of the Among Us Server",
  lang: 'en-US',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/Server/' }
    ],
    sidebar: enSidebarConfig,
    footer: {
      message: 'Some parts of this language are translated using AI.',
      copyright: '© 2023 - 2025 By QingFeng'
    },
    editLink: {
      pattern: 'https://github.com/QingFengTechnology/ImpostorDocs/blob/main/:path',
      text: 'View this page on GitHub'
    }
  }
})