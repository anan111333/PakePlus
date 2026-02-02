/**
 * script.js - 东万S19车王地图库
 * 功能：地图选择、随机选图、记分板、实时公告、地图编辑、地图ID查询
 * 版本：3.2.0 (添加地图ID查询功能)
 */

// 定义地图库颜色
const mapSetColors = {
    s18: { bg: '#9b59b6', hover: '#8e44ad' },
    annual: { bg: '#e67e22', hover: '#d35400' },
    s6: { bg: '#e74c3c', hover: '#c0392b' },
    yaomao: { bg: '#f1c40f', hover: '#f39c12' },
    teach: { bg: '#e84393', hover: '#d63031' }
};

// 地图ID到名称的映射（基于您提供的数据）
const mapIdToName = {
    104: "中国城",
    105: "沉睡森林",
    108: "城市体育馆",
    111: "城市特区",
    112: "老街管道",
    113: "滨海沙滩",
    114: "道具练习场",
    118: "海洋公园",
    119: "敦煌环道",
    120: "城市游泳馆",
    121: "海滨小镇",
    122: "老街迷宫",
    123: "古堡森林",
    124: "敦煌石窟",
    129: "城市火炬",
    130: "敦煌峡谷",
    131: "老街车站",
    132: "老街工地",
    133: "海滨发卡",
    134: "中国田园",
    135: "中国钟楼",
    136: "老街仓库",
    137: "十一城",
    138: "都市迷情",
    139: "冰川甬道",
    140: "冰封谷",
    141: "熔岩古墓",
    142: "莲池幽径",
    143: "轨道23区",
    144: "云中漫步",
    145: "月牙湾",
    146: "情人结",
    147: "飞跃长城",
    148: "宝藏迷踪",
    149: "冰焰裂谷",
    150: "飞跃长城II",
    151: "极速列车",
    152: "老街船厂",
    153: "瓦特厂房",
    154: "猫工厂",
    155: "猫美拉竞技场",
    156: "刀锋峡谷竞技场",
    157: "黄金之城竞技场",
    158: "玫瑰之恋",
    159: "云之彼端",
    160: "机械公园",
    161: "余晖岛",
    162: "彩虹风车岛",
    163: "春天的新想乐",
    164: "太空迷航",
    165: "穿梭之城",
    166: "鹊桥仙境",
    167: "秋名山",
    168: "镜像十一城",
    169: "风林火山",
    170: "海贼王的宝藏",
    171: "冰上圆舞曲",
    173: "樱花富士山",
    174: "天堂之城",
    175: "琳琅天上",
    176: "甜心大教堂",
    177: "水城威尼斯",
    178: "大漠客栈",
    179: "宇航公园",
    180: "酷比空间",
    181: "古城秘境",
    182: "天国的阶梯",
    183: "法老金字塔",
    184: "暮光之城",
    185: "港湾发卡",
    186: "冰川滑雪场",
    187: "320冒险岛",
    188: "太空竞技场",
    189: "特区高速",
    190: "燕子坞",
    191: "星际彩虹",
    192: "旋转木马",
    193: "海岸城",
    194: "西部矿山",
    195: "桃花坞",
    196: "银月谷",
    197: "冰雪长城",
    198: "瑞雪春堂",
    199: "爱琴海",
    200: "玛雅古迹",
    201: "镜像游泳馆",
    202: "迷雾沼泽",
    203: "撒哈拉古墓",
    204: "玄灵峡谷",
    205: "城市运动会",
    206: "巨人国大冒险",
    207: "海滨仲夏",
    208: "亚特兰蒂斯",
    211: "深海宝藏",
    212: "赤城红叶",
    213: "祖玛神殿",
    214: "魔法森林",
    215: "镜像海滨小镇",
    216: "琳琅海湾",
    217: "极速梦想",
    218: "江南水乡",
    219: "芝麻街",
    220: "落日海港",
    221: "木叶忍者村",
    222: "玉龙雪脉",
    224: "丘比特花园",
    225: "袋鼠岛",
    226: "机械迷城",
    227: "幽灵古堡",
    228: "虚空基地",
    229: "潘多拉之星",
    230: "咕噜星",
    231: "66号公路",
    232: "绿野仙踪",
    233: "糖果乐园",
    234: "欢乐海岸",
    235: "雪地拉力",
    237: "极速之城",
    238: "时之沙",
    239: "森林发卡",
    240: "田园新干线",
    241: "机甲体育馆",
    242: "机甲风林火山",
    243: "未来城市",
    244: "薰衣草庄园",
    245: "精灵领地",
    246: "冰雪小镇",
    247: "机甲新想乐",
    248: "机甲玫瑰之恋",
    249: "机甲余晖岛",
    250: "勇者部落",
    251: "迷境之缘",
    253: "马达加斯加",
    254: "沁园春",
    255: "极地冰镇",
    256: "城市网吧",
    257: "西川古镇",
    258: "魔法学院",
    259: "章鱼八宝粥",
    260: "情迷法兰西",
    261: "广寒仙境",
    262: "雪地拉力II",
    263: "风车牧场",
    264: "鸭鸭水乐园",
    265: "甜蜜冲刺",
    266: "天空之城",
    267: "龙门新春",
    268: "我们恋爱吧",
    269: "忍者去哪儿",
    270: "51区",
    271: "机甲落日海港",
    272: "机甲咕噜星",
    273: "雪地大冒险",
    274: "巨龙的山谷",
    275: "月光之城",
    276: "风吹过的夏天",
    277: "托马斯火山湖",
    278: "迷失之城",
    279: "极速核电站",
    280: "疯狂马戏团",
    281: "罗马竞技场",
    282: "萌怪星球",
    283: "秋之物语",
    284: "舒马赫赛车场",
    285: "疯狂马戏团",
    286: "美洲大峡谷废稿",
    290: "云端小镇",
    291: "美洲大峡谷(挑战版)",
    292: "美洲大峡谷",
    294: "吉之岛",
    295: "春风唐韵",
    296: "精灵之森",
    297: "Duang!弹珠",
    298: "雪域冰城",
    299: "小猪部落",
    300: "太空新纪元",
    301: "国南之境",
    302: "维京海港",
    303: "糖果秘境",
    304: "兔兔复活岛",
    305: "峡谷狂飙",
    307: "侏罗纪公园",
    308: "里约大冒险",
    309: "空岛",
    310: "王国之路",
    311: "月夜巫堡",
    312: "玩具总动员",
    314: "happy！大眼萌",
    315: "午夜狂飙",
    316: "猴园春色",
    317: "海绵幻想世界",
    318: "勇闯巨人国",
    319: "香波岛",
    320: "神隐之国",
    321: "木叶物语",
    322: "熊猫村",
    323: "冰雪企鹅岛",
    324: "阳光码头",
    325: "里约奥运会",
    326: "鹊桥情缘",
    327: "枫叶谷",
    328: "洛杉矶",
    329: "霍比特之旅",
    330: "情迷爱琴海",
    331: "圣诞奇缘",
    332: "1号公路",
    333: "9年时光路",
    334: "梦幻珊瑚海",
    338: "魔龙猎场",
    339: "火星基地",
    340: "矿山小镇",
    341: "电音之都",
    342: "苏格兰场",
    343: "樱花祭",
    344: "极限挑战",
    345: "太空边境",
    346: "VANS机场",
    347: "因特拉肯",
    348: "雪山遗迹",
    349: "花落夏海",
    350: "失落神殿",
    351: "莫高窟",
    352: "晶焰矿山",
    353: "天空树",
    354: "龙宫",
    355: "萌犬新春",
    356: "龙腾灯海",
    357: "金门大桥",
    358: "星星火车站",
    359: "恶龙城",
    360: "王者峡谷",
    361: "南国海岛",
    362: "狂野追逐工业之都",
    363: "梦幻水乐园",
    364: "梦回波斯湾",
    365: "西湖",
    366: "时光静域",
    367: "蜂之密语",
    368: "亡灵序曲",
    369: "原野之歌",
    370: "卡帕多西亚",
    371: "人鱼岛探险",
    372: "西部荒野",
    373: "阿拉丁",
    374: "夜鸣沙都",
    375: "星际大逃亡",
    376: "故园归醉",
    377: "繁华巴比伦",
    378: "英伦古堡",
    379: "桃园剑阁",
    380: "玄门幽谷",
    381: "TROY-零号试验场",
    382: "TROY-熔炼车间",
    383: "秘境大闯关",
    384: "北海渔场",
    385: "电音梦工厂",
    386: "幻音城假日",
    387: "雷霆军港",
    389: "飞跃神州",
    390: "利维坦激流",
    391: "冰原前哨",
    392: "幻海遗迹",
    393: "长城",
    394: "新天鹅堡",
    395: "科隆大教堂",
    396: "一路向黔",
    397: "千户苗寨",
    398: "星梦游乐园",
    399: "云梦泽",
    400: "炎光王城",
    401: "时钟转转",
    402: "甜糕与滚滚",
    403: "秋去东来",
    404: "阿尔法总部",
    405: "杠上开花",
    406: "聆风镇",
    407: "滚筒回旋",
    408: "丰收的风车谷",
    409: "莲叶田田",
    411: "水车转转",
    412: "麦浪滚滚",
    413: "天玑阁废稿",
    414: "顺子大作战",
    415: "云游天府",
    416: "梦回古蜀",
    417: "极限大闯关",
    418: "海滨之眼",
    420: "山雪游龙",
    421: "京华东梦",
    422: "雾山枫吟",
    423: "天宫乘梦",
    424: "极速航天城",
    425: "未知地图1",
    426: "龙门大闯关",
    427: "恋恋千阳",
    428: "黄河万里奔流",
    429: "神都千古恒照",
    430: "雪山之巅",
    431: "龙晶大闯关",
    432: "未知地图2",
    433: "天机阁",
    434: "超弦基地",
    435: "熔炉角斗场",
    436: "流觞曲水",
    438: "绝色江西",
    439: "一梦青花",
    441: "极星幻域",
    446: "冰雪欢乐城",
    447: "伊甸掠影",
    448: "裂境深渊",
    449: "缤纷夏日",
    450: "雾山五行",
    452: "冲刺大闯关",
    453: "飞驰新疆",
    454: "秋名山高清",
    455: "千年丝路",
    456: "千年丝路",
    458: "霆城新港",
    459: "灵蛇传说",
    460: "特洛伊环城"
};

