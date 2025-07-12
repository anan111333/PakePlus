/**
 * script.js - 东万S19车王地图库
 * 功能：地图选择、随机选图、记分板、实时公告
 * 版本：2.1.0 (添加可拖动记分板窗口)
 */

// 定义地图库颜色
const mapSetColors = {
    s18: { bg: '#9b59b6', hover: '#8e44ad' },
    annual: { bg: '#e67e22', hover: '#d35400' },
    s6: { bg: '#1abc9c', hover: '#16a085' },
    yaomao: { bg: '#f1c40f', hover: '#f39c12' }
};

// S18 地图列表 - 使用本地图片
const s18MapList = [
    { name: "老街迷宫", image: "images/老街迷宫.jpg" },
    { name: "古堡森林", image: "images/古堡森林.jpg" },
    { name: "老街工地", image: "images/老街工地.jpg" },
    { name: "海滨发卡", image: "images/海滨发卡.jpg" },
    { name: "熔岩古墓", image: "images/熔岩古墓.jpg" },
    { name: "瓦特厂房", image: "images/瓦特厂房.jpg" },
    { name: "古城秘境", image: "images/古城秘境.jpg" },
    { name: "西部矿山", image: "images/西部矿山.jpg" },
    { name: "66号公路", image: "images/66号公路.jpg" },
    { name: "森林发卡", image: "images/森林发卡.jpg" },
    { name: "秋之物语", image: "images/秋之物语.jpg" },
    { name: "美洲大峡谷", image: "images/美洲大峡谷.jpg" },
    { name: "苏格兰场", image: "images/苏格兰场.jpg" },
    { name: "VANS机场", image: "images/VANS机场.jpg" },
    { name: "雪山遗迹", image: "images/雪山遗迹.jpg" },
    { name: "莫高窟", image: "images/莫高窟.jpg" },
    { name: "西湖", image: "images/西湖.jpg" },
    { name: "原野之歌", image: "images/原野之歌.jpg" },
    { name: "卡帕多西亚", image: "images/卡帕多西亚.jpg" },
    { name: "人鱼岛探险", image: "images/人鱼岛探险.jpg" },
    { name: "桃园剑阁", image: "images/桃园剑阁.jpg" },
    { name: "TROY - 零号试验场", image: "images/零号试验场.jpg" },
    { name: "幻音城假日", image: "images/幻音城假日.jpg" },
    { name: "长城", image: "images/长城.jpg" },
    { name: "新天鹅堡", image: "images/新天鹅堡.jpg" },
    { name: "一路向黔", image: "images/一路向黔.jpg" },
    { name: "千户苗寨", image: "images/千户苗寨.jpg" },
    { name: "阿尔法总部", image: "images/阿尔法总部.jpg" },
    { name: "梦回古蜀", image: "images/梦回古蜀.jpg" },
    { name: "海滨之眼", image: "images/海滨之眼.jpg" },
    { name: "山雪游龙", image: "images/山雪游龙.jpg" },
    { name: "雾山枫吟", image: "images/雾山枫吟.jpg" },
    { name: "恋恋千阳", image: "images/恋恋千阳.jpg" },
    { name: "黄河万里奔流", image: "images/黄河万里奔流.jpg" },
    { name: "天机阁", image: "images/天机阁.jpg" },
    { name: "一梦青花", image: "images/一梦青花.jpg" },
    { name: "极星幻域", image: "images/极星幻域.jpg" },
    { name: "冰雪欢乐城", image: "images/冰雪欢乐城.jpg" },
    { name: "雪境裂渊", image: "images/雪境裂渊.jpg" },
    { name: "缤纷夏日", image: "images/缤纷夏日.jpg" }
];

