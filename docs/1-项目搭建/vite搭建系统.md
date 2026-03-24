# Vite 搭建系统

Vite 是一个现代化的前端构建工具，它提供了快速的开发服务器和优化的构建流程。

## 初始化项目

```bash
# 使用 Vite 创建 TypeScript 项目
npm create vite@latest mini-viewer -- --template vanilla-ts

# 进入项目目录
cd mini-viewer

# 安装依赖
npm install
```

## 项目结构

```
mini-viewer/
├── src/
│   ├── main.ts          # 入口文件
│   └── style.css        # 样式文件
├── index.html           # HTML 模板
├── package.json         # 项目配置
├── tsconfig.json        # TypeScript 配置
└── vite.config.ts       # Vite 配置
```

## Vite 配置

创建 `vite.config.ts` 文件：

```typescript
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: './src/main.ts',
      name: 'MiniViewer',
      fileName: 'mini-viewer'
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {}
      }
    }
  }
})
```

## TypeScript 配置

配置 `tsconfig.json` 支持严格的类型检查：

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}
```

## 开发服务器

启动开发服务器：

```bash
# 开发模式
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 优势

1. **快速启动**：基于原生 ES 模块，无需打包即可启动
2. **热更新**：支持模块热替换，开发体验优秀
3. **按需编译**：只在需要时编译当前页面
4. **丰富的插件**：支持 Rollup 插件生态系统
