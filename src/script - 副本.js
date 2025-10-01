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
    s6: { bg: '#e74c3c', hover: '#c0392b' },
    yaomao: { bg: '#f1c40f', hover: '#f39c12' },
    teach: { bg: '#e84393', hover: '#d63031' } // 新增教学地图颜色
};

// 修改后的教学地图列表，每个地图都有5个视频
const teachMapList = [
    { 
        name: "大大鹅教学", 
        image: "images/大大鹅.jpg", 
        videos: [
            { title: "大鹅教学", url: "videos/0.mp4" }
        ]
    },
    { 
        name: "秋之物语", 
        image: "images/秋之物语.jpg", 
        videos: [
            { title: "牵引大招", url: "videos/1.mp4" },
            { title: "完整跑法", url: "videos/2.mp4" }
        ]
    },
    { 
        name: "一路向黔", 
        image: "images/一路向黔.jpg", 
        videos: [
            { title: "起步3连卡", url: "videos/21.mp4" },
            { title: "加速带3连卡", url: "videos/22.mp4" },
            { title: "加速带钞票", url: "videos/23.mp4" },
            { title: "终点钞票", url: "videos/24.mp4" },
            { title: "完整跑法", url: "videos/25.mp4" }
        ]
    },
 { 
        name: "海滨之眼", 
        image: "images/海滨之眼.jpg", 
        videos: [
            { title: "完整跑法", url: "videos/31.mp4" }
        ]
    },
    { 
        name: "66号公路", 
        image: "images/66号公路.jpg", 
        videos: [
            { title: "完整跑法", url: "videos/1.mp4" }
        ]
    },
    { 
        name: "美洲大峡谷", 
        image: "images/美洲大峡谷.jpg", 
        videos: [
            { title: "完整跑法", url: "videos/2.mp4" }
        ]
    },
    { 
        name: "熔炉角斗场", 
        image: "images/熔炉角斗场.jpg", 
        videos: [
            { title: "完整跑法", url: "videos/3.mp4" }
        ]
    },
    { 
        name: "人鱼岛探险", 
        image: "images/人鱼岛探险.jpg", 
        videos: [
            { title: "完整跑法", url: "videos/4.mp4" }
        ]
    },
    { 
        name: "山雪游龙", 
        image: "images/山雪游龙.jpg", 
        videos: [
            { title: "完整跑法", url: "videos/5.mp4" }
        ]
    },
    { 
        name: "火星基地", 
        image: "images/火星基地.jpg", 
        videos: [
            { title: "完整跑法", url: "videos/6.mp4" }
        ]
    },
    { 
        name: "极星幻域", 
        image: "images/极星幻域.jpg", 
        videos: [
            { title: "完整跑法", url: "videos/7.mp4" }
        ]
    },
    { 
        name: "古城秘境", 
        image: "images/古城秘境.jpg", 
        videos: [
            { title: "完整跑法", url: "videos/8.mp4" }
        ]
    },
    { 
        name: "海滨发卡", 
        image: "images/海滨发卡.jpg", 
        videos: [
            { title: "完整跑法", url: "videos/9.mp4" }
        ]
    },
    { 
        name: "苏格兰场", 
        image: "images/苏格兰场.jpg", 
        videos: [
            { title: "完整跑法", url: "videos/10.mp4" }
        ]
    },
    { 
        name: "古堡森林", 
        image: "images/古堡森林.jpg", 
        videos: [
            { title: "完整跑法", url: "videos/11.mp4" }
        ]
    },
    { 
        name: "幻海遗迹", 
        image: "images/幻海遗迹.jpg", 
        videos: [
            { title: "完整跑法", url: "videos/12.mp4" }
        ]
    },
    { 
        name: "秋之物语", 
        image: "images/秋之物语.jpg", 
        videos: [
            { title: "完整跑法", url: "videos/13.mp4" }
        ]
    },
    { 
        name: "梦回古蜀", 
        image: "images/梦回古蜀.jpg", 
        videos: [
            { title: "完整跑法", url: "videos/14.mp4" }
        ]
    },
    { 
        name: "极速列车", 
        image: "images/极速列车.jpg", 
        videos: [
            { title: "完整跑法", url: "videos/15.mp4" }
        ]
    },
    { 
        name: "老街工地", 
        image: "images/老街工地.jpg", 
        videos: [
            { title: "完整跑法", url: "videos/16.mp4" }
        ]
    },
    { 
        name: "老街迷宫", 
        image: "images/老街迷宫.jpg", 
        videos: [
            { title: "完整跑法", url: "videos/17.mp4" }
        ]
    },
    { 
        name: "阿尔法总部", 
        image: "images/阿尔法总部.jpg", 
        videos: [
            { title: "完整跑法", url: "videos/18.mp4" }
        ]
    },
    { 
        name: "利维坦激流", 
        image: "images/利维坦激流.jpg", 
        videos: [
            { title: "完整跑法", url: "videos/19.mp4" }
        ]
    },
    { 
        name: "西部矿山", 
        image: "images/西部矿山.jpg", 
        videos: [
            { title: "完整跑法", url: "videos/20.mp4" }
        ]
    },
    { 
        name: "TROY - 零号试验场", 
        image: "images/零号试验场.jpg", 
        videos: [
            { title: "完整跑法", url: "videos/21.mp4" }
        ]
    },
    { 
        name: "海滨之眼", 
        image: "images/海滨之眼.jpg", 
        videos: [
            { title: "完整跑法", url: "videos/22.mp4" }
        ]
    },
    { 
        name: "洛杉矶", 
        image: "images/洛杉矶.jpg", 
        videos: [
            { title: "完整跑法", url: "videos/23.mp4" }
        ]
    },
    { 
        name: "时之沙", 
        image: "images/时之沙.jpg", 
        videos: [
            { title: "完整跑法", url: "videos/24.mp4" }
        ]
    },
    { 
        name: "一路向黔", 
        image: "images/一路向黔.jpg", 
        videos: [
            { title: "完整跑法", url: "videos/25.mp4" }
        ]
    },
    { 
        name: "熔岩古墓", 
        image: "images/熔岩古墓.jpg", 
        videos: [
            { title: "完整跑法", url: "videos/26.mp4" }
        ]
    },
    { 
        name: "森林发卡", 
        image: "images/森林发卡.jpg", 
        videos: [
            { title: "完整跑法", url: "videos/27.mp4" }
        ]
    },
    { 
        name: "桃源剑阁", 
        image: "images/桃源剑阁.jpg", 
        videos: [
            { title: "完整跑法", url: "videos/28.mp4" }
        ]
    },
    { 
        name: "瓦特厂房", 
        image: "images/瓦特厂房.jpg", 
        videos: [
            { title: "完整跑法", url: "videos/29.mp4" }
        ]
    },
    { 
        name: "云梦泽", 
        image: "images/云梦泽.jpg", 
        videos: [
            { title: "完整跑法", url: "videos/30.mp4" }
        ]
    },
    { 
        name: "卡帕多西亚", 
        image: "images/卡帕多西亚.jpg", 
        videos: [
            { title: "完整跑法", url: "videos/31.mp4" }
        ]
    },
    { 
        name: "科隆大教堂", 
        image: "images/科隆大教堂.jpg", 
        videos: [
            { title: "完整跑法", url: "videos/32.mp4" }
        ]
    },
    { 
        name: "春天的新想乐", 
        image: "images/春天的新想乐.jpg", 
        videos: [
            { title: "完整跑法", url: "videos/33.mp4" }
        ]
    },
    { 
        name: "VANS机场", 
        image: "images/VANS机场.jpg", 
        videos: [
            { title: "完整跑法", url: "videos/34.mp4" }
        ]
    },
    { 
        name: "港湾发卡", 
        image: "images/港湾发卡.jpg", 
        videos: [
            { title: "完整跑法", url: "videos/35.mp4" }
        ]
    },
    { 
        name: "海滨小镇", 
        image: "images/海滨小镇.jpg", 
        videos: [
            { title: "完整跑法", url: "videos/36.mp4" }
        ]
    },
    { 
        name: "秋名山", 
        image: "images/秋名山.jpg", 
        videos: [
            { title: "完整跑法", url: "videos/37.mp4" }
        ]
    },
    { 
        name: "玉龙雪脉", 
        image: "images/玉龙雪脉.jpg", 
        videos: [
            { title: "完整跑法", url: "videos/38.mp4" }
        ]
    },
    { 
        name: "长城", 
        image: "images/长城.jpg", 
        videos: [
            { title: "完整跑法", url: "videos/39.mp4" }
        ]
    },
    { 
        name: "恋恋千阳", 
        image: "images/恋恋千阳.jpg", 
        videos: [
            { title: "完整跑法", url: "videos/40.mp4" }
        ]
    },
    { 
        name: "飞驰新疆", 
        image: "images/飞驰新疆.jpg", 
        videos: [
            { title: "完整跑法", url: "videos/41.mp4" }
        ]
    },
    { 
        name: "伊甸掠影", 
        image: "images/伊甸掠影.jpg", 
        videos: [
            { title: "完整跑法", url: "videos/42.mp4" }
        ]
    },
    { 
        name: "星梦游乐园", 
        image: "images/星梦游乐园.jpg", 
        videos: [
            { title: "完整跑法", url: "videos/43.mp4" }
        ]
    },
    { 
        name: "天玑阁", 
        image: "images/天机阁.jpg", 
        videos: [
            { title: "完整跑法", url: "videos/44.mp4" }
        ]
    },
    { 
        name: "恶龙城", 
        image: "images/恶龙城.jpg", 
        videos: [
            { title: "完整跑法", url: "videos/45.mp4" }
        ]
    },
    { 
        name: "亚特兰蒂斯", 
        image: "images/亚特兰蒂斯.jpg", 
        videos: [
            { title: "完整跑法", url: "videos/46.mp4" }
        ]
    },
    { 
        name: "神隐之国", 
        image: "images/神隐之国.jpg", 
        videos: [
            { title: "完整跑法", url: "videos/47.mp4" }
        ]
    },
    { 
        name: "天宫乘梦", 
        image: "images/天宫乘梦.jpg", 
        videos: [
            { title: "完整跑法", url: "videos/48.mp4" }
        ]
    },
    { 
        name: "雾山枫吟", 
        image: "images/雾山枫吟.jpg", 
        videos: [
            { title: "完整跑法", url: "videos/49.mp4" }
        ]
    },
    { 
        name: "故园归醉", 
        image: "images/故原归醉.jpg", 
        videos: [
            { title: "完整跑法", url: "videos/50.mp4" }
        ]
    },
    { 
        name: "320冒险岛", 
        image: "images/320冒险岛.jpg", 
        videos: [
            { title: "完整跑法", url: "videos/51.mp4" }
        ]
    },
    { 
        name: "玫瑰之恋", 
        image: "images/玫瑰之恋.jpg", 
        videos: [
            { title: "完整跑法", url: "videos/52.mp4" }
        ]
    },
    { 
        name: "彩虹风车岛", 
        image: "images/彩虹风车岛.jpg", 
        videos: [
            { title: "完整跑法", url: "videos/53.mp4" }
        ]
    },
    { 
        name: "敦煌石窟", 
        image: "images/敦煌石窟.jpg", 
        videos: [
            { title: "完整跑法", url: "videos/54.mp4" }
        ]
    },
    { 
        name: "玄灵峡谷", 
        image: "images/玄灵峡谷.jpg", 
        videos: [
            { title: "完整跑法", url: "videos/55.mp4" }
        ]
    },
    { 
        name: "天空之城", 
        image: "images/天空之城.jpg", 
        videos: [
            { title: "完整跑法", url: "videos/56.mp4" }
        ]
    },
    { 
        name: "炎光王城", 
        image: "images/炎光王城.jpg", 
        videos: [
            { title: "完整跑法", url: "videos/57.mp4" }
        ]
    },
    { 
        name: "龙宫", 
        image: "images/龙宫.jpg", 
        videos: [
            { title: "完整跑法", url: "videos/58.mp4" }
        ]
    },
    { 
        name: "疯狂马戏团", 
        image: "images/疯狂马戏团.jpg", 
        videos: [
            { title: "完整跑法", url: "videos/59.mp4" }
        ]
    },
    { 
        name: "冰川滑雪场", 
        image: "images/冰川滑雪场.jpg", 
        videos: [
            { title: "完整跑法", url: "videos/60.mp4" }
        ]
    },
    { 
        name: "大漠客栈", 
        image: "images/大漠客栈.jpg", 
        videos: [
            { title: "完整跑法", url: "videos/61.mp4" }
        ]
    },
    { 
        name: "千年丝路", 
        image: "images/千年丝路.jpg", 
        videos: [
            { title: "完整跑法", url: "videos/62.mp4" }
        ]
    },
    { 
        name: "灵蛇传说", 
        image: "images/灵蛇传说.jpg", 
        videos: [
            { title: "完整跑法", url: "videos/63.mp4" }
        ]
    },
    { 
        name: "霆城新港", 
        image: "images/霆城新港.jpg", 
        videos: [
            { title: "完整跑法", url: "videos/64.mp4" }
        ]
    },
    { 
        name: "绝色江西", 
        image: "images/绝色江西.jpg", 
        videos: [
            { title: "完整跑法", url: "videos/65.mp4" }
        ]
    },
    { 
        name: "一梦青花", 
        image: "images/一梦青花.jpg", 
        videos: [
            { title: "完整跑法", url: "videos/66.mp4" }
        ]
    },
    { 
        name: "飞跃神州", 
        image: "images/飞跃神州.jpg", 
        videos: [
            { title: "完整跑法", url: "videos/67.mp4" }
        ]
    },
    { 
        name: "雾山五行", 
        image: "images/雾山五行.jpg", 
        videos: [
            { title: "完整跑法", url: "videos/68.mp4" }
        ]
    },
    { 
        name: "繁花巴比伦", 
        image: "images/繁花巴比伦.jpg", 
        videos: [
            { title: "完整跑法", url: "videos/69.mp4" }
        ]
    },
    { 
        name: "流觞曲水", 
        image: "images/流觞曲水.jpg", 
        videos: [
            { title: "完整跑法", url: "videos/70.mp4" }
        ]
    }
];

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
    { name: "京华东梦", image: "images/京华东梦.jpg", stars: 3 },
    { name: "敦煌石窟", image: "images/敦煌石窟.jpg", stars: 4 },
    { name: "神都千古恒照", image: "images/神都千古恒照.jpg", stars: 3 },
    { name: "大漠客栈", image: "images/大漠客栈.jpg", stars: 3 },
    { name: "西部矿山", image: "images/西部矿山.jpg", stars: 5 },
    { name: "赤城红叶", image: "images/赤城红叶.jpg", stars: 4 },
    { name: "玉龙雪脉", image: "images/玉龙雪脉.jpg", stars: 4 },
    { name: "风吹过的夏天", image: "images/风吹过的夏天.jpg", stars: 4 },
    { name: "秋之物语", image: "images/秋之物语.jpg", stars: 3 },
    { name: "美洲大峡谷", image: "images/美洲大峡谷.jpg", stars: 5 },
    { name: "神隐之国", image: "images/神隐之国.jpg", stars: 3 },
    { name: "冰雪欢乐城", image: "images/冰雪欢乐城.jpg", stars: 4 },
    { name: "飞驰新疆", image: "images/飞驰新疆.jpg", stars: 3 },
    { name: "一梦青花", image: "images/一梦青花.jpg", stars: 3 },
    { name: "绝色江西", image: "images/绝色江西.jpg", stars: 4 },
    { name: "雾山五行", image: "images/雾山五行.jpg", stars: 3 },
    { name: "幻音城假日", image: "images/幻音城假日.jpg", stars: 3 },
    { name: "流觞曲水", image: "images/流觞曲水.jpg", stars: 5 },
    { name: "桃源剑阁", image: "images/桃源剑阁.jpg", stars: 5 },
    { name: "VANS机场", image: "images/VANS机场.jpg", stars: 4 },
    { name: "花落夏海", image: "images/花落夏海.jpg", stars: 4 },
    { name: "黄河万里奔流", image: "images/黄河万里奔流.jpg", stars: 3 },
    { name: "莫高窟", image: "images/莫高窟.jpg", stars: 5 },
    { name: "千户苗寨", image: "images/千户苗寨.jpg", stars: 3 },
    { name: "一路向黔", image: "images/一路向黔.jpg", stars: 3 },
    { name: "西湖", image: "images/西湖.jpg", stars: 4 },
    { name: "山雪游龙", image: "images/山雪游龙.jpg", stars: 2 },
    { name: "故园归醉", image: "images/故园归醉.jpg", stars: 4 },
    { name: "千年丝路", image: "images/千年丝路.jpg", stars: 3 },
    { name: "北海渔场", image: "images/北海渔场.jpg", stars: 3 },
    { name: "飞跃神州", image: "images/飞跃神州.jpg", stars: 2 },
    { name: "雾山风吟", image: "images/雾山风吟.jpg", stars: 3 },
    { name: "长城", image: "images/长城.jpg", stars: 4 },
    { name: "新天鹅堡", image: "images/新天鹅堡.jpg", stars: 4 },
    { name: "科隆大教堂", image: "images/科隆大教堂.jpg", stars: 3 },
    { name: "一路向黔", image: "images/一路向黔.jpg", stars: 3 },
    { name: "卡帕多西亚", image: "images/卡帕多西亚.jpg", stars: 5 },
    { name: "幻海遗迹", image: "images/幻海遗迹.jpg", stars: 3 },
    { name: "云游天府", image: "images/云游天府.jpg", stars: 4 },
    { name: "梦回古蜀", image: "images/梦回古蜀.jpg", stars: 3 }
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
// 获取教学地图按钮元素
const teachMapLibraryBtn = document.getElementById('teachMapLibraryBtn');
// 设置事件监听器
function setupEventListeners() {
    // 地图库切换
    s18MapLibraryBtn.addEventListener('click', () => switchMapLibrary('s18', s18MapList));
    annualChampionMapLibraryBtn.addEventListener('click', () => switchMapLibrary('annual', annualChampionMapList));
    s6MapLibraryBtn.addEventListener('click', () => switchMapLibrary('s6', s6MapList));
    yaomaoMapLibraryBtn.addEventListener('click', () => switchMapLibrary('yaomao', yaomaoMapList));
    teachMapLibraryBtn.addEventListener('click', () => switchMapLibrary('teach', teachMapList));

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

    // 修改地图卡片点击事件处理，添加教学地图的特殊处理
    mapContainer.addEventListener('click', (e) => {
        const mapCard = e.target.closest('.map-card');
        if (mapCard) {
            const mapName = mapCard.querySelector('.map-name').textContent;
            
            // 如果是教学地图，播放视频而不是排除
            if (currentMapSet === 'teach') {
                playTeachVideo(mapName);
            } else {
                toggleMapExclusion(mapName);
            }
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
// 添加播放教学视频的函数
// 修改播放教学视频的函数，添加视频切换功能
function playTeachVideo(mapName) {
    // 找到对应的地图数据
    const map = teachMapList.find(m => m.name === mapName);
    if (!map || !map.videos || map.videos.length === 0) {
        alert('该地图暂无教学视频');
        return;
    }
    
    // 创建视频模态框
    const videoModal = document.createElement('div');
    videoModal.className = 'video-modal';
    videoModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
    `;
    
    // 创建视频内容
    const videoContent = document.createElement('div');
    videoContent.className = 'video-content';
    videoContent.style.cssText = `
        position: relative;
        width: 80%;
        max-width: 800px;
        background: #000;
        border-radius: 8px;
        overflow: hidden;
    `;
    
    // 创建视频控制栏
    const videoControls = document.createElement('div');
    videoControls.className = 'video-controls';
    videoControls.style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        background: rgba(0, 0, 0, 0.7);
    `;
    
    // 创建视频选择下拉菜单（如果有多于一个视频）
    let videoSelector = null;
    if (map.videos.length > 1) {
        videoSelector = document.createElement('select');
        videoSelector.className = 'video-selector';
        videoSelector.style.cssText = `
            padding: 5px;
            border-radius: 4px;
            background: #333;
            color: white;
            border: none;
        `;
        
        map.videos.forEach((video, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = video.title;
            videoSelector.appendChild(option);
        });
        
        videoControls.appendChild(videoSelector);
    } else {
        // 只有一个视频时显示标题
        const videoTitle = document.createElement('span');
        videoTitle.textContent = map.videos[0].title;
        videoTitle.style.color = 'white';
        videoControls.appendChild(videoTitle);
    }
    
    // 创建视频元素
    const video = document.createElement('video');
    video.src = map.videos[0].url;
    video.controls = true;
    video.autoplay = true;
    video.style.width = '100%';
    
    // 创建关闭按钮
    const closeBtn = document.createElement('button');
    closeBtn.className = 'video-close';
    closeBtn.textContent = '×';
    closeBtn.style.cssText = `
        position: absolute;
        top: 10px;
        right: 10px;
        background: rgba(0, 0, 0, 0.5);
        color: white;
        border: none;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        font-size: 20px;
        cursor: pointer;
        z-index: 10;
    `;
    
    // 关闭视频模态框
    closeBtn.addEventListener('click', () => {
        video.pause();
        document.body.removeChild(videoModal);
    });
    
    // 点击背景关闭
    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            video.pause();
            document.body.removeChild(videoModal);
        }
    });
    
    // 视频切换功能
    if (videoSelector) {
        videoSelector.addEventListener('change', () => {
            const selectedIndex = parseInt(videoSelector.value);
            const currentTime = video.currentTime;
            const isPaused = video.paused;
            
            video.src = map.videos[selectedIndex].url;
            video.currentTime = currentTime;
            
            if (!isPaused) {
                video.play();
            }
        });
    }
    
    // 组装元素
    videoContent.appendChild(videoControls);
    videoContent.appendChild(video);
    videoContent.appendChild(closeBtn);
    videoModal.appendChild(videoContent);
    
    // 添加到页面
    document.body.appendChild(videoModal);
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