// 创建名称到ID的反向映射
const nameToMapId = {};
for (const [id, name] of Object.entries(mapIdToName)) {
    nameToMapId[name] = parseInt(id);
}

// 根据地图名称生成图片路径
function getImagePathFromName(mapName) {
    // 移除可能的特殊字符和空格
    const cleanName = mapName.replace(/[\/\\:*?"<>|]/g, '').trim();
    return `images/${cleanName}.jpg`;
}

// 根据地图ID获取地图信息
function getMapInfoById(mapId) {
    if (!mapIdToName[mapId]) {
        return null;
    }
    
    const mapName = mapIdToName[mapId];
    return {
        id: parseInt(mapId),
        name: mapName,
        image: getImagePathFromName(mapName)
    };
}

// 修改后的教学地图列表
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
    { name: "66号公路", image: "images/66号公路.jpg", stars: 5, mapId: 231 },
    { name: "老街工地", image: "images/老街工地.jpg", stars: 5, mapId: 132 },
    { name: "繁花巴比伦", image: "images/繁花巴比伦.jpg", stars: 4, mapId: 377 },
    { name: "海滨发卡", image: "images/海滨发卡.jpg", stars: 5, mapId: 133 },
    { name: "TROY-零号试验场", image: "images/零号试验场.jpg", stars: 4, mapId: 381 },
    { name: "老街迷宫", image: "images/老街迷宫.jpg", stars: 4, mapId: 122 },
    { name: "320冒险岛", image: "images/320冒险岛.jpg", stars: 3, mapId: 187 },
    { name: "雾山枫吟", image: "images/雾山枫吟.jpg", stars: 3, mapId: 422 },
    { name: "VANS机场", image: "images/VANS机场.jpg", stars: 4, mapId: 346 },
    { name: "美洲大峡谷", image: "images/美洲大峡谷.jpg", stars: 6, mapId: 292 },
    { name: "雪山遗迹", image: "images/雪山遗迹.jpg", stars: 5, mapId: 348 },
    { name: "海滨之眼", image: "images/海滨之眼.jpg", stars: 3, mapId: 418 },
    { name: "阿尔法总部", image: "images/阿尔法总部.jpg", stars: 3, mapId: 404 },
    { name: "梦回古蜀", image: "images/梦回古蜀.jpg", stars: 4, mapId: 416 },
    { name: "山雪游龙", image: "images/山雪游龙.jpg", stars: 2, mapId: 420 },
    { name: "西部矿山", image: "images/西部矿山.jpg", stars: 5, mapId: 194 },
    { name: "一梦青花", image: "images/一梦青花.jpg", stars: 3, mapId: 439 },
    { name: "莫高窟", image: "images/莫高窟.jpg", stars: 5, mapId: 351 },
    { name: "一路向黔", image: "images/一路向黔.jpg", stars: 3, mapId: 396 },
    { name: "天玑阁", image: "images/天机阁.jpg", stars: 4, mapId: 433 },
    { name: "古城秘境", image: "images/古城秘境.jpg", stars: 4, mapId: 181 },
    { name: "熔岩古墓", image: "images/熔岩古墓.jpg", stars: 5, mapId: 141 },
    { name: "花落夏海", image: "images/花落夏海.jpg", stars: 4, mapId: 349 },
    { name: "古堡森林", image: "images/古堡森林.jpg", stars: 5, mapId: 123 },
    { name: "秋之物语", image: "images/秋之物语.jpg", stars: 4, mapId: 283 },
    { name: "森林发卡", image: "images/森林发卡.jpg", stars: 5, mapId: 239 },
    { name: "雪域裂渊", image: "images/雪境裂渊.jpg", stars: 5, mapId: 448 },
    { name: "卡帕多西亚", image: "images/卡帕多西亚.jpg", stars: 4, mapId: 370 },
    { name: "缤纷夏日", image: "images/缤纷夏日.jpg", stars: 4, mapId: 449 },
    { name: "苏格兰场", image: "images/苏格兰场.jpg", stars: 6, mapId: 342 },
    { name: "千年丝路", image: "images/千年丝路.jpg", stars: 3, mapId: 455 },
    { name: "灵蛇传说", image: "images/灵蛇传说.jpg", stars: 7, mapId: 459 },
    { name: "幻音城假日", image: "images/幻音城假日.jpg", stars: 4, mapId: 386 },
    { name: "桃源剑阁", image: "images/桃源剑阁.jpg", stars: 4, mapId: 379 },
    { name: "瓦特厂房", image: "images/瓦特厂房.jpg", stars: 6, mapId: 153 },
    { name: "西湖", image: "images/西湖.jpg", stars: 4, mapId: 365 },
    { name: "极星幻域", image: "images/极星幻域.jpg", stars: 4, mapId: 441 },
    { name: "千户苗寨", image: "images/千户苗寨.jpg", stars: 4, mapId: 397 },
    { name: "原野之歌", image: "images/原野之歌.jpg", stars: 4, mapId: 369 },
    { name: "长城", image: "images/长城.jpg", stars: 4, mapId: 393 }
];

// 年度车王地图列表 - 使用本地图片
const annualChampionMapList = [
    { name: "66号公路", image: "images/66号公路.jpg", stars: 5, mapId: 231 },
    { name: "古城秘境", image: "images/古城秘境.jpg", stars: 4, mapId: 181 },
    { name: "老街工地", image: "images/老街工地.jpg", stars: 5, mapId: 132 },
    { name: "熔岩古墓", image: "images/熔岩古墓.jpg", stars: 5, mapId: 141 },
    { name: "新天鹅堡", image: "images/新天鹅堡.jpg", stars: 4, mapId: 394 },
    { name: "TROY - 零号试验场", image: "images/零号试验场.jpg", stars: 4, mapId: 381 },
    { name: "秋之物语", image: "images/秋之物语.jpg", stars: 4, mapId: 283 },
    { name: "老街迷宫", image: "images/老街迷宫.jpg", stars: 4, mapId: 122 },
    { name: "森林发卡", image: "images/森林发卡.jpg", stars: 5, mapId: 239 },
    { name: "恋恋千阳", image: "images/恋恋千阳.jpg", stars: 3, mapId: 427 },
    { name: "VANS机场", image: "images/VANS机场.jpg", stars: 4, mapId: 346 },
    { name: "缤纷夏日", image: "images/缤纷夏日.jpg", stars: 4, mapId: 449 },
    { name: "美洲大峡谷", image: "images/美洲大峡谷.jpg", stars: 6, mapId: 292 },
    { name: "苏格兰场", image: "images/苏格兰场.jpg", stars: 6, mapId: 342 },
    { name: "雪山遗迹", image: "images/雪山遗迹.jpg", stars: 5, mapId: 348 },
    { name: "阿尔法总部", image: "images/阿尔法总部.jpg", stars: 3, mapId: 404 },
    { name: "幻音城假日", image: "images/幻音城假日.jpg", stars: 4, mapId: 386 },
    { name: "梦回古蜀", image: "images/梦回古蜀.jpg", stars: 4, mapId: 416 },
    { name: "桃源剑阁", image: "images/桃源剑阁.jpg", stars: 4, mapId: 379 },
    { name: "山雪游龙", image: "images/山雪游龙.jpg", stars: 2, mapId: 420 },
    { name: "秋名山", image: "images/秋名山.jpg", stars: 5, mapId: 167 },
    { name: "极星幻域", image: "images/极星幻域.jpg", stars: 4, mapId: 441 },
    { name: "莫高窟", image: "images/莫高窟.jpg", stars: 5, mapId: 351 },
    { name: "千户苗寨", image: "images/千户苗寨.jpg", stars: 4, mapId: 397 },
    { name: "一路向黔", image: "images/一路向黔.jpg", stars: 3, mapId: 396 },
    { name: "霆城新港", image: "images/霆城新港.jpg", stars: 2, mapId: 458 },
    { name: "雪境裂渊", image: "images/雪境裂渊.jpg", stars: 5, mapId: 448 },
    { name: "千年丝路", image: "images/千年丝路.jpg", stars: 3, mapId: 455 },
    { name: "瓦特厂房", image: "images/瓦特厂房.jpg", stars: 6, mapId: 153 },
    { name: "原野之歌", image: "images/原野之歌.jpg", stars: 4, mapId: 369 },
    { name: "海滨发卡", image: "images/海滨发卡.jpg", stars: 5, mapId: 133 },
    { name: "雾山枫吟", image: "images/雾山枫吟.jpg", stars: 3, mapId: 422 },
    { name: "海滨之眼", image: "images/海滨之眼.jpg", stars: 3, mapId: 418 },
    { name: "西部矿山", image: "images/西部矿山.jpg", stars: 5, mapId: 194 },
    { name: "灵蛇传说", image: "images/灵蛇传说.jpg", stars: 7, mapId: 459 },
    { name: "古堡森林", image: "images/古堡森林.jpg", stars: 5, mapId: 123 },
    { name: "卡帕多西亚", image: "images/卡帕多西亚.jpg", stars: 4, mapId: 370 },
    { name: "1号公路", image: "images/1号公路.jpg", stars: 4, mapId: 332 },
    { name: "西湖", image: "images/西湖.jpg", stars: 4, mapId: 365 },
    { name: "长城", image: "images/长城.jpg", stars: 4, mapId: 393 }
];

// S6公开地图库 - 添加星级
const s6MapList = [
    { name: "利维坦激流", image: "images/利维坦激流.jpg", stars: 3, mapId: 390 },
    { name: "幻海遗迹", image: "images/幻海遗迹.jpg", stars: 4, mapId: 392 },
    { name: "极速列车", image: "images/极速列车.jpg", stars: 3, mapId: 151 },
    { name: "雷霆军港", image: "images/雷霆军港.jpg", stars: 3, mapId: 387 },
    { name: "琳琅天上", image: "images/琳琅天上.jpg", stars: 5, mapId: 175 },
    { name: "疯狂马戏团", image: "images/疯狂马戏团.jpg", stars: 4, mapId: 280 },
    { name: "梦回古蜀", image: "images/梦回古蜀.jpg", stars: 4, mapId: 416 },
    { name: "阿尔法总部", image: "images/阿尔法总部.jpg", stars: 4, mapId: 404 },
    { name: "TROY - 零号试验场", image: "images/零号试验场.jpg", stars: 4, mapId: 381 },
    { name: "VANS机场", image: "images/VANS机场.jpg", stars: 4, mapId: 346 },
    { name: "山雪游龙", image: "images/山雪游龙.jpg", stars: 2, mapId: 420 },
    { name: "森林发卡", image: "images/森林发卡.jpg", stars: 5, mapId: 239 },
    { name: "海滨之眼", image: "images/海滨之眼.jpg", stars: 3, mapId: 418 },
    { name: "玫瑰之恋", image: "images/玫瑰之恋.jpg", stars: 3, mapId: 158 },
    { name: "春天的新想乐", image: "images/春天的新想乐.jpg", stars: 4, mapId: 163 },
    { name: "灵蛇传说", image: "images/灵蛇传说.jpg", stars: 3, mapId: 459 },
    { name: "千年丝路", image: "images/千年丝路.jpg", stars: 3, mapId: 455 },
    { name: "西湖", image: "images/西湖.jpg", stars: 5, mapId: 365 },
    { name: "绝色江西", image: "images/绝色江西.jpg", stars: 5, mapId: 438 },
    { name: "一梦青花", image: "images/一梦青花.jpg", stars: 4, mapId: 439 },
    { name: "天空之城", image: "images/天空之城.jpg", stars: 7, mapId: 266 },
    { name: "熔岩角斗场", image: "images/熔岩角斗场.jpg", stars: 3, mapId: 435 },
    { name: "炎光王城", image: "images/炎光王城.jpg", stars: 5, mapId: 400 },
    { name: "风吹过的夏天", image: "images/风吹过的夏天.jpg", stars: 3, mapId: 276 },
    { name: "一路向黔", image: "images/一路向黔.jpg", stars: 3, mapId: 396 },
    { name: "恋恋千阳", image: "images/恋恋千阳.jpg", stars: 4, mapId: 427 },
    { name: "天空树", image: "images/天空树.jpg", stars: 2, mapId: 353 },
    { name: "冰川滑雪场", image: "images/冰川滑雪场.jpg", stars: 4, mapId: 186 },
    { name: "飞跃神州", image: "images/飞跃神州.jpg", stars: 3, mapId: 389 },
    { name: "梦幻水乐园", image: "images/梦幻水乐园.jpg", stars: 3, mapId: 363 },
    { name: "飞跃神州", image: "images/飞跃神州.jpg", stars: 2, mapId: 389 },
    { name: "泰坦之巅", image: "images/泰坦之巅.jpg", stars: 3, mapId: null },
    { name: "冰雪欢乐城", image: "images/冰雪欢乐城.jpg", stars: 4, mapId: 446 },
    { name: "霆城新港", image: "images/霆城新港.jpg", stars: 4, mapId: 458 },
    { name: "小猪部落", image: "images/小猪部落.jpg", stars: 3, mapId: 299 },
    { name: "雾山五行", image: "images/雾山五行.jpg", stars: 3, mapId: 450 },
    { name: "阳光码头", image: "images/阳光码头.jpg", stars: 5, mapId: 324 },
    { name: "十一城", image: "images/十一城.jpg", stars: 3, mapId: 137 },
    { name: "320冒险岛", image: "images/320冒险岛.jpg", stars: 4, mapId: 187 },
    { name: "聆风镇", image: "images/聆风镇.jpg", stars: 3, mapId: 406 }
];

// 耀猫杯地图列表 (70张地图)
const yaomaoMapList = [
    { name: "66号公路", image: "images/66号公路.jpg", mapId: 231 },
    { name: "美洲大峡谷", image: "images/美洲大峡谷.jpg", mapId: 292 },
    { name: "熔炉角斗场", image: "images/熔炉角斗场.jpg", mapId: 435 },
    { name: "人鱼岛探险", image: "images/人鱼岛探险.jpg", mapId: 371 },
    { name: "山雪游龙", image: "images/山雪游龙.jpg", mapId: 420 },
    { name: "火星基地", image: "images/火星基地.jpg", mapId: 339 },
    { name: "极星幻域", image: "images/极星幻域.jpg", mapId: 441 },
    { name: "古城秘境", image: "images/古城秘境.jpg", mapId: 181 },
    { name: "海滨发卡", image: "images/海滨发卡.jpg", mapId: 133 },
    { name: "苏格兰场", image: "images/苏格兰场.jpg", mapId: 342 },
    { name: "古堡森林", image: "images/古堡森林.jpg", mapId: 123 },
    { name: "幻海遗迹", image: "images/幻海遗迹.jpg", mapId: 392 },
    { name: "秋之物语", image: "images/秋之物语.jpg", mapId: 283 },
    { name: "梦回古蜀", image: "images/梦回古蜀.jpg", mapId: 416 },
    { name: "极速列车", image: "images/极速列车.jpg", mapId: 151 },
    { name: "老街工地", image: "images/老街工地.jpg", mapId: 132 },
    { name: "老街迷宫", image: "images/老街迷宫.jpg", mapId: 122 },
    { name: "阿尔法总部", image: "images/阿尔法总部.jpg", mapId: 404 },
    { name: "利维坦激流", image: "images/利维坦激流.jpg", mapId: 390 },
    { name: "西部矿山", image: "images/西部矿山.jpg", mapId: 194 },
    { name: "TROY - 零号试验场", image: "images/零号试验场.jpg", mapId: 381 },
    { name: "海滨之眼", image: "images/海滨之眼.jpg", mapId: 418 },
    { name: "洛杉矶", image: "images/洛杉矶.jpg", mapId: 328 },
    { name: "时之沙", image: "images/时之沙.jpg", mapId: 238 },
    { name: "一路向黔", image: "images/一路向黔.jpg", mapId: 396 },
    { name: "熔岩古墓", image: "images/熔岩古墓.jpg", mapId: 141 },
    { name: "森林发卡", image: "images/森林发卡.jpg", mapId: 239 },
    { name: "桃源剑阁", image: "images/桃源剑阁.jpg", mapId: 379 },
    { name: "瓦特厂房", image: "images/瓦特厂房.jpg", mapId: 153 },
    { name: "云梦泽", image: "images/云梦泽.jpg", mapId: 399 },
    { name: "卡帕多西亚", image: "images/卡帕多西亚.jpg", mapId: 370 },
    { name: "科隆大教堂", image: "images/科隆大教堂.jpg", mapId: 395 },
    { name: "春天的新想乐", image: "images/春天的新想乐.jpg", mapId: 163 },
    { name: "VANS机场", image: "images/VANS机场.jpg", mapId: 346 },
    { name: "港湾发卡", image: "images/港湾发卡.jpg", mapId: 185 },
    { name: "海滨小镇", image: "images/海滨小镇.jpg", mapId: 121 },
    { name: "秋名山", image: "images/秋名山.jpg", mapId: 167 },
    { name: "玉龙雪脉", image: "images/玉龙雪脉.jpg", mapId: 222 },
    { name: "长城", image: "images/长城.jpg", mapId: 393 },
    { name: "恋恋千阳", image: "images/恋恋千阳.jpg", mapId: 427 },
    { name: "飞驰新疆", image: "images/飞驰新疆.jpg", mapId: 453 },
    { name: "伊甸掠影", image: "images/伊甸掠影.jpg", mapId: 447 },
    { name: "星梦游乐园", image: "images/星梦游乐园.jpg", mapId: 398 },
    { name: "天玑阁", image: "images/天机阁.jpg", mapId: 433 },
    { name: "恶龙城", image: "images/恶龙城.jpg", mapId: 359 },
    { name: "亚特兰蒂斯", image: "images/亚特兰蒂斯.jpg", mapId: 208 },
    { name: "神隐之国", image: "images/神隐之国.jpg", mapId: 320 },
    { name: "天宫乘梦", image: "images/天宫乘梦.jpg", mapId: 423 },
    { name: "雾山枫吟", image: "images/雾山枫吟.jpg", mapId: 422 },
    { name: "故园归醉", image: "images/故原归醉.jpg", mapId: 376 },
    { name: "320冒险岛", image: "images/320冒险岛.jpg", mapId: 187 },
    { name: "玫瑰之恋", image: "images/玫瑰之恋.jpg", mapId: 158 },
    { name: "彩虹风车岛", image: "images/彩虹风车岛.jpg", mapId: 162 },
    { name: "敦煌石窟", image: "images/敦煌石窟.jpg", mapId: 124 },
    { name: "玄灵峡谷", image: "images/玄灵峡谷.jpg", mapId: 204 },
    { name: "天空之城", image: "images/天空之城.jpg", mapId: 266 },
    { name: "炎光王城", image: "images/炎光王城.jpg", mapId: 400 },
    { name: "龙宫", image: "images/龙宫.jpg", mapId: 354 },
    { name: "疯狂马戏团", image: "images/疯狂马戏团.jpg", mapId: 280 },
    { name: "冰川滑雪场", image: "images/冰川滑雪场.jpg", mapId: 186 },
    { name: "大漠客栈", image: "images/大漠客栈.jpg", mapId: 178 },
    { name: "千年丝路", image: "images/千年丝路.jpg", mapId: 455 },
    { name: "灵蛇传说", image: "images/灵蛇传说.jpg", mapId: 459 },
    { name: "霆城新港", image: "images/霆城新港.jpg", mapId: 458 },
    { name: "绝色江西", image: "images/绝色江西.jpg", mapId: 438 },
    { name: "一梦青花", image: "images/一梦青花.jpg", mapId: 439 },
    { name: "飞跃神州", image: "images/飞跃神州.jpg", mapId: 389 },
    { name: "雾山五行", image: "images/雾山五行.jpg", mapId: 450 },
    { name: "繁花巴比伦", image: "images/繁花巴比伦.jpg", mapId: 377 },
    { name: "流觞曲水", image: "images/流觞曲水.jpg", mapId: 436 }
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
        { name: "玩家1", score: 0, group: 0 },
        { name: "玩家2", score: 0, group: 0 },
        { name: "玩家3", score: 0, group: 1 },
        { name: "玩家4", score: 0, group: 1 },
        { name: "玩家5", score: 0, group: 2 },
        { name: "玩家6", score: 0, group: 2 }
    ],
    page4: JSON.parse(localStorage.getItem('players_page4')) || [
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
let searchKeyword = '';
let currentEditMap = null;

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

// 搜索相关元素
const searchContainer = document.getElementById('searchContainer');
const mapSearchInput = document.getElementById('mapSearch');
const clearSearchBtn = document.getElementById('clearSearch');
const searchDropdown = document.getElementById('searchDropdown');
const searchResultsElement = document.getElementById('searchResults');

// 记分板窗口元素
const scoreboardWindow = document.getElementById('scoreboardWindow');
const closeWindow = document.getElementById('closeWindow');
const draggableHeader = document.querySelector('.draggable');
const prevPageBtn = document.getElementById('prevPageBtn');
const nextPageBtn = document.getElementById('nextPageBtn');
const scoreboardTitle = document.getElementById('scoreboardTitle');

// WebSocket相关变量
let socket;
const SERVER_URL = 'wss://xn--chqub.xn--chqub.xn--6qq986b3xl';
let lastRandomMap = null;

// 记分板拖动变量
let isDragging = false;
let offsetX, offsetY;

// 获取教学地图按钮元素
const teachMapLibraryBtn = document.getElementById('teachMapLibraryBtn');

// 地图ID查询相关变量
let mapIdSearchKeyword = '';

// 初始化页面
function init() {
    // 初始化WebSocket连接
    initWebSocket();
    
    // 创建编辑模态框
    createEditModal();
    setupEditModalListeners();
    
    renderMapCards(currentMapList);
    setupEventListeners();
    
    // 初始位置
    positionScoreboard();
    
    // 初始化记分板
    switchPage(1);
    
    // 默认显示搜索栏
    showSearchBar();
    
    // 初始化地图ID查询
    initMapIdSearch();
}

// 创建编辑模态框
function createEditModal() {
    const modal = document.createElement('div');
    modal.id = 'editMapModal';
    modal.className = 'edit-modal';
    modal.style.cssText = `
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        z-index: 3000;
        justify-content: center;
        align-items: center;
    `;
    
    modal.innerHTML = `
        <div class="edit-modal-content">
            <div class="edit-modal-header">
                <h3>编辑地图</h3>
                <span class="close-edit-modal">&times;</span>
            </div>
            <div class="edit-modal-body">
                <div class="edit-form-group">
                    <label for="editMapId">地图ID:</label>
                    <input type="number" id="editMapId" class="edit-form-input" placeholder="输入地图ID" min="100" max="999">
                    <div class="id-status" id="idStatus"></div>
                </div>
                <div class="edit-form-group">
                    <label for="editMapName">地图名称:</label>
                    <input type="text" id="editMapName" class="edit-form-input" readonly>
                </div>
                <div class="edit-form-group">
                    <label for="editMapStars">星级:</label>
                    <select id="editMapStars" class="edit-form-input">
                        <option value="1">1✯</option>
                        <option value="2">2✯</option>
                        <option value="3">3✯</option>
                        <option value="4">4✯</option>
                        <option value="5">5✯</option>
                        <option value="6">6✯</option>
                        <option value="7">7✯</option>
                    </select>
                </div>
                <div class="edit-form-group">
                    <label for="editMapImage">图片预览:</label>
                    <div class="edit-image-preview">
                        <img id="editImagePreview" src="" alt="预览" style="max-width: 100%; max-height: 200px;">
                        <div id="imageStatus" class="image-status"></div>
                    </div>
                </div>
            </div>
            <div class="edit-modal-footer">
                <button id="saveEditBtn" class="edit-btn edit-save-btn">保存</button>
                <button id="cancelEditBtn" class="edit-btn edit-cancel-btn">取消</button>
                <button id="resetEditBtn" class="edit-btn edit-reset-btn">恢复默认</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// 设置编辑模态框的事件监听
function setupEditModalListeners() {
    const modal = document.getElementById('editMapModal');
    const closeBtn = modal.querySelector('.close-edit-modal');
    const cancelBtn = document.getElementById('cancelEditBtn');
    const saveBtn = document.getElementById('saveEditBtn');
    const resetBtn = document.getElementById('resetEditBtn');
    const mapIdInput = document.getElementById('editMapId');
    const mapNameInput = document.getElementById('editMapName');
    const imagePreview = document.getElementById('editImagePreview');
    const idStatus = document.getElementById('idStatus');
    const imageStatus = document.getElementById('imageStatus');
    
    // 关闭模态框
    closeBtn.addEventListener('click', closeEditModal);
    cancelBtn.addEventListener('click', closeEditModal);
    
    // 点击背景关闭
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeEditModal();
        }
    });
    
    // 地图ID输入事件
    mapIdInput.addEventListener('input', () => {
        const mapId = parseInt(mapIdInput.value);
        
        if (!mapId || isNaN(mapId)) {
            idStatus.textContent = '请输入有效的地图ID';
            idStatus.className = 'id-status error';
            mapNameInput.value = '';
            imagePreview.src = '';
            imageStatus.textContent = '等待输入有效ID';
            imageStatus.className = 'image-status';
            return;
        }
        
        const mapInfo = getMapInfoById(mapId);
        
        if (mapInfo) {
            idStatus.textContent = `✓ 已找到地图: ${mapInfo.name}`;
            idStatus.className = 'id-status success';
            mapNameInput.value = mapInfo.name;
            
            // 加载图片
            const img = new Image();
            img.onload = function() {
                imagePreview.src = mapInfo.image;
                imageStatus.textContent = '✓ 图片加载成功';
                imageStatus.className = 'image-status success';
            };
            img.onerror = function() {
                imagePreview.src = '';
                imageStatus.textContent = '✗ 图片加载失败，请确保图片存在';
                imageStatus.className = 'image-status error';
            };
            img.src = mapInfo.image;
        } else {
            idStatus.textContent = '✗ 未找到该ID对应的地图';
            idStatus.className = 'id-status error';
            mapNameInput.value = '';
            imagePreview.src = '';
            imageStatus.textContent = '未找到地图信息';
            imageStatus.className = 'image-status';
        }
    });
    
    // 保存修改
    saveBtn.addEventListener('click', () => {
        if (!currentEditMap) return;
        
        const mapId = parseInt(document.getElementById('editMapId').value);
        const mapStars = parseInt(document.getElementById('editMapStars').value);
        
        if (!mapId || isNaN(mapId)) {
            alert('请输入有效的地图ID');
            return;
        }
        
        const mapInfo = getMapInfoById(mapId);
        if (!mapInfo) {
            alert('未找到该ID对应的地图，请输入有效的ID');
            return;
        }
        
        // 更新地图数据
        currentEditMap.mapId = mapId;
        currentEditMap.name = mapInfo.name;
        currentEditMap.image = mapInfo.image;
        
        // 更新星级（耀猫杯不显示星级）
        if (currentMapSet !== 'yaomao') {
            currentEditMap.stars = mapStars;
        }
        
        // 重新渲染地图卡片
        renderMapCards(currentMapList);
        
        // 关闭模态框
        closeEditModal();
    });
    
    // 恢复默认
    resetBtn.addEventListener('click', () => {
        if (!currentEditMap || !confirm('确定要恢复默认设置吗？')) return;
        
        // 找到原始地图数据
        let originalMap = null;
        
        // 根据当前地图集查找原始数据
        if (currentMapSet === 's18') {
            originalMap = s18MapList.find(m => m.name === currentEditMap.originalName);
        } else if (currentMapSet === 'annual') {
            originalMap = annualChampionMapList.find(m => m.name === currentEditMap.originalName);
        } else if (currentMapSet === 's6') {
            originalMap = s6MapList.find(m => m.name === currentEditMap.originalName);
        } else if (currentMapSet === 'yaomao') {
            originalMap = yaomaoMapList.find(m => m.name === currentEditMap.originalName);
        } else if (currentMapSet === 'teach') {
            originalMap = teachMapList.find(m => m.name === currentEditMap.originalName);
        }
        
        if (originalMap) {
            // 恢复原始数据
            currentEditMap.mapId = originalMap.mapId || null;
            currentEditMap.name = originalMap.name;
            currentEditMap.image = originalMap.image;
            currentEditMap.stars = originalMap.stars;
            
            // 重新渲染
            renderMapCards(currentMapList);
        }
        
        closeEditModal();
    });
}

// 打开编辑模态框
function openEditModal(map) {
    const modal = document.getElementById('editMapModal');
    const mapIdInput = document.getElementById('editMapId');
    const mapNameInput = document.getElementById('editMapName');
    const mapStarsSelect = document.getElementById('editMapStars');
    const imagePreview = document.getElementById('editImagePreview');
    const idStatus = document.getElementById('idStatus');
    const imageStatus = document.getElementById('imageStatus');
    
    // 保存当前编辑的地图
    currentEditMap = map;
    
    // 记录原始名称
    if (!currentEditMap.originalName) {
        currentEditMap.originalName = map.name;
    }
    
    // 填充当前地图数据
    mapIdInput.value = map.mapId || '';
    mapNameInput.value = map.name;
    
    // 设置星级
    if (map.stars && mapStarsSelect) {
        mapStarsSelect.value = map.stars;
    } else if (mapStarsSelect) {
        mapStarsSelect.value = 3;
    }
    
    // 设置图片预览
    imagePreview.src = map.image;
    
    // 检查图片是否存在
    const img = new Image();
    img.onload = function() {
        imageStatus.textContent = '✓ 图片加载成功';
        imageStatus.className = 'image-status success';
    };
    img.onerror = function() {
        imageStatus.textContent = '✗ 图片加载失败';
        imageStatus.className = 'image-status error';
    };
    img.src = map.image;
    
    // 如果有地图ID，验证并显示状态
    if (map.mapId) {
        const mapInfo = getMapInfoById(map.mapId);
        if (mapInfo) {
            idStatus.textContent = `✓ 已找到地图: ${mapInfo.name}`;
            idStatus.className = 'id-status success';
        } else {
            idStatus.textContent = '✗ 未找到该ID对应的地图';
            idStatus.className = 'id-status error';
        }
    } else {
        idStatus.textContent = '请输入地图ID';
        idStatus.className = 'id-status';
    }
    
    // 显示模态框
    modal.style.display = 'flex';
    mapIdInput.focus();
}

// 关闭编辑模态框
function closeEditModal() {
    const modal = document.getElementById('editMapModal');
    modal.style.display = 'none';
    
    // 重置状态
    const idStatus = document.getElementById('idStatus');
    const imageStatus = document.getElementById('imageStatus');
    idStatus.textContent = '';
    idStatus.className = 'id-status';
    imageStatus.textContent = '';
    imageStatus.className = 'image-status';
    
    currentEditMap = null;
}

// 初始化地图ID查询功能
function initMapIdSearch() {
    const mapSearchInput = document.getElementById('mapIdSearch');
    const clearMapSearchBtn = document.getElementById('clearMapSearch');
    const mapIdList = document.getElementById('mapIdList');
    
    if (!mapSearchInput || !clearMapSearchBtn || !mapIdList) return;
    
    // 搜索框输入事件
    let searchTimeout;
    mapSearchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        mapIdSearchKeyword = e.target.value.trim();
        searchTimeout = setTimeout(() => {
            performMapIdSearch(mapIdSearchKeyword);
        }, 300);
    });
    
    mapSearchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            mapIdSearchKeyword = e.target.value.trim();
            performMapIdSearch(mapIdSearchKeyword);
        }
    });
    
    // 清除搜索按钮
    clearMapSearchBtn.addEventListener('click', () => {
        mapSearchInput.value = '';
        mapIdSearchKeyword = '';
        performMapIdSearch('');
        mapSearchInput.focus();
    });
    
    // 初始渲染完整列表
    renderMapIdList(Object.entries(mapIdToName));
}

// 执行地图ID搜索
function performMapIdSearch(keyword) {
    const searchResultsElement = document.getElementById('mapSearchResults');
    
    if (!keyword.trim()) {
        renderMapIdList(Object.entries(mapIdToName));
        if (searchResultsElement) {
            searchResultsElement.textContent = `显示全部 ${Object.keys(mapIdToName).length} 个地图`;
        }
        return;
    }
    
    const searchTerm = keyword.toLowerCase();
    const filteredMaps = Object.entries(mapIdToName).filter(([id, name]) => 
        id.includes(searchTerm) || 
        name.toLowerCase().includes(searchTerm)
    );
    
    renderMapIdList(filteredMaps);
    
    if (searchResultsElement) {
        if (filteredMaps.length > 0) {
            searchResultsElement.textContent = `找到 ${filteredMaps.length} 个匹配的地图`;
        } else {
            searchResultsElement.textContent = '没有找到匹配的地图';
        }
    }
}

// 渲染地图ID列表
function renderMapIdList(mapList) {
    const mapIdList = document.getElementById('mapIdList');
    if (!mapIdList) return;
    
    mapIdList.innerHTML = '';
    
    // 添加表头
    const header = document.createElement('div');
    header.className = 'map-id-list-header';
    header.innerHTML = `
        <div class="map-id-header-id">ID</div>
        <div class="map-id-header-name">地图名称</div>
        <div class="map-id-header-action">操作</div>
    `;
    mapIdList.appendChild(header);
    
    if (mapList.length === 0) {
        const noResults = document.createElement('div');
        noResults.className = 'no-results';
        noResults.innerHTML = `<p>没有找到匹配的地图</p>`;
        mapIdList.appendChild(noResults);
        return;
    }
    
    mapList.forEach(([id, name]) => {
        const mapItem = document.createElement('div');
        mapItem.className = 'map-id-item';
        mapItem.dataset.id = id;
        
        mapItem.innerHTML = `
            <div class="map-id-number">${id}</div>
            <div class="map-id-name">${name}</div>
            <div class="map-id-copy">点击复制ID</div>
        `;
        
        // 点击事件 - 复制ID到剪贴板
        mapItem.addEventListener('click', (e) => {
            e.stopPropagation();
            copyMapIdToClipboard(id, name);
        });
        
        // 悬停提示
        mapItem.title = `点击复制ID: ${id} (${name})`;
        
        mapIdList.appendChild(mapItem);
    });
}

// 复制地图ID到剪贴板
function copyMapIdToClipboard(id, name) {
    navigator.clipboard.writeText(id).then(() => {
        // 显示复制成功提示
        const originalContent = `${id}`;
        const mapItem = document.querySelector(`.map-id-item[data-id="${id}"]`);
        if (mapItem) {
            const copyElement = mapItem.querySelector('.map-id-copy');
            if (copyElement) {
                const originalText = copyElement.textContent;
                copyElement.textContent = '已复制！';
                copyElement.style.color = '#2ecc71';
                
                setTimeout(() => {
                    copyElement.textContent = originalText;
                    copyElement.style.color = '#3498db';
                }, 2000);
            }
        }
        
        // 显示通知
        showNotification(`已复制地图ID: ${id} (${name})`);
        
        // 添加动画效果
        if (mapItem) {
            mapItem.classList.add('flash-animation');
            setTimeout(() => {
                mapItem.classList.remove('flash-animation');
            }, 500);
        }
    }).catch(err => {
        console.error('复制失败:', err);
        showNotification('复制失败，请手动复制');
    });
}

// 显示通知
function showNotification(message) {
    // 移除已有的通知
    const existingNotification = document.querySelector('.map-id-notification');
    if (existingNotification) {
        document.body.removeChild(existingNotification);
    }
    
    // 创建新通知
    const notification = document.createElement('div');
    notification.className = 'map-id-notification';
    notification.textContent = message;
    
    // 添加样式
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 10px 20px;
        border-radius: 5px;
        z-index: 9999;
        animation: slideIn 0.3s ease;
        border-left: 4px solid #2ecc71;
    `;
    
    // 添加动画样式
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // 3秒后自动消失
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }
    }, 3000);
}

