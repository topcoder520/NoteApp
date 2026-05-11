const fs = require('fs');
const util = require('util');
const path = require('path');
const stat = util.promisify(fs.stat);
const childProcess = require('child_process');

module.exports = function (context) {
    console.log('>script location:', context.scriptLocation);
    console.log('>hook type:', context.hook);
    if (!context.opts.platforms.includes('android')) return;
                    
    const isRelease = context.opts.options && context.opts.options.release;
    const buildType = isRelease ? 'release' : 'debug';

    console.log(`>检测到构建类型: ${buildType}`);

    const buildOutputType = context.opts.options.buildConfig.indexOf('aab') !== -1 ? 'aab' : 'apk';
    const projectRoot = context.opts.projectRoot;
    var filePath = '';
    if(buildOutputType === 'aab') {
        filePath = path.join(projectRoot, 'platforms', 'android', 'app', 'build', 'outputs', 'bundle', buildType, `app-${buildType}.aab`);
    } else {
        filePath = path.join(projectRoot, 'platforms', 'android', 'app', 'build', 'outputs', 'apk', buildType, `app-${buildType}.apk`);
    }

    stat(filePath).then(stats => {
        var size = stats.size;
        if (size >= 1024 * 1024 * 1024) {
            size = size / (1024 * 1024 * 1024);
            size = size.toFixed(2) + ' GB';
        } else if (size >= 1024 * 1024) {
            size = size / (1024 * 1024);
            size = size.toFixed(2) + ' MB';
        } else if (size >= 1024) {
            size = size / 1024;
            size = size.toFixed(2) + ' KB';
        } else {
            size = size + ' bytes';
        }

        console.log(`>构建文件大小：${size}`);
    });
    //判断filepath是否是apk或者aab文件
    const isApk = filePath.endsWith('.apk');
    //const isAab = filePath.endsWith('.aab');
    if (isApk) {
        // childProcess.execFile('cmd', ['/c', filePath], (error, stdout, stderr) => {
        //     if (error) {
        //         console.error(`exec error: ${error}`);
        //         return;
        //     }
        // });
    }
    
}