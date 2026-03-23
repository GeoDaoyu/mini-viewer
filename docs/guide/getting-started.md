# 快速开始

## 安装

```bash
npm install mini-viewer
```

## 基础示例

### 创建一个简单的地图

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mini-Viewer 示例</title>
  <style>
    html, body, #viewDiv {
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
    }
  </style>
</head>
<body>
  <div id="viewDiv"></div>
  <script type="module">
    import { Map, MapView, TileLayer } from 'mini-viewer'

    // 创建地图
    const map = new Map({
      layers: [
        new TileLayer({
          url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
        })
      ]
    })

    // 创建地图视图
    const view = new MapView({
      container: 'viewDiv',
      map: map,
      center: [116.4, 39.9], // 北京
      zoom: 10
    })
  </script>
</body>
</html>
```

## 添加图层

### 添加天地图图层

```typescript
import { TianDiTuLayer } from 'mini-viewer'

const tdtLayer = new TianDiTuLayer({
  type: 'vec_c' // 矢量注记
})

map.add(tdtLayer)
```

### 添加 GeoJSON 图层

```typescript
import { GeoJSONLayer, SimpleRenderer, MarkerSymbol } from 'mini-viewer'

const layer = new GeoJSONLayer({
  url: './data.geojson',
  renderer: new SimpleRenderer({
    symbol: new MarkerSymbol()
  })
})

map.add(layer)
```

### 添加图形图层

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

map.add(graphicsLayer)
```

## 下一步

- 查看 [图层类型](/guide/layers) 了解更多图层用法
- 查看 [API 参考](/api/map) 了解完整的 API
