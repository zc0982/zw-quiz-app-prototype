# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

本仓库包含两个独立的原型应用：

1. **根目录应用**（`src/`）— 由 Google AI Studio 生成的行测刷题 App，集成 Gemini AI
2. **`gamified_repo/`** — 由 Figma Make 导出的游戏化学习地图原型（独立 Vite 项目）

## 常用命令

### 根目录应用

```bash
npm install
npm run dev       # 开发服务器，监听 0.0.0.0:3173
npm run build     # 生产构建
npm run lint      # 类型检查（tsc --noEmit）
npm run clean     # 删除 dist/
```

需在 `.env.local` 中设置 `GEMINI_API_KEY`（参考 `.env.example`）。

### gamified_repo 应用

```bash
cd gamified_repo
pnpm install
pnpm dev          # 开发服务器
pnpm build        # 生产构建
```

## 架构说明

### 根目录应用（`src/`）

- **单文件架构**：全部业务逻辑、组件和页面均在 `src/App.tsx` 一个文件中（约 2500+ 行），这是 AI Studio 生成的典型结构，不拆分文件。
- **UI 框架**：React 19 + Tailwind CSS 4（通过 `@tailwindcss/vite` 插件）+ `motion/react` 动画。
- **底部抽屉导航**：使用 `vaul` Drawer 实现底部面板，通过 `ResizeObserver` 动态计算底部导航栏高度并将 Drawer 定位于其上方。
- **移动端优先**：页面容器固定 `max-w-[428px]`，模拟手机设备。
- **AI 集成**：通过 `@google/genai` 调用 Gemini API，API Key 由 Vite `define` 在构建时注入（`process.env.GEMINI_API_KEY`）。
- **`cn()` 工具函数**：`clsx` + `tailwind-merge` 组合，定义在 App.tsx 顶部，未抽离为独立文件。

主要数据结构：
- `practiceList`：4 级嵌套树形题目分类（政治理论 → 新思想 → 五位一体 → 具体科目）
- `bottomNav`：4 个底部导航项（首页/快练/背诵/我的）
- 答题流程通过 `useState` 管理当前视图状态，无外部状态管理库。

### gamified_repo 应用

- **游戏化地图**：`src/app/App.tsx` 实现 S 曲线关卡地图，节点状态分为 `completed / current / locked`。
- **路径绘制**：用 SVG cubic bezier 曲线连接关卡节点，已完成段用琥珀色，未解锁段用灰色。
- **3D 装饰元素**：关卡节点用纯 SVG 绘制 2.5D 书本 + 圆柱底座，岛屿/树木/时钟等场景装饰通过 CSS 实现。
- **shadcn/ui 组件库**：`src/app/components/ui/` 下包含完整的 Radix UI + shadcn 组件集合。
- **`@` 路径别名**：指向 `./src` 目录。
- **包管理器**：使用 pnpm（`package.json` 含 pnpm overrides）。

## 关键配置

- Vite `@` 别名：根目录指向项目根（`path.resolve(__dirname, '.')`），`gamified_repo` 指向 `./src`
- HMR：根目录应用支持通过 `DISABLE_HMR=true` 环境变量禁用（AI Studio 编辑时使用）
- `gamified_repo` 的 `assetsInclude` 支持 `.svg` 和 `.csv` 原始导入，禁止添加 `.css/.tsx/.ts`
