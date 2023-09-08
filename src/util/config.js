let rootPath = '';
let filesPath = ''; //app外部专用文件地址
let cachePath = ''; //app外部专用缓存地址
let localPicPath = ''; //app图片存储地址
let picFolderName = 'local'; //图片文件夹名称
document.addEventListener('deviceready',function(){
    rootPath = (window.cordova.platformId === 'browser')?"":cordova.file.externalRootDirectory;
    filesPath = (window.cordova.platformId === 'browser')?"":cordova.file.externalDataDirectory;
    cachePath = (window.cordova.platformId === 'browser')?"":cordova.file.externalCacheDirectory;
    localPicPath = filesPath + picFolderName+'/';
},false);

export {
    rootPath,
    filesPath,
    cachePath,
    localPicPath,
    picFolderName,
}