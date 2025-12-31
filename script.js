// 🎨 Memory 2025 - 记忆空间
// 一个关于时间、照片和回忆的 3D 体验

// 禁用右键菜单
document.addEventListener('contextmenu', (e) => e.preventDefault());

// 控制台彩蛋将在语言检测后输出（见下方 printConsoleEasterEgg 函数）

// ====== i18n 多语言配置 ======
const I18N = {
    zh: {
        months: ['一月', '二月', '三月', '四月', '五月', '六月',
            '七月', '八月', '九月', '十月', '十一月', '十二月'],
        loading: '正在加载记忆...',
        scrollHint: '向下滚动开始探索',
        year: '2025',
        videoTitle: '「我25年最后一段视频」',
        goodbye: '「再见👋，2025！」',
        scrollContinue: '继续滚动 ↓',
        statsTitle: '2025',
        statsSubtitle: '这就是我的 2025',
        statsFormat: (bytes, photos, pages) =>
            `我 <span class="stat-number" id="statBytes">${bytes}</span> bytes、<span class="stat-number" id="statPhotos">${photos}</span> 张、<span class="stat-number" id="statPages">${pages}</span> 页的 2025`,
        poetry: `生命总是有遗憾的<br>就像缺少的 25 张照片<br>时间带走了一些瞬间，却留下了回忆的余温<br><span class="dim">那些未存留下来的空白，也是生活最真实的一部分</span>`,
        restartBtn: '重新开始',
        consoleHello: '👋 你好，好奇的开发者！',
        consoleDesc: '🎬 这是 Memory 2025 - 一个用来记录和展示 2025 年美好时刻的 3D 照片空间。',
        consoleTech: '🛠️ 技术栈: 纯 HTML + CSS + JavaScript (无框架)',
        consolePhotos: '📸 照片: 340 张精选记忆',
        consoleEffects: '🎨 特效: 3D 透视、螺旋布局、瀑布流、粒子动画',
        consoleQuote: '✨ "生活不止眼前的代码，还有诗和远方的照片。"',
        consoleMade: '💝 Made with ❤️ in 2025',
        langBtn: 'EN'
    },
    en: {
        months: ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'],
        loading: 'Loading memories...',
        scrollHint: 'Scroll down to explore',
        year: '2025',
        videoTitle: '「My Last Video of 2025」',
        goodbye: '「Goodbye 👋, 2025!」',
        scrollContinue: 'Keep Scrolling ↓',
        statsTitle: '2025',
        statsSubtitle: 'This is my 2025',
        statsFormat: (bytes, photos, pages) =>
            `My 2025 in <span class="stat-number" id="statBytes">${bytes}</span> bytes, <span class="stat-number" id="statPhotos">${photos}</span> photos, <span class="stat-number" id="statPages">${pages}</span> pages`,
        poetry: `Life always has regrets<br>Like the 25 missing photos<br>Time takes away some moments, but leaves the warmth of memories<br><span class="dim">Those empty spaces left behind are also the most real part of life</span>`,
        restartBtn: 'Start Over',
        consoleHello: '👋 Hello, curious developer!',
        consoleDesc: '🎬 This is Memory 2025 - a 3D photo space to record and showcase beautiful moments of 2025.',
        consoleTech: '🛠️ Tech Stack: Pure HTML + CSS + JavaScript (No frameworks)',
        consolePhotos: '📸 Photos: 340 selected memories',
        consoleEffects: '🎨 Effects: 3D perspective, spiral layout, waterfall, particle animations',
        consoleQuote: '✨ "Life is not just about code, but also about photos of poetry and faraway places."',
        consoleMade: '💝 Made with ❤️ in 2025',
        langBtn: '中文',
        // 照片详情
        detailWeather: 'Weather',
        detailTemp: 'Temperature',
        detailHumidity: 'Humidity',
        detailSize: 'File Size',
        detailOther: 'Other',
        tempUnit: '°C',
        humidityUnit: '%'
    }
};

// 给中文版也添加照片详情
I18N.zh.detailWeather = '天气';
I18N.zh.detailTemp = '温度';
I18N.zh.detailHumidity = '湿度';
I18N.zh.detailSize = '文件大小';
I18N.zh.detailOther = '其他';
I18N.zh.tempUnit = '°C';
I18N.zh.humidityUnit = '%';

// 获取当前语言（优先从 URL 参数，其次从浏览器，默认中文）
function getCurrentLang() {
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    if (urlLang && I18N[urlLang]) return urlLang;

    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('zh')) return 'zh';
    return 'en';
}

let currentLang = getCurrentLang();
const t = () => I18N[currentLang]; // 获取当前语言的翻译

// 应用翻译到 DOM
function applyTranslations() {
    const lang = t();

    // 更新语言按钮
    const langBtn = document.getElementById('langBtn');
    if (langBtn) langBtn.textContent = lang.langBtn;

    // 更新滚动提示
    const scrollHintText = document.querySelector('[data-i18n-key="scrollHint"]');
    if (scrollHintText) scrollHintText.textContent = lang.scrollHint;

    // 更新统计面板
    const statsSubtitle = document.querySelector('[data-i18n-key="statsSubtitle"]');
    if (statsSubtitle) statsSubtitle.textContent = lang.statsSubtitle;

    const mainStat = document.querySelector('[data-i18n-key="mainStat"]');
    if (mainStat) mainStat.innerHTML = lang.statsFormat(0, 0, 0);

    const poetry = document.querySelector('[data-i18n-key="poetry"]');
    if (poetry) poetry.innerHTML = lang.poetry;

    const restartBtn = document.querySelector('[data-i18n-key="restartBtn"]');
    if (restartBtn) restartBtn.textContent = lang.restartBtn;

    // 照片详情面板
    const detailWeatherLabel = document.querySelector('[data-i18n-key="detailWeather"]');
    if (detailWeatherLabel) detailWeatherLabel.textContent = lang.detailWeather;

    const detailTempLabel = document.querySelector('[data-i18n-key="detailTemp"]');
    if (detailTempLabel) detailTempLabel.textContent = lang.detailTemp;

    const detailColorLabel = document.querySelector('[data-i18n-key="detailColor"]');
    if (detailColorLabel) detailColorLabel.textContent = currentLang === 'zh' ? '主色调' : 'Colors';
}

// 切换语言
function switchLanguage() {
    currentLang = currentLang === 'zh' ? 'en' : 'zh';
    applyTranslations();

    // 更新 URL 参数（不刷新页面）
    const url = new URL(window.location);
    url.searchParams.set('lang', currentLang);
    window.history.replaceState({}, '', url);
}

// 控制台彩蛋 - 多语言版
function printConsoleEasterEgg() {
    const lang = t();
    console.log(`
%c ███╗   ███╗███████╗███╗   ███╗ ██████╗ ██████╗ ██╗   ██╗
%c ████╗ ████║██╔════╝████╗ ████║██╔═══██╗██╔══██╗╚██╗ ██╔╝
%c ██╔████╔██║█████╗  ██╔████╔██║██║   ██║██████╔╝ ╚████╔╝ 
%c ██║╚██╔╝██║██╔══╝  ██║╚██╔╝██║██║   ██║██╔══██╗  ╚██╔╝  
%c ██║ ╚═╝ ██║███████╗██║ ╚═╝ ██║╚██████╔╝██║  ██║   ██║   
%c ╚═╝     ╚═╝╚══════╝╚═╝     ╚═╝ ╚═════╝ ╚═╝  ╚═╝   ╚═╝   
%c                    2 0 2 5                              
`,
        'color: #ff6b6b', 'color: #feca57', 'color: #48dbfb',
        'color: #1dd1a1', 'color: #5f27cd', 'color: #ff9ff3', 'color: #54a0ff'
    );

    console.log(
        `%c${lang.consoleHello}

%c${lang.consoleDesc}

%c${lang.consoleTech}
%c${lang.consolePhotos}
%c${lang.consoleEffects}

%c${lang.consoleQuote}

%c${lang.consoleMade}
`,
        'font-size: 16px; font-weight: bold;',
        'color: #888; font-size: 12px;',
        'color: #4CAF50;', 'color: #2196F3;', 'color: #9C27B0;',
        'color: #FF9800; font-style: italic;',
        'color: #E91E63; font-weight: bold;'
    );
}

