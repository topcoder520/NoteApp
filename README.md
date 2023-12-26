# NoteApp
技术栈：vue3+vue-router+vuex+cordova

# 准备
## 安装依赖
  `npm install .`

## 添加平台
  `cordova platform add android`







## 添加插件
  `cordova plugin add cordova-plugin-android-fingerprint-auth`
  `cordova plugin add cordova-plugin-camera`
  `cordova plugin add cordova-plugin-file`
  `cordova plugin add cordova-sqlite-storage`
  `cordova plugin add cordova-plugin-downresource`
  `cordova plugin add cordova-plugin-filechooser`
  `cordova plugin add cordova-plugin-filepath`
  `cordova plugin add cordova-plugin-file-opener2`
  ** cordova-sqlite-evcore-extbuild-free插件替代cordova-sqlite-storage插件 **

# 构建
npm run build && cordova build android
# 运行 browser
cordova run browser