// 年度车王地图列表 - 使用本地图片
const annualChampionMapList = [
    { name: "66号公路", image: "images/66号公路.jpg" },
    { name: "古城秘境", image: "images/古城秘境.jpg" },
    { name: "老街工地", image: "images/老街工地.jpg" },
    { name: "熔岩古墓", image: "images/熔岩古墓.jpg" },
    { name: "新天鹅堡", image: "images/新天鹅堡.jpg" },
    { name: "TROY - 零号试验场", image: "images/零号试验场.jpg" },
    { name: "秋之物语", image: "images/秋之物语.jpg" },
    { name: "老街迷宫", image: "images/老街迷宫.jpg" },
    { name: "森林发卡", image: "images/森林发卡.jpg" },
    { name: "恋恋千阳", image: "images/恋恋千阳.jpg" },
    { name: "VANS机场", image: "images/VANS机场.jpg" },
    { name: "缤纷夏日", image: "images/缤纷夏日.jpg" },
    { name: "美洲大峡谷", image: "images/美洲大峡谷.jpg" },
    { name: "苏格兰场", image: "images/苏格兰场.jpg" },
    { name: "雪山遗迹", image: "images/雪山遗迹.jpg" },
    { name: "阿尔法总部", image: "images/阿尔法总部.jpg" },
    { name: "幻音城假日", image: "images/幻音城假日.jpg" },
    { name: "梦回古蜀", image: "images/梦回古蜀.jpg" },
    { name: "桃源剑阁", image: "images/桃源剑阁.jpg" },
    { name: "山雪游龙", image: "images/山雪游龙.jpg" },
    { name: "秋名山", image: "images/秋名山.jpg" },
    { name: "极星幻域", image: "images/极星幻域.jpg" },
    { name: "莫高窟", image: "images/莫高窟.jpg" },
    { name: "千户苗寨", image: "images/千户苗寨.jpg" },
    { name: "一路向黔", image: "images/一路向黔.jpg" },
    { name: "霆城新港", image: "images/霆城新港.jpg" },
    { name: "雪境裂渊", image: "images/雪境裂渊.jpg" },
    { name: "千年丝路", image: "images/千年丝路.jpg" },
    { name: "瓦特厂房", image: "images/瓦特厂房.jpg" },
    { name: "原野之歌", image: "images/原野之歌.jpg" },
    { name: "海滨发卡", image: "images/海滨发卡.jpg" },
    { name: "雾山风吟", image: "images/雾山风吟.jpg" },
    { name: "海滨之眼", image: "images/海滨之眼.jpg" },
    { name: "西部矿山", image: "images/西部矿山.jpg" },
    { name: "灵蛇传说", image: "images/灵蛇传说.jpg" },
    { name: "古堡森林", image: "images/古堡森林.jpg" },
    { name: "卡帕多西亚", image: "images/卡帕多西亚.jpg" },
    { name: "1号公路", image: "images/1号公路.jpg" },
    { name: "西湖", image: "images/西湖.jpg" },
    { name: "长城", image: "images/长城.jpg" }
];

// S6公开地图库 - 独立地图列表
const s6MapList = [
    { name: "66号公路", image: "images/66号公路.jpg" },
    { name: "古城秘境", image: "images/古城秘境.jpg" },
    { name: "老街工地", image: "images/老街工地.jpg" },
    { name: "熔岩古墓", image: "images/熔岩古墓.jpg" },
    { name: "新天鹅堡", image: "images/新天鹅堡.jpg" },
    { name: "TROY - 零号试验场", image: "images/零号试验场.jpg" },
    { name: "秋之物语", image: "images/秋之物语.jpg" },
    { name: "老街迷宫", image: "images/老街迷宫.jpg" },
    { name: "森林发卡", image: "images/森林发卡.jpg" },
    { name: "恋恋千阳", image: "images/恋恋千阳.jpg" },
    { name: "VANS机场", image: "images/VANS机场.jpg" },
    { name: "冰雪欢乐城", image: "images/冰雪欢乐城.jpg" },
    { name: "美洲大峡谷", image: "images/美洲大峡谷.jpg" },
    { name: "苏格兰场", image: "images/苏格兰场.jpg" },
    { name: "雪山遗迹", image: "images/雪山遗迹.jpg" },
    { name: "阿尔法总部", image: "images/阿尔法总部.jpg" },
    { name: "幻音城假日", image: "images/幻音城假日.jpg" },
    { name: "天玑阁", image: "images/天机阁.jpg" },
    { name: "桃源剑阁", image: "images/桃源剑阁.jpg" },
    { name: "海滨发卡", image: "images/海滨发卡.jpg" },
    { name: "太空边境", image: "images/太空边境.jpg" },
    { name: "黄河万里奔流", image: "images/黄河万里奔流.jpg" },
    { name: "莫高窟", image: "images/莫高窟.jpg" },
    { name: "千户苗寨", image: "images/千户苗寨.jpg" },
    { name: "一路向黔", image: "images/一路向黔.jpg" },
    { name: "海滨小镇", image: "images/海滨小镇.jpg" },
    { name: "雪境裂渊", image: "images/雪境裂渊.jpg" },
    { name: "赤城红叶", image: "images/赤城红叶.jpg" },
    { name: "瓦特厂房", image: "images/瓦特厂房.jpg" },
    { name: "原野之歌", image: "images/原野之歌.jpg" },
    { name: "火星基地", image: "images/火星基地.jpg" },
    { name: "雾山风吟", image: "images/雾山风吟.jpg" },
    { name: "敦煌石窟", image: "images/敦煌石窟.jpg" },
    { name: "西部矿山", image: "images/西部矿山.jpg" },
    { name: "灵蛇传说", image: "images/灵蛇传说.jpg" },
    { name: "古堡森林", image: "images/古堡森林.jpg" },
    { name: "卡帕多西亚", image: "images/卡帕多西亚.jpg" },
    { name: "1号公路", image: "images/1号公路.jpg" },
    { name: "西湖", image: "images/西湖.jpg" },
    { name: "长城", image: "images/长城.jpg" }
];