// 初始化语言按钮事件
document.addEventListener('DOMContentLoaded', () => {
    const langBtn = document.getElementById('langBtn');
    if (langBtn) {
        langBtn.addEventListener('click', switchLanguage);
    }
    applyTranslations();
    printConsoleEasterEgg(); // 输出控制台彩蛋
});

const CONFIG = {
    PHOTO_WIDTH: 140,
    WIDTH_VARIANCE: 60,
    SCATTER_X: 1000,
    SCATTER_Y: 700,
    DEPTH_PER_PHOTO: 120,
    CAMERA_START: 1500,
    ROTATION: 18,
    SCROLL_MULTIPLIER: 0.5,
    get MONTHS() { return t().months; } // 动态获取月份
};

const POETRY_DB = {
    zh: {
        default: [
            "时光的切片，定格了此刻的温度。",
            "这一刻的光影，是记忆最温柔的注脚。",
            "看似平凡的瞬间，回望时却熠熠生辉。",
            "风经过的时候，留下了这张照片。",
            "记忆的缝隙里，藏着这天的故事。",
            "捕捉到了时间流逝的声音。",
            "生活是种律动，需用心去铭记。",
            "每一帧都是不可复制的独家记忆。",
            "时间是最好的滤镜，留下的都是珍贵。",
            "这一秒的定格，是给未来的礼物。",
            "日子在指尖流淌，照片替我们记住。",
            "平凡的一天，却藏着不平凡的温柔。",
            "生活的碎片，拼凑成完整的自己。",
            "镜头捕捉不到的，是当时的心情。",
            "时光荏苒，唯有影像铭记深情。",
            "那天的空气里，有什么在悄悄发芽。",
            "按下快门的瞬间，世界为你静止。",
            "回忆是一场永不落幕的电影。",
            "每张照片背后，都有一个未讲完的故事。",
            "岁月流转，情怀依旧。",
            "生活不止眼前的苟且，还有镜头里的诗和远方。",
            "时间会走，但这一刻永远停在这里。",
            "日常的温柔，最值得被记录。",
            "那些看似微不足道的日子，才是最珍贵的。",
            "生活的真谛，藏在每一个平凡的瞬间里。"
        ],
        rain: [
            "重庆的雨，总是带着一种湿润的诗意。",
            "雨通过窗户，在讲着城市的心事。",
            "听雨的时候，时间走得很慢。",
            "打湿的街道，倒映着城市的霓虹。",
            "雨天适合回忆，也适合新的开始。",
            "雨滴落在窗台，像是在弹奏一首老歌。",
            "山城的雨，洗净了城市的喧嚣。",
            "雨后的空气里，有泥土的芬芳。",
            "这场雨，像是天空在诉说心事。",
            "雨中漫步，找回遗失的浪漫。",
            "潮湿的空气里，弥漫着思念的味道。",
            "每一滴雨都是天空的诗行。",
            "雨天的重庆，像一幅淡墨山水画。",
            "雨声是最好的白噪音，让心安静下来。"
        ],
        sun: [
            "阳光正好，落在肩上是暖的。",
            "难得的晴天，把心情也晒得蓬松。",
            "光与影的交错，是此时最美的构图。",
            "被阳光偏爱的一天。",
            "阳光洒落，世界都变得温柔了。",
            "晴天是重庆送给我们的礼物。",
            "蓝天白云，是最简单的幸福。",
            "阳光穿透云层，照亮了整个城市。",
            "这样的好天气，适合记录美好。",
            "阳光明媚，万物可爱。",
            "光线恰到好处，一切都刚刚好。",
            "沐浴在阳光里，感受生命的美好。",
            "晴天让人相信，美好的事即将发生。",
            "阳光下的影子，是另一个自己。"
        ],
        fog: [
            "雾都的朦胧，让一切都变得温柔。",
            "在迷雾中穿行，寻找清晰的自己。",
            "云深不知处，只缘身在此山中。",
            "雾气氤氲，城市在呼吸。",
            "雾锁山城，如梦似幻。",
            "朦胧的美，需要耐心去欣赏。",
            "雾中的城市，像一首朦胧诗。",
            "当雾气散去，一切都会清晰。",
            "雾是大自然的神秘面纱。",
            "重庆的雾，是专属于这座城市的浪漫。"
        ],
        cloud: [
            "阴天也有阴天的美。",
            "云层厚重，像是天空在沉思。",
            "灰色的天空，适合安静地思考。",
            "多云的日子，心情也变得柔和。",
            "云卷云舒，岁月静好。",
            "天空是最大的画布，云是流动的艺术。",
            "阴晴不定的天气，像极了复杂的人生。",
            "乌云背后，总有阳光在等待。"
        ],
        hot: [
            "重庆的夏天，热情似火。",
            "汗水挥洒的日子，是青春的证明。",
            "火炉城市的温度，比不上心里的热情。",
            "这个温度，只有重庆做得到。",
            "炎炎夏日，时光慢慢流淌。"
        ],
        cold: [
            "冬日的暖阳，格外珍贵。",
            "寒风中的温暖，更让人珍惜。",
            "冷冷的天气，暖暖的心情。",
            "冬天来了，春天还会远吗？",
            "寒冷让我们更懂得相互温暖。"
        ]
    },
    en: {
        default: [
            "A slice of time, freezing the warmth of this moment.",
            "The light and shadow of this instant are memory's gentlest footnote.",
            "Seemingly ordinary moments shine brightly in retrospect.",
            "When the wind passed, it left this photo.",
            "In the cracks of memory, today's story is hidden.",
            "Captured the sound of time passing.",
            "Life is a rhythm, to be remembered with heart.",
            "Every frame is a unique memory that cannot be replicated.",
            "Time is the best filter, keeping what is precious.",
            "This frozen second is a gift to the future.",
            "Days flow through fingers, photos remember for us.",
            "An ordinary day hiding extraordinary tenderness.",
            "Fragments of life piecing together a complete self.",
            "What the lens can't capture is the mood of that time.",
            "Time flies, only images remember deep affection.",
            "In the air that day, something was quietly sprouting.",
            "The moment the shutter clicked, the world stood still for you.",
            "Memory is a movie that never ends.",
            "Behind every photo, there is an unfinished story.",
            "Years flow, but feelings remain.",
            "Life is not just about the present, but poetry and distance in the lens.",
            "Time moves on, but this moment stays here forever.",
            "Daily tenderness makes it worth recording.",
            "Those seemingly insignificant days are the most precious.",
            "The truth of life hides in every ordinary moment."
        ],
        rain: [
            "Chongqing's rain always carries a wet poetry.",
            "Rain through the window is telling the city's secrets.",
            "When listening to the rain, time moves slowly.",
            "Wet streets reflect the city's neon lights.",
            "Rainy days are for memories and new beginnings.",
            "Raindrops on the sill play an old song.",
            "Mountain city rain washes away the hustle and bustle.",
            "The air after rain holds the scent of earth.",
            "This rain is like the sky telling a story.",
            "Walking in the rain, finding lost romance.",
            "The humid air is filled with the scent of longing.",
            "Every raindrop is a line of the sky's poem.",
            "Rainy Chongqing is like a pale ink painting.",
            "Rain sound is the best white noise to calm the heart."
        ],
        sun: [
            "The sunlight is just right, warm on the shoulders.",
            "A rare sunny day makes the mood fluffy.",
            "Interplay of light and shadow, the most beautiful composition.",
            "A day favored by sunlight.",
            "Sunlight falls, making the world gentle.",
            "Sunny days are gifts from Chongqing to us.",
            "Blue sky and white clouds, simple happiness.",
            "Sunlight pierces clouds, illuminating the city.",
            "Such good weather is perfect for recording beauty.",
            "Bright sunshine, everything is lovely.",
            "The light is just right, everything is perfect.",
            "Bathed in sunshine, feeling the beauty of life.",
            "Sunny days make us believe good things are coming.",
            "The shadow under the sun is another self."
        ],
        fog: [
            "The haze of the Fog City makes everything gentle.",
            "Walking through the mist, finding a clear self.",
            "Clouds deep, only because we are in this mountain.",
            "Mist swirling, the city is breathing.",
            "Fog locks the mountain city, dreamlike and illusory.",
            "Hazy beauty requires patience to appreciate.",
            "The city in the fog is like a misty poem.",
            "When the fog lifts, everything becomes clear.",
            "Fog is nature's mysterious veil.",
            "Chongqing's fog is a romance exclusive to this city."
        ],
        cloud: [
            "Cloudy days have their own beauty.",
            "Heavy clouds, like the sky in deep thought.",
            "Gray skies for quiet thinking.",
            "Cloudy days make the mood soft.",
            "Clouds roll and relax, years are quiet and good.",
            "The sky is the biggest canvas, clouds are flowing art.",
            "Unpredictable weather is like complex life.",
            "Behind dark clouds, the sun is always waiting."
        ],
        hot: [
            "Chongqing's summer, passionate as fire.",
            "Days of sweating are proof of youth.",
            "The heat of the furnace city can't beat the passion in the heart.",
            "This temperature, only Chongqing can do it.",
            "Scorching summer, time flows slowly."
        ],
        cold: [
            "Warm sun in winter is especially precious.",
            "Warmth in the cold wind is cherished more.",
            "Cold weather, warm mood.",
            "Winter is here, can spring be far behind?",
            "Cold makes us understand mutual warmth better."
        ]
    }
};

