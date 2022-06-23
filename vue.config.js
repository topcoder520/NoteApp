const { defineConfig } = require('@vue/cli-service')
const path = require("path")
//是否生产环境
const isProd = process.env.NODE_ENV === "production";

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = defineConfig({
  transpileDependencies: true,
  //项目部署的地址
  publicPath:isProd?'./':'/', 
  // 打包输出
  outputDir: "../www",
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  assetsDir: 'assets',
  // eslint-loader 是否在保存的时候检查
  lintOnSave: process.env.NODE_ENV !== 'production',
  
})
