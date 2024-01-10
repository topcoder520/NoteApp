export function copyText(text){
    return new Promise((resolve, reject)=>{
        //复制文本到剪贴板
        cordova.plugins.clipboard.copy(text, function () {
            resolve();
        }, function (err) {
            reject(err);
        });
    });
}
export function pasteText(){
    return new Promise((resolve, reject) => {
        cordova.plugins.clipboard.paste(function (text) {
            resolve(text);
        }, function (err) {
            reject(err);
        });
    });
}
export function clearText(){
    return new Promise((resolve, reject) => {
        cordova.plugins.clipboard.clear(function () {
            resolve();
        }, function (err) {
            reject(err);
        });
    }); 
}