const COLORS = ["雾都灰", "嘉陵蓝", "火锅红", "老街旧", "黄桷绿", "江水青", "夜雨黑", "晚霞紫"];

function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function getPoetry(weather, temp) {
    const db = POETRY_DB[currentLang];
    let pool = [...db.default];
    if (weather.includes('雨')) pool = pool.concat(db.rain);
    if (weather.includes('晴')) pool = pool.concat(db.sun);
    if (weather.includes('雾')) pool = pool.concat(db.fog);
    if (weather.includes('阴') || weather.includes('多云')) pool = pool.concat(db.cloud);

    // 根据温度添加热/冷相关诗句
    if (temp) {
        const highTemp = parseInt(temp.split(' - ')[1] || temp);
        if (highTemp >= 35) pool = pool.concat(db.hot);
        if (highTemp <= 10) pool = pool.concat(db.cold);
    }

    return getRandomItem(pool);
}



// 核心状态
let photoElements = [];
let loadedImages = new Set();
let totalDepth = 0;
let photoDepth = 0; // 照片部分的深度（不包含结尾序列）
let focusedIndex = -1;
let focusProgress = 0; // 0 (Gallery) -> 1 (Focused)
let isAnimatingFocus = false;
let mouseX = 0, mouseY = 0;

// 平滑滚动状态
let targetScroll = 0;
let currentScroll = 0;
const SCROLL_EASE = 0.08; // 缓动系数，越小越平滑

// DOM 元素
const world = document.getElementById('world');
const scrollSpace = document.getElementById('scrollSpace');
const loading = document.getElementById('loading');
const loadingBar = document.getElementById('loadingBar');
const scrollHint = document.getElementById('scrollHint');
const detailOverlay = document.getElementById('detailOverlay');

// Easing Functions
function easeInOutCubic(t) { return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1; }
function lerp(start, end, t) { return start * (1 - t) + end * t; }

function preventDefault(e) {
    e.preventDefault();
}

// 从图片提取主色调
function extractColors(img) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const size = 50; // 采样大小
    canvas.width = size;
    canvas.height = size;

    try {
        ctx.drawImage(img, 0, 0, size, size);
        const imageData = ctx.getImageData(0, 0, size, size).data;

        // 收集所有像素颜色
        const colors = [];
        for (let i = 0; i < imageData.length; i += 4) {
            const r = imageData[i];
            const g = imageData[i + 1];
            const b = imageData[i + 2];
            // 跳过太暗或太亮的像素
            const brightness = (r + g + b) / 3;
            if (brightness > 30 && brightness < 230) {
                colors.push([r, g, b]);
            }
        }

        if (colors.length < 10) {
            return ['#888888', '#666666', '#444444'];
        }

        // 简单的颜色聚类：按色相分组
        const buckets = {};
        colors.forEach(([r, g, b]) => {
            // 将颜色量化到更少的桶中
            const qr = Math.round(r / 32) * 32;
            const qg = Math.round(g / 32) * 32;
            const qb = Math.round(b / 32) * 32;
            const key = `${qr},${qg},${qb}`;
            if (!buckets[key]) {
                buckets[key] = { count: 0, r: 0, g: 0, b: 0 };
            }
            buckets[key].count++;
            buckets[key].r += r;
            buckets[key].g += g;
            buckets[key].b += b;
        });

        // 排序并取前3个最常见的颜色
        const sorted = Object.values(buckets)
            .sort((a, b) => b.count - a.count)
            .slice(0, 3);

        return sorted.map(bucket => {
            const r = Math.round(bucket.r / bucket.count);
            const g = Math.round(bucket.g / bucket.count);
            const b = Math.round(bucket.b / bucket.count);
            return `rgb(${r}, ${g}, ${b})`;
        });
    } catch (e) {
        // console.warn('Color extraction failed (likely CORS). Using random colors.');
        // 本地调试时的 fallback：返回一组随机柔和颜色
        const randomColor = () => Math.floor(Math.random() * 150 + 50);
        return [
            `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`,
            `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`,
            `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`
        ];
    }
}

// 显示详情（真·移动模式 + 左右布局）
function showDetail(photo, clickedElement, index) {
    if (isAnimatingFocus) return;

    // 如果已经在查看某张照片，切换到新照片
    if (focusedIndex !== -1 && focusedIndex !== index) {
        // 先关闭当前照片（快速），然后打开新照片
        const oldIndex = focusedIndex;
        focusedIndex = -1;
        focusProgress = 0;
        detailOverlay.classList.remove('active');

        // 短暂延迟后打开新照片
        setTimeout(() => {
            showDetailInternal(photo, clickedElement, index);
        }, 100);
        return;
    }

    showDetailInternal(photo, clickedElement, index);
}

