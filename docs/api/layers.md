# 图层

图层是地图的基本组成单元，不同类型的图层用于加载不同的数据源。

## Layer 基类

所有图层都继承自 Layer 基类。

### 通用属性

| 属性 | 类型 | 描述 |
|------|------|------|
| `visible` | `boolean` | 图层是否可见 |
| `opacity` | `number` | 图层透明度 (0-1) |
| `title` | `string` | 图层标题 |
| `id` | `string` | 图层唯一标识 |

### 通用方法

#### `load()`

加载图层数据。

```typescript
await layer.load()
```

## 图层类型

### TileLayer

ArcGIS 切片服务图层。

```typescript
import { TileLayer } from 'mini-viewer'

const layer = new TileLayer({
  url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
})
```

### MapImageLayer

ArcGIS 动态地图服务图层。

```typescript
import { MapImageLayer } from 'mini-viewer'

const layer = new MapImageLayer({
  url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer'
})
```

### OpenStreetMapLayer

OpenStreetMap 切片图层。

```typescript
import { OpenStreetMapLayer } from 'mini-viewer'

const layer = new OpenStreetMapLayer()
```

### TianDiTuLayer

天地图服务图层。

```typescript
import { TianDiTuLayer } from 'mini-viewer'

const layer = new TianDiTuLayer({
  type: 'vec_c'
})
```

### GeoJSONLayer

GeoJSON 数据图层。

```typescript
import { GeoJSONLayer } from 'mini-viewer'

const layer = new GeoJSONLayer({
  url: './data.geojson'
})
```

### GraphicsLayer

客户端图形图层。

```typescript
import { GraphicsLayer } from 'mini-viewer'

const layer = new GraphicsLayer()
layer.addGraphic({
  geometry: new Point({ x: 116.4, y: 39.9 }),
  symbol: new SimpleMarkerSymbol()
})
```

### FeatureLayer

要素图层。

```typescript
import { FeatureLayer } from 'mini-viewer'

const layer = new FeatureLayer({
  url: 'https://services.arcgis.com/...'
})
```

## 相关

- [Map](/api/map) - 地图容器
- [Renderer](/api/symbols) - 渲染器
- [Symbol](/api/symbols) - 符号
