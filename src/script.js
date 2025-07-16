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
    { name: "熔岩古墓", image: "images/熔岩古墓.jpg", stars: 5 },
    { name: "瓦特厂房", image: "images/瓦特厂房.jpg", stars: 6 },
    { name: "古城秘境", image: "images/古城秘境.jpg", stars: 4 },
    { name: "西部矿山", image: "images/西部矿山.jpg", stars: 5 },
    { name: "66号公路", image: "images/66号公路.jpg", stars: 5 },
    { name: "森林发卡", image: "images/森林发卡.jpg", stars: 5 },
    { name: "秋之物语", image: "images/秋之物语.jpg", stars: 4 },
    { name: "美洲大峡谷", image: "images/美洲大峡谷.jpg", stars: 6 },
    { name: "苏格兰场", image: "images/苏格兰场.jpg", stars: 6 },
    { name: "VANS机场", image: "images/VANS机场.jpg", stars: 4 },
    { name: "雪山遗迹", image: "images/雪山遗迹.jpg", stars: 5 },
    { name: "莫高窟", image: "images/莫高窟.jpg", stars: 5 },
    { name: "西湖", image: "images/西湖.jpg", stars: 4 },
    { name: "原野之歌", image: "images/原野之歌.jpg", stars: 4 },
    { name: "卡帕多西亚", image: "images/卡帕多西亚.jpg", stars: 4 },
    { name: "千年丝路", image: "images/千年丝路.jpg", stars: 3 },
    { name: "桃园剑阁", image: "images/桃园剑阁.jpg", stars: 4 },
    { name: "TROY - 零号试验场", image: "images/零号试验场.jpg", stars: 4 },
    { name: "幻音城假日", image: "images/幻音城假日.jpg", stars: 4 },
    { name: "长城", image: "images/长城.jpg", stars: 4 },
    { name: "新天鹅堡", image: "images/新天鹅堡.jpg", stars: 4 },
    { name: "一路向黔", image: "images/一路向黔.jpg", stars: 3 },
    { name: "千户苗寨", image: "images/千户苗寨.jpg", stars: 4 },
    { name: "阿尔法总部", image: "images/阿尔法总部.jpg", stars: 3 },
    { name: "梦回古蜀", image: "images/梦回古蜀.jpg", stars: 4 },
    { name: "海滨之眼", image: "images/海滨之眼.jpg", stars: 3},
    { name: "山雪游龙", image: "images/山雪游龙.jpg", stars: 2},
    { name: "雾山枫吟", image: "images/雾山枫吟.jpg", stars: 3},
    { name: "恋恋千阳", image: "images/恋恋千阳.jpg", stars: 3},
    { name: "北海渔场", image: "images/北海渔场.jpg", stars: 3},
    { name: "天机阁", image: "images/天机阁.jpg", stars: 7},
    { name: "一梦青花", image: "images/一梦青花.jpg", stars: 3},
    { name: "极星幻域", image: "images/极星幻域.jpg", stars: 4},
    { name: "灵蛇传说", image: "images/灵蛇传说.jpg", stars: 7 },
    { name: "雪境裂渊", image: "images/雪境裂渊.jpg", stars: 5 },
    { name: "缤纷夏日", image: "images/缤纷夏日.jpg", stars: 4 }
];
// 年度车王地图列表 - 使用本地图片
const annualChampionMapList = [
    { name: "66号公路", image: "images/66号公路.jpg", stars: 5 },
    { name: "古城秘境", image: "images/古城秘境.jpg", stars: 4 },
    { name: "老街工地", image: "images/老街工地.jpg", stars: 5 },
    { name: "熔岩古墓", image: "images/熔岩古墓.jpg", stars: 5 },
    { name: "新天鹅堡", image: "images/新天鹅堡.jpg", stars: 4 },
    { name: "TROY - 零号试验场", image: "images/零号试验场.jpg", stars: 4 },
    { name: "秋之物语", image: "images/秋之物语.jpg", stars: 4 },
    { name: "老街迷宫", image: "images/老街迷宫.jpg", stars: 4 },
    { name: "森林发卡", image: "images/森林发卡.jpg", stars: 5 },
    { name: "恋恋千阳", image: "images/恋恋千阳.jpg", stars: 3 },
    { name: "VANS机场", image: "images/VANS机场.jpg", stars: 4 },
    { name: "缤纷夏日", image: "images/缤纷夏日.jpg", stars: 4 },
    { name: "美洲大峡谷", image: "images/美洲大峡谷.jpg", stars: 6 },
    { name: "苏格兰场", image: "images/苏格兰场.jpg", stars: 6 },
    { name: "雪山遗迹", image: "images/雪山遗迹.jpg", stars: 5 },
    { name: "阿尔法总部", image: "images/阿尔法总部.jpg", stars: 3 },
    { name: "幻音城假日", image: "images/幻音城假日.jpg", stars: 4 },
    { name: "梦回古蜀", image: "images/梦回古蜀.jpg", stars: 4 },
    { name: "桃源剑阁", image: "images/桃源剑阁.jpg", stars: 4 },
    { name: "山雪游龙", image: "images/山雪游龙.jpg", stars: 2 },
    { name: "秋名山", image: "images/秋名山.jpg", stars: 5 },
    { name: "极星幻域", image: "images/极星幻域.jpg", stars: 4 },
    { name: "莫高窟", image: "images/莫高窟.jpg", stars: 5 },
    { name: "千户苗寨", image: "images/千户苗寨.jpg", stars: 4 },
    { name: "一路向黔", image: "images/一路向黔.jpg", stars: 3 },
    { name: "霆城新港", image: "images/霆城新港.jpg", stars: 2},
    { name: "雪境裂渊", image: "images/雪境裂渊.jpg", stars: 5 },
    { name: "千年丝路", image: "images/千年丝路.jpg", stars: 3},
    { name: "瓦特厂房", image: "images/瓦特厂房.jpg", stars: 6 },
    { name: "原野之歌", image: "images/原野之歌.jpg", stars: 4 },
    { name: "海滨发卡", image: "images/海滨发卡.jpg", stars: 5 },
    { name: "雾山风吟", image: "images/雾山风吟.jpg", stars: 3 },
    { name: "海滨之眼", image: "images/海滨之眼.jpg", stars: 3 },
    { name: "西部矿山", image: "images/西部矿山.jpg", stars: 5 },
    { name: "灵蛇传说", image: "images/灵蛇传说.jpg", stars: 7 },
    { name: "古堡森林", image: "images/古堡森林.jpg", stars: 5 },
    { name: "卡帕多西亚", image: "images/卡帕多西亚.jpg", stars: 4 },
    { name: "1号公路", image: "images/1号公路.jpg", stars: 4 },
    { name: "西湖", image: "images/西湖.jpg", stars: 4 },
    { name: "长城", image: "images/长城.jpg", stars: 4 }
];
// S6公开地图库 - 添加星级
const s6MapList = [
    { name: "66号公路", image: "images/66号公路.jpg", stars: 5 },
    { name: "古城秘境", image: "images/古城秘境.jpg", stars: 4 },
    { name: "老街工地", image: "images/老街工地.jpg", stars: 5 },
    { name: "熔岩古墓", image: "images/熔岩古墓.jpg", stars: 5 },
    { name: "新天鹅堡", image: "images/新天鹅堡.jpg", stars: 4 },
    { name: "TROY - 零号试验场", image: "images/零号试验场.jpg", stars: 4 },
    { name: "秋之物语", image: "images/秋之物语.jpg", stars: 4 },
    { name: "老街迷宫", image: "images/老街迷宫.jpg", stars: 4 },
    { name: "森林发卡", image: "images/森林发卡.jpg", stars: 5 },
    { name: "恋恋千阳", image: "images/恋恋千阳.jpg", stars: 3 },
    { name: "VANS机场", image: "images/VANS机场.jpg", stars: 4 },
    { name: "冰雪欢乐城", image: "images/冰雪欢乐城.jpg", stars: 3 },
    { name: "美洲大峡谷", image: "images/美洲大峡谷.jpg", stars: 6 },
    { name: "苏格兰场", image: "images/苏格兰场.jpg", stars: 6 },
    { name: "雪山遗迹", image: "images/雪山遗迹.jpg", stars: 5 },
    { name: "阿尔法总部", image: "images/阿尔法总部.jpg", stars: 3 },
    { name: "幻音城假日", image: "images/幻音城假日.jpg", stars: 4 },
    { name: "天玑阁", image: "images/天机阁.jpg", stars: 7 },
    { name: "桃源剑阁", image: "images/桃源剑阁.jpg", stars: 4 },
    { name: "海滨发卡", image: "images/海滨发卡.jpg", stars: 5 },
    { name: "太空边境", image: "images/太空边境.jpg", stars: 6 },
    { name: "黄河万里奔流", image: "images/黄河万里奔流.jpg", stars: 3},
    { name: "莫高窟", image: "images/莫高窟.jpg", stars: 5 },
    { name: "千户苗寨", image: "images/千户苗寨.jpg", stars: 4 },
    { name: "一路向黔", image: "images/一路向黔.jpg", stars: 3 },
    { name: "海滨小镇", image: "images/海滨小镇.jpg", stars: 3 },
    { name: "雪境裂渊", image: "images/雪境裂渊.jpg", stars: 5 },
    { name: "赤城红叶", image: "images/赤城红叶.jpg", stars: 4 },
    { name: "瓦特厂房", image: "images/瓦特厂房.jpg", stars: 6 },
    { name: "原野之歌", image: "images/原野之歌.jpg", stars: 4 },
    { name: "火星基地", image: "images/火星基地.jpg", stars: 6 },
    { name: "雾山风吟", image: "images/雾山风吟.jpg", stars: 3 },
    { name: "敦煌石窟", image: "images/敦煌石窟.jpg", stars: 5 },
    { name: "西部矿山", image: "images/西部矿山.jpg", stars: 5 },
    { name: "灵蛇传说", image: "images/灵蛇传说.jpg", stars: 7 },
    { name: "古堡森林", image: "images/古堡森林.jpg", stars: 5 },
    { name: "卡帕多西亚", image: "images/卡帕多西亚.jpg", stars: 4 },
    { name: "1号公路", image: "images/1号公路.jpg", stars: 4 },
    { name: "西湖", image: "images/西湖.jpg", stars: 4 },
    { name: "长城", image: "images/长城.jpg", stars: 4 }
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
    { name: "利维坦激流", image: "images/利维坦激流.jpg" },
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
    "这图我闭着眼开",
    "选这图稳了",
    "这图用脚操作都能赢",
    "这图我家猫看了都摇头"
];

        // 胡布斯财富排行榜数据（前100条）
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
            { rank: 11, name: "暴龙神", wealth: 524399 },
            { rank: 12, name: "菜就多练", wealth: 428160 },
            { rank: 13, name: "老年选手", wealth: 339042 },
            { rank: 14, name: "恋爱", wealth: 325474 },
            { rank: 15, name: "阿强", wealth: 305325 },
            { rank: 16, name: "清漪", wealth: 290370 },
            { rank: 17, name: "御姐", wealth: 263954 },
            { rank: 18, name: "安安教练", wealth: 250258 },
            { rank: 19, name: "若晴", wealth: 238693 },
            { rank: 20, name: "全服让一分", wealth: 224209 },
            { rank: 21, name: "清清", wealth: 222757 },
            { rank: 22, name: "晴天", wealth: 219142 },
            { rank: 23, name: "薛之谦", wealth: 214489 },
            { rank: 24, name: "别离", wealth: 210087 },
            { rank: 25, name: "小玖", wealth: 207280 },
            { rank: 26, name: "车王冠军丶胡旭", wealth: 202833 },
            { rank: 27, name: "啊钦", wealth: 172211 },
            { rank: 28, name: "无敌飞车大王", wealth: 169842 },
            { rank: 29, name: "颠覆丶战伯冰", wealth: 168118 },
            { rank: 30, name: "七分糖", wealth: 166594 },
            { rank: 31, name: "啊羡丶", wealth: 166260 },
            { rank: 32, name: "vvv", wealth: 163444 },
            { rank: 33, name: "回眸丶谁浅笑", wealth: 158414 },
            { rank: 34, name: "kidd", wealth: 156762 },
            { rank: 35, name: "枨", wealth: 142778 },
            { rank: 36, name: "idan", wealth: 140354 },
            { rank: 37, name: "叶凡", wealth: 138898 },
            { rank: 38, name: "迷死她薄冰", wealth: 136177 },
            { rank: 39, name: "猛虎王阿芙拉", wealth: 128591 },
            { rank: 40, name: "贩卖小黄", wealth: 128184 },
            { rank: 41, name: "迷死她伯冰丶", wealth: 127614 },
            { rank: 42, name: "那梦里见丶", wealth: 121656 },
            { rank: 43, name: "大爱仙尊", wealth: 120840 },
            { rank: 44, name: "哦否", wealth: 120027 },
            { rank: 45, name: "Happy", wealth: 119536 },
            { rank: 46, name: "迷死她丶伯冰", wealth: 112670 },
            { rank: 47, name: "旭你真猛", wealth: 108352 },
            { rank: 48, name: "陈伯", wealth: 107634 },
            { rank: 49, name: "木槿", wealth: 105544 },
            { rank: 50, name: "Bamboo", wealth: 105364 },
            { rank: 51, name: "懒羊羊", wealth: 105316 },
            { rank: 52, name: "lancerovo", wealth: 103432 },
            { rank: 53, name: "我有四根大瘠薄", wealth: 98894 },
            { rank: 54, name: "中华儿女", wealth: 98098 },
            { rank: 55, name: "Tulip", wealth: 97875 },
            { rank: 56, name: "奥", wealth: 95458 },
            { rank: 57, name: "重拾快樂", wealth: 93665 },
            { rank: 58, name: "猪油渣", wealth: 92508 },
            { rank: 59, name: "等风", wealth: 89978 },
            { rank: 60, name: "Prince995", wealth: 89968 },
            { rank: 61, name: "萝莉", wealth: 89180 },
            { rank: 62, name: "null", wealth: 88376 },
            { rank: 63, name: "梦昧", wealth: 88305 },
            { rank: 64, name: "吴亦凡", wealth: 88300 },
            { rank: 65, name: "F3", wealth: 88000 },
            { rank: 66, name: "帝尊", wealth: 88000 },
            { rank: 67, name: "七喜", wealth: 88000 },
            { rank: 68, name: "过往", wealth: 85439 },
            { rank: 69, name: "院长观鱼赏花", wealth: 85164 },
            { rank: 70, name: "小鸟游六花", wealth: 84745 },
            { rank: 71, name: "太子", wealth: 84650 },
            { rank: 72, name: "娃哈哈", wealth: 83932 },
            { rank: 73, name: "飞车创口贴", wealth: 80482 },
            { rank: 74, name: "老豆", wealth: 79862 },
            { rank: 75, name: "纵横丶野蛮家", wealth: 79688 },
            { rank: 76, name: "技师", wealth: 78110 },
            { rank: 77, name: "多冰三分糖", wealth: 77309 },
            { rank: 78, name: "薄青", wealth: 74437 },
            { rank: 79, name: "若愉", wealth: 70606 },
            { rank: 80, name: "weiweiwang", wealth: 70447 },
            { rank: 81, name: "林子", wealth: 69844 },
            { rank: 82, name: "今晚吃什么", wealth: 69520 },
            { rank: 83, name: "天命", wealth: 68456 },
            { rank: 84, name: "迷死他柏冰丶", wealth: 68010 },
            { rank: 85, name: "Jk", wealth: 67850 },
            { rank: 86, name: "F1", wealth: 66914 },
            { rank: 87, name: "落红不是无情物", wealth: 64396 },
            { rank: 88, name: "浮生若梦", wealth: 64214 },
            { rank: 89, name: "Ari", wealth: 62902 },
            { rank: 90, name: "宇宙第一装逼王", wealth: 61212 },
            { rank: 91, name: "资本", wealth: 59066 },
            { rank: 92, name: "axf", wealth: 58241 },
            { rank: 93, name: "街留子", wealth: 57524 },
            { rank: 94, name: "阿柒", wealth: 54372 },
            { rank: 95, name: "瑾曦", wealth: 53146 },
            { rank: 96, name: "QAQ", wealth: 52663 },
            { rank: 97, name: "迷死她丨伯冰丶", wealth: 52501 },
            { rank: 98, name: "春日野悠", wealth: 50624 },
            { rank: 99, name: "颠覆丶恋晴", wealth: 50198 },
            { rank: 100, name: "A", wealth: 50158 }
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