function showDetailInternal(photo, clickedElement, index) {
    if (isAnimatingFocus) return;

    // 1. 准备数据
    const dateStr = photo.date;
    const cleanDate = dateStr.replace(/\./g, '');
    let weatherInfo = { w: "多云", t: "15°C - 20°C" };
    if (typeof WEATHER_DB !== 'undefined' && WEATHER_DB[cleanDate]) {
        weatherInfo = WEATHER_DB[cleanDate];
    } else {
        const month = parseInt(cleanDate.substring(4, 6));
        weatherInfo = { w: "多云", t: "18°C" };
    }

    document.getElementById('detailDate').textContent = photo.date;
    document.getElementById('detailWeather').textContent = weatherInfo.w;
    document.getElementById('detailTemp').textContent = weatherInfo.t.split(' - ')[1] || weatherInfo.t;
    document.getElementById('detailPoetry').textContent = getPoetry(weatherInfo.w, weatherInfo.t);

    // 提取照片颜色并更新颜色点
    const photoImg = clickedElement.querySelector('img');
    const colorContainer = document.getElementById('detailColor');
    if (photoImg && photoImg.complete && colorContainer) {
        const colors = extractColors(photoImg);
        const dots = colorContainer.querySelectorAll('.color-dot');
        colors.forEach((color, i) => {
            if (dots[i]) dots[i].style.background = color;
        });
    }

    document.getElementById('detailPhotoStage').innerHTML = '';

    // 2. 布局逻辑 - 信息卡片固定在屏幕垂直中心
    const detailCard = document.querySelector('.detail-glass-card');
    const isMobile = window.innerWidth < 768;
    const cardComp = photoElements[index];
    const origX = parseFloat(cardComp.dataset.origX);

    if (detailCard) {
        // 清除之前的样式
        detailCard.style.left = '';
        detailCard.style.right = '';
        detailCard.style.top = '50%';
        detailCard.style.transform = 'translateY(-50%)';

        if (!isMobile) {
            if (origX > 0) {
                // 照片在右边，信息卡片在左边
                detailCard.style.right = 'auto';
                detailCard.style.left = '8%';
            } else {
                // 照片在左边，信息卡片在右边
                detailCard.style.left = 'auto';
                detailCard.style.right = '8%';
            }
        }
    }

    // 3. 锁定状态
    focusedIndex = index;
    isAnimatingFocus = true;

    // 4. 计算目标位置
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const photoBaseZ = -CONFIG.CAMERA_START - (index * CONFIG.DEPTH_PER_PHOTO);
    const targetEffectiveZ = 500;
    const targetCameraZ = targetEffectiveZ - photoBaseZ;
    const targetProgress = targetCameraZ / totalDepth;
    let targetScrollY = targetProgress * maxScroll;
    targetScrollY = Math.max(0, Math.min(maxScroll, targetScrollY));

    // 5. 动画循环
    const startScrollY = window.scrollY;
    const startTime = performance.now();
    const duration = 1200;

    window.addEventListener('wheel', preventDefault, { passive: false });
    window.addEventListener('touchmove', preventDefault, { passive: false });

    function step(now) {
        const elapsed = now - startTime;
        let p = Math.min(elapsed / duration, 1);
        const easeP = easeInOutCubic(p);

        focusProgress = easeP;

        const currentScroll = startScrollY + (targetScrollY - startScrollY) * easeP;
        window.scrollTo(0, currentScroll);

        if (p < 1) {
            requestAnimationFrame(step);
        } else {
            isAnimatingFocus = false;

            // 动画完成后，获取照片的实际屏幕位置，让信息卡片对齐
            const focusedCard = photoElements[index];
            const detailCard = document.querySelector('.detail-glass-card');
            if (focusedCard && detailCard) {
                const rect = focusedCard.getBoundingClientRect();
                const photoScreenCenterY = rect.top + rect.height / 2;

                // 禁用过渡以立即定位
                detailCard.style.transition = 'none';
                detailCard.style.top = `${photoScreenCenterY}px`;
                detailCard.style.transform = 'translateY(-50%)';

                // 强制重排后恢复过渡
                detailCard.offsetHeight; // 触发重排
                detailCard.style.transition = '';
            }

            detailOverlay.classList.add('active');
        }
    }
    requestAnimationFrame(step);
}

function closeDetail() {
    detailOverlay.classList.remove('active');

    if (focusedIndex === -1) return;

    isAnimatingFocus = true;
    const startTime = performance.now();
    const duration = 800;

    function step(now) {
        const elapsed = now - startTime;
        let p = Math.min(elapsed / duration, 1);
        const easeP = easeInOutCubic(p);

        focusProgress = 1 - easeP;

        if (p < 1) {
            requestAnimationFrame(step);
        } else {
            isAnimatingFocus = false;
            focusedIndex = -1;
            focusProgress = 0;
            window.removeEventListener('wheel', preventDefault);
            window.removeEventListener('touchmove', preventDefault);

            // 重置信息卡片样式
            const detailCard = document.querySelector('.detail-glass-card');
            if (detailCard) {
                detailCard.style.top = '';
                detailCard.style.transform = '';
            }
        }
    }
    requestAnimationFrame(step);
}

// 全局点击处理：点击照片切换，点击其他地方关闭
document.addEventListener('click', (e) => {
    if (focusedIndex === -1) return; // 没有正在查看照片

    // 检查是否点击了照片卡片（照片卡片的 onclick 已经有 stopPropagation）
    // 如果事件冒泡到这里，说明没有点击照片

    // 检查是否点击了信息卡片
    const detailCard = document.querySelector('.detail-glass-card');
    if (detailCard && detailCard.contains(e.target)) {
        return; // 点击信息卡片，不关闭
    }

    // 点击了其他地方，关闭详情视图
    closeDetail();
});

let gridCanvas, gridCtx;

function initGridCanvas() {
    gridCanvas = document.getElementById('gridCanvas');
    if (!gridCanvas) return;
    gridCtx = gridCanvas.getContext('2d');
    resizeGridCanvas();
    window.addEventListener('resize', resizeGridCanvas);
}

function resizeGridCanvas() {
    if (!gridCanvas) return;
    gridCanvas.width = window.innerWidth;
    gridCanvas.height = window.innerHeight;
}

const GRID_COLS = 25;
const GRID_ROWS = 18;

