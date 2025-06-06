import { defineConfig } from 'vitepress'

export const enSidebarConfig = defineConfig([
  {
    text: 'Server configuration',
    base: '/Server/',
    items: [
      { text: 'Getting Started', link: 'GettingStarted' },
    ]
  }
]);