// 耀猫杯地图列表 (70张地图)
const yaomaoMapList = [
    { name: "66号公路", image: "images/66号公路.jpg" },
    { name: "美洲大峡谷", image: "images/美洲大峡谷.jpg" },
    { name: "熔炉角斗场", image: "images/熔炉角斗场.jpg" },
    { name: "人鱼岛探险", image: "images/人鱼岛探险.jpg" },
    { name: "山雪游龙", image: "images/山雪游龙.jpg" },
    { name: "火星基地", image: "images/火星基地.jpg" },
    { name: "极星幻域", image: "images/极星幻域.jpg" },
    { name: "古城秘境", image: "images/古城秘境.jpg" },
    { name: "海滨发卡", image: "images/海滨发卡.jpg" },
    { name: "苏格兰场", image: "images/苏格兰场.jpg" },
    { name: "古堡森林", image: "images/古堡森林.jpg" },
    { name: "幻海遗迹", image: "images/幻海遗迹.jpg" },
    { name: "秋之物语", image: "images/秋之物语.jpg" },
    { name: "梦回古蜀", image: "images/梦回古蜀.jpg" },
    { name: "极速列车", image: "images/极速列车.jpg" },
    { name: "老街工地", image: "images/老街工地.jpg" },
    { name: "老街迷宫", image: "images/老街迷宫.jpg" },
    { name: "阿尔法总部", image: "images/阿尔法总部.jpg" },
    { name: "桃源剑阁", image: "images/桃源剑阁.jpg" },
    { name: "西部矿山", image: "images/西部矿山.jpg" },
    { name: "TROY - 零号试验场", image: "images/零号试验场.jpg" },
    { name: "海滨之眼", image: "images/海滨之眼.jpg" },
    { name: "洛杉矶", image: "images/洛杉矶.jpg" },
    { name: "时之沙", image: "images/时之沙.jpg" },
    { name: "一路向黔", image: "images/一路向黔.jpg" },
    { name: "熔岩古墓", image: "images/熔岩古墓.jpg" },
    { name: "森林发卡", image: "images/森林发卡.jpg" },
    { name: "桃源剑阁", image: "images/桃源剑阁.jpg" },
    { name: "瓦特厂房", image: "images/瓦特厂房.jpg" },
    { name: "云梦泽", image: "images/云梦泽.jpg" },
    { name: "卡帕多西亚", image: "images/卡帕多西亚.jpg" },
    { name: "科隆大教堂", image: "images/科隆大教堂.jpg" },
    { name: "春天的新想乐", image: "images/春天的新想乐.jpg" },
    { name: "VANS机场", image: "images/VANS机场.jpg" },
    { name: "港湾发卡", image: "images/港湾发卡.jpg" },
    { name: "海滨小镇", image: "images/海滨小镇.jpg" },
    { name: "秋名山", image: "images/秋名山.jpg" },
    { name: "玉龙雪脉", image: "images/玉龙雪脉.jpg" },
    { name: "长城", image: "images/长城.jpg" },
    { name: "恋恋千阳", image: "images/恋恋千阳.jpg" },
    { name: "飞驰新疆", image: "images/飞驰新疆.jpg" },
    { name: "伊甸掠影", image: "images/伊甸掠影.jpg" },
    { name: "星梦游乐园", image: "images/星梦游乐园.jpg" },
    { name: "天玑阁", image: "images/天机阁.jpg" },
    { name: "恶龙城", image: "images/恶龙城.jpg" },
    { name: "亚特兰蒂斯", image: "images/亚特兰蒂斯.jpg" },
    { name: "神隐之国", image: "images/神隐之国.jpg" },
    { name: "天宫乘梦", image: "images/天宫乘梦.jpg" },
    { name: "雾山枫吟", image: "images/雾山枫吟.jpg" },
    { name: "故园归醉", image: "images/故原归醉.jpg" },
    { name: "320冒险岛", image: "images/320冒险岛.jpg" },
    { name: "玫瑰之恋", image: "images/玫瑰之恋.jpg" },
    { name: "彩虹风车岛", image: "images/彩虹风车岛.jpg" },
    { name: "敦煌石窟", image: "images/敦煌石窟.jpg" },
    { name: "玄灵峡谷", image: "images/玄灵峡谷.jpg" },
    { name: "天空之城", image: "images/天空之城.jpg" },
    { name: "炎光王城", image: "images/炎光王城.jpg" },
    { name: "龙宫", image: "images/龙宫.jpg" },
    { name: "疯狂马戏团", image: "images/疯狂马戏团.jpg" },
    { name: "冰川滑雪场", image: "images/冰川滑雪场.jpg" },
    { name: "大漠客栈", image: "images/大漠客栈.jpg" },
    { name: "千年丝路", image: "images/千年丝路.jpg" },
    { name: "灵蛇传说", image: "images/灵蛇传说.jpg" },
    { name: "霆城新港", image: "images/霆城新港.jpg" },
    { name: "绝色江西", image: "images/绝色江西.jpg" },
    { name: "一梦青花", image: "images/一梦青花.jpg" },
    { name: "飞跃神州", image: "images/飞跃神州.jpg" },
    { name: "雾山五行", image: "images/雾山五行.jpg" },
    { name: "繁花巴比伦", image: "images/繁花巴比伦.jpg" },
    { name: "流觞曲水", image: "images/流觞曲水.jpg" }
];

