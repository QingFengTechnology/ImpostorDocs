import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import type { Theme as ThemeConfig } from 'vitepress'
import { inBrowser } from 'vitepress'

import { BProgress } from '@bprogress/core';

import { NolebaseHighlightTargetedHeading } from '@nolebase/vitepress-plugin-highlight-targeted-heading/client'
import '@nolebase/vitepress-plugin-highlight-targeted-heading/client/style.css'

import { NolebaseEnhancedReadabilitiesMenu } from '@nolebase/vitepress-plugin-enhanced-readabilities/client'
import '@nolebase/vitepress-plugin-enhanced-readabilities/client/style.css'

import '@nolebase/vitepress-plugin-enhanced-mark/client/style.css'

import './styles/index.css'

export const Theme: ThemeConfig = {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'nav-bar-content-after': () => h(NolebaseEnhancedReadabilitiesMenu),
      'layout-top': () => [
        h(NolebaseHighlightTargetedHeading),
      ],
    })
  },
  enhanceApp({ router }) {
    if (inBrowser) {
      BProgress.configure({ showSpinner: false })
      router.onBeforeRouteChange = () => {
        BProgress.start()
      }
      router.onAfterRouteChange = () => {
        BProgress.done()
      }
    }
  }
}

export default Theme