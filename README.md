# NoteApp
技术栈：vue3+vue-router+vuex+cordova

# 准备
## 安装依赖
  `npm install .`

## 添加平台
  `npm install -g cordova`

  `cordova platform add android`







## 添加插件
  `cordova plugin add cordova-plugin-android-fingerprint-auth`

  `cordova plugin add cordova-plugin-camera`

  `cordova plugin add cordova-plugin-file`

  `cordova plugin add cordova-sqlite-evcore-extbuild-free`

  `cordova plugin add cordova-plugin-filechooser`

  `cordova plugin add cordova-plugin-filepath`

  `cordova plugin add cordova-plugin-file-opener2`

  `cordova plugin add cordova-clipboard`

  `cordova plugin add cordova-plugin-splashscreen`

  `cordova plugin add android_plugins/cordova-plugin-downresource`
  
  其中`cordova-plugin-downresource`是本地实现的插件，作用是下载图片等资源文件，解决浏览器安全跨域问题，`android_plugins/cordova-plugin-downresource`是插件在项目中的相对路径

# 构建
npm run build && cordova build android
# 运行 browser
cordova run browser