// 玩家列表 - 增加到6名玩家
const defaultPlayers = [
    { name: "玩家1", score: 0 },
    { name: "玩家2", score: 0 },
    { name: "玩家3", score: 0 },
    { name: "玩家4", score: 0 },
    { name: "玩家5", score: 0 },
    { name: "玩家6", score: 0 }
];

// 随机语数组
const randomSayings = [
    "这图我闭着眼开",
    "垃圾图 + 1",
    "这图，我主场",
    "这图即绝杀",
    "我的图，我说了算",
    "这图有手就行",
    "这图我闭着眼开",
    "什么鸟随机",
    "sb荔枝",
    "就这图？闭着眼跑",
    "这图我奶奶都能赢",
    "选得好，下次别选了",
    "这图有手就行",
    "地图之神的选择",
    "这图我闭着眼开",
    "选这图稳了",
    "这图用脚操作都能赢",
    "这图我家猫看了都摇头"
];

// 胡布斯财富排行榜数据
const hubuData = [
    { rank: 1, name: "世界冠军优秀", wealth: 10463656 },
    { rank: 2, name: "谦谦", wealth: 7359692 },
    { rank: 3, name: "柚子", wealth: 3898580 },
    { rank: 4, name: "探玄", wealth: 2083733 },
    { rank: 5, name: "小俄", wealth: 1744636 },
    { rank: 6, name: "我对月亮许愿", wealth: 1679706 },
    { rank: 7, name: "奶糖", wealth: 1473998 },
    { rank: 8, name: "迷死他、冰", wealth: 1021056 },
    { rank: 9, name: "迷死他冰 gogogo", wealth: 659579 },
    { rank: 10, name: "kanozz", wealth: 591430 },
    // 为简洁起见，只保留前10条数据，实际使用时应包含所有100条数据
];

// 新增登录相关变量
const loginModal = document.getElementById('loginModal');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');
const loginError = document.getElementById('loginError');
const LOGIN_PASSWORD = 'anan888'; // 固定密码

// 当前登录用户
let currentUser = localStorage.getItem('currentUser') || null;

// 从localStorage加载数据或使用默认数据
let excludedMaps = JSON.parse(localStorage.getItem('excludedMaps')) || {};
let players = JSON.parse(localStorage.getItem('players')) || defaultPlayers;
let currentMapList = s18MapList;
let currentMapSet = 's18';

