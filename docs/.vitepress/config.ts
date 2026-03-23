import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Mini-Viewer',
  description: '一个简单的 WebGIS 引擎',
  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/introduction' },
      { text: 'API', link: '/api/map' }
    ],
    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '介绍', link: '/guide/introduction' },
            { text: '快速开始', link: '/guide/getting-started' },
            { text: '图层类型', link: '/guide/layers' }
          ]
        }
      ],
      '/api/': [
        {
          text: 'API 参考',
          items: [
            { text: 'Map', link: '/api/map' },
            { text: 'MapView', link: '/api/mapview' },
            { text: '图层', link: '/api/layers' },
            { text: '符号', link: '/api/symbols' },
            { text: '几何', link: '/api/geometry' }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/geodaoyu/mini-viewer' }
    ]
  }
})
