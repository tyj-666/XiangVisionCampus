# XiangVisionCampus

## 项目简介

**XiangVisionCampus（湘云校瞰）** 是一个基于 uni-app + Vue3 的多平台校园信息可视化应用，支持微信小程序、H5、App等多端。项目聚焦于湖南省高校信息的可视化展示，集成了地图、排行榜、AI问答、VR全景、学校官网等多种功能，旨在为用户提供便捷、直观的高校信息查询与互动体验。

## 主要功能

- **首页检索**：支持按学校名称、城市筛选湖南省高校，展示学校卡片，点击可查看详情。
- **地图模式**：以地图形式展示高校分布，点击标记点可查看学校详情。
- **排行榜**：按点赞量展示高校排行榜，支持点赞互动。
- **AI问答**：集成AI助手，支持用户提问并获得智能回复。
- **学校详情**：展示学校介绍、历史、标签、位置、Logo，并可跳转至官网、VR全景、历年分数线等。
- **学校官网/VR全景/分数线**：内嵌WebView展示学校官网、VR全景、历年分数线页面。

## 技术栈

- [uni-app](https://uniapp.dcloud.io/) + [Vue3](https://vuejs.org/)
- [uview-plus](https://www.uviewui.com/) UI组件库
- dayjs（日期处理）、clipboard（剪贴板操作）
- 支持多端（微信小程序、H5、App等）

## 目录结构

```
XiangVisionCampus/
├── api/                # API接口与请求封装
│   ├── api.js
│   └── http.js
├── pages/              # 各功能页面
│   ├── ai/ai.vue
│   ├── entranceScores/entranceScores.vue
│   ├── home/home.vue
│   ├── index/index.vue
│   ├── map/map.vue
│   ├── rank/rank.vue
│   ├── schoolDetail/schoolDetail.vue
│   ├── schoolWebsite/schoolWebsite.vue
│   └── vrMap/vrMap.vue
├── static/             # 静态资源
├── App.vue             # 应用入口
├── main.js             # 入口文件
├── manifest.json       # uni-app配置
├── pages.json          # 页面与tabBar配置
├── package.json        # 依赖配置
└── ...
```

## 主要页面说明

- **首页（/pages/home/home）**：
  - 支持学校名称、城市筛选，展示学校卡片，点击进入详情。
- **地图（/pages/map/map）**：
  - 地图展示湖南高校分布，点击标记点查看详情。
- **排行榜（/pages/rank/rank）**：
  - 展示高校点赞排行榜，支持点赞。
- **AI问答（/pages/ai/ai）**：
  - 智能问答机器人，支持用户提问与AI互动。
- **学校详情（/pages/schoolDetail/schoolDetail）**：
  - 展示学校详细信息、标签、Logo、介绍、历史，支持跳转至官网、VR、分数线。
- **学校官网/VR/分数线**：
  - 通过WebView展示外部页面。

## API接口说明

所有API请求均通过 `api/http.js` 封装，主要接口有：

- `getSchoolLoaction()`：获取高校地理位置数据
- `getSchoolDetail()`：获取高校详细信息
- `getSchoolRank()`：获取高校点赞排行榜
- `askAi(data)`：AI问答接口（POST，需传入 { prompt: '问题内容' }）

> 注：部分接口为 mock 数据或第三方API，详见 `api/api.js`。

## 启动与开发

1. 安装依赖：
   ```
   npm install
   ```
2. HBuilderX 或命令行运行/编译：
   - 微信小程序：
     ```
     npm run dev:mp-weixin
     ```
   - H5：
     ```
     npm run dev:h5
     ```
   - App（需HBuilderX）：
     直接运行到手机或模拟器

3. 其他说明：
   - 需配置相关小程序AppID、manifest等多端信息。
   - 依赖 `uview-plus` 组件库，已在 `package.json` 配置。

## 依赖

- uview-plus
- dayjs
- clipboard

## License

MIT 