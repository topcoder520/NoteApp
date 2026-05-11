# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概览

NoteApp 是一个基于 Cordova 的 Android 笔记应用。技术栈：Vue 3 + Vue Router + Vuex，UI 组件库使用 Vant 4 和 Ant Design Vue 4。数据通过 SQLite（`cordova-sqlite-evcore-extbuild-free`）本地持久化。应用同时支持 browser 平台用于本地开发调试。

## 常用命令

```bash
# 开发服务器（浏览器，热重载）
npm run serve

# 代码检查
npm run lint

# 构建 Vue 应用到 www/，然后构建 Android debug APK
npm run build && cordova build android

# 浏览器运行（先构建 Vue，再在浏览器中打开）
cordova run browser

# Release 构建（具体命令见对应 .bat 文件）
./build-release-android-output-apk.bat   # release APK
./build-release-android-output-aab.bat   # release AAB
```

平台和插件安装（一次性操作，详见 README）：
```bash
cordova platform add android
cordova platform add browser
# 各插件列表见 README.md 和 package.json 中的 cordova.plugins
```

## 架构

### 路由：双视图布局

应用使用**命名路由视图（named router-views）**在底部标签栏之上叠加编辑/详情页面。`App.vue` 定义：

- 默认 `<router-view>` 用于四个主标签页（笔记、归类、日历、设置）—— 这些页面被 keep-alive 缓存。
- 命名 `<router-view name="NewNote">` 用于叠加页面（添加笔记、查看笔记、添加分类、分类详情、搜索）。当这些叠加页面激活时，底部标签栏自动隐藏（由 `IsShowTabBar` getter 控制）。

路由定义在 `src/router/index.js`。叠加路由使用 `components: { NewNote: Component }` 来指定目标命名视图。

### 状态管理

`src/store/index.js` — 标准 Vuex store（无 modules）。核心状态：`database`（SQLite 实例）、`CurTabbarIndex`（控制标签栏显隐）、`RefreshListState`（触发笔记列表刷新）。

数据库初始化（`startupDatabase` action）在应用启动时打开/创建笔记、分类和版本信息相关的表。

### 插件层（`src/plugin/`）

将 Cordova 原生插件封装为 Promise 风格的 API：

| 文件 | 用途 |
|---|---|
| `sqllite.js` | SQLite 增删改查 — openDatabase, createTable, addRecord, getRecord, getRecordList, updateRecord, delRecord |
| `file.js` | 图片保存/下载、文件复制/移动/删除、HTML 转 Canvas 截图 |
| `camera.js` | 通过 cordova-plugin-camera 拍照 |
| `fingerprint.js` | 通过 cordova-plugin-android-fingerprint-auth 进行指纹/生物识别验证 |
| `calendar.js` | 系统日历集成 |
| `clipboard.js` | 剪贴板读写 |
| `request.js` | HTTP 请求（用于下载远程图片） |

### 工具函数（`src/util/`）

- `config.js` — Cordova 文件系统路径（`rootPath`、`filesPath`、`cachePath`、`localPicPath`），在 `deviceready` 事件中初始化。
- `date.js` — 日期格式化和时间戳辅助函数。
- `path.js` — 文件路径解析和 MIME 类型检测。

### 本地 Cordova 插件（`android_plugins/cordova-plugin-downresource/`）

自定义 Cordova 插件，用于将图片/资源下载到设备本地，绕过浏览器的 CORS 跨域限制。Java 端（`Downresource.java`）处理下载逻辑；JS 桥接层暴露为全局变量 `Downresource`。

### 构建钩子

`scripts/android/hook_after_build.js` — 在 Android 构建完成后运行，打印输出文件（APK 或 AAB）及其大小。
