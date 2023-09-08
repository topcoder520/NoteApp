import {filesPath,picFolderName} from '@/util/config'

export function replaceNativeURL(url){
    console.log('filesPath ',filesPath);
    if(!url){
        return "";
    }
    if(!url.startsWith('file://')){
        return url;
    }
    if(url.startsWith(filesPath)){
        return url;
    }
    url = url.substring(url.indexOf(picFolderName));
    console.log('localPicPath + url ',filesPath + url);
    return filesPath + url;
}