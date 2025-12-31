# Memory 2025 | 记忆空间

[![English](https://img.shields.io/badge/readme-English-blue)](README_en.md)

> "生活不止眼前的代码，还有诗和远方的照片。"

用 340+ 张照片，构建一个可以穿梭的 3D 记忆宇宙。从 2025 年初到年末，在时间长河中自由飞行。

![Preview](assets/banner.jpg)

## ✨ 核心特性

### 🌌 沉浸式体验
- **3D 螺旋时空**：照片按时间顺序构建成 3D 螺旋隧道，通过滚动在时间中穿梭。
- **动态视差**：利用 CSS3D Transform 实现真实的景深和视差效果。
- **粒子氛围**：背景飘浮的动态粒子，随季节和氛围变化。

### 🎬 电影级终章
- **无缝多阶段揭示**：视频 -> 文字 -> 统计面板的平滑过渡体验。
- **互动照片墙**：结尾呈现动态无缝滚动的双向照片瀑布流，带鼠标聚光灯效果。
- **3D 悬浮卡片**：统计面板支持鼠标跟随的 3D 倾斜交互。

### 🤖 智能感知
- **智能文案生成**：根据照片的天气、温度、色调，自动匹配富有诗意的短句。
- **多语言适配 (i18n)**：完整的中英文支持，自动检测浏览器语言，支持一键切换。
- **深度数据统计**：自动计算全年照片数量、总大小、以及"翻过"的长度。

### ⚡ 极致性能
- **智能懒加载**：基于 3D 距离的动态加载机制，仅加载视口附近资源。
- **后台预加载**：利用空闲时间预加载大图和资源，确保流畅体验。
- **缩略图优化**：自动生成的超轻量级缩略图，秒级加载。

## 🛠️ 技术栈

- **Core**: 纯 HTML5 + CSS3 + JavaScript (ES6+)，无第三方框架依赖。
- **3D Engine**: 原生 CSS 3D Transforms (`transform-style: preserve-3d`).
- **Data**: 自动化的 CSV/JSON 数据流处理。
- **Design**: 极简主义设计，毛玻璃 (Glassmorphism) UI 风格。

## 📁 项目结构

```
memory-2025/
├── index.html          # 入口文件 (结构与 i18n)
├── style.css           # 核心样式 (CSS 3D, 动画, 响应式)
├── script.js           # 核心逻辑 (3D 引擎, 交互, 多语言)
├── photos.js           # 照片元数据
├── cq_weather_2025.js  # 天气数据源
├── icons/              # 网页图标资源
├── assets/             # 静态资源 (视频, 模型)
└── images/             
    ├── gallery-thumb/  # 自动生成的高性能缩略图
    └── gallery/        # 原图/大图资源
```

## 🚀 快速开始

1. **克隆仓库**
   ```bash
   git clone https://github.com/YOUR_USERNAME/memory-2025.git
   cd memory-2025
   ```

2. **启动预览**
   由于使用了 ES Modules 和 CORS 限制，请使用 HTTP 服务器运行：
   ```bash
   # Python
   python3 -m http.server 8000
   
   # Node.js (推荐)
   npx serve .
   ```

3. **访问**
   打开浏览器访问 `http://localhost:8000`

## 🎮 交互指南

- **滚动（鼠标/触控）**：控制时间流动，向前或向后穿梭。
- **点击照片**：暂停时间，进入详情模式，查看当时的天气、温度和专属诗句。
- **语言切换**：点击右上角浮窗切换 中文/English。
- **开发者彩蛋**：按 `F12` 打开控制台查看隐藏信息。

## 📊 关于数据

- **时间跨度**: 2025.01.01 - 2025.12.31
- **照片收录**: 340 张（遗失 25 张）
- **总容量**: ~1.2 GB (原图) / ~600 KB (Web素材)

## 📄 License

## 📄 License & 版权声明

本项目采用复合开源协议：

1.  **代码 (Code)**: [MIT License](LICENSE) - 完全开源，可免费用于学习和商业项目。
2.  **个人自拍 (Self-portraits)**: 允许自由使用。
3.  **摄影作品 (Gallery Photos)**: ⚠️ **保留所有权利 (All Rights Reserved)**
    - 项目中 `images/gallery` 目录下的所有风景/人文摄影作品均为作者在 **500px** 发布的版权作品。
    - **严禁**任何形式的复制、转载、修改或商业使用。
    - 这些照片仅作为本项目效果演示，请勿提取使用。

## 🏷️ Tags

#3D #WebDevelopment #Photography #500px #CSS3D #Interactive #Memory #2025 #Experience

---
Made with ❤️ by Pete Hsu in 2025
