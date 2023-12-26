import { rootPath, cachePath, filesPath, picFolderName } from '@/util/config'
import { getPathInfo, getMIMEType } from '@/util/path'
//import {fetchImage} from '@/plugin/request'
import html2canvas from 'html2canvas';

var permissions = "";

document.addEventListener('deviceready', function () {
    permissions = (window.cordova.platformId === 'browser') ? "" : cordova.plugins.permissions;
}, false)

//保存图片
export function saveImage(blob) {
    return new Promise((resolve, reject) => {
        permissions.checkPermission(permissions.WRITE_EXTERNAL_STORAGE, function (status) {
            if (status.hasPermission) {
                saveImageAsBlob(blob, resolve, reject);
            }
            else {
                //reject('没有写入权限')
                permissions.requestPermission(permissions.WRITE_EXTERNAL_STORAGE, (stat) => {
                    if (!stat.hasPermission) {
                        reject('获取写入权限失败');
                    } else {
                        saveImageAsBlob(blob, resolve, reject);
                    }
                }, err => {
                    reject(JSON.stringify(err));
                });
            }
        });
    });

}

function saveImageAsBlob(blob, resolve, reject) {
    window.resolveLocalFileSystemURL(rootPath, function (root) {
        // 先查找这个文件，如果没有则创建
        if (root.isDirectory) {
            root.getDirectory('Pictures', { create: true }, (dirEntry) => {
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
                    }, function (err) { console.log('出错1', JSON.stringify(err)); reject('出错1' + JSON.stringify(err)); });
                });
            })
        }
    }, function (err) {
        console.log('出错2', JSON.stringify(err));
        reject('出错2' + JSON.stringify(err));
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

export function copyFile(fromFileURL, toParentDirectURL, newFolder, newName) {
    console.log('fromFileURL', fromFileURL);
    console.log('toParentDirectURL', toParentDirectURL);
    console.log('newFolder', newFolder);
    console.log('newName', newName);
    return new Promise((resolve, reject) => {
        window.resolveLocalFileSystemURL(toParentDirectURL, (dirEntry) => {
            console.log('dirEntry ', dirEntry.toURL(), 'isDirectory', dirEntry.isDirectory);
            dirEntry.getDirectory(newFolder, { create: true }, (newFolderEntry) => {
                window.resolveLocalFileSystemURL(fromFileURL, function (root) {
                    // 先查找这个文件，如果没有则创建
                    if (root.isFile) {
                        root.copyTo(newFolderEntry, newName, (entry) => {
                            console.log('copy success :', entry.nativeURL)
                            resolve(entry);
                        }, (err) => {
                            console.log('copy err', JSON.stringify(err))
                            reject('copy err', JSON.stringify(err));
                        })
                    } else {
                        console.log('fromFileURL: ', fromFileURL, ' isFile:false')
                    }
                }, function (err) {
                    console.log('fromFileURL出错2', JSON.stringify(err));
                    reject('fromFileURL出错2' + JSON.stringify(err));
                });
            }, (err) => {
                console.log('create newFolder error', JSON.stringify(err));
                reject('create newFolder error:' + JSON.stringify(err));
            });
        }, (err) => {
            console.log('err', JSON.stringify(err), 'toParentDirectURL:', toParentDirectURL)
            reject(JSON.stringify(err));
        });
    });
}
//下载网络图片 用插件下载图片避免跨域
export function saveNetImage(url) {
    return new Promise((resolve, reject) => {
        window.resolveLocalFileSystemURL(cachePath, (root) => {
            root.getDirectory(picFolderName, { create: true }, (dirEntry) => {
                let filename = "";
                let fromFileURL = "";
                if (url.indexOf('?') > -1) {
                    fromFileURL = url.substring(0, url.indexOf('?'));
                } else {
                    fromFileURL = url
                }
                if (fromFileURL.endsWith('.jpg')
                    || fromFileURL.endsWith('.jpeg')
                    || fromFileURL.endsWith('.png')
                    || fromFileURL.endsWith('.gif')) {
                    filename = fromFileURL.substring(fromFileURL.lastIndexOf('/') + 1);
                } else {
                    filename = hashCode(url);
                    filename = "image_note_" + filename + '.jpg';
                }
                dirEntry.getFile(filename, { create: true }, (fileEntry) => {
                    console.log('axios url ', url);
                    console.log('local path ', fileEntry.toURL());
                    Downresource.fetchFromURL(url, fileEntry.toURL(), 0, (res) => {
                        console.log('res', res);
                        resolve(fileEntry.toURL());
                    }, (err) => {
                        console.log('err', err);
                        reject(err);
                    });
                })
            });
        });
    })
}

function hashCode(str) {
    var hash = 0, i, chr;
    if (str.length === 0) return hash;
    for (i = 0; i < str.length; i++) {
        chr = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};

//图片截图

let getCanvas = (el, y, height) => {
    return new Promise((resolve, reject) => {
        console.log('2 y,height', y, height);
        let canvas = document.createElement('canvas');
        canvas.width = el.clientWidth * 4 + 100;
        canvas.height = height;
        html2canvas(el, {
            canvas: canvas,
            allowTaint: true,
            backgroundColor: '#fff',
            useCORS: true,
            imageTimeout: 15000,
            scale: 4,  //数值越大图片越清晰
            y: y / 4,
        }).then((rescanvas) => {
            resolve(rescanvas);
        }).catch((err) => {
            reject(err);
        })
    });
}


export function cutImage(el) {
    return new Promise((resolve, reject) => {
        //对高度分段
        try {
            let cutHeight = 30000;
            let scrollHeight = el.scrollHeight * 4;
            let heightArr = [];
            if (cutHeight > scrollHeight) {
                heightArr.push(scrollHeight);
            } else {
                let ys = scrollHeight % cutHeight;
                let addNum = Math.floor(scrollHeight / cutHeight);
                for (let i = 0; i < addNum; i++) {
                    heightArr.push(cutHeight);
                }
                heightArr.push(ys);
            }
            console.log('heightArr', JSON.stringify(heightArr));
            let funcArr = [];
            for (let i = 0; i < heightArr.length; i++) {
                let func = getCanvas(el, i * cutHeight, heightArr[i]);
                funcArr.push(func);
                //break;
            }
            console.log('funcArr num ', funcArr.length);
            Promise.all(funcArr).then(res => {
                if (res.length > 0) {
                    var canvas = document.createElement('canvas');
                    canvas.width = res[0].width;
                    canvas.height = scrollHeight;
                    var ctx = canvas.getContext('2d');
                    for (let i = 0; i < res.length; i++) {
                        ctx.drawImage(res[i], 0, i * cutHeight, res[i].width, res[i].height);
                    }
                    canvas.toBlob((blob) => {
                        saveImage(blob).then((cres) => {
                            resolve(cres);
                        }).catch((err) => {
                            reject(err);
                        });
                    }, "image/jpeg", 1)
                }
            }).catch(err => {
                console.log('err', err);
                reject(err);
            })
        } catch (error) {
            reject(error);
        }
    });

}


//下载图片
export function downloadImage(url, folderName, fileName) {
    return new Promise((resolve, reject) => {
        if (url.startsWith('file://')) {
            window.resolveLocalFileSystemURL(url, function success(fileEntry) {
                var newPicName = fileName;
                if (!newPicName) {
                    newPicName = 'Download' + new Date().getTime() + '.jpg';
                }
                if (!folderName) {
                    folderName = 'Pictures';
                }
                copyFile(fileEntry.toURL(), rootPath, folderName, newPicName).then((data) => {
                    //nativeURL
                    console.log('camera copy file address success:', data.toURL());
                    resolve(data.toURL());
                }).catch(e => {
                    console.log('camera copy file address error:', JSON.stringify(e));
                    reject(e);
                });
            });

        } else {
            window.resolveLocalFileSystemURL(rootPath, (root) => {
                var newPicName = fileName;
                if (!newPicName) {
                    newPicName = 'Download' + new Date().getTime() + '.jpg';
                }
                if (!folderName) {
                    folderName = 'Pictures';
                }
                root.getDirectory(folderName, { create: true }, (dirEntry) => {
                    dirEntry.getFile(newPicName, { create: true }, (fileEntry) => {
                        console.log('axios url ', url);
                        console.log('local path ', fileEntry.toURL());
                        Downresource.fetchFromURL(url, fileEntry.toURL(), 0, (res) => {
                            console.log('res', res);
                            resolve(fileEntry.toURL());
                        }, (err) => {
                            console.log('err', err);
                            reject(err);
                        });
                    })
                });
            });
        }
    });
}

//选择文件
export function selectFile() {
    return new Promise((resolve, reject) => {
        fileChooser.open((contentPath) => {
            window.FilePath.resolveNativePath(contentPath, function (finalPath) {
                resolve(finalPath);
            }, function (error) {
                reject(error);
            });
        }, (err) => {
            reject(err);
        });
    });

}
//寻找打开文件的app
export function fileOpener(filepath) {
    let info = getPathInfo(filepath);
    console.log('mimetype:', info.mimeType);
    return new Promise((resolve, reject) => {
        cordova.plugins.fileOpener2.showOpenWithDialog(
            filepath, // You can also use a Cordova-style file uri: cdvfile://localhost/persistent/Downloads/starwars.pdf
            info.mimeType,
            {
                error: (e) => {
                    reject(e);
                },
                success: (e) => {
                    resolve();
                }
            }
        );
    });
}
//删除文件
export function removeFile(filepath) {
    return new Promise((resolve, reject) => {
        window.resolveLocalFileSystemURL(filepath, function (fileEntry) {
            fileEntry.remove(function () {
                console.log('delete success');
                resolve();
            }, function (err) {
                console.error(err);
                reject(err);
            }, function (err) {
                console.log('file not exist');
                reject(err)
            });
        })
    });

}