// DOM元素
const mapContainer = document.getElementById('mapContainer');
const s18MapLibraryBtn = document.getElementById('s18MapLibraryBtn');
const annualChampionMapLibraryBtn = document.getElementById('annualChampionMapLibraryBtn');
const s6MapLibraryBtn = document.getElementById('s6MapLibraryBtn');
const yaomaoMapLibraryBtn = document.getElementById('yaomaoMapLibraryBtn');
const s19RankBtn = document.getElementById('s19RankBtn');
const gloryBtn = document.getElementById('gloryBtn');
const hubuBtn = document.getElementById('hubuBtn');
const randomBtn = document.getElementById('randomBtn');
const resetBtn = document.getElementById('resetBtn');
const scoreboardBtn = document.getElementById('scoreboardBtn');
const randomMapModal = document.getElementById('randomMapModal');
const randomMapImage = document.getElementById('randomMapImage');
const randomMapName = document.getElementById('randomMapName');
const closeRandomModal = document.getElementById('closeRandomModal');
const selectionProcess = document.getElementById('selectionProcess');
const homeBtn = document.getElementById('homeBtn');
const guideBtn = document.getElementById('guideBtn');
const guideModal = document.getElementById('guideModal');
const closeGuide = document.getElementById('closeGuide');
const playersList = document.getElementById('playersList');
const resetScoresBtn = document.getElementById('resetScoresBtn');
const randomMapSaying = document.getElementById('randomMapSaying');
const s19RankModal = document.getElementById('s19RankModal');
const closeRankModal = document.getElementById('closeRankModal');
const gloryModal = document.getElementById('gloryModal');
const closeGlory = document.getElementById('closeGlory');
const hubuModal = document.getElementById('hubuModal');
const closeHubu = document.getElementById('closeHubu');
const hubuTableBody = document.getElementById('hubuTableBody');

// 记分板窗口元素
const scoreboardWindow = document.getElementById('scoreboardWindow');
const closeWindow = document.getElementById('closeWindow');
const draggableHeader = document.querySelector('.draggable');

// WebSocket相关变量
let socket;
const SERVER_URL = 'wss://xn--chqub.xn--chqub.xn--6qq986b3xl'; // 替换为你的WebSocket服务器地址
let lastRandomMap = null;

// 记分板拖动变量
let isDragging = false;
let offsetX, offsetY;

// 初始化页面
function init() {
    // 检查登录状态
    if (!currentUser) {
        loginModal.style.display = 'flex';
    } else {
        loginModal.style.display = 'none';
    }
    
    // 初始化WebSocket连接
    initWebSocket();
    
    renderMapCards(currentMapList);
    renderScoreboard();
    setupEventListeners();
    
    // 初始位置
    positionScoreboard();
}

// 初始化WebSocket连接
function initWebSocket() {
    socket = new WebSocket(SERVER_URL);
    
    socket.onopen = function(e) {
        console.log("WebSocket连接已建立");
        // 请求当前随机地图状态
        socket.send(JSON.stringify({ type: 'getCurrentMap' }));
    };
    
    socket.onmessage = function(event) {
        const data = JSON.parse(event.data);
        
        if (data.type === 'currentMap') {
            // 更新当前随机地图
            lastRandomMap = data.map;
            updateRandomMapAnnouncement(data.map);
        } else if (data.type === 'newRandomMap') {
            // 显示新的随机地图
            lastRandomMap = data.map;
            showRandomMapModal(data.map);
            updateRandomMapAnnouncement(data.map);
        }
    };
    
    socket.onclose = function(event) {
        if (event.wasClean) {
            console.log(`WebSocket连接关闭，code=${event.code} reason=${event.reason}`);
        } else {
            console.log('WebSocket连接中断');
            // 尝试重新连接
            setTimeout(initWebSocket, 5000);
        }
    };
    
    socket.onerror = function(error) {
        console.log(`WebSocket错误: ${error.message}`);
    };
}

// 更新随机地图公告
function updateRandomMapAnnouncement(map) {
    const announcement = document.getElementById('randomMapAnnouncement');
    if (!announcement) return;
    
    if (map) {
        announcement.innerHTML = `
            <div class="announcement-content">
                <span class="announcement-label">当前随机地图:</span>
                <span class="map-name">${map.name}</span>
                <img src="${map.image}" alt="${map.name}" class="map-thumbnail">
            </div>
        `;
        announcement.style.display = 'block';
    } else {
        announcement.style.display = 'none';
    }
}

