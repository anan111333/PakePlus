/**
 * script.js - 东万S19车王地图库
 * 功能：地图选择、随机选图、记分板、实时公告
 * 版本：2.1.0 (添加可拖动记分板窗口)
 * 版本：2.20 (添加赛事地图星级 更新s19地图库）
 * 版本：2.30 (添加多页记分板功能)
 * 版本：2.40 (添加分数双击编辑功能)
 * 版本：2.50 (取消登录功能，简化排除标记)
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
    { name: "老街迷宫", image: "images/老街迷宫.jpg", stars: 4 },
    { name: "古堡森林", image: "images/古堡森林.jpg", stars: 5 },
    { name: "老街工地", image: "images/老街工地.jpg", stars: 5 },
    { name: "海滨发卡", image: "images/海滨发卡.jpg", stars: 5 },
    { name: "熔岩古墓", image: "images/熔岩古墓.jpg", stars: 5 },];
// 年度车王地图列表 - 使用本地图片
const annualChampionMapList = [
    { name: "66号公路", image: "images/66号公路.jpg", stars: 5 },
    { name: "古城秘境", image: "images/古城秘境.jpg", stars: 4 },
    { name: "老街工地", image: "images/老街工地.jpg", stars: 5 },
    { name: "熔岩古墓", image: "images/熔岩古墓.jpg", stars: 5 },
    { name: "新天鹅堡", image: "images/新天鹅堡.jpg", stars: 4 },
];
// S6公开地图库 - 添加星级
const s6MapList = [
    { name: "66号公路", image: "images/66号公路.jpg", stars: 5 },
    { name: "古城秘境", image: "images/古城秘境.jpg", stars: 4 },
    { name: "老街工地", image: "images/老街工地.jpg", stars: 5 },
];

// 耀猫杯地图列表 (70张地图)
const yaomaoMapList = [
    { name: "66号公路", image: "images/66号公路.jpg" },
    { name: "美洲大峡谷", image: "images/美洲大峡谷.jpg" },
    { name: "熔炉角斗场", image: "images/熔炉角斗场.jpg" },
];

// 在全局变量中添加
let currentPage = 1;
const totalPages = 4;

// 玩家数据结构 - 按页面存储
const scorePlayers = {
    page1: JSON.parse(localStorage.getItem('players_page1')) || [
        { name: "玩家1", score: 6 },
        { name: "玩家2", score: 6 },
        { name: "玩家3", score: 6 },
        { name: "玩家4", score: 6 },
        { name: "玩家5", score: 6 },
        { name: "玩家6", score: 6 }
    ],
    page2: JSON.parse(localStorage.getItem('players_page2')) || [
        { name: "玩家1", score: 0 },
        { name: "玩家2", score: 0 },
        { name: "玩家3", score: 0 },
        { name: "玩家4", score: 0 },
        { name: "玩家5", score: 0 },
        { name: "玩家6", score: 0 }
    ],
    page3: JSON.parse(localStorage.getItem('players_page3')) || [
        // 2V模式 - 3组每组2人
        { name: "玩家1", score: 0, group: 0 },
        { name: "玩家2", score: 0, group: 0 },
        { name: "玩家3", score: 0, group: 1 },
        { name: "玩家4", score: 0, group: 1 },
        { name: "玩家5", score: 0, group: 2 },
        { name: "玩家6", score: 0, group: 2 }
    ],
    page4: JSON.parse(localStorage.getItem('players_page4')) || [
        // 3V模式 - 2组每组3人
        { name: "玩家1", score: 0, group: 0 },
        { name: "玩家2", score: 0, group: 0 },
        { name: "玩家3", score: 0, group: 0 },
        { name: "玩家4", score: 0, group: 1 },
        { name: "玩家5", score: 0, group: 1 },
        { name: "玩家6", score: 0, group: 1 }
    ]
};

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
    "这图我闭了眼开",
    "选这图稳了",
    "这图用脚操作都能赢",
    "这图我家猫看了都摇头"
];

// 从localStorage加载数据或使用默认数据
let excludedMaps = JSON.parse(localStorage.getItem('excludedMaps')) || {};
let currentMapList = s18MapList;
let currentMapSet = 's18';

// DOM元素
const mapContainer = document.getElementById('mapContainer');
const s18MapLibraryBtn = document.getElementById('s18MapLibraryBtn');
const annualChampionMapLibraryBtn = document.getElementById('annualChampionMapLibraryBtn');
const s6MapLibraryBtn = document.getElementById('s6MapLibraryBtn');
const yaomaoMapLibraryBtn = document.getElementById('yaomaoMapLibraryBtn');
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
const resetScoresBtn = document.getElementById('resetScoresBtn');
const randomMapSaying = document.getElementById('randomMapSaying');

// 记分板窗口元素
const scoreboardWindow = document.getElementById('scoreboardWindow');
const closeWindow = document.getElementById('closeWindow');
const draggableHeader = document.querySelector('.draggable');
const prevPageBtn = document.getElementById('prevPageBtn');
const nextPageBtn = document.getElementById('nextPageBtn');
const scoreboardTitle = document.getElementById('scoreboardTitle');

// WebSocket相关变量
let socket;
const SERVER_URL = 'wss://xn--chqub.xn--chqub.xn--6qq986b3xl'; // 替换为你的WebSocket服务器地址
let lastRandomMap = null;

// 记分板拖动变量
let isDragging = false;
let offsetX, offsetY;

// 初始化页面
function init() {
    // 初始化WebSocket连接
    initWebSocket();
    
    renderMapCards(currentMapList);
    setupEventListeners();
    
    // 初始位置
    positionScoreboard();
    
    // 初始化记分板
    switchPage(1);
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
    
    // 翻页按钮
    prevPageBtn.addEventListener('click', prevPage);
    nextPageBtn.addEventListener('click', nextPage);
    
    // 重置分数
    resetScoresBtn.addEventListener('click', resetScores);

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
    
    // 记分板分数操作事件
    setupScoreboardEventListeners();
}

// 添加名字编辑功能
function setupNameEditListeners() {
    // 为每个页面的玩家列表添加事件监听
    for (let page = 1; page <= totalPages; page++) {
        const listId = `playersList${page}`;
        const listElement = document.getElementById(listId);
        
        if (listElement) {
            listElement.addEventListener('click', (e) => {
                if (e.target.classList.contains('edit-name-btn')) {
                    const playerItem = e.target.closest('.player-item');
                    const playerIndex = parseInt(playerItem.dataset.index);
                    const nameSpan = playerItem.querySelector('.player-name');
                    const pageKey = `page${page}`;
                    
                    // 创建输入框
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.className = 'name-input';
                    input.value = scorePlayers[pageKey][playerIndex].name;
                    
                    // 替换为输入框
                    nameSpan.replaceWith(input);
                    input.focus();
                    
                    // 保存处理
                    const saveName = () => {
                        const newName = input.value.trim() || `玩家${playerIndex + 1}`;
                        scorePlayers[pageKey][playerIndex].name = newName;
                        savePlayers(pageKey);
                        
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
        
        // 为2V和3V模式的每个小组添加事件监听
        if (page === 3 || page === 4) {
            const groupCount = page === 3 ? 3 : 2;
            for (let group = 1; group <= groupCount; group++) {
                const subListId = `playersList${page}-${group}`;
                const subListElement = document.getElementById(subListId);
                
                if (subListElement) {
                    subListElement.addEventListener('click', (e) => {
                        if (e.target.classList.contains('edit-name-btn')) {
                            const playerItem = e.target.closest('.player-item');
                            const playerIndex = parseInt(playerItem.dataset.index);
                            const nameSpan = playerItem.querySelector('.player-name');
                            const pageKey = `page${page}`;
                            
                            // 创建输入框
                            const input = document.createElement('input');
                            input.type = 'text';
                            input.className = 'name-input';
                            input.value = scorePlayers[pageKey][playerIndex].name;
                            
                            // 替换为输入框
                            nameSpan.replaceWith(input);
                            input.focus();
                            
                            // 保存处理
                            const saveName = () => {
                                const newName = input.value.trim() || `玩家${playerIndex + 1}`;
                                scorePlayers[pageKey][playerIndex].name = newName;
                                savePlayers(pageKey);
                                
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
            }
        }
    }
}

// 设置记分板分数操作事件
function setupScoreboardEventListeners() {
    // 为每个页面的玩家列表添加事件监听
    for (let page = 1; page <= totalPages; page++) {
        const listId = `playersList${page}`;
        const listElement = document.getElementById(listId);
        
        if (listElement) {
            listElement.addEventListener('click', (e) => {
                handlePlayerAction(e, page);
            });
        }
        
        // 为2V和3V模式的每个小组添加事件监听
        if (page === 3 || page === 4) {
            const groupCount = page === 3 ? 3 : 2;
            for (let group = 1; group <= groupCount; group++) {
                const subListId = `playersList${page}-${group}`;
                const subListElement = document.getElementById(subListId);
                
                if (subListElement) {
                    subListElement.addEventListener('click', (e) => {
                        handlePlayerAction(e, page);
                    });
                }
            }
        }
    }
}

// 处理玩家操作
function handlePlayerAction(e, page) {
    const btn = e.target.closest('.score-btn');
    if (!btn) return;
    
    const playerItem = btn.closest('.player-item');
    const playerIndex = parseInt(playerItem.dataset.index);
    const action = btn.dataset.action;
    const pageKey = `page${page}`;
    
    if (action === 'plus') {
        scorePlayers[pageKey][playerIndex].score++;
    } else if (action === 'minus' && scorePlayers[pageKey][playerIndex].score > 0) {
        scorePlayers[pageKey][playerIndex].score--;
    }
    
    savePlayers(pageKey);
    renderScoreboard(page);
    
    // 如果是团队模式，更新团队总分
    if (page === 3 || page === 4) {
        updateTeamScores(page);
    }
}

// 翻页函数
function nextPage() {
    currentPage = (currentPage % totalPages) + 1;
    switchPage(currentPage);
}

function prevPage() {
    currentPage = (currentPage - 2 + totalPages) % totalPages + 1;
    switchPage(currentPage);
}

function switchPage(page) {
    // 隐藏所有页面
    for (let i = 1; i <= totalPages; i++) {
        document.getElementById(`page${i}`).classList.remove('active');
    }
    
    // 显示当前页面
    document.getElementById(`page${page}`).classList.add('active');
    
    // 更新标题
    const titles = [
        "滴血",
        "抢分",
        "2V",
        "3V"
    ];
    scoreboardTitle.textContent = titles[page - 1];
    
    // 渲染当前页面的记分板
    renderScoreboard(page);
    
    // 如果是团队模式，更新团队总分
    if (page === 3 || page === 4) {
        updateTeamScores(page);
    }
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

// 渲染地图卡片（添加星级显示）
function renderMapCards(mapList) {
    mapContainer.innerHTML = '';
    
    const bgColor = mapSetColors[currentMapSet].bg;
    
    mapList.forEach(map => {
        const isExcluded = excludedMaps[map.name] && excludedMaps[map.name][currentMapSet];
        const card = document.createElement('div');
        card.className = `map-card ${isExcluded ? 'selected' : ''}`;
        
        // 添加星级显示（耀猫杯不显示）
        const starHtml = currentMapSet !== 'yaomao' && map.stars 
            ? `<div class="star-rating">${map.stars}✯</div>` 
            : '';
            
        card.innerHTML = `
            <img src="${map.image}" alt="${map.name}" class="map-image">
            <div class="map-name" style="background-color: ${bgColor};">${map.name}</div>
            ${starHtml}
        `;
        mapContainer.appendChild(card);
    });
}

// 切换地图排除状态
function toggleMapExclusion(mapName) {
    if (!excludedMaps[mapName]) {
        excludedMaps[mapName] = {};
    }
    
    // 如果当前地图已被排除，则取消排除；否则标记为排除
    excludedMaps[mapName][currentMapSet] = !excludedMaps[mapName][currentMapSet];
    
    localStorage.setItem('excludedMaps', JSON.stringify(excludedMaps));
    renderMapCards(currentMapList);
}

// 随机选择地图
function selectRandomMap() {
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
function renderScoreboard(page) {
    const pageKey = `page${page}`;
    
    if (page === 1 || page === 2) {
        // 滴血和抢分模式
        const listId = `playersList${page}`;
        const listElement = document.getElementById(listId);
        listElement.innerHTML = '';
        
        scorePlayers[pageKey].forEach((player, index) => {
            const playerItem = createPlayerItem(player, index, pageKey);
            listElement.appendChild(playerItem);
        });
    } else if (page === 3) {
        // 2V模式 - 3组
        for (let group = 0; group < 3; group++) {
            const listId = `playersList3-${group + 1}`;
            const listElement = document.getElementById(listId);
            listElement.innerHTML = '';
            
            // 使用全局索引遍历所有玩家
            scorePlayers[pageKey].forEach((player, globalIndex) => {
                // 只添加属于当前组的玩家
                if (player.group === group) {
                    const playerItem = createPlayerItem(player, globalIndex, pageKey);
                    listElement.appendChild(playerItem);
                }
            });
        }
    } else if (page === 4) {
        // 3V模式 - 2组
        for (let group = 0; group < 2; group++) {
            const listId = `playersList4-${group + 1}`;
            const listElement = document.getElementById(listId);
            listElement.innerHTML = '';
            
            // 使用全局索引遍历所有玩家
            scorePlayers[pageKey].forEach((player, globalIndex) => {
                // 只添加属于当前组的玩家
                if (player.group === group) {
                    const playerItem = createPlayerItem(player, globalIndex, pageKey);
                    listElement.appendChild(playerItem);
                }
            });
        }
    }
}

// 创建玩家项 - 取消编辑按钮，改为双击编辑名字
function createPlayerItem(player, index, pageKey) {
    const playerItem = document.createElement('li');
    playerItem.className = 'player-item';
    playerItem.dataset.index = index;
    
    // 移除编辑按钮，只保留名字元素
    playerItem.innerHTML = `
        <div class="player-name-container">
            <span class="player-name">${player.name}</span>
        </div>
        <span class="player-score">${player.score}</span>
        <div class="score-controls">
            <button class="score-btn" data-action="minus">-</button>
            <button class="score-btn" data-action="plus">+</button>
        </div>
    `;
    
    // 为玩家名字添加双击编辑功能
    const nameElement = playerItem.querySelector('.player-name');
    nameElement.addEventListener('dblclick', function() {
        // 创建输入框
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'name-input';
        input.value = player.name;
        
        // 替换名字元素
        nameElement.replaceWith(input);
        input.focus();
        input.select();
        
        // 保存新名字
        const saveName = () => {
            const newName = input.value.trim() || `玩家${index + 1}`;
            player.name = newName;
            savePlayers(pageKey);
            
            // 恢复为显示名字
            const newNameSpan = document.createElement('span');
            newNameSpan.className = 'player-name';
            newNameSpan.textContent = newName;
            input.replaceWith(newNameSpan);
            
            // 重新添加双击事件
            newNameSpan.addEventListener('dblclick', arguments.callee);
        };
        
        // 回车保存
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                saveName();
            }
        });
        
        // 失去焦点保存
        input.addEventListener('blur', saveName);
    });
    
    return playerItem;
}

// 更新团队总分
function updateTeamScores(page) {
    const pageKey = `page${page}`;
    
    if (page === 3) {
        // 2V模式 - 3组
        for (let group = 0; group < 3; group++) {
            const groupPlayers = scorePlayers[pageKey].filter(p => p.group === group);
            const teamScore = groupPlayers.reduce((sum, player) => sum + player.score, 0);
            document.getElementById(`team${group + 1}Score`).textContent = teamScore;
        }
    } else if (page === 4) {
        // 3V模式 - 2组
        for (let group = 0; group < 2; group++) {
            const groupPlayers = scorePlayers[pageKey].filter(p => p.group === group);
            const teamScore = groupPlayers.reduce((sum, player) => sum + player.score, 0);
            document.getElementById(`team${group + 4}Score`).textContent = teamScore;
        }
    }
}

// 保存玩家数据
function savePlayers(pageKey) {
    localStorage.setItem(`players_${pageKey}`, JSON.stringify(scorePlayers[pageKey]));
}

// 重置所有分数
function resetScores() {
    if (confirm('确定要重置所有分数吗？')) {
        // 重置当前页面的分数
        const pageKey = `page${currentPage}`;
        
        scorePlayers[pageKey].forEach(player => {
            if (currentPage === 1) {
                player.score = 6; // 滴血模式默认6分
            } else {
                player.score = 0; // 其他模式默认0分
            }
        });
        
        savePlayers(pageKey);
        renderScoreboard(currentPage);
        
        // 如果是团队模式，更新团队总分
        if (currentPage === 3 || currentPage === 4) {
            updateTeamScores(currentPage);
        }
    }
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