const fs = require('fs');
const util = require('util');
const path = require('path');
const stat = util.promisify(fs.stat);
const childProcess = require('child_process');

module.exports = function (context) {
    console.log('>script location:', context.scriptLocation);
    console.log('>hook type:', context.hook);
    if (!context.opts.platforms.includes('android')) return;

    const platformRoot = path.join(context.opts.projectRoot, 'platforms/android');
    const apkFileLocation = path.join(platformRoot, 'app/build/outputs/apk/debug/app-debug.apk');

    stat(apkFileLocation).then(stats => {
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

        console.log(`>Size of apk is ${size}`);
    });

    childProcess.execFile('cmd', ['/c', apkFileLocation], (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
    });
}