function getGridPoint(col, row, progress, w, h, time) {
    const cx = w / 2;
    const cy = h / 2;
    const flatX = (col / GRID_COLS) * w;
    const flatY = (row / GRID_ROWS) * h;
    const normalizedCol = (col / GRID_COLS) - 0.5;
    const normalizedRow = (row / GRID_ROWS) - 0.5;
    const distFromCenter = Math.sqrt(normalizedCol * normalizedCol + normalizedRow * normalizedRow);
    const perspectiveScale = Math.pow(distFromCenter * 2.5, 0.15);
    const perspX = cx + normalizedCol * w * perspectiveScale * 2.2;
    const perspY = cy + normalizedRow * h * perspectiveScale * 2.2;
    const easedProgress = progress * progress * (3 - 2 * progress);
    let x = perspX + (flatX - perspX) * easedProgress;
    let y = perspY + (flatY - perspY) * easedProgress;

    // 吸入效果强度随progress减弱（最后变平）
    const pullEffect = 1 - easedProgress;

    // 黑洞吸入效果 - 中心区域的点被拉向中心
    const dx = x - cx;
    const dy = y - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const blackHoleRadius = Math.min(w, h) * 0.2;

    if (dist < blackHoleRadius * 3 && dist > 0 && pullEffect > 0.1) {
        const t = Math.max(0, 1 - dist / (blackHoleRadius * 3));
        const pullStrength = Math.pow(t, 2) * 0.4 * pullEffect;

        const angle = Math.atan2(dy, dx);
        const spiralOffset = time ? Math.sin(angle * 2 + time * 0.3) * 4 * t * pullEffect : 0;

        const newDist = dist * (1 - pullStrength) + spiralOffset;
        x = cx + Math.cos(angle) * newDist;
        y = cy + Math.sin(angle) * newDist;
    }

    // 湍流效果 - 整个网格的波动感
    if (time && pullEffect > 0.05) {
        const turbulenceStrength = 3 * pullEffect;
        const turbX = Math.sin(normalizedCol * 5 + time * 0.8) * Math.cos(normalizedRow * 4 + time * 0.6);
        const turbY = Math.cos(normalizedCol * 4 + time * 0.7) * Math.sin(normalizedRow * 5 + time * 0.5);
        x += turbX * turbulenceStrength;
        y += turbY * turbulenceStrength;
    }

    return { x, y };
}

let gridTime = 0;

function drawGrid(progress) {
    if (!gridCtx) return;
    const w = gridCanvas.width;
    const h = gridCanvas.height;
    const cx = w / 2;
    const cy = h / 2;

    gridTime += 0.02;
    gridCtx.clearRect(0, 0, w, h);

    // 保持网格始终可见，不随聚焦隐藏
    gridCtx.globalAlpha = 1;
    gridCtx.strokeStyle = `rgba(150, 160, 190, 0.35)`;
    gridCtx.lineWidth = 1;

    // 绘制水平线
    for (let row = 0; row <= GRID_ROWS; row++) {
        gridCtx.beginPath();
        for (let col = 0; col <= GRID_COLS; col++) {
            const p = getGridPoint(col, row, progress, w, h, gridTime);
            if (col === 0) gridCtx.moveTo(p.x, p.y);
            else gridCtx.lineTo(p.x, p.y);
        }
        gridCtx.stroke();
    }

    // 绘制垂直线
    for (let col = 0; col <= GRID_COLS; col++) {
        gridCtx.beginPath();
        for (let row = 0; row <= GRID_ROWS; row++) {
            const p = getGridPoint(col, row, progress, w, h, gridTime);
            if (row === 0) gridCtx.moveTo(p.x, p.y);
            else gridCtx.lineTo(p.x, p.y);
        }
        gridCtx.stroke();
    }
    // 中心柔和光晕（非常淡，随progress消失）
    const easedProgress = progress * progress * (3 - 2 * progress);
    const glowStrength = (1 - easedProgress) * 0.06;

    if (glowStrength > 0.01) {
        const glowRadius = Math.min(w, h) * 0.18;
        const glowGradient = gridCtx.createRadialGradient(cx, cy, 0, cx, cy, glowRadius * 2.5);
        glowGradient.addColorStop(0, `rgba(200, 210, 240, ${glowStrength})`);
        glowGradient.addColorStop(0.4, `rgba(180, 190, 220, ${glowStrength * 0.4})`);
        glowGradient.addColorStop(1, 'transparent');
        gridCtx.fillStyle = glowGradient;
        gridCtx.beginPath();
        gridCtx.arc(cx, cy, glowRadius * 2.5, 0, Math.PI * 2);
        gridCtx.fill();
    }

    gridCtx.globalAlpha = 1;
}

function seededRandom(seed) {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

function createPhotoCard(photo, index) {
    const seed = index * 9973;
    const z = -CONFIG.CAMERA_START - (index * CONFIG.DEPTH_PER_PHOTO);
    const x = (seededRandom(seed + 1) - 0.5) * 2 * CONFIG.SCATTER_X;
    const y = (seededRandom(seed + 2) - 0.5) * 2 * CONFIG.SCATTER_Y;
    const distanceFactor = index / PHOTOS.length;
    const rotationMultiplier = 1 + distanceFactor * 2;
    const rx = (seededRandom(seed + 3) - 0.5) * 2 * CONFIG.ROTATION * rotationMultiplier;
    const ry = (seededRandom(seed + 4) - 0.5) * 2 * CONFIG.ROTATION * rotationMultiplier;
    const rz = (seededRandom(seed + 5) - 0.5) * 2 * CONFIG.ROTATION * rotationMultiplier;
    const width = CONFIG.PHOTO_WIDTH + (seededRandom(seed + 6) - 0.5) * CONFIG.WIDTH_VARIANCE;
    const floatDuration = 4 + seededRandom(seed + 7) * 4;
    const floatDelay = seededRandom(seed + 8) * 4;

    const card = document.createElement('div');
    card.className = 'photo-card';
    card.dataset.z = z;
    card.dataset.origX = x;
    card.dataset.origY = y;
    card.dataset.origRx = rx;
    card.dataset.origRy = ry;
    card.dataset.origRz = rz;
    card.dataset.src = photo.src;

    card.style.width = `${width}px`;
    card.style.setProperty('--float-duration', `${floatDuration}s`);
    card.style.setProperty('--float-delay', `${floatDelay}s`);

    card.onclick = (e) => {
        e.stopPropagation(); // 阻止事件冒泡到 overlay
        showDetail(photo, e.currentTarget, index);
    };

    const placeholder = document.createElement('div');
    placeholder.style.cssText = `
        width: 100%;
        padding-bottom: 75%;
        background: linear-gradient(135deg, rgba(240,240,245,0.8), rgba(230,230,235,0.6));
        border-radius: 3px;
        backdrop-filter: blur(2px);
    `;
    card.appendChild(placeholder);

    const label = document.createElement('div');
    label.className = 'date-label';
    label.textContent = photo.date;
    card.appendChild(label);

    return card;
}

function loadImage(card) {
    if (loadedImages.has(card)) return;
    loadedImages.add(card);
    const img = new Image();
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.8s ease-in-out';
    img.onload = () => {
        const placeholder = card.querySelector('div');
        if (placeholder) {
            card.replaceChild(img, placeholder);
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    img.style.opacity = '1';
                });
            });
        }
    };
    img.src = card.dataset.src;
}

