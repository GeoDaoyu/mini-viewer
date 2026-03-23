# 图层类型

Mini-Viewer 支持多种图层类型，每种图层都有其特定的用途和配置选项。

## TileLayer - 切片图层

用于加载 ArcGIS 切片服务。

```typescript
import { TileLayer } from 'mini-viewer'

const tileLayer = new TileLayer({
  url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
})
```

## MapImageLayer - 动态地图图层

用于加载 ArcGIS 动态地图服务。

```typescript
import { MapImageLayer } from 'mini-viewer'

const mapImageLayer = new MapImageLayer({
  url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer'
})
```

## OpenStreetMapLayer - OSM 图层

用于加载 OpenStreetMap 切片。

```typescript
import { OpenStreetMapLayer } from 'mini-viewer'

const osmLayer = new OpenStreetMapLayer()
```

## TianDiTuLayer - 天地图图层

用于加载天地图服务。

```typescript
import { TianDiTuLayer } from 'mini-viewer'

const tdtLayer = new TianDiTuLayer({
  type: 'vec_c' // vec_c: 矢量注记，img_c: 影像注记
})
```

## GeoJSONLayer - GeoJSON 图层

用于加载 GeoJSON 数据。

```typescript
import { GeoJSONLayer, SimpleRenderer, MarkerSymbol } from 'mini-viewer'

const geojsonLayer = new GeoJSONLayer({
  url: './data.geojson',
  renderer: new SimpleRenderer({
    symbol: new MarkerSymbol()
  })
})
```

## GraphicsLayer - 图形图层

用于在客户端添加图形要素。

```typescript
import { GraphicsLayer, Point, SimpleMarkerSymbol } from 'mini-viewer'

const graphicsLayer = new GraphicsLayer()

const point = new Point({
  x: 116.4,
  y: 39.9
})

const symbol = new SimpleMarkerSymbol({
  color: [255, 0, 0],
  size: 12
})

graphicsLayer.addGraphic({
  geometry: point,
  symbol: symbol
})
```

## FeatureLayer - 要素图层

用于加载要素服务或本地要素数据。

```typescript
import { FeatureLayer, SimpleRenderer } from 'mini-viewer'

const featureLayer = new FeatureLayer({
  url: 'https://services.arcgis.com/...',
  renderer: new SimpleRenderer({
    // 配置渲染器
  })
})
```

## 图层属性

所有图层都支持以下通用属性：

- `visible` - 图层是否可见
- `opacity` - 图层透明度 (0-1)
- `title` - 图层标题
- `id` - 图层唯一标识

```typescript
layer.visible = true
layer.opacity = 0.8
layer.title = '我的图层'
```
