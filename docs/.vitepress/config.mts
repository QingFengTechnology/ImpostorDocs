import { defineConfig } from 'vitepress'
import { enLocaleConfig } from './i18n/index.ts'

export default defineConfig({
  title: "Impostor",
  titleTemplate: ":title - Impostor",
  head: [['link', { rel: 'icon', type: 'image/png', href: 'https://avatars.githubusercontent.com/u/73118603?s=200&v=4' }]],
  base: '/',
  cleanUrls: true,
  lastUpdated: true,
  locales: {
    root: enLocaleConfig as typeof enLocaleConfig & { label: 'English' }
  },
  themeConfig: {
    logo: 'https://avatars.githubusercontent.com/u/73118603?s=200&v=4',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Impostor/Impostor' },
      { icon: 'discord', link: 'https://discord.gg/Mk3w6Tb' }
    ],
    footer: {
      copyright: '© 2020 - 2025 Impostor'
    },
    search: {
      provider: 'local'
    }
  }
})
