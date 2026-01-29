# Restic Snapshot Explorer

Restic Snapshot Explorer 是一个基于 **React + TypeScript + Vite** 构建的 Web 应用，用于以可视化方式浏览和管理 **Restic** 备份仓库中的快照数据。
该项目提供快照列表、快照详情、仓库管理和统计信息等功能，帮助用户更直观地理解和管理备份状态。

> ⚠️ 当前版本使用模拟数据（Mock Data），尚未连接真实的 Restic 后端 API。

---

## 功能特性

### 📸 快照浏览

* 查看所有备份快照列表
* 支持按时间范围筛选快照
* 支持快照搜索与快速定位

### 🗂️ 快照详情

* 浏览快照对应的文件树结构
* 查看文件和目录的元数据信息
* 展示快照统计信息（大小、文件数量等）

### 🏷️ 仓库管理

* 支持多 Restic 仓库切换
* 添加、更新和删除仓库配置
* 独立管理不同仓库的快照数据

### 📊 统计信息

* 总快照数量
* 数据总大小
* 唯一数据大小
* 压缩率展示

### 🌙 现代化 UI

* 基于 Radix UI 的可访问组件
* Tailwind CSS 样式系统
* 深色主题设计，适合长时间使用

---

## 技术栈

| 分类    | 技术                      |
| ----- | ----------------------- |
| 前端框架  | React 19.2.0            |
| 开发语言  | TypeScript              |
| 构建工具  | Vite                    |
| UI 组件 | Radix UI + Tailwind CSS |
| 表单处理  | React Hook Form         |
| 日期处理  | date-fns                |
| 代码质量  | ESLint + Prettier       |

---

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

启动后在浏览器中访问：

```
http://localhost:5173
```

### 3. 构建生产版本

```bash
npm run build
```

### 4. 预览生产构建

```bash
npm run preview
```

---

## 可用脚本

| 命令                | 描述                |
| ----------------- | ----------------- |
| `npm run dev`     | 启动开发服务器           |
| `npm run build`   | 构建生产版本            |
| `npm run preview` | 预览构建结果            |
| `npm run lint`    | 运行 ESLint 检查      |
| `npm run format`  | 使用 Prettier 格式化代码 |

---

## 项目结构

```text
src/
├── App.tsx                 # 主应用组件
├── sections/               # 页面区块组件
│   ├── Header/             # 顶部导航栏
│   ├── Hero/               # 搜索和筛选区域
│   ├── Stats/              # 统计信息展示
│   ├── SnapshotList/       # 快照列表
│   ├── SnapshotDetail/     # 快照详情视图
│   └── RepositorySettings/ # 仓库设置
├── hooks/                  # 自定义 Hooks
│   ├── useSnapshots.ts     # 快照管理逻辑
│   └── useRepositories.ts  # 仓库管理逻辑
└── data/
    └── mockSnapshots.ts    # 模拟快照数据
```

---

## 当前状态与限制

* ✅ 前端功能完整（浏览、筛选、统计、仓库管理）
* ⚠️ 使用模拟数据（`mockSnapshots.ts`）
* ❌ 尚未集成真实 Restic CLI 或 REST API
* ❌ 无用户认证与权限控制

---

## 后续计划（Roadmap）

* [ ] 接入真实 Restic 后端（CLI / REST API）
* [ ] 支持快照恢复操作
* [ ] 支持文件级别下载 / 恢复
* [ ] 用户配置持久化
* [ ] 国际化（i18n）支持

---

## 适用人群

* 使用 Restic 进行备份的个人或团队
* 希望通过 Web UI 管理备份快照的用户
* 前端开发者学习 React + Vite + Tailwind 的综合示例项目

---

## License

本项目采用 **MIT License**。

---

# Restic Snapshot Explorer

**Restic Snapshot Explorer** is a web-based visualization tool built with **React, TypeScript, and Vite** for browsing and managing **Restic backup snapshots**.
It provides an intuitive UI for viewing snapshots, inspecting file trees, managing repositories, and analyzing backup statistics.

> ⚠️ The current version uses **mock data** and is not yet connected to a real Restic backend API.

---

## Features

### 📸 Snapshot Browsing

* View all backup snapshots in a list
* Search and filter snapshots by time range
* Quickly navigate large snapshot collections

### 🗂️ Snapshot Details

* Browse snapshot file trees
* View file and directory metadata
* Display snapshot-level statistics

### 🏷️ Repository Management

* Switch between multiple Restic repositories
* Add, update, and delete repository configurations
* Manage snapshots independently per repository

### 📊 Statistics Dashboard

* Total number of snapshots
* Total backup size
* Unique data size
* Compression ratio

### 🌙 Modern UI

* Accessible components powered by Radix UI
* Styled with Tailwind CSS
* Dark theme optimized for long sessions

---

## Tech Stack

| Category             | Technology       |
| -------------------- | ---------------- |
| Frontend             | React 19.2.0     |
| Language             | TypeScript       |
| Build Tool           | Vite             |
| UI Components        | Radix UI         |
| Styling              | Tailwind CSS     |
| Forms                | React Hook Form  |
| Date Handling        | date-fns         |
| Linting & Formatting | ESLint, Prettier |

---

## Getting Started

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

Then open:

```
http://localhost:5173
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## Available Scripts

| Command           | Description                  |
| ----------------- | ---------------------------- |
| `npm run dev`     | Start the development server |
| `npm run build`   | Build the production bundle  |
| `npm run preview` | Preview the production build |
| `npm run lint`    | Run ESLint checks            |
| `npm run format`  | Format code with Prettier    |

---

## Project Structure

```text
src/
├── App.tsx                  # Main application component
├── sections/                # Page sections
│   ├── Header/              # Top navigation bar
│   ├── Hero/                # Search and filter section
│   ├── Stats/               # Statistics overview
│   ├── SnapshotList/        # Snapshot list
│   ├── SnapshotDetail/      # Snapshot detail view
│   └── RepositorySettings/  # Repository settings
├── hooks/                   # Custom React hooks
│   ├── useSnapshots.ts      # Snapshot management logic
│   └── useRepositories.ts   # Repository management logic
└── data/
    └── mockSnapshots.ts     # Mock snapshot data
```

---

## Current Status & Limitations

* ✅ Fully functional frontend UI
* ⚠️ Uses mock data (`mockSnapshots.ts`)
* ❌ No real Restic backend integration yet
* ❌ No authentication or access control

---

## Roadmap

* [ ] Integrate real Restic backend (CLI or REST API)
* [ ] Snapshot restore functionality
* [ ] File-level download and restore
* [ ] Persistent user configuration
* [ ] Internationalization (i18n) support

---

## Intended Audience

* Restic users who want a visual snapshot browser
* Teams managing multiple backup repositories
* Frontend developers looking for a modern React + Vite example project

---

## License

This project is licensed under the **MIT License**.

