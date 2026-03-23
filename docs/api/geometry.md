# 几何

几何类用于表示空间要素的形状。

## 几何类型

### Point

点几何。

```typescript
import { Point } from 'mini-viewer'

const point = new Point({
  x: 116.4,
  y: 39.9,
  spatialReference: { wkid: 4326 }
})
```

### Polyline

线几何。

```typescript
import { Polyline } from 'mini-viewer'

const polyline = new Polyline({
  paths: [
    [[116.4, 39.9], [117.0, 40.0], [118.0, 41.0]]
  ],
  spatialReference: { wkid: 4326 }
})
```

### Polygon

面几何。

```typescript
import { Polygon } from 'mini-viewer'

const polygon = new Polygon({
  rings: [
    [[116.4, 39.9], [117.0, 39.9], [117.0, 40.0], [116.4, 40.0], [116.4, 39.9]]
  ],
  spatialReference: { wkid: 4326 }
})
```

## 空间参考

### SpatialReference

空间参考类用于定义坐标系。

```typescript
import { SpatialReference } from 'mini-viewer'

// WGS84 地理坐标系
const wgs84 = new SpatialReference({ wkid: 4326 })

// Web Mercator 投影坐标系
const webMercator = new SpatialReference({ wkid: 3857 })
```

### 常用空间参考

| WKID | 名称 | 描述 |
|------|------|------|
| 4326 | WGS84 | 世界大地测量系统 1984 |
| 3857 | Web Mercator | Web 墨卡托投影 |
| 4490 | CGCS2000 | 中国大地坐标系 2000 |

## 坐标转换

Mini-Viewer 内置了 Web Mercator 投影转换工具。

```typescript
import { webMercatorUtils } from 'mini-viewer'

// 地理坐标转投影坐标
const webMercatorPoint = webMercatorUtils.fromGeographic(point)

// 投影坐标转地理坐标
const geographicPoint = webMercatorUtils.toGeographic(webMercatorPoint)
```

## 几何属性

所有几何对象都有以下属性：

- `type` - 几何类型 ("point" | "polyline" | "polygon")
- `spatialReference` - 空间参考

## 示例

### 创建带孔的多边形

```typescript
import { Polygon } from 'mini-viewer'

const polygonWithHole = new Polygon({
  rings: [
    // 外环
    [[116.4, 39.9], [117.0, 39.9], [117.0, 40.0], [116.4, 40.0], [116.4, 39.9]],
    // 内环（孔）
    [[116.5, 39.95], [116.8, 39.95], [116.8, 39.98], [116.5, 39.98], [116.5, 39.95]]
  ]
})
```

### 创建多条折线

```typescript
import { Polyline } from 'mini-viewer'

const multiPathPolyline = new Polyline({
  paths: [
    [[116.4, 39.9], [117.0, 40.0]], // 第一条线
    [[118.0, 41.0], [119.0, 42.0]]  // 第二条线
  ]
})
```

## 相关

- [Symbol](/api/symbols) - 符号
- [Graphic](/api/layers) - 图形
- [GeoJSONLayer](/api/layers) - GeoJSON 图层