function updateScene() {
    // 滚动锁定逻辑：播放转场时禁止页面滚动
    if (window.isScrollLocked && window.lockedScrollY !== undefined) {
        window.scrollTo(0, window.lockedScrollY);
        currentScroll = window.lockedScrollY;
        targetScroll = window.lockedScrollY;
    }

    // 平滑滚动：目标是实际滚动位置，当前值缓慢追赶
    targetScroll = window.scrollY;
    currentScroll += (targetScroll - currentScroll) * SCROLL_EASE;

    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const progress = Math.min(1, currentScroll / maxScroll);
    const cameraZ = progress * totalDepth;

    // 当有聚焦照片时，冻结螺旋旋转，保持照片水平
    // 螺旋旋转逻辑
    let spiralZ = progress * 45; // 降低一点总旋转量

    // 结尾摆正：在最后阶段让世界旋转归零，确保视频和文字是水平的
    const straightenThreshold = 0.6;
    if (progress > straightenThreshold) {
        const endP = (progress - straightenThreshold) / (1 - straightenThreshold);
        const ease = endP * endP * (3 - 2 * endP); // 平滑过渡
        // 从当前的旋转角度插值回 0
        const maxRot = straightenThreshold * 45;
        spiralZ = maxRot * (1 - ease);
    }

    // 调试用的手动旋转修正
    if (window.debugRotationOffset) {
        spiralZ += parseFloat(window.debugRotationOffset);
    }
    // 固化修正
    if (window.finalRotationOffset) {
        spiralZ += parseFloat(window.finalRotationOffset);
    }

    if (focusedIndex !== -1) {
        // 聚焦时不再旋转世界，保持照片水平
        spiralZ = lerp(spiralZ, 0, focusProgress);
    }

    world.style.transform = `translateZ(${cameraZ}px) rotateZ(${spiralZ}deg)`;
    drawGrid(progress);

    // --- 硬核距离检测触发器 start ---
    if (window.endVideoZ !== undefined && window.endVideoElement) {
        // effectiveZ = worldZ + cameraZ
        const distToVideo = window.endVideoZ + cameraZ;

        // 当距离在 -1500px 到 100px 之间 (推迟播放时机，更靠近才播)
        if (distToVideo > -1500 && distToVideo < 100 && !window.hasTriggeredEndPlayback) {
            window.hasTriggeredEndPlayback = true;

            // 1. 锁定滚动
            window.isScrollLocked = true;
            window.lockedScrollY = window.scrollY; // 锁死
            document.body.style.overflow = 'hidden';

            // 2. 播放视频
            console.log('🚀 Distance Trigger: Playing video at dist', distToVideo);
            window.endVideoElement.play().catch(e => {
                console.warn('Playback failed:', e);
                // 失败则不卡死用户
                window.isScrollLocked = false;
                document.body.style.overflow = '';
            });
        }

        // 重置逻辑：当用户往回滚，远离视频一定距离后 (-3000px)，重置状态
        // 这样下次再滚下来时可以重新触发动画
        if (distToVideo < -3000 && window.hasTriggeredEndPlayback) {
            console.log('Resetting video sequence...');
            window.hasTriggeredEndPlayback = false;
            window.isScrollLocked = false;
            document.body.style.overflow = '';

            // 重置视频
            if (window.endVideoElement) {
                window.endVideoElement.pause();
                window.endVideoElement.currentTime = 0;
            }

            // 重置视觉
            if (window.endVideoContainer) {
                window.endVideoContainer.classList.remove('expanded');
                window.endVideoContainer.style.transform = `translate3d(-50%, -50%, ${window.endVideoZ}px)`;
            }
            // 重置背景
            document.body.classList.remove('dark-mode');
            // 重置文字
            if (window.endTextPhase1) window.endTextPhase1.style.opacity = '0';
            if (window.endTextPhase2) {
                window.endTextPhase2.style.opacity = '0';
                // 重置挥手动画
                const waveEmoji = window.endTextPhase2.querySelector('.wave-emoji');
                if (waveEmoji) {
                    waveEmoji.dataset.animating = '';
                    waveEmoji.style.animation = '';
                }
            }
            window.expandedCameraZ = undefined; // 清除记录
        }

        // 退出黑夜模式逻辑 + 显示统计面板
        if (window.statsZ !== undefined) {
            const distToStats = window.statsZ + cameraZ;
            // 距离统计面板小于 1500px 时，恢复白底并显示统计面板
            if (distToStats > -1500) {
                if (document.body.classList.contains('dark-mode')) {
                    document.body.classList.remove('dark-mode');
                }
                // 显示统计面板
                if (window.endStatsPanel && window.endStatsPanel.style.opacity !== '1') {
                    window.endStatsPanel.style.opacity = '1';
                    window.endStatsPanel.style.visibility = 'visible';
                    window.endStatsPanel.style.pointerEvents = 'auto';
                    // 触发数字动画
                    const statPhotos = window.endStatsPanel.querySelector('#statPhotos');
                    const statBytes = window.endStatsPanel.querySelector('#statBytes');
                    const statPages = window.endStatsPanel.querySelector('#statPages');
                    if (statPhotos) { statPhotos.textContent = '0'; animateCounter(statPhotos, 340, 2000); }
                    if (statBytes) { statBytes.textContent = '0'; animateCounter(statBytes, 1257310532, 2500, false, true); }
                    if (statPages) { statPages.textContent = '0'; animateCounter(statPages, 84, 2000); }
                }
            } else {
                // 隐藏统计面板
                if (window.endStatsPanel && window.endStatsPanel.style.opacity !== '0') {
                    window.endStatsPanel.style.opacity = '0';
                    window.endStatsPanel.style.visibility = 'hidden';
                    window.endStatsPanel.style.pointerEvents = 'none';
                }
            }
        }

        // 视频容器内文字切换逻辑
        // 只有当视频已经完成转场（变黑）后，才显示和切换文字
        if (window.endVideoZ !== undefined && window.endTextPhase1 && window.endTextPhase2 && window.endVideoContainer) {
            // 先确认视频容器已经进入 expanded 状态
            if (window.endVideoContainer.classList.contains('expanded')) {
                // 记录第一次 expanded 时的 cameraZ
                if (window.expandedCameraZ === undefined) {
                    window.expandedCameraZ = cameraZ;
                }

                // 计算相对于 expanded 时刻的滚动距离
                const scrollSinceExpand = cameraZ - window.expandedCameraZ;

                if (scrollSinceExpand > 200) {
                    // 滚动超过200px，切换到 phase2
                    window.endTextPhase1.style.opacity = '0';
                    window.endTextPhase2.style.opacity = '1';
                    // 自动播放挥手动画
                    const waveEmoji = window.endTextPhase2.querySelector('.wave-emoji');
                    if (waveEmoji && !waveEmoji.dataset.animating) {
                        waveEmoji.dataset.animating = 'true';
                        waveEmoji.style.animation = 'wave 1s ease-in-out 3'; // 播放3次
                        waveEmoji.style.transformOrigin = '70% 70%';
                    }
                } else {
                    // 初始状态，显示 phase1
                    window.endTextPhase1.style.opacity = '1';
                    window.endTextPhase2.style.opacity = '0';
                }
            }
        }
    }
    // --- 硬核距离检测触发器 end ---

    // Orbs Animation
    const orb1 = document.getElementById('orb1');
    const orb2 = document.getElementById('orb2');
    const orb3 = document.getElementById('orb3');
    if (orb1 && orb2 && orb3) {
        const p = progress;
        orb1.style.transform = `translate(${Math.sin(p * Math.PI * 2) * 100}px, ${Math.cos(p * Math.PI * 3) * 80}px)`;
        orb2.style.transform = `translate(${Math.cos(p * 2.5 * Math.PI) * 120}px, ${Math.sin(p * 2 * Math.PI) * 100}px)`;
        orb3.style.transform = `translate(${Math.sin(p * 3 * Math.PI) * 80}px, ${Math.cos(p * 2.5 * Math.PI) * 60}px)`;
    }

    progressFill.style.width = `${progress * 100}%`;
    // 月份计算只基于照片部分的进度
    const photoProgress = Math.min(1, cameraZ / photoDepth);
    const monthIndex = Math.min(11, Math.floor(photoProgress * 12));
    dateIndicator.querySelector('.month').textContent = CONFIG.MONTHS[monthIndex];

    // 照片结束后隐藏月份指示器
    if (photoProgress >= 0.98) {
        dateIndicator.classList.remove('visible');
    } else if (progress > 0.01) {
        scrollHint.style.opacity = '0';
        dateIndicator.classList.add('visible');
    } else {
        scrollHint.style.opacity = '1';
        dateIndicator.classList.remove('visible');
    }


    photoElements.forEach((card, i) => {
        const photoZ = parseFloat(card.dataset.z);
        const effectiveZ = photoZ + cameraZ;

        if (effectiveZ > -8000 && effectiveZ < 1500) loadImage(card);

        // Nudge Calculation
        let nudgeX = 0, nudgeY = 0;
        const isVisible = effectiveZ > -10000 && effectiveZ < 2000;

        if (focusedIndex === -1 && isVisible) {
            const rect = card.getBoundingClientRect();
            const cardCenterX = rect.left + rect.width / 2;
            const cardCenterY = rect.top + rect.height / 2;
            const dx = mouseX - cardCenterX;
            const dy = mouseY - cardCenterY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 200 && dist > 0) {
                const force = (200 - dist) / 200;
                nudgeX = -(dx / dist) * force * 15;
                nudgeY = -(dy / dist) * force * 15;
            }
        }

        let opacity = 0;
        if (effectiveZ > -9000) {
            opacity = (effectiveZ < -5000) ? (effectiveZ + 9000) / 4000 : 1;
        }

        // 不再隐藏其他照片，保持背景可见
        if (focusedIndex !== -1 && i === focusedIndex) {
            opacity = 1; // 聚焦照片保持完全可见
        }

        const img = card.querySelector('img');
        if (img && img.style.opacity === '0') {
            // loading
        } else {
            card.style.opacity = Math.max(0, Math.min(1, opacity));
        }
        card.style.visibility = (isVisible && opacity > 0.01) ? 'visible' : 'hidden';

        const origX = parseFloat(card.dataset.origX);
        const origY = parseFloat(card.dataset.origY);
        const origRx = parseFloat(card.dataset.origRx);
        const origRy = parseFloat(card.dataset.origRy);
        const origRz = parseFloat(card.dataset.origRz);

        if (i === focusedIndex && focusProgress > 0) {
            const isMobile = window.innerWidth < 768;
            const targetScale = isMobile ? 1.8 : 2.2;

            // 目标位置：X方向偏移，Y方向向上偏移以补偿透视
            let targetX = 0;
            if (!isMobile) {
                targetX = (origX > 0) ? 280 : -280;
            }
            const targetY = -120; // 负值让照片向上移动到屏幕中心

            const currX = lerp(origX, targetX, focusProgress);
            const currY = lerp(origY, targetY, focusProgress);
            const currRx = lerp(origRx, 0, focusProgress);
            const currRy = lerp(origRy, 0, focusProgress);
            const currRz = lerp(origRz, 0, focusProgress);
            const scale = lerp(1, targetScale, focusProgress);

            card.style.zIndex = 2001;
            card.style.transition = 'opacity 0.8s ease';
            card.style.transform = `translate3d(${currX}px, ${currY}px, ${photoZ}px) 
                                    rotateX(${currRx}deg) rotateY(${currRy}deg) rotateZ(${currRz}deg) 
                                    scale(${scale})`;
            card.style.animation = 'none';
        } else {
            card.style.zIndex = '';
            card.style.transition = 'opacity 0.8s ease';
            card.style.transform = `translate3d(${origX + nudgeX}px, ${origY + nudgeY}px, ${photoZ}px) 
                                    rotateX(${origRx}deg) rotateY(${origRy}deg) rotateZ(${origRz}deg)`;
            if (card.style.animation === 'none') card.style.animation = '';
        }
    });

    requestAnimationFrame(updateScene);
}