// 初始化WebSocket连接
function initWebSocket() {
    socket = new WebSocket(SERVER_URL);
    
    socket.onopen = function(e) {
        console.log("WebSocket连接已建立");
        socket.send(JSON.stringify({ type: 'getCurrentMap' }));
    };
    
    socket.onmessage = function(event) {
        const data = JSON.parse(event.data);
        
        if (data.type === 'currentMap') {
            lastRandomMap = data.map;
            updateRandomMapAnnouncement(data.map);
        } else if (data.type === 'newRandomMap') {
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
    // 搜索框输入事件
    if (mapSearchInput) {
        let searchTimeout;
        mapSearchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchKeyword = e.target.value.trim();
            searchTimeout = setTimeout(() => {
                performSearch(searchKeyword);
            }, 300);
        });
        
        mapSearchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchKeyword = e.target.value.trim();
                performSearch(searchKeyword);
            }
        });
        
        mapSearchInput.addEventListener('focus', () => {
            if (searchKeyword.trim()) {
                performSearch(searchKeyword);
            }
        });
    }
    
    // 清除搜索按钮
    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', () => {
            mapSearchInput.value = '';
            searchKeyword = '';
            hideSearchDropdown();
            mapSearchInput.focus();
        });
    }
    
    // 点击页面其他地方隐藏下拉列表
    document.addEventListener('click', (e) => {
        if (!searchContainer.contains(e.target) && !searchDropdown.contains(e.target)) {
            hideSearchDropdown();
        }
    });
    
    // 地图库切换
    s18MapLibraryBtn.addEventListener('click', () => {
        switchMapLibrary('s18', s18MapList);
        clearSearch();
        showSearchBar();
    });
    annualChampionMapLibraryBtn.addEventListener('click', () => {
        switchMapLibrary('annual', annualChampionMapList);
        clearSearch();
        showSearchBar();
    });
    s6MapLibraryBtn.addEventListener('click', () => {
        switchMapLibrary('s6', s6MapList);
        clearSearch();
        showSearchBar();
    });
    yaomaoMapLibraryBtn.addEventListener('click', () => {
        switchMapLibrary('yaomao', yaomaoMapList);
        clearSearch();
        showSearchBar();
    });
    teachMapLibraryBtn.addEventListener('click', () => {
        switchMapLibrary('teach', teachMapList);
        clearSearch();
        showSearchBar();
    });

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
        scoreboardWindow.classList.remove('active');
        clearSearch();
        hideSearchBar();
    });

    // 地图ID查询按钮
    guideBtn.addEventListener('click', () => {
        guideModal.style.display = 'flex';
        // 打开时显示完整列表
        if (mapIdSearchKeyword) {
            document.getElementById('mapIdSearch').value = mapIdSearchKeyword;
            performMapIdSearch(mapIdSearchKeyword);
        }
    });
    
    closeGuide.addEventListener('click', () => guideModal.style.display = 'none');
    guideModal.addEventListener('click', (e) => {
        if (e.target === guideModal) {
            guideModal.style.display = 'none';
        }
    });

    // 地图卡片点击事件处理
    mapContainer.addEventListener('click', (e) => {
        const mapCard = e.target.closest('.map-card');
        if (mapCard) {
            const mapName = mapCard.querySelector('.map-name').textContent;
            
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

// 搜索功能
function performSearch(keyword) {
    searchKeyword = keyword;
    
    if (!keyword.trim()) {
        hideSearchDropdown();
        searchResultsElement.style.display = 'none';
        return;
    }
    
    const searchTerm = keyword.toLowerCase();
    const filteredMaps = currentMapList.filter(map => 
        map.name.toLowerCase().includes(searchTerm) ||
        (map.mapId && map.mapId.toString().includes(searchTerm))
    );
    
    renderSearchDropdown(filteredMaps, keyword);
    
    if (searchResultsElement) {
        if (filteredMaps.length > 0) {
            searchResultsElement.textContent = `找到 ${filteredMaps.length} 个匹配的地图`;
            searchResultsElement.style.display = 'block';
        } else {
            searchResultsElement.textContent = '没有找到匹配的地图';
            searchResultsElement.style.display = 'block';
        }
    }
    
    showSearchDropdown();
}

// 渲染搜索下拉列表
function renderSearchDropdown(mapList, keyword) {
    searchDropdown.innerHTML = '';
    
    if (mapList.length === 0) {
        const noResults = document.createElement('div');
        noResults.className = 'no-results';
        noResults.innerHTML = `
            <p>没有找到包含 "<strong>${keyword}</strong>" 的地图</p>
        `;
        searchDropdown.appendChild(noResults);
        return;
    }
    
    const searchList = document.createElement('ul');
    searchList.className = 'search-dropdown-list';
    
    mapList.forEach((map, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'search-dropdown-item';
        listItem.dataset.index = index;
        listItem.dataset.mapName = map.name;
        
        // 显示地图ID和名称
        const mapIdText = map.mapId ? `ID: ${map.mapId} - ` : '';
        const highlightedName = highlightKeyword(map.name, keyword);
        
        const nameElement = document.createElement('div');
        nameElement.className = 'search-dropdown-name';
        nameElement.innerHTML = `<strong>${mapIdText}</strong>${highlightedName}`;
        
        listItem.appendChild(nameElement);
        
        // 添加星级显示（耀猫杯不显示）
        if (currentMapSet !== 'yaomao' && map.stars) {
            const starsElement = document.createElement('div');
            starsElement.className = 'search-dropdown-stars';
            starsElement.textContent = `${map.stars}✯`;
            listItem.appendChild(starsElement);
        }
        
        // 点击事件 - 定位地图
        listItem.addEventListener('click', (e) => {
            e.stopPropagation();
            
            listItem.classList.add('bounce');
            setTimeout(() => {
                listItem.classList.remove('bounce');
            }, 600);
            
            locateMapOnGrid(map.name);
            hideSearchDropdown();
            
            if (mapSearchInput) {
                mapSearchInput.value = '';
            }
        });
        
        searchList.appendChild(listItem);
    });
    
    searchDropdown.appendChild(searchList);
}

// 高亮关键词
function highlightKeyword(text, keyword) {
    if (!keyword.trim()) return text;
    
    const regex = new RegExp(`(${escapeRegExp(keyword)})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
}

// 转义正则表达式特殊字符
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// 定位地图在网格中的位置
function locateMapOnGrid(mapName) {
    const mapCards = document.querySelectorAll('.map-card');
    let targetCard = null;
    
    mapCards.forEach(card => {
        const cardMapName = card.querySelector('.map-name').textContent;
        if (cardMapName === mapName) {
            targetCard = card;
        }
    });
    
    if (targetCard) {
        targetCard.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center',
            inline: 'center'
        });
        
        targetCard.classList.add('map-locate-animation');
        
        setTimeout(() => {
            targetCard.classList.remove('map-locate-animation');
        }, 3000);
    }
}

// 显示搜索下拉列表
function showSearchDropdown() {
    if (searchDropdown) {
        searchDropdown.style.display = 'block';
    }
}

// 隐藏搜索下拉列表
function hideSearchDropdown() {
    if (searchDropdown) {
        searchDropdown.style.display = 'none';
    }
}

// 清除搜索
function clearSearch() {
    if (mapSearchInput) {
        mapSearchInput.value = '';
        searchKeyword = '';
    }
    if (searchResultsElement) {
        searchResultsElement.style.display = 'none';
    }
    hideSearchDropdown();
}

// 显示搜索栏
function showSearchBar() {
    if (searchContainer) {
        searchContainer.style.display = 'flex';
    }
}

// 隐藏搜索栏
function hideSearchBar() {
    if (searchContainer) {
        searchContainer.style.display = 'none';
    }
}

// 添加播放教学视频的函数
function playTeachVideo(mapName) {
    const map = teachMapList.find(m => m.name === mapName);
    if (!map || !map.videos || map.videos.length === 0) {
        alert('该地图暂无教学视频');
        return;
    }
    
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
    
    const videoControls = document.createElement('div');
    videoControls.className = 'video-controls';
    videoControls.style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        background: rgba(0, 0, 0, 0.7);
    `;
    
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
        const videoTitle = document.createElement('span');
        videoTitle.textContent = map.videos[0].title;
        videoTitle.style.color = 'white';
        videoControls.appendChild(videoTitle);
    }
    
    const video = document.createElement('video');
    video.src = map.videos[0].url;
    video.controls = true;
    video.autoplay = true;
    video.style.width = '100%';
    
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
    
    closeBtn.addEventListener('click', () => {
        video.pause();
        document.body.removeChild(videoModal);
    });
    
    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            video.pause();
            document.body.removeChild(videoModal);
        }
    });
    
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
    
    videoContent.appendChild(videoControls);
    videoContent.appendChild(video);
    videoContent.appendChild(closeBtn);
    videoModal.appendChild(videoContent);
    
    document.body.appendChild(videoModal);
}

