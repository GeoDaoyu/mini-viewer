# Map

Map 类是地图的核心容器，用于管理地图图层。

## 构造函数

```typescript
new Map(options?: MapOptions)
```

### MapOptions

| 属性 | 类型 | 描述 |
|------|------|------|
| `layers` | `Layer[]` | 地图包含的图层列表 |

### 示例

```typescript
import { Map, TileLayer } from 'mini-viewer'

const map = new Map({
  layers: [
    new TileLayer({
      url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
    })
  ]
})
```

## 属性

### `layers`

地图包含的所有图层。

```typescript
const layers = map.layers
```

## 方法

### `add(layer: Layer)`

添加一个图层到地图。

```typescript
const layer = new TileLayer({ url: '...' })
map.add(layer)
```

### `remove(layer: Layer)`

从地图移除一个图层。

```typescript
map.remove(layer)
```

### `getAllLayers()`

获取地图中的所有图层（包括嵌套图层）。

```typescript
const allLayers = map.getAllLayers()
```

## 相关

- [MapView](/api/mapview) - 地图视图
- [Layer](/api/layers) - 图层基类