// 创建玩家项 - 添加分数双击编辑功能
function createPlayerItem(player, index, pageKey) {
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
    
    // 添加双击编辑分数功能
    const scoreElement = playerItem.querySelector('.player-score');
    scoreElement.addEventListener('dblclick', function() {
        // 创建输入框
        const input = document.createElement('input');
        input.type = 'number';
        input.className = 'score-input';
        input.value = player.score;
        
        // 替换分数元素
        scoreElement.replaceWith(input);
        input.focus();
        input.select();
        
        // 保存新分数
        const saveScore = () => {
            const newScore = parseInt(input.value) || 0;
            player.score = newScore;
            savePlayers(pageKey);
            
            // 恢复为显示分数
            const newScoreSpan = document.createElement('span');
            newScoreSpan.className = 'player-score';
            newScoreSpan.textContent = newScore;
            input.replaceWith(newScoreSpan);
            
            // 重新添加双击事件
            newScoreSpan.addEventListener('dblclick', arguments.callee);
            
            // 如果是团队模式，更新团队总分
            const page = parseInt(pageKey.replace('page', ''));
            if (page === 3 || page === 4) {
                updateTeamScores(page);
            }
        };
        
        // 回车保存
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                saveScore();
            }
        });
        
        // 失去焦点保存
        input.addEventListener('blur', saveScore);
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