// 设置记分板分数操作事件
function setupScoreboardEventListeners() {
    for (let page = 1; page <= totalPages; page++) {
        const listId = `playersList${page}`;
        const listElement = document.getElementById(listId);
        
        if (listElement) {
            listElement.addEventListener('click', (e) => {
                handlePlayerAction(e, page);
            });
        }
        
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
    for (let i = 1; i <= totalPages; i++) {
        document.getElementById(`page${i}`).classList.remove('active');
    }
    
    document.getElementById(`page${page}`).classList.add('active');
    
    const titles = [
        "赛车记分板 - 滴血模式",
        "赛车记分板 - 抢分模式",
        "赛车记分板 - 2V模式",
        "赛车记分板 - 3V模式"
    ];
    scoreboardTitle.textContent = titles[page - 1];
    
    renderScoreboard(page);
    
    if (page === 3 || page === 4) {
        updateTeamScores(page);
    }
}

// 设置记分板窗口拖动功能
function setupScoreboardDrag() {
    draggableHeader.addEventListener('mousedown', (e) => {
        if (e.target === closeWindow) return;
        
        isDragging = true;
        const rect = scoreboardWindow.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        
        scoreboardWindow.style.cursor = 'move';
        scoreboardWindow.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.4)';
        
        e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        let newLeft = e.clientX - offsetX;
        let newTop = e.clientY - offsetY;
        
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
    
    const buttons = [s18MapLibraryBtn, annualChampionMapLibraryBtn, s6MapLibraryBtn, yaomaoMapLibraryBtn, teachMapLibraryBtn];
    buttons.forEach(btn => btn.classList.remove('selected-map-btn'));
    
    const activeBtn = document.getElementById(`${mapSet}MapLibraryBtn`);
    if (activeBtn) {
        activeBtn.classList.add('selected-map-btn');
    }
    
    mapContainer.style.display = 'grid';
    scoreboardWindow.classList.add('active');
    showSearchBar();
    clearSearch();
}

// 渲染地图卡片
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
        
        // 添加双击事件 - 编辑地图
        card.addEventListener('dblclick', (e) => {
            e.stopPropagation();
            openEditModal(map);
        });
        
        card.title = '双击编辑地图';
        
        mapContainer.appendChild(card);
    });
}

