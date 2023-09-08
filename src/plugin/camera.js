import { copyFile } from '@/plugin/file'
import { filesPath,picFolderName } from '@/util/config'

//调用相册接口
export function Takefromgalery() {
    return new Promise((resolve, reject) => {
        var cameraOptions = {
            quality: 100,
            //destinationType : Camera.DestinationType.DATA_URL,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM, //相册类型
            allowEdit: false,
            encodingType: Camera.EncodingType.JPEG,
            //targetWdith : 100,
            //targetHeight : 100,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false,
        };
        console.log('调用相册接口');
        navigator.camera.getPicture((imgUri) => {
            console.log('onCameraSuccess:', imgUri);
            if (!imgUri.startsWith('file://')) {
                imgUri = `file://${imgUri}`;
            }
            window.resolveLocalFileSystemURL(imgUri, function success(fileEntry) {

                // Do something with the FileEntry object, like write to it, upload it, etc.
                // writeFile(fileEntry, imgUri);
                console.log("got file: " + fileEntry.toURL());
                console.log("got file: " + fileEntry.toInternalURL());
                // displayFileData(fileEntry.nativeURL, "Native URL");

                //复制图片到 cordova.file.externalDataDirectory 路径下
                copyFile(fileEntry.toURL(),filesPath, picFolderName, null).then((data) => {
                    //nativeURL
                    console.log('camera copy file address success:', data.toURL());
                    resolve({ type: 'uri', data: data.toURL() });
                }).catch(e => {
                    console.log('camera copy file address error:', JSON.stringify(e));
                    reject(e);
                });
            }, function (e) {
                // If don't get the FileEntry (which may happen when testing
                // on some emulators), copy to a new FileEntry.
                //createNewFileEntry(imgUri);
                console.log('eeee', JSON.stringify(e));
                reject(e);
            });
            //resolve({type:'uri',data:imgUri});
        }, (e) => {
            console.log('onCameraError:', e);
            reject(e);
        }, cameraOptions);
    });
}

export function Takefromgalery2DataURL() {
    return new Promise((resolve, reject) => {
        var cameraOptions = {
            quality: 100,
            destinationType: Camera.DestinationType.DATA_URL,
            //destinationType : Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM, //相册类型
            allowEdit: false,
            encodingType: Camera.EncodingType.JPEG,
            //targetWdith : 100,
            //targetHeight : 100,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false,
        };
        console.log('调用相册接口');

        //todo 图片放入缓存文件来代替数据库

        navigator.camera.getPicture((imgUri) => {
            //console.log('onCameraSuccess:',imgUri);
            resolve({ type: 'base64', data: imgUri });
        }, (e) => {
            console.log('onCameraError:', e);
            reject(e);
        }, cameraOptions);
    });
}
