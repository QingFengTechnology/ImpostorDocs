import { defineConfig } from 'vitepress'

export const enLocaleConfig = defineConfig({
  description: "Impostor - An open source reimplementation of the Among Us Server",
  lang: 'en-US',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/docs/' }
    ],
    editLink: {
      pattern: 'https://github.com/QingFengTechnology/ImpostorDocs/blob/main/:path',
      text: 'View this page on GitHub'
    }
  }
})