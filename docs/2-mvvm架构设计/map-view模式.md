# Map-View 模式

Map-View 模式是 GIS 中常用的架构模式，它将数据（Map）和显示（View）分离。

## 核心概念

### Map（地图）
- 负责管理图层数据
- 存储地图状态（中心点、缩放级别等）
- 提供图层管理接口

### View（视图）
- 负责地图的渲染和显示
- 处理用户交互（平移、缩放等）
- 管理 Canvas 绘制上下文

## 实现示例

### Map 类

```typescript
class Map {
  private layers: Layer[] = []
  private spatialReference: SpatialReference
  
  constructor(options: MapOptions) {
    this.spatialReference = options.spatialReference || SpatialReference.WebMercator
  }
  
  addLayer(layer: Layer): void {
    this.layers.push(layer)
    layer.map = this
  }
  
  removeLayer(layer: Layer): void {
    const index = this.layers.indexOf(layer)
    if (index > -1) {
      this.layers.splice(index, 1)
      layer.map = null
    }
  }
  
  getLayers(): Layer[] {
    return [...this.layers]
  }
}
```

### MapView 类

```typescript
class MapView {
  private map: Map
  private container: HTMLElement
  private canvas: HTMLCanvasElement
  private context: CanvasRenderingContext2D
  private center: [number, number] = [0, 0]
  private zoom: number = 0
  
  constructor(options: MapViewOptions) {
    this.map = options.map
    this.container = options.container
    this.center = options.center || this.center
    this.zoom = options.zoom || this.zoom
    
    this.initCanvas()
    this.setupEvents()
  }
  
  private initCanvas(): void {
    this.canvas = document.createElement('canvas')
    this.canvas.width = this.container.clientWidth
    this.canvas.height = this.container.clientHeight
    this.container.appendChild(this.canvas)
    this.context = this.canvas.getContext('2d')!
  }
  
  render(): void {
    // 清空画布
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    
    // 渲染所有图层
    const layers = this.map.getLayers()
    for (const layer of layers) {
      layer.render(this.context, this)
    }
  }
}
```

## 数据流

```
用户交互 → MapView → 更新视图状态 → 触发渲染 → 调用图层渲染
```

## 优势

1. **关注点分离**：数据管理和显示逻辑解耦
2. **可测试性**：Map 和 View 可以独立测试
3. **可扩展性**：易于添加新的图层类型
4. **性能优化**：可以单独优化渲染逻辑

## 实际应用

在 Mini-Viewer 中，Map-View 模式体现在：
- `Map` 类管理图层集合
- `MapView` 类处理 Canvas 渲染
- 每个图层类型都有对应的 `LayerView` 负责具体渲染