// 设置事件监听器
function setupEventListeners() {
    // 登录功能
    loginBtn.addEventListener('click', () => {
        const username = usernameInput.value.trim();
        const password = passwordInput.value;
        
        if (!username) {
            loginError.textContent = '请输入用户名';
            return;
        }
        
        if (password !== LOGIN_PASSWORD) {
            loginError.textContent = '密码错误，请输入anan888';
            return;
        }
        
        // 登录成功
        currentUser = username;
        localStorage.setItem('currentUser', username);
        loginModal.style.display = 'none';
        
        // 重新渲染地图卡片以显示用户名
        renderMapCards(currentMapList);
    });
    
    // 地图库切换
    s18MapLibraryBtn.addEventListener('click', () => switchMapLibrary('s18', s18MapList));
    annualChampionMapLibraryBtn.addEventListener('click', () => switchMapLibrary('annual', annualChampionMapList));
    s6MapLibraryBtn.addEventListener('click', () => switchMapLibrary('s6', s6MapList));
    yaomaoMapLibraryBtn.addEventListener('click', () => switchMapLibrary('yaomao', yaomaoMapList));

    // 随机选图
    randomBtn.addEventListener('click', selectRandomMap);

    // 重置排除
    resetBtn.addEventListener('click', resetExcludedMaps);

    // 记分板按钮
    scoreboardBtn.addEventListener('click', toggleScoreboard);
    
    // 关闭记分板按钮
    closeWindow.addEventListener('click', () => {
        scoreboardWindow.classList.remove('active');
    });
    
    // 记分板加减分
    playersList.addEventListener('click', (e) => {
        const btn = e.target.closest('.score-btn');
        if (!btn) return;
        
        const playerItem = btn.closest('.player-item');
        const playerIndex = parseInt(playerItem.dataset.index);
        const action = btn.dataset.action;
        
        if (action === 'plus') {
            players[playerIndex].score++;
        } else if (action === 'minus' && players[playerIndex].score > 0) {
            players[playerIndex].score--;
        }
        
        savePlayers();
        renderScoreboard();
    });
    
    // 重置分数
    resetScoresBtn.addEventListener('click', resetScores);

    // S19排名弹窗
    s19RankBtn.addEventListener('click', () => s19RankModal.style.display = 'flex');
    closeRankModal.addEventListener('click', () => s19RankModal.style.display = 'none');
    s19RankModal.addEventListener('click', (e) => {
        if (e.target === s19RankModal) {
            s19RankModal.style.display = 'none';
        }
    });
    
    // 光荣榜弹窗
    gloryBtn.addEventListener('click', () => gloryModal.style.display = 'flex');
    closeGlory.addEventListener('click', () => gloryModal.style.display = 'none');
    gloryModal.addEventListener('click', (e) => {
        if (e.target === gloryModal) {
            gloryModal.style.display = 'none';
        }
    });
    
    // 胡布斯排行弹窗
    hubuBtn.addEventListener('click', () => {
        hubuModal.style.display = 'flex';
        renderHubuTable();
    });
    closeHubu.addEventListener('click', () => hubuModal.style.display = 'none');
    hubuModal.addEventListener('click', (e) => {
        if (e.target === hubuModal) {
            hubuModal.style.display = 'none';
        }
    });

    // 主页按钮
    homeBtn.addEventListener('click', () => {
        document.querySelectorAll('.map-card').forEach(card => {
            card.classList.remove('selected');
        });
        excludedMaps = {};
        localStorage.setItem('excludedMaps', JSON.stringify(excludedMaps));
        mapContainer.style.display = 'none';
        // 隐藏记分板
        scoreboardWindow.classList.remove('active');
    });

    // 玩法介绍
    guideBtn.addEventListener('click', () => guideModal.style.display = 'flex');
    closeGuide.addEventListener('click', () => guideModal.style.display = 'none');
    guideModal.addEventListener('click', (e) => {
        if (e.target === guideModal) {
            guideModal.style.display = 'none';
        }
    });

    // 点击地图卡片排除/取消排除
    mapContainer.addEventListener('click', (e) => {
        const mapCard = e.target.closest('.map-card');
        if (mapCard) {
            const mapName = mapCard.querySelector('.map-name').textContent;
            toggleMapExclusion(mapName);
        }
    });
    
    // 关闭随机地图弹窗
    closeRandomModal.addEventListener('click', () => {
        randomMapModal.style.display = 'none';
    });
    
    randomMapModal.addEventListener('click', (e) => {
        if (e.target === randomMapModal) {
            randomMapModal.style.display = 'none';
        }
    });
    
    // 名字编辑事件监听
    setupNameEditListeners();
    
    // 记分板窗口拖动
    setupScoreboardDrag();
}

