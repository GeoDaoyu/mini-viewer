# Mini-Viewer

## 目标

实现一个简单的GIS引擎，可以加载动态、切片、geojson等常规地图服务。

## 计划

- [x] vite
  使用vite搭建一个基础的TS代码库，方便边写边测。
- [x] canvas
  编写`MapView`、`DOMContainer`等类，在实例化`mapView`时，初始化canvas。供后续使用。
- [x] webMercatoerUtils
  增加常规的坐标转换函数
- [x] SpatialReference
  增加`TileInfo`、`Zoom`、`Center`等，可以计算bbox。
- [x] MapImageLayer
  动态地图图片加载，佐证spatialReference的计算。
  创建`layer`后，当`layer`被add到`map`时，生成`layerview`。
  `MapView`遍历`layerview`，进行绘制。
- [x] Event
  对地图增加鼠标拖拽（center）和缩放（zoom）事件，重绘。
- [x] osm tile（WebTileLayer）
  加载oms tile，https://api.maptiler.com/maps/openstreetmap/256/{z}/{x}/{y}.jpg
- [ ] GeoJSONLayer
  能绘制要素到地图。
- [ ] osm pbf
  加载矢量切片，https://api.maptiler.com/tiles/v3-openmaptiles/{z}/{x}/{y}.pbf
  解析pbf，绘制切片和要素样式。
- [ ] 优化
  加载效率优化、交互优化等。

## Development

```bash
# install dependencies
$ pnpm install

# develop library by docs demo
$ pnpm start

# build library source code
$ pnpm run build
```