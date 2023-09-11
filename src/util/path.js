import { filesPath, cachePath, picFolderName } from '@/util/config'

export function replaceNativeURL(url) {
    console.log('filesPath ', filesPath);
    if (!url) {
        return "";
    }
    if (!url.startsWith('file://')) {
        return url;
    }
    if (url.startsWith(filesPath) || url.startsWith(cachePath)) {
        return url;
    }
    let subpath = url.substring(url.indexOf(picFolderName));
    if (url.indexOf('/files/') != -1) {
        console.log('filesPath + url ', filesPath + url);
        url = filesPath + subpath;
    } else {
        console.log('cachePath + url ', cachePath + url);
        url = cachePath + subpath;
    }
    return url;
}