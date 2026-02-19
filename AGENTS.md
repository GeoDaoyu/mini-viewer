# AGENTS.md

本文件为 neovate 在此代码库中工作时提供指导。

## 开发命令

### 核心命令
- `pnpm install` - 安装依赖项
- `pnpm start` - 启动开发服务器并启用热重载
- `pnpm run build` - 构建库源代码（运行 tsc 然后 vite build）
- `pnpm run demo` - 构建库的演示版本

### 构建配置
- 主构建：使用 `vite.config.ts`，入口为 `./lib/main.ts`
- 演示构建：使用 `vite.config.demo.ts`，输出到 `demo/` 目录

## 代码架构与模式

### 项目结构
- `lib/` - 用 TypeScript 编写的主库源代码
- `src/` - 演示/示例代码
- `dist/` - 构建输出目录
- `demo/` - 生成的演示构建目录

### 核心架构
- **Map/View 模式**：`Map` 类管理图层，`MapView` 类处理 canvas 渲染
- **图层系统**：基础 `Layer` 类及专门实现（MapImageLayer, TileLayer, GeoJSONLayer）
- **LayerView 模式**：每种图层类型都有对应的 LayerView 进行渲染（MapImageLayerView, TileLayerView 等）
- **几何系统**：坐标转换和空间参考处理在 `geometry/` 目录中
- **符号系统**：渲染原语在 `symbols/` 目录中

### 关键数据流
1. `Map` 实例包含多个 `Layer` 实例
2. 添加到地图时，每个图层创建相应的 `LayerView`
3. `MapView` 通过遍历图层视图进行渲染
4. 坐标转换通过 `SpatialReference` 和 `webMercatorUtils` 处理

### 依赖项
- `@geodaoyu/accessor` - 用于属性访问模式（在 `src/types/accessor.d.ts` 中定义）
- Vite 用于打包和开发服务器
- TypeScript 用于类型检查并启用严格模式

### 构建过程
- TypeScript 编译后进行 Vite 打包
- 库输出格式为 ESM 和 UMD 模块
- 演示构建在 `demo/` 目录中创建独立示例
