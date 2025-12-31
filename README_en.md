# Memory 2025 | Memory Space

> "Life is not just about the code in front of you, but also about poetry and faraway & photos."

Using 340+ photos to build a traversable 3D memory universe. Fly freely through the river of time from the beginning to the end of 2025.

![Preview](preview.png)

## ✨ Core Features

### 🌌 Immersive Experience
- **3D Spiral Spacetime**: Photos are arranged in chronological order to form a 3D spiral tunnel, shuttling through time by scrolling.
- **Dynamic Parallax**: Utilizing CSS3D Transform to achieve realistic depth of field and parallax effects.
- **Particle Atmosphere**: Dynamic floating particles in the background that change with the season and atmosphere.

### 🎬 Cinematic Finale
- **Seamless Multi-Stage Reveal**: Smooth transition experience from Video -> Text -> Statistics Panel.
- **Interactive Photo Wall**: The ending presents a dynamic, seamless scrolling bidirectional photo waterfall with a mouse spotlight effect.
- **3D Floating Card**: The statistics panel supports a 3D tilt interaction that follows the mouse.

### 🤖 Intelligent Perception
- **Smart Copywriting Generation**: Automatically matches poetic short sentences based on the weather, temperature, and tone of the photos.
- **Internationalization (i18n)**: Full Chinese and English support, automatically detecting browser language, with support for one-click switching.
- **Deep Data Statistics**: Automatically calculates the number of photos for the whole year, total size, and the "distance" traveled.

### ⚡ Extreme Performance
- **Smart Lazy Loading**: Dynamic loading mechanism based on 3D distance, loading only resources near the viewport.
- **Background Preloading**: Utilizes idle time to preload large images and resources to ensure a smooth experience.
- **Thumbnail Optimization**: Automatically generated ultra-lightweight thumbnails for second-level loading.

## 🛠️ Tech Stack

- **Core**: Pure HTML5 + CSS3 + JavaScript (ES6+), no third-party framework dependencies.
- **3D Engine**: Native CSS 3D Transforms (`transform-style: preserve-3d`).
- **Data**: Automated CSV/JSON data stream processing.
- **Design**: Minimalist design, Glassmorphism UI style.

## 📁 Project Structure

```
memory-2025/
├── index.html          # Entry file (structure & i18n)
├── style.css           # Core styles (CSS 3D, Animation, Responsive)
├── script.js           # Core logic (3D Engine, Interaction, Multi-language)
├── photos.js           # Photo metadata
├── cq_weather_2025.js  # Weather data source
├── icons/              # Web icon resources
├── assets/             # Static resources (Video, Models)
└── images/             
    ├── gallery-thumb/  # Automatically generated high-performance thumbnails
    └── gallery/        # Original/Large image resources
```

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/petenull/memory-2025.git
   cd memory-2025
   ```

2. **Start Preview**
   Due to ES Modules and CORS restrictions, please run using an HTTP server:
   ```bash
   # Python
   python3 -m http.server 8000
   
   # Node.js (Recommended)
   npx serve .
   ```

3. **Visit**
   Open your browser and visit `http://localhost:8000`

## 🎮 Interaction Guide

- **Scroll (Mouse/Touch)**: Control the flow of time, shuttle forward or backward.
- **Click Photo**: Pause time, enter detail mode, view the weather, temperature, and exclusive poetry of that moment.
- **Language Switch**: Click the floating window in the upper right corner to switch between Chinese/English.
- **Developer Easter Egg**: Press `F12` to open the console and view hidden information.

## 📊 About Data

- **Time Span**: 2025.01.01 - 2025.12.31
- **Photos Included**: 340 (25 lost)
- **Total Capacity**: ~1.2 GB (Originals) / ~600 KB (Web Assets)

## 📄 License

## 📄 License & Copyright

This project uses a composite license:

1.  **Code**: [MIT License](LICENSE) - Fully open source, free for educational and commercial use.
2.  **Self-portraits**: Free to use.
3.  **Gallery Photos**: ⚠️ **All Rights Reserved**
    - All landscape/humanities photos in the `images/gallery` directory are copyrighted works published by the author on **500px**.
    - **Strictly Prohibited**: Any form of copying, reposting, modification, or commercial use.
    - These photos are for demonstration purposes only within this project.

## 🏷️ Tags

#3D #WebDevelopment #Photography #500px #CSS3D #Interactive #Memory #2025 #Experience

---
Made with ❤️ by Pete Hsu in 2025
