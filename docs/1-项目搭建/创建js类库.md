# 创建 JavaScript 类库

本章介绍如何将 GIS 功能封装为可复用的 JavaScript 类库。

## 类库结构设计

```
lib/
├── Map.ts                    # 地图类
├── MapView.ts               # 地图视图类
├── geometry/                # 几何模块
│   ├── Point.ts
│   ├── Polyline.ts
│   └── Polygon.ts
├── layers/                  # 图层模块
│   ├── Layer.ts
│   ├── TileLayer.ts
│   └── GeoJSONLayer.ts
└── symbols/                 # 符号模块
    ├── Symbol.ts
    ├── SimpleMarkerSymbol.ts
    └── SimpleLineSymbol.ts
```

## 入口文件

创建 `lib/main.ts` 作为类库的入口：

```typescript
export { default as Map } from './Map'
export { default as MapView } from './MapView'
export { default as Point } from './geometry/Point'
export { default as Polyline } from './geometry/Polyline'
export { default as Polygon } from './geometry/Polygon'
export { default as TileLayer } from './layers/TileLayer'
export { default as GeoJSONLayer } from './layers/GeoJSONLayer'
```

## 构建配置

更新 `vite.config.ts` 支持类库构建：

```typescript
import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/main.ts'),
      name: 'MiniViewer',
      fileName: (format) => `mini-viewer.${format}.js`
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {},
        exports: 'named'
      }
    },
    sourcemap: true,
    minify: 'terser'
  }
})
```

## 类型声明

创建类型声明文件 `index.d.ts`：

```typescript
declare module 'mini-viewer' {
  export class Map {
    constructor(options?: MapOptions)
    addLayer(layer: Layer): void
    removeLayer(layer: Layer): void
  }
  
  export class MapView {
    constructor(options: MapViewOptions)
    map: Map
    container: HTMLElement
  }
  
  // 更多类型声明...
}

export default MiniViewer
```

## 包管理配置

配置 `package.json` 支持多种模块格式：

```json
{
  "name": "mini-viewer",
  "version": "0.1.0",
  "type": "module",
  "main": "./dist/mini-viewer.umd.js",
  "module": "./dist/mini-viewer.es.js",
  "types": "./index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/mini-viewer.es.js",
      "require": "./dist/mini-viewer.umd.js"
    }
  },
  "files": ["dist", "index.d.ts"]
}
```

## 使用示例

```typescript
import { Map, MapView, TileLayer } from 'mini-viewer'

// 创建地图实例
const map = new Map()

// 添加图层
const tileLayer = new TileLayer({
  url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
})
map.addLayer(tileLayer)

// 创建地图视图
const view = new MapView({
  container: document.getElementById('map'),
  map: map,
  center: [116.397, 39.908],
  zoom: 10
})
```

## 最佳实践

1. **模块化设计**：将功能拆分为独立的模块
2. **类型安全**：使用 TypeScript 提供完整的类型支持
3. **文档注释**：使用 JSDoc 注释生成 API 文档
4. **测试覆盖**：为每个模块编写单元测试
5. **版本管理**：遵循语义化版本规范
