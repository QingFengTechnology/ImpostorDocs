import { defineConfig } from 'vitepress'
import footnote_plugin from "markdown-it-footnote";
import { enLocaleConfig, zhLocaleConfig } from './i18n/index.js'

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
    root: enLocaleConfig,
    zh: zhLocaleConfig
  },
  themeConfig: {
    logo: 'https://avatars.githubusercontent.com/u/73118603?s=200&v=4',
    outline: {
      level: [2, 3]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Impostor/Impostor' },
      { icon: 'discord', link: 'https://discord.gg/Mk3w6Tb' }
    ],
    footer: {
      copyright: '© 2023 - 2025 By QingFeng'
    },
    search: {
      provider: 'local',
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭'
                }
              }
            }
          }
        }
      }
    },
    externalLinkIcon: true
  },
  markdown:{
    config:(md)=>{
      md.use(footnote_plugin)
    }
  }
})