// 切换地图排除状态
function toggleMapExclusion(mapName) {
    if (!excludedMaps[mapName]) {
        excludedMaps[mapName] = {};
    }
    
    excludedMaps[mapName][currentMapSet] = !excludedMaps[mapName][currentMapSet];
    
    localStorage.setItem('excludedMaps', JSON.stringify(excludedMaps));
    renderMapCards(currentMapList);
}

// 随机选择地图
function selectRandomMap() {
    let availableMaps;
    if (searchKeyword.trim()) {
        const searchTerm = searchKeyword.toLowerCase();
        availableMaps = currentMapList.filter(map => 
            (map.name.toLowerCase().includes(searchTerm) || 
             (map.mapId && map.mapId.toString().includes(searchTerm))) &&
            (!excludedMaps[map.name] || !excludedMaps[map.name][currentMapSet])
        );
    } else {
        availableMaps = currentMapList.filter(map => 
            !excludedMaps[map.name] || !excludedMaps[map.name][currentMapSet]
        );
    }
    
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
            
            if (socket && socket.readyState === WebSocket.OPEN) {
                socket.send(JSON.stringify({
                    type: 'selectRandomMap',
                    map: selectedMap
                }));
            }
            
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
        const listId = `playersList${page}`;
        const listElement = document.getElementById(listId);
        listElement.innerHTML = '';
        
        scorePlayers[pageKey].forEach((player, index) => {
            const playerItem = createPlayerItem(player, index, pageKey);
            listElement.appendChild(playerItem);
        });
    } else if (page === 3) {
        for (let group = 0; group < 3; group++) {
            const listId = `playersList3-${group + 1}`;
            const listElement = document.getElementById(listId);
            listElement.innerHTML = '';
            
            scorePlayers[pageKey].forEach((player, globalIndex) => {
                if (player.group === group) {
                    const playerItem = createPlayerItem(player, globalIndex, pageKey);
                    listElement.appendChild(playerItem);
                }
            });
        }
    } else if (page === 4) {
        for (let group = 0; group < 2; group++) {
            const listId = `playersList4-${group + 1}`;
            const listElement = document.getElementById(listId);
            listElement.innerHTML = '';
            
            scorePlayers[pageKey].forEach((player, globalIndex) => {
                if (player.group === group) {
                    const playerItem = createPlayerItem(player, globalIndex, pageKey);
                    listElement.appendChild(playerItem);
                }
            });
        }
    }
}

