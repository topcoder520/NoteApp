//保存图片
export function saveImage(blob) {
    return new Promise((resolve, reject) => {
        window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory, function (root) {
            // 先查找这个文件，如果没有则创建
            if (root.isDirectory) {
                root.getDirectory('Pictures', { Create: true }, (dirEntry) => {
                    dirEntry.getDirectory('notepictures', { create: true }, (subDirEntry) => {
                        let time = new Date().getTime();
                        subDirEntry.getFile('note_cut_' + time + '.jpg', { create: true }, function (fileEntry) {
                            // 开始写入文件
                            fileEntry.createWriter(function (fileWriter) {
                                fileWriter.onwriteend = function () {
                                    console.log('写入文件成功');
                                    console.log(JSON.stringify(fileEntry));
                                    resolve(fileEntry);
                                    // 将fileEntry打印出来可以得到一个包含操作信息的对象
                                    //_this.resultUrl = fileEntry.nativeURL
                                    // 下一行不用管，是个人项目中的调用函数
                                    //_this.bridgeShare(_this.resultUrl)
                                },
                                // 失败回调
                                fileWriter.onerror = function (err) {
                                    console.error('写入文件失败：' + err.toString());
                                    reject('写入文件失败：' + err.toString());
                                }
                                // 以上创建新文件后，开始向文件中写入blob文件对象
                                fileWriter.write(blob);
                            });
                        }, function (err) { console.log('出错1', err.toString()); reject('出错1' + err.toString()); });
                    });
                })
            }
        }, function (err) { console.log('出错2', err.toString()); reject('出错2' + err.toString()); });
    });

}

function dataURItoBlob(dataURI) {
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]; // mime类型
    var byteString = atob(dataURI.split(',')[1]); //base64 解码
    var arrayBuffer = new ArrayBuffer(byteString.length); //创建缓冲数组
    var intArray = new Uint8Array(arrayBuffer); //创建视图

    for (var i = 0; i < byteString.length; i++) {
        intArray[i] = byteString.charCodeAt(i);
    }
    return new Blob([intArray], { type: mimeString });
}