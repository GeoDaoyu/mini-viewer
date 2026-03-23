# MapView

MapView 类负责地图的渲染和用户交互。

## 构造函数

```typescript
new MapView(options?: MapViewOptions)
```

### MapViewOptions

| 属性 | 类型 | 描述 |
|------|------|------|
| `container` | `string \| HTMLElement` | 地图容器的 DOM 元素或 ID |
| `map` | `Map` | 要显示的地图实例 |
| `center` | `[number, number]` | 地图中心点坐标 [经度，纬度] |
| `zoom` | `number` | 地图缩放级别 |

### 示例

```typescript
import { Map, MapView } from 'mini-viewer'

const map = new Map({
  layers: [...]
})

const view = new MapView({
  container: 'viewDiv',
  map: map,
  center: [116.4, 39.9],
  zoom: 10
})
```

## 属性

### `map`

视图关联的地图实例。

```typescript
const map = view.map
```

### `center`

地图中心点坐标。

```typescript
const center = view.center
view.center = [120.0, 30.0]
```

### `zoom`

地图缩放级别。

```typescript
const zoom = view.zoom
view.zoom = 12
```

### `container`

地图容器的 DOM 元素。

```typescript
const container = view.container
```

## 方法

### `draw()`

手动触发地图重绘。

```typescript
view.draw()
```

### `resize()`

调整地图视图大小。

```typescript
view.resize()
```

## 事件

MapView 支持以下交互事件：

- 平移（拖拽）
- 缩放（滚轮）
- 点击

## 相关

- [Map](/api/map) - 地图容器
- [LayerView](/api/layers) - 图层视图
