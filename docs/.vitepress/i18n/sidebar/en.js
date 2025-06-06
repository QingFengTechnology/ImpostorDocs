import { defineConfig } from 'vitepress'

export const enSidebarConfig = defineConfig([
  {
    text: 'Server-Side Operation Guide',
    base: '/Server/',
    items: [
      { text: 'Getting Started', link: 'GettingStarted' },
      { text: 'Server configuration', link: 'ServerConfiguration' },
      { text: 'HTTP Server', link: 'HTTPServer' },
      { text: 'Building from source', link: 'BuildingFromSource' },
      { text: 'Writing a plugin', link: 'WritePlugin' },
      { text: 'Frequently answered questions', link: 'FAQ' },
      { text: 'Troubleshooting', link: 'Troubleshooting' }
    ]
  }
]);