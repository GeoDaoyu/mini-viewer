# 介绍

Mini-Viewer 是一个仿照 ArcGIS 实现的简单 WebGIS 引擎，可以加载常见的地图服务。

## 特性

- 🗺️ **多种图层支持** - 支持 ArcGIS 切片服务、动态地图服务、OpenStreetMap、GeoJSON 等
- 🎨 **符号系统** - 支持点、线、面符号的渲染
- 📐 **坐标转换** - 支持 Web Mercator 投影转换
- 💻 **TypeScript** - 完整的类型定义

## 支持的图层类型

| 图层类型 | 描述 |
|---------|------|
| TileLayer | ArcGIS 切片服务图层 |
| MapImageLayer | ArcGIS 动态地图服务图层 |
| OpenStreetMapLayer | OpenStreetMap 切片图层 |
| GeoJSONLayer | GeoJSON 数据图层 |
| GraphicsLayer | 客户端图形图层 |
| FeatureLayer | 要素图层 |

## 架构概览

Mini-Viewer 采用 Map/View 模式：

- **Map** - 管理图层的容器
- **MapView** - 负责地图的渲染和交互
- **Layer** - 图层基类，不同类型的图层继承自此类
- **LayerView** - 图层的渲染视图

## 学习资源

- [快速开始](/guide/getting-started) - 开始使用 Mini-Viewer
- [API 参考](/api/map) - 查看完整的 API 文档
