# Mini-Viewer

## 介绍

仿照ArcGIS实现一个超级简单的 GIS 引擎，可以加载一些常规地图服务。

该仓库仅是为了学习WebGIS开发，切勿在生产中使用。

## 支持的图层类型

- **TileLayer** - ArcGIS切片服务图层
- **MapImageLayer** - ArcGIS动态地图服务图层
- **OpenStreetMapLayer ** - OpenStreet切片服务图层
- **GeoJSONLayer** - GeoJSON 图层
- **GraphicsLayer** - 客户端图形图层
- **FeatureLayer** - 要素图层

## 开发

```bash
# install dependencies
$ pnpm install

# develop library by docs demo
$ pnpm start

# build library source code
$ pnpm run build
```

## AI 协助

本仓库由 [Qwen](https://tongyi.aliyun.com/) AI 协助开发。

