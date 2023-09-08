import {rootPath} from '@/util/config'

var permissions = "";

document.addEventListener('deviceready',function(){
    permissions = (window.cordova.platformId === 'browser')?"":cordova.plugins.permissions;
},false)

//保存图片
export function saveImage(blob) {
    return new Promise((resolve, reject) => {
        permissions.checkPermission(permissions.WRITE_EXTERNAL_STORAGE, function( status ){
            if ( status.hasPermission ) {
                saveImageAsBlob(blob,resolve,reject);
            }
            else {
              //reject('没有写入权限')
              permissions.requestPermission(permissions.WRITE_EXTERNAL_STORAGE,(stat)=>{
                if( !stat.hasPermission ){
                    reject('获取写入权限失败');
                }else{
                    saveImageAsBlob(blob,resolve,reject);
                }
              },err=>{
                reject(JSON.stringify(err));
              });
            }
          });
    });

}

function saveImageAsBlob(blob,resolve,reject){
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

export function copyFile(fromFileURL, toParentDirectURL,newFolder, newName) {
    console.log('fromFileURL',fromFileURL);
    console.log('toParentDirectURL',toParentDirectURL);
    console.log('newFolder',newFolder);
    console.log('newName',newName);
    return new Promise((resolve, reject) => {
        window.resolveLocalFileSystemURL(toParentDirectURL, (dirEntry) => {
            console.log('dirEntry ',dirEntry.toURL(),'isDirectory',dirEntry.isDirectory);
            dirEntry.getDirectory(newFolder,{create:true},(newFolderEntry)=>{
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
            },(err)=>{
                console.log('create newFolder error',JSON.stringify(err));
                reject('create newFolder error:'+ JSON.stringify(err)); 
            });           
        }, (err) => {
            console.log('err',JSON.stringify(err),'toParentDirectURL:',toParentDirectURL)
            reject(JSON.stringify(err));
        });
    });
}