// 随机生成网页图标
// 随机生成网页图标
function generateRandomFavicon() {
    if (typeof PHOTOS === 'undefined' || PHOTOS.length === 0) return;

    // 随机选择一张照片
    const randomIndex = Math.floor(Math.random() * PHOTOS.length);
    const randomPhoto = PHOTOS[randomIndex];

    // 移除旧的 favicon
    const existingFavicon = document.querySelector('link[rel="icon"]');
    if (existingFavicon) existingFavicon.remove();

    const link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/png';

    // 检测是否在本地文件系统运行
    if (window.location.protocol === 'file:') {
        // 本地模式：直接使用原图（方形），避免 CORS 错误
        link.href = randomPhoto.src;
        document.head.appendChild(link);
        return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
        try {
            // 创建 canvas 绘制圆形图标
            const canvas = document.createElement('canvas');
            const size = 64;
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext('2d');

            // 绘制圆形裁剪区域
            ctx.beginPath();
            ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
            ctx.closePath();
            ctx.clip();

            // 计算裁剪
            const aspectRatio = img.width / img.height;
            let sx, sy, sw, sh;
            if (aspectRatio > 1) {
                sh = img.height;
                sw = img.height;
                sx = (img.width - sw) / 2;
                sy = 0;
            } else {
                sw = img.width;
                sh = img.width;
                sx = 0;
                sy = (img.height - sh) / 2;
            }

            // 绘制图片
            ctx.drawImage(img, sx, sy, sw, sh, 0, 0, size, size);

            // 创建 favicon
            link.href = canvas.toDataURL('image/png');
            document.head.appendChild(link);
        } catch (e) {
            console.warn('Favicon generation failed (likely CORS), falling back to square image.');
            link.href = randomPhoto.src;
            document.head.appendChild(link);
        }
    };

    img.onerror = () => {
        link.href = randomPhoto.src;
        document.head.appendChild(link);
    };

    img.src = randomPhoto.src;
}

