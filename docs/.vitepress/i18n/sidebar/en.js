import { defineConfig } from 'vitepress'

export const enSidebarConfig = defineConfig([
  {
    text: 'Server-Side Operation Guide',
    base: '/Server/',
    items: [
      { text: 'Getting Started', link: 'GettingStarted' },
      { text: 'Server configuration', link: 'ServerConfiguration' },
    ]
  }
]);