// 添加名字编辑功能
function setupNameEditListeners() {
    playersList.addEventListener('click', (e) => {
        // 编辑按钮点击处理
        if (e.target.classList.contains('edit-name-btn')) {
            const playerItem = e.target.closest('.player-item');
            const playerIndex = parseInt(playerItem.dataset.index);
            const nameSpan = playerItem.querySelector('.player-name');
            
            // 创建输入框
            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'name-input';
            input.value = players[playerIndex].name;
            
            // 替换为输入框
            nameSpan.replaceWith(input);
            input.focus();
            
            // 保存处理
            const saveName = () => {
                const newName = input.value.trim() || `玩家${playerIndex + 1}`;
                players[playerIndex].name = newName;
                savePlayers();
                
                // 恢复为显示名字
                const newNameSpan = document.createElement('span');
                newNameSpan.className = 'player-name';
                newNameSpan.textContent = newName;
                input.replaceWith(newNameSpan);
                
                // 重新添加编辑按钮
                const editBtn = document.createElement('button');
                editBtn.className = 'edit-name-btn';
                editBtn.textContent = '✎';
                playerItem.querySelector('.player-name-container').appendChild(editBtn);
            };
            
            // 回车保存
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    saveName();
                }
            });
            
            // 失去焦点保存
            input.addEventListener('blur', saveName);
        }
    });
}

// 设置记分板窗口拖动功能
function setupScoreboardDrag() {
    draggableHeader.addEventListener('mousedown', (e) => {
        if (e.target === closeWindow) return; // 排除关闭按钮
        
        isDragging = true;
        const rect = scoreboardWindow.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        
        // 添加拖动时的样式
        scoreboardWindow.style.cursor = 'move';
        scoreboardWindow.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.4)';
        
        e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        let newLeft = e.clientX - offsetX;
        let newTop = e.clientY - offsetY;
        
        // 限制在窗口范围内
        const maxX = window.innerWidth - scoreboardWindow.offsetWidth;
        const maxY = window.innerHeight - scoreboardWindow.offsetHeight;
        
        newLeft = Math.max(0, Math.min(newLeft, maxX));
        newTop = Math.max(0, Math.min(newTop, maxY));
        
        scoreboardWindow.style.left = `${newLeft}px`;
        scoreboardWindow.style.top = `${newTop}px`;
    });

    document.addEventListener('mouseup', () => {
        if (!isDragging) return;
        
        isDragging = false;
        scoreboardWindow.style.cursor = '';
        scoreboardWindow.style.boxShadow = '0 5px 25px rgba(0, 0, 0, 0.3)';
    });
}

// 切换地图库
function switchMapLibrary(mapSet, mapList) {
    mapContainer.classList.remove('yaomao-layout');
    if (mapSet === 'yaomao') {
        mapContainer.classList.add('yaomao-layout');
    }
    
    currentMapSet = mapSet;
    currentMapList = mapList;
    renderMapCards(mapList);
    
    const buttons = [s18MapLibraryBtn, annualChampionMapLibraryBtn, s6MapLibraryBtn, yaomaoMapLibraryBtn];
    buttons.forEach(btn => btn.classList.remove('selected-map-btn'));
    
    const activeBtn = document.getElementById(`${mapSet}MapLibraryBtn`);
    if (activeBtn) {
        activeBtn.classList.add('selected-map-btn');
    }
    
    mapContainer.style.display = 'grid';
    // 显示记分板
    scoreboardWindow.classList.add('active');
}

// 渲染地图卡片
function renderMapCards(mapList) {
    mapContainer.innerHTML = '';
    
    const bgColor = mapSetColors[currentMapSet].bg;
    
    mapList.forEach(map => {
        const isExcluded = excludedMaps[map.name] && excludedMaps[map.name][currentMapSet];
        const card = document.createElement('div');
        card.className = `map-card ${isExcluded ? 'selected' : ''}`;
        
        // 添加排除者用户名
        if (isExcluded) {
            card.dataset.excluder = excludedMaps[map.name][currentMapSet];
        }
        
        card.innerHTML = `
            <img src="${map.image}" alt="${map.name}" class="map-image">
            <div class="map-name" style="background-color: ${bgColor};">${map.name}</div>
        `;
        mapContainer.appendChild(card);
    });
}

// 切换地图排除状态
function toggleMapExclusion(mapName) {
    if (!currentUser) {
        alert('请先登录！');
        loginModal.style.display = 'flex';
        return;
    }
    
    if (!excludedMaps[mapName]) {
        excludedMaps[mapName] = {};
    }
    
    // 如果当前地图已被当前用户排除，则取消排除；否则标记为当前用户排除
    if (excludedMaps[mapName][currentMapSet] === currentUser) {
        excludedMaps[mapName][currentMapSet] = false;
    } else {
        excludedMaps[mapName][currentMapSet] = currentUser;
    }
    
    localStorage.setItem('excludedMaps', JSON.stringify(excludedMaps));
    renderMapCards(currentMapList);
}

