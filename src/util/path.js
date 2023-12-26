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

export function getPathInfo(path) {
    if(path.lastIndexOf('.') != -1){
        let ext = path.substring(path.lastIndexOf('.'));
        let name = path.substring(path.lastIndexOf('/') + 1, path.lastIndexOf('.'));
        name = decodeURI(name);
        return {
            path: path.substring(0, path.lastIndexOf('/')),
            name: name,
            ext: ext,
            mimeType:getMIMEType(ext)
        }
    }
    return {
        path: path,
        name: path,
        ext: '',
        mimeType: ''
    }
}

export function getMIMEType(ext){
    switch(ext){
        case '.jpg':
        case '.jpeg':
        case '.png':
        case '.gif':
            return 'image/jpeg';
        case '.doc':
            return 'application/msword';
        case '.docx':
            return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        case '.xls':
            return 'application/vnd.ms-excel';
        case '.xlsx':
            return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        case '.ppt':
            return 'application/vnd.ms-powerpoint';
        case '.pptx':
            return 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
        case '.pdf':
            return 'application/pdf';
        case '.txt':
            return 'text/plain';
        case '.mp4':
            return 'video/mp4';
        case '.mp3':
            return 'audio/mpeg';
        case '.zip':
            return 'application/zip';
        case '.rar':
            return 'application/x-rar-compressed';
        case '.7z':
            return 'application/x-7z-compressed';
        case '.html':
            return 'text/html';
        case '.css':
            return 'text/css';
        case '.js':
            return 'text/javascript';
        case '.json':
            return 'application/json';
        case '.xml':
            return 'text/xml';
        case '.png':
            return 'image/png';
        case '.jpg':
            return 'image/jpeg';
        case '.jpeg':
            return 'image/jpeg';
        case '.gif':
            return 'image/gif';
        case '.svg':
            return 'image/svg+xml';
        case '.equb':
            return 'application/application/epub+zip';
        case '.apk':
            return 'application/vnd.android.package-archive';
        default:
            return 'application/octet-stream';
    }
}





