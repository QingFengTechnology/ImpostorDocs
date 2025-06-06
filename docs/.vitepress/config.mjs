import { defineConfig } from 'vitepress'
import { enLocaleConfig } from './i18n/index.js'

export default defineConfig({
  vite: {
    optimizeDeps: {
      exclude: [
        '@nolebase/vitepress-plugin-enhanced-readabilities/client',
        'vitepress',
        '@nolebase/ui'
      ]
    },
    ssr: {
      noExternal: [
        '@nolebase/vitepress-plugin-highlight-targeted-heading',
        '@nolebase/vitepress-plugin-enhanced-readabilities',
        '@nolebase/ui'
      ]
    }
  },
  title: "Impostor",
  titleTemplate: ":title - Impostor",
  head: [['link', { rel: 'icon', type: 'image/png', href: 'https://avatars.githubusercontent.com/u/73118603?s=200&v=4' }]],
  base: '/',
  cleanUrls: true,
  lastUpdated: true,
  locales: {
    root: enLocaleConfig
  },
  themeConfig: {
    logo: 'https://avatars.githubusercontent.com/u/73118603?s=200&v=4',
    outline: {
      level: [2, 4]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Impostor/Impostor' },
      { icon: 'discord', link: 'https://discord.gg/Mk3w6Tb' }
    ],
    footer: {
      copyright: '© 2023 - 2025 By QingFeng'
    },
    search: {
      provider: 'local'
    }
  }
})