// 随机选择地图
function selectRandomMap() {
    if (!currentUser) {
        alert('请先登录！');
        loginModal.style.display = 'flex';
        return;
    }
    
    const availableMaps = currentMapList.filter(map => 
        !excludedMaps[map.name] || !excludedMaps[map.name][currentMapSet]
    );
    
    if (availableMaps.length === 0) {
        alert('所有地图都已被排除，请重置或取消排除一些地图。');
        return;
    }
    
    selectionProcess.style.display = 'flex';
    const mapCards = Array.from(document.querySelectorAll('.map-card'));
    
    let count = 0;
    const maxIterations = 20;
    const interval = setInterval(() => {
        mapCards.forEach(card => {
            card.classList.remove('bounce-animation', 'flash-animation');
        });
        
        const randomIndex = Math.floor(Math.random() * mapCards.length);
        const randomCard = mapCards[randomIndex];
        
        randomCard.classList.add(count % 2 === 0 ? 'bounce-animation' : 'flash-animation');
        
        if (count % 3 === 0) {
            randomCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        
        count++;
        if (count >= maxIterations) {
            clearInterval(interval);
            selectionProcess.style.display = 'none';
            
            const finalIndex = Math.floor(Math.random() * availableMaps.length);
            const selectedMap = availableMaps[finalIndex];
            
            mapCards.forEach(card => {
                if (card.querySelector('.map-name').textContent === selectedMap.name) {
                    card.classList.add('bounce-animation');
                    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            });
            
            // 通过WebSocket广播随机地图选择
            if (socket && socket.readyState === WebSocket.OPEN) {
                socket.send(JSON.stringify({
                    type: 'selectRandomMap',
                    map: selectedMap
                }));
            }
            
            // 本地显示
            showRandomMapModal(selectedMap);
            updateRandomMapAnnouncement(selectedMap);
        }
    }, 100);
}

// 显示随机地图弹窗
function showRandomMapModal(map) {
    randomMapImage.src = map.image;
    randomMapName.textContent = map.name;
    
    const randomIndex = Math.floor(Math.random() * randomSayings.length);
    randomMapSaying.textContent = randomSayings[randomIndex];
    
    randomMapModal.style.display = 'flex';
}

// 重置所有排除的地图
function resetExcludedMaps() {
    if (!currentUser) {
        alert('请先登录！');
        loginModal.style.display = 'flex';
        return;
    }
    
    if (confirm('确定要重置所有排除的地图吗？')) {
        excludedMaps = {};
        localStorage.setItem('excludedMaps', JSON.stringify(excludedMaps));
        renderMapCards(currentMapList);
    }
}

// 切换记分板显示
function toggleScoreboard() {
    scoreboardWindow.classList.toggle('active');
    positionScoreboard();
}

// 渲染记分板
function renderScoreboard() {
    playersList.innerHTML = '';
    
    players.forEach((player, index) => {
        const playerItem = document.createElement('li');
        playerItem.className = 'player-item';
        playerItem.dataset.index = index;
        playerItem.innerHTML = `
            <div class="player-name-container">
                <span class="player-name">${player.name}</span>
                <button class="edit-name-btn">✎</button>
            </div>
            <span class="player-score">${player.score}</span>
            <div class="score-controls">
                <button class="score-btn" data-action="minus">-</button>
                <button class="score-btn" data-action="plus">+</button>
            </div>
        `;
        playersList.appendChild(playerItem);
    });
}

// 渲染胡布斯排行榜
function renderHubuTable() {
    hubuTableBody.innerHTML = '';
    
    hubuData.forEach((player, index) => {
        const row = document.createElement('tr');
        if (index < 3) {
            row.classList.add('top-3');
        }
        
        row.innerHTML = `
            <td class="rank-cell">${player.rank}</td>
            <td>${player.name}</td>
            <td class="hubu-wealth">${player.wealth.toLocaleString()}</td>
        `;
        
        hubuTableBody.appendChild(row);
    });
}

// 重置所有分数
function resetScores() {
    if (confirm('确定要重置所有分数吗？')) {
        players.forEach(player => {
            player.score = 0;
        });
        
        savePlayers();
        renderScoreboard();
    }
}

// 保存玩家数据到localStorage
function savePlayers() {
    localStorage.setItem('players', JSON.stringify(players));
}

// 初始化记分板位置
function positionScoreboard() {
    const rect = scoreboardWindow.getBoundingClientRect();
    if (rect.left < 0 || rect.top < 0) {
        // 如果窗口位置超出屏幕，重置位置
        scoreboardWindow.style.left = '50%';
        scoreboardWindow.style.top = '100px';
        scoreboardWindow.style.transform = 'translateX(-50%)';
    }
}

// 初始化页面
init();