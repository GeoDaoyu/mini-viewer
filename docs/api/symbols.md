# 符号与渲染器

符号用于定义图形要素的视觉样式，渲染器用于控制要素的渲染方式。

## 符号类型

### SimpleMarkerSymbol

点符号。

```typescript
import { SimpleMarkerSymbol } from 'mini-viewer'

const symbol = new SimpleMarkerSymbol({
  color: [255, 0, 0, 1], // RGBA
  size: 12,
  style: 'circle' // circle | square | cross | x
})
```

### SimpleLineSymbol

线符号。

```typescript
import { SimpleLineSymbol } from 'mini-viewer'

const symbol = new SimpleLineSymbol({
  color: [0, 0, 255, 1],
  width: 2,
  style: 'solid' // solid | dash | dot
})
```

### SimpleFillSymbol

面填充符号。

```typescript
import { SimpleFillSymbol, SimpleLineSymbol } from 'mini-viewer'

const symbol = new SimpleFillSymbol({
  color: [255, 0, 0, 0.5],
  outline: new SimpleLineSymbol({
    color: [255, 0, 0, 1],
    width: 1
  })
})
```

## 渲染器

### SimpleRenderer

简单渲染器，使用统一的符号渲染所有要素。

```typescript
import { SimpleRenderer, SimpleMarkerSymbol } from 'mini-viewer'

const renderer = new SimpleRenderer({
  symbol: new SimpleMarkerSymbol({
    color: [255, 0, 0],
    size: 10
  })
})

geojsonLayer.renderer = renderer
```

## 符号属性

### SimpleMarkerSymbol 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `color` | `number[]` | `[0,0,0,1]` | 颜色 (RGBA) |
| `size` | `number` | `12` | 大小（像素） |
| `style` | `string` | `'circle'` | 样式 |
| `outline` | `SimpleLineSymbol` | - | 轮廓符号 |

### SimpleLineSymbol 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `color` | `number[]` | `[0,0,0,1]` | 颜色 (RGBA) |
| `width` | `number` | `1.5` | 线宽（像素） |
| `style` | `string` | `'solid'` | 样式 |

### SimpleFillSymbol 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `color` | `number[]` | `[255,255,255,0.5]` | 填充颜色 (RGBA) |
| `outline` | `SimpleLineSymbol` | - | 轮廓符号 |

## 示例

### 创建点要素

```typescript
import { Point, SimpleMarkerSymbol, Graphic } from 'mini-viewer'

const point = new Point({
  x: 116.4,
  y: 39.9
})

const symbol = new SimpleMarkerSymbol({
  color: [255, 0, 0],
  size: 12,
  style: 'circle'
})

const graphic = new Graphic({
  geometry: point,
  symbol: symbol
})
```

### 创建线要素

```typescript
import { Polyline, SimpleLineSymbol, Graphic } from 'mini-viewer'

const polyline = new Polyline({
  paths: [
    [[116.4, 39.9], [117.0, 40.0]]
  ]
})

const symbol = new SimpleLineSymbol({
  color: [0, 0, 255],
  width: 2
})

const graphic = new Graphic({
  geometry: polyline,
  symbol: symbol
})
```

### 创建面要素

```typescript
import { Polygon, SimpleFillSymbol, SimpleLineSymbol, Graphic } from 'mini-viewer'

const polygon = new Polygon({
  rings: [
    [[116.4, 39.9], [117.0, 39.9], [117.0, 40.0], [116.4, 40.0], [116.4, 39.9]]
  ]
})

const symbol = new SimpleFillSymbol({
  color: [255, 0, 0, 0.5],
  outline: new SimpleLineSymbol({
    color: [255, 0, 0],
    width: 1
  })
})

const graphic = new Graphic({
  geometry: polygon,
  symbol: symbol
})
```

## 相关

- [GeoJSONLayer](/api/layers) - GeoJSON 图层
- [GraphicsLayer](/api/layers) - 图形图层