function createEndSequence() {
    // 基础深度：1500px 间距 (拉近距离，紧贴照片流)
    const startZ = -totalDepth - 1500;

    // 1. 视频卡片 (含文字)
    const videoZ = startZ - 800;
    // 暴露给 updateScene 使用
    window.endVideoZ = videoZ;

    const videoContainer = document.createElement('div');
    videoContainer.className = 'end-sequence-item end-video-container';
    window.endVideoContainer = videoContainer; // 暴露给 updateScene 使用
    // 初始透明，避免在远处看到黑框
    videoContainer.style.opacity = '0';
    videoContainer.style.transition = 'opacity 2s ease, transform 1.5s cubic-bezier(0.25, 0.1, 0.25, 1), background-color 1s';
    videoContainer.style.transform = `translate3d(-50%, -50%, ${videoZ}px)`;

    // 包含了视频和两阶段的叠加文字（使用 i18n）
    videoContainer.innerHTML = `
        <video src="assets/web_lastvideo.mp4" muted playsinline></video>
        <div class="video-overlay-text phase1" style="opacity:0;white-space:nowrap;">${t().videoTitle}</div>
        <div class="video-overlay-text phase2" style="opacity:0;white-space:nowrap;">${t().goodbye}</div>
        <div class="scroll-hint">${t().scrollContinue}</div>
    `;
    world.appendChild(videoContainer);

    // 逻辑：视频播放到第5秒 -> 放大变黑 -> 显示文字
    // 这一部分逻辑已经统一移到了下方 window.endVideoElement.ontimeupdate 中处理
    // 以确保滚动解锁和视觉变化同步触发
    const videoElement = videoContainer.querySelector('video');
    window.endVideoElement = videoElement;
    window.endTextPhase1 = videoContainer.querySelector('.phase1');
    window.endTextPhase2 = videoContainer.querySelector('.phase2');

    // 手动添加 👋 的摆动动画（绕过 CSS hover 问题）
    const waveEmoji = videoContainer.querySelector('.wave-emoji');
    if (waveEmoji) {
        waveEmoji.addEventListener('mouseenter', () => {
            waveEmoji.style.animation = 'wave 1s infinite';
            waveEmoji.style.transformOrigin = '70% 70%';
        });
        waveEmoji.addEventListener('mouseleave', () => {
            waveEmoji.style.animation = '';
        });
    }

    // 应用用户调试后的参数
    const SETTINGS = {
        rotationOffset: -9
    };
    // 视频观察器：只负责淡入显示，不再负责播放
    // 播放逻辑移交给了 updateScene 的距离检测
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const ratio = entry.intersectionRatio;
            if (ratio > 0.01) videoContainer.style.opacity = '1';
            else videoContainer.style.opacity = '0';
        });
    }, { threshold: [0, 0.01] });
    videoObserver.observe(videoContainer);

    // 监听放大转场，解锁滚动
    // 防止重复绑定，先移除旧的（如果有可能的话，或者是闭包里的新元素）
    window.endVideoElement.ontimeupdate = () => {
        // 大于5秒 (推迟一秒黑幕)，转场发生后，解锁滚动
        if (window.endVideoElement.currentTime > 5) {
            if (window.isScrollLocked) {
                window.isScrollLocked = false;
                document.body.style.overflow = '';
                console.log('Transition complete, scroll unlocked.');
            }

            // 触发视觉变化
            if (!videoContainer.classList.contains('expanded')) {
                videoContainer.classList.add('expanded');
                videoContainer.style.transform = `translate3d(-50%, -50%, ${window.endVideoZ}px) scale(1.5)`;
                // 进入黑夜模式 (背景变黑，网格消失)
                document.body.classList.add('dark-mode');
            }
        }
    };


    // 2. 统计面板 (固定覆盖层，不在3D世界里)
    // 当用户滚动到视频序列结束后显示
    const statsZ = videoZ - 2800; // 仍然用于计算触发时机
    window.statsZ = statsZ;

    const endScreen = document.getElementById('endScreen');
    if (endScreen) {
        // 直接使用原来的 endScreen，改为 fixed 定位
        endScreen.style.position = 'fixed';
        endScreen.style.top = '0';
        endScreen.style.left = '0';
        endScreen.style.width = '100vw';
        endScreen.style.height = '100vh';
        endScreen.style.display = 'flex';
        endScreen.style.justifyContent = 'center';
        endScreen.style.alignItems = 'center';
        endScreen.style.background = 'transparent'; // 改为透明，让瀑布流背景可见
        endScreen.style.zIndex = '1000';
        endScreen.style.opacity = '0';
        endScreen.style.pointerEvents = 'none';
        endScreen.style.transition = 'opacity 1s ease';
        endScreen.style.overflow = 'hidden';

        // 创建瀑布流背景墙
        const photoWall = document.createElement('div');
        photoWall.className = 'stats-photo-wall';

        // 创建多列瀑布流
        const numCols = 6; // 6列
        const imagesPerCol = 5; // 每列5张固定图片
        const totalImages = 30;

        for (let col = 0; col < numCols; col++) {
            const column = document.createElement('div');
            column.className = 'photo-wall-column';
            column.style.animationDelay = `${col * -3}s`; // 错开动画

            // 每列填充固定的5张图片 (列1: 1-5, 列2: 6-10, ...)
            // 重复两次实现无缝循环
            for (let repeat = 0; repeat < 2; repeat++) {
                for (let i = 0; i < imagesPerCol; i++) {
                    const imgNum = (col * imagesPerCol) + i + 1;
                    const img = document.createElement('img');
                    img.src = `images/gallery-thumb/${imgNum}.jpg`; // 使用缩略图
                    img.alt = '';
                    img.loading = 'lazy';
                    column.appendChild(img);
                }
            }
            photoWall.appendChild(column);
        }

        // 在内容前面插入背景
        endScreen.insertBefore(photoWall, endScreen.firstChild);

        // 添加覆盖层 (聚光灯效果)
        const overlay = document.createElement('div');
        overlay.className = 'stats-overlay';
        endScreen.insertBefore(overlay, endScreen.querySelector('.end-content'));

        // 鼠标追踪实现聚光灯效果
        endScreen.addEventListener('mousemove', (e) => {
            const rect = endScreen.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            overlay.style.setProperty('--mouse-x', `${x}%`);
            overlay.style.setProperty('--mouse-y', `${y}%`);
        });

        // 3D 倾斜效果 - 让卡片跟随鼠标倾斜
        const endContent = endScreen.querySelector('.end-content');
        if (endContent) {
            endContent.style.transformStyle = 'preserve-3d';
            endContent.style.transition = 'transform 0.1s ease-out';

            endScreen.addEventListener('mousemove', (e) => {
                const rect = endContent.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                // 计算鼠标相对于卡片中心的位置 (-1 到 1)
                const mouseX = (e.clientX - centerX) / (rect.width / 2);
                const mouseY = (e.clientY - centerY) / (rect.height / 2);

                // 倾斜角度 (最大 10 度)
                const rotateX = -mouseY * 10;
                const rotateY = mouseX * 10;

                endContent.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
            });

            endScreen.addEventListener('mouseleave', () => {
                endContent.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
            });
        }

        window.endStatsPanel = endScreen; // 暴露给 updateScene

        // 重新绑定按钮
        const restartBtn = endScreen.querySelector('.restart-btn');
        if (restartBtn) {
            restartBtn.onclick = () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            };
        }
    }

    // 返回增加的额外总深度
    return Math.abs(statsZ) - totalDepth + 1000;
}

function init() {
    if (typeof PHOTOS === 'undefined') return;

    // 随机选择一张照片作为网页图标
    generateRandomFavicon();

    initGridCanvas();

    // 计算基础照片深度
    totalDepth = CONFIG.CAMERA_START + (PHOTOS.length * CONFIG.DEPTH_PER_PHOTO);
    photoDepth = totalDepth; // 保存照片部分的深度

    // 创建照片
    PHOTOS.forEach((photo, index) => {
        const card = createPhotoCard(photo, index);
        world.appendChild(card);
        photoElements.push(card);
        loadingBar.style.width = `${(index / PHOTOS.length) * 100}%`;
    });

    // 创建结尾序列 (视频 -> 文字 -> 统计)
    const extraDepth = createEndSequence();
    const finalDepth = totalDepth + extraDepth;

    // 设置滚动高度
    scrollSpace.style.setProperty('--scroll-height', `${finalDepth * CONFIG.SCROLL_MULTIPLIER}px`);

    // 更新 totalDepth 供 scroll 逻辑使用 (为了相机能走到最后)
    totalDepth = finalDepth;

    for (let i = 0; i < Math.min(60, photoElements.length); i++) loadImage(photoElements[i]);

    requestAnimationFrame(updateScene);

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    setTimeout(() => { loading.classList.add('hidden'); }, 500);

    // 预加载照片墙图片（后台加载，不阻塞页面）
    setTimeout(() => {
        for (let i = 1; i <= 30; i++) {
            const img = new Image();
            img.src = `images/gallery-thumb/${i}.jpg`; // 预加载缩略图
        }
    }, 2000); // 2秒后开始预加载，避免与主要内容竞争
}

function animateCounter(element, target, duration, isDecimal = false, useCommas = false) {
    const start = 0;
    const startTime = performance.now();
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = start + (target - start) * easeOut;
        if (useCommas) element.textContent = Math.floor(current).toLocaleString();
        else element.textContent = isDecimal ? current.toFixed(2) : Math.floor(current);
        if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}

document.addEventListener('DOMContentLoaded', init);
