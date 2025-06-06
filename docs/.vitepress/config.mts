import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'en-US',
  title: "Impostor",
  description: "Impostor - An open source reimplementation of the Among Us Server",
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Impostor/Impostor' }
    ]
  }
})