// 创建玩家项
function createPlayerItem(player, index, pageKey) {
    const playerItem = document.createElement('li');
    playerItem.className = 'player-item';
    playerItem.dataset.index = index;
    
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
    
    const nameElement = playerItem.querySelector('.player-name');
    nameElement.addEventListener('dblclick', function() {
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'name-input';
        input.value = player.name;
        
        nameElement.replaceWith(input);
        input.focus();
        input.select();
        
        const saveName = () => {
            const newName = input.value.trim() || `玩家${index + 1}`;
            player.name = newName;
            savePlayers(pageKey);
            
            const newNameSpan = document.createElement('span');
            newNameSpan.className = 'player-name';
            newNameSpan.textContent = newName;
            input.replaceWith(newNameSpan);
            newNameSpan.addEventListener('dblclick', arguments.callee);
        };
        
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                saveName();
            }
        });
        
        input.addEventListener('blur', saveName);
    });
    
    return playerItem;
}

// 添加名字编辑功能
function setupNameEditListeners() {
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
                    
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.className = 'name-input';
                    input.value = scorePlayers[pageKey][playerIndex].name;
                    
                    nameSpan.replaceWith(input);
                    input.focus();
                    
                    const saveName = () => {
                        const newName = input.value.trim() || `玩家${playerIndex + 1}`;
                        scorePlayers[pageKey][playerIndex].name = newName;
                        savePlayers(pageKey);
                        
                        const newNameSpan = document.createElement('span');
                        newNameSpan.className = 'player-name';
                        newNameSpan.textContent = newName;
                        input.replaceWith(newNameSpan);
                        
                        const editBtn = document.createElement('button');
                        editBtn.className = 'edit-name-btn';
                        editBtn.textContent = '✎';
                        playerItem.querySelector('.player-name-container').appendChild(editBtn);
                    };
                    
                    input.addEventListener('keydown', (e) => {
                        if (e.key === 'Enter') {
                            saveName();
                        }
                    });
                    
                    input.addEventListener('blur', saveName);
                }
            });
        }
    }
}

// 更新团队总分
function updateTeamScores(page) {
    const pageKey = `page${page}`;
    
    if (page === 3) {
        for (let group = 0; group < 3; group++) {
            const groupPlayers = scorePlayers[pageKey].filter(p => p.group === group);
            const teamScore = groupPlayers.reduce((sum, player) => sum + player.score, 0);
            document.getElementById(`team${group + 1}Score`).textContent = teamScore;
        }
    } else if (page === 4) {
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
        const pageKey = `page${currentPage}`;
        
        scorePlayers[pageKey].forEach(player => {
            if (currentPage === 1) {
                player.score = 6;
            } else {
                player.score = 0;
            }
        });
        
        savePlayers(pageKey);
        renderScoreboard(currentPage);
        
        if (currentPage === 3 || currentPage === 4) {
            updateTeamScores(currentPage);
        }
    }
}

// 初始化记分板位置
function positionScoreboard() {
    const rect = scoreboardWindow.getBoundingClientRect();
    if (rect.left < 0 || rect.top < 0) {
        scoreboardWindow.style.left = '50%';
        scoreboardWindow.style.top = '100px';
        scoreboardWindow.style.transform = 'translateX(-50%)';
    }
}

// 初始化页面
init();