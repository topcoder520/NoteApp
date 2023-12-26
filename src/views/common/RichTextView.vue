<template>
    <div id="richTextID" class="richText" @click="clickRichText" :contenteditable="editable" @keydown.enter="enterKeydown"
        @blur="blurRichText" ref="richDiv"></div>
    <van-back-top v-if="!editable" target=".richText" bottom="10vh" right="3vw" />
    <div class="tooltip" v-if="editable">
        <!--粗体-->
        <button @click="changeFont('B')">B</button>
        <!--字体下划线-->
        <button class="under" @click="changeFont('U')">U</button>
        <!--斜字体-->
        <button @click="changeFont('I')">I</button>
        <!--创建链接-->
        <button @click="changeFont('L')">
            <van-icon name="link-o" />
        </button>
        <!--选中字体颜色-->
        <button class="fontColor" @click="changeFont('A')">A</button>
        <!--选中字体背景色-->
        <button class="backFontColor" @click="changeFont('AB')"><span>A</span></button>
        <!--网络图片地址-->
        <button @click="changeFont('PH')">
            <van-icon name="photo-o" />
        </button>
        <!--本地图片-->
        <button @click="changeFont('PH2')">
            <van-icon name="photo" />
        </button>
        <!--拍照-->
        <button @click="changeFont('Camera')">
            <van-icon name="photograph" />
        </button>
        <!--本地图片 base64编码方式存到app-->
        <!-- <button @click="changeFont('PH3')">
            <van-icon name="photo" color="red" />
        </button> -->
        <!--待办复选框-->
        <button @click="changeFont('TODO')">
            <van-icon name="certificate" />
        </button>
        <!--无序列表-->
        <button @click="changeFont('BList')">
            <van-icon name="bars" />
        </button>
        <!--有序列表-->
        <button @click="changeFont('NList')">
            <van-icon name="descending" />
        </button>
        <button @click="changeFont('Time')">
            <van-icon name="tosend" />
        </button>
        <button @click="changeFont('SelFile')">
            <van-icon name="description" />
        </button>
    </div>
    <van-dialog class="showPicUrlDialog" v-model:show="showPicUrl" title="图片地址" show-cancel-button
        @confirm="showPicUrlconfirm" @closed="reCursorposition">
        <textarea v-model="picUrl" rows="6" style="width:96%;border: 1px solid #e1dcdc;"></textarea>
    </van-dialog>
    <van-dialog class="showPicUrlDialog" v-model:show="showLinkUrl" title="设置超链接" show-cancel-button
        @confirm="showLinkUrlconfirm">
        <textarea v-model="linkUrl" rows="6" style="width:96%;border: 1px solid #e1dcdc;"></textarea>
    </van-dialog>

    <!--图片预览-->
    <van-image-preview v-model:show="showPreview" :start-position="startPosition" :images="previewImages"
        @long-press="onLongPressEvent" @change="onPreviewChange">
        <template v-slot:previewIndex>第{{ previewIndex + 1 }}页</template>
    </van-image-preview>
    <!--下载图片-->
    <van-action-sheet v-model:show="showDownPic" @select="selectDownPicSheet" :actions="actionsPic" cancel-text="取消"
        close-on-click-action @cancel="onCancelDownPic" />
    <!--修改文件名-->
    <van-dialog class="showPicUrlDialog" v-model:show="showEditFileName" title="文件名" show-cancel-button
        @confirm="onEditFileNameConfirm" @closed="reCursorposition">
        <p>{{ selectFileName }}</p>
        <textarea v-model="editFileName" placeholder="输入文件名" rows="4"
            style="width:96%;border: 1px solid #e1dcdc;"></textarea>
    </van-dialog>
    <!--上传文件编辑-->
    <van-action-sheet v-model:show="showFileActionSheet" @select="selectEditFileSheet" :actions="actionsFileItem"
        cancel-text="取消" :description="editFileActionDes" close-on-click-action />
</template>
<script>
import { Toast } from '@vant/compat';
import { ref } from 'vue';

import { watch } from 'vue';

import { showConfirmDialog, showToast } from 'vant';

import { Takefromgalery, TakefromCamera, Takefromgalery2DataURL } from '@/plugin/camera';

import { getNowDateString } from '@/util/date';
import { replaceNativeURL, getPathInfo } from '@/util/path';
import { filesPath } from '@/util/config';
import { saveNetImage, downloadImage, selectFile, copyFile, fileOpener, removeFile } from '@/plugin/file';


export default {
    name: "RichText",
    props: {
        //展示内容
        value: {
            type: Object,
            default: () => ({ val: '', type: '0' })
        },
        //是否可编辑
        editable: {
            type: Boolean,
            default: () => true
        }
    },
    emits: {
        'getValue': null,
    },
    setup(props, context) {

        const richDiv = ref(null);
        watch(() => props.value, (newVal, oldVal) => {
            var rs = {};
            if (newVal.type == '0') {
                richDiv.value.innerHTML = newVal.val;
                let imgs = document.getElementById('richTextID').getElementsByTagName('img');
                console.log('imgs length ', imgs.length);
                if (imgs.length > 0) {
                    if (!editable.value) {//阅读模式下
                        let num = 0;
                        for (let i = 0; i < imgs.length; i++) {
                            const img = imgs[i];
                            let imgsrc = img.src;
                            if (imgsrc.startsWith('file://')) {
                                imgsrc = replaceNativeURL(imgsrc);//替换跟宿主机路径不一样的图片路径
                                if (imgsrc != img.src) {
                                    img.src = imgsrc;
                                    num++;
                                }
                            }
                        }
                        if (num > 0) {
                            rs = { changeInputCheck: true };
                        }
                    }
                }
                setRichText(rs);
            }
        }, { deep: true });

        //点击图片 长按保存
        const showPreview = ref(false);
        const previewImages = ref([]);
        const previewIndex = ref(0);
        const startPosition = ref(0);

        const onPreviewChange = (index) => {
            previewIndex.value = index;
        };

        const onLongPressEvent = (index) => {
            showDownPic.value = true;
        };
        const showDownPic = ref(false);
        const actionsPic = [{ name: '下载图片' }, { name: "其他应用打开" }];
        const onCancelDownPic = () => {

        };
        const selectDownPicSheet = (action, index) => {
            console.log('action', action, 'index', index);
            if (index == 0) {
                let downUrl = previewImages.value[previewIndex.value];
                console.log("down url:", downUrl);
                downloadImage(downUrl).then((res) => {
                    console.log("download image:", res);
                    Toast.success('下载成功');
                }).catch((err) => {
                    console.log("download image err:", err);
                    Toast.fail('下载失败');
                });
            } else if (index == 1) {
                let downUrl = previewImages.value[previewIndex.value];
                fileOpener(downUrl).then(() => {
                    console.log('open file success');
                }).catch((e) => {
                    console.log('open file fail', e);
                    Toast('open file fail' + e);
                });
            }
        };

        //点击文件，编辑文件信息
        const showFileActionSheet = ref(false);
        const actionsFileItem = [{ name: "其他应用打开" }, { name: "编辑文件名" }, { name: "下载文件" }, { name: "删除文件" }];
        const editFileActionDes = ref('文件操作');

        const showEditFileFlag = ref(false); //是否显示编辑文件名
        const selectTarget = ref(null);//选中的文件对象
        const selectEditFileSheet = (action, index) => {
            if (index == 0) {
                console.log('open file');
                //其他应用打开
                fileOpener(selectFilePath.value).then(() => {
                    console.log('open file success');
                }).catch((e) => {
                    console.log('open file fail', e);
                    Toast('open file fail' + e);
                });
            } else if (index == 1) {
                //重命名
                showEditFileFlag.value = true;
                showEditFileName.value = true;
            } else if (index == 2) {
                //下载文件
                console.log('download file');
                var downFileName = "";
                var info = getPathInfo(selectFilePath.value);
                if (editFileName.value.endsWith(info.ext)) {
                    downFileName = editFileName.value;
                } else {
                    downFileName = editFileName.value + info.ext;
                }
                downloadImage(selectFilePath.value, "Documents", downFileName).then((res) => {
                    console.log("download file:", res);
                    Toast.success('下载成功');
                }).catch((err) => {
                    console.log("download file err:", err);
                    Toast.fail('下载失败');
                });
            } else if (index == 3) {
                //删除文件
                console.log('delete file');
                showConfirmDialog({
                    title: '提示',
                    message: '确定要删除该文件吗？',
                }).then(async () => {
                    //删除文件
                    removeFile(selectFilePath.value).then(() => {
                        //删除节点
                        selectTarget.value.parentNode.removeChild(selectTarget.value);
                        setRichText({ changeInputCheck: true });
                        Toast.success('删除成功');
                    }).catch((err) => {
                        console.log("delete file err:", err);
                        Toast.fail('删除失败');
                    });
                }).catch(() => {
                });
            }
        };

        //input[checkbox] 状态保存
        const clickRichText = (e) => {
            if (e.target.className == 'checkbox') {
                console.log('checked');
                //判断是否有多个checkbox，如果是则不处理
                const parent = e.target.parentNode;
                console.log('parent', parent);
                const childrens = parent.children;
                let num = 0;
                for (let index = 0; index < childrens.length; index++) {
                    const el = childrens[index];
                    if (el.type == 'checkbox') {
                        num++;
                    }
                    if (num > 1) {
                        break;
                    }
                }
                //设置input[checkbox]状态
                if (e.target.checked) {
                    e.target.setAttribute('checked', true);
                    if (num == 1) {
                        parent.className += ' checkdivChecked';
                    }
                } else {
                    e.target.removeAttribute('checked');
                    let className = parent.className;
                    let pclasslist = className.split(' ');
                    let index = pclasslist.indexOf('checkdivChecked');
                    if (index != -1) {
                        pclasslist.splice(index, 1);
                        parent.className = pclasslist.join(' ');
                    }
                }
                setRichText({ changeInputCheck: true });
            } else if (!editable.value && e.target.localName == 'img') {
                //img 
                var imgsrc = e.target.src;
                console.log('imgsrc', imgsrc);
                let imgsrcList = [];
                let imgs = document.getElementById('richTextID').getElementsByTagName('img');
                let location = 0;
                for (let i = 0; i < imgs.length; i++) {
                    const img = imgs[i];
                    console.log('img', img, ' compare:', img.src == imgsrc);
                    if (img.src == imgsrc) {
                        location = i;
                    }
                    imgsrcList.push(img.src);
                }
                previewImages.value = imgsrcList;
                previewIndex.value = location;
                startPosition.value = location;
                console.log('previewIndex', previewIndex.value);
                //展示预览
                showPreview.value = true;
            } else if (!editable.value && e.target.className == 'uploadfile') {
                //是否打开上传的文件
                selectFilePath.value = e.target.getAttribute('data-path');
                console.log('data-path', selectFilePath.value);
                editFileActionDes.value = e.target.innerText;
                selectFileName.value = e.target.innerText;
                editFileName.value = e.target.innerText;

                selectTarget.value = e.target;

                showFileActionSheet.value = true;
            }
        }


        const blurRichText = (e) => {
            console.log(e);
            context.emit('getValue', { html: e.target.innerHTML, text: e.target.innerText });
        }

        const setRichText = (obj) => {
            var rs = { html: richDiv.value.innerHTML, text: richDiv.value.innerText };
            if (obj) {
                rs = Object.assign({}, rs, obj);
            }
            context.emit('getValue', rs);

            let imgs = document.getElementById('richTextID').getElementsByTagName('img');
            if (imgs.length > 0) {
                for (let i = 0; i < imgs.length; i++) {
                    const simg = imgs[i];
                    if (simg.src.startsWith('http://') || simg.src.startsWith('https://')) {
                        saveNetImage(simg.src).then(res => {
                            console.log('res', res);
                            simg.setAttribute('data-source-url', simg.src)
                            simg.src = res;
                        });
                    } else if (simg.src.startsWith('data:image/') || simg.src.startsWith('file://')) {
                        let sourceurl = simg.getAttribute('data-source-url');
                        if (sourceurl) {
                            saveNetImage(sourceurl).then(res => {
                                console.log('res', res);
                                if (simg.src != res) {
                                    simg.src = res;
                                }
                            });
                        }
                    }
                }
            }
        }

        //设置超链接
        const showLinkUrl = ref(false);
        const linkUrl = ref(''); //地址
        const showLinkUrlconfirm = () => {
            console.log('linkUrl', linkUrl.value);
            if (linkUrl.value.trim().length > 0) {
                setSelectionRange();
                const selection = window.getSelection();
                if (selection.rangeCount > 0) {
                    console.log('恢复选择文本了');
                    document.execCommand("CreateLink", false, linkUrl.value);
                    setRichText();
                }
            } else {
                Toast('请输入超链接地址')
            }

        }


        const showPicUrl = ref(false); //是否展示图片地址弹框
        const picUrl = ref(''); //图片网络地址

        //上传文件
        const showEditFileName = ref(false); //是否展示修改文件名弹框
        const selectFileName = ref(''); //当前选中的文件名
        const editFileName = ref(''); //修改后的文件名
        const selectFilePath = ref(''); //当前选中的文件路径
        const onEditFileNameConfirm = () => {
            console.log('editFileName', editFileName.value);
            if (editFileName.value.trim().length > 0) {
                if (!showEditFileFlag.value) {
                    //上传文件
                    var info = getPathInfo(selectFilePath.value);
                    var timestr = 'upload_file_' + new Date().getTime();
                    copyFile(selectFilePath.value, filesPath, "document", timestr + info.ext).then((data) => {
                        console.log('copyFile', data.toURL());
                        richDiv.value.focus();
                        //设置光标位置
                        setSelectionRange();
                        var htmlstr = `<div class="uploadfile" style="color: #1989fa;text-decoration: underline;margin: 13px 6px;" data-path="${data.toURL()}">${editFileName.value}${info.ext}</div>`;
                        document.execCommand("insertHTML", false, htmlstr);
                        document.execCommand('insertHTML', false, "<br/>");
                        showEditFileName.value = false;
                        setRichText();
                    }).catch((err) => {
                        console.log('err', err);
                        Toast('上传文件失败');
                    })
                } else {
                    //编辑文件名
                    showEditFileFlag.value = false;
                    var info = getPathInfo(selectFilePath.value);
                    if (!editFileName.value.endsWith(info.ext)) {
                        selectTarget.value.innerText = editFileName.value + info.ext;
                    } else {
                        selectTarget.value.innerText = editFileName.value;
                    }
                    showEditFileName.value = false;
                    var rs = { changeInputCheck: true };
                    setRichText(rs);

                }

            } else {
                Toast('请输入文件名')
            }
        };

        const changeFont = (typ) => {
            if (typ == 'B') {//粗体
                document.execCommand("Bold", false, null);
                setRichText();
            } else if (typ == 'U') {//下划线
                document.execCommand("Underline", false, null);
                setRichText();
            } else if (typ == 'I') {//斜体
                document.execCommand("Italic", false, null);
                setRichText();
            } else if (typ == 'L') {//设置超链接,链接地址是选中的文字
                linkUrl.value = "";
                showLinkUrl.value = true;
                getSelectionRange();
            } else if (typ == 'A') {//字体颜色
                document.execCommand("ForeColor", false, '#ff4d4f');
                setRichText();
            } else if (typ == 'AB') {//字体背景颜色
                document.execCommand("BackColor", false, '#40a9ff');
                setRichText();
            } else if (typ == 'BList') {//无序列表
                document.execCommand("insertUnorderedList", false, null);
                setRichText();
            } else if (typ == 'NList') {//有序列表
                document.execCommand("insertOrderedList", false, null);
                setRichText();
            } else if (typ == 'TODO') {//待办
                //checkbox的html
                var htmlStr = `<div class="checkdiv"><input type="checkbox" class="checkbox"/></div>`;

                document.execCommand("insertHTML", false, htmlStr);
                setRichText();
            } else if (typ == 'PH') {//网上图片
                picUrl.value = "";
                showPicUrl.value = true;
                getSelectionRange();
            } else if (typ == 'PH2') {//本地图片
                getSelectionRange();
                //调用相册接口
                Takefromgalery().then((resole) => {
                    console.log(resole);
                    if (resole.type == 'base64') {
                        var htmlStr = `<div class="photobox" style="width: 100%;"><img class="insertphoto" src="data:image/jpeg;base64,${resole.data}" style="width: 100%;"></div>`;
                        document.execCommand("insertHTML", false, htmlStr);
                    } else {
                        var htmlStr = `<div class="photobox" style="width: 100%;"><img class="insertphoto" src="${resole.data}" style="width: 100%;"></div>`;
                        //document.execCommand("insertText", false, htmlStr);
                        document.execCommand("insertHTML", false, htmlStr);
                    }
                }).catch((e) => {
                    console.log(e);
                    Toast(e);
                });
            } else if (typ == 'Camera') {//拍照
                getSelectionRange();
                //调用相册接口
                TakefromCamera().then((resole) => {
                    console.log(resole);
                    if (resole.type == 'base64') {
                        var htmlStr = `<div class="photobox" style="width: 100%;"><img class="insertphoto" src="data:image/jpeg;base64,${resole.data}" style="width: 100%;"></div>`;
                        document.execCommand("insertHTML", false, htmlStr);
                    } else {
                        var htmlStr = `<div class="photobox" style="width: 100%;"><img class="insertphoto" src="${resole.data}" style="width: 100%;"></div>`;
                        //document.execCommand("insertText", false, htmlStr);
                        document.execCommand("insertHTML", false, htmlStr);
                    }
                }).catch((e) => {
                    console.log(e);
                    Toast(e);
                });

            } else if (typ == 'PH3') {//本地图片 base64编码方式存到app里面
                getSelectionRange();
                //调用相册接口
                Takefromgalery2DataURL().then((resole) => {
                    console.log(resole);
                    if (resole.type == 'base64') {
                        var htmlStr = `<div class="photobox" style="width: 100%;"><img class="insertphoto" src="data:image/jpeg;base64,${resole.data}" style="width: 100%;"></div>`;
                        document.execCommand("insertHTML", false, htmlStr);
                    } else {
                        var htmlStr = `<div class="photobox" style="width: 100%;"><img class="insertphoto" src="${resole.data}" style="width: 100%;"></div>`;
                        //document.execCommand("insertText", false, htmlStr);
                        document.execCommand("insertHTML", false, htmlStr);
                    }
                }).catch((e) => {
                    console.log(e);
                    Toast(e);
                });
            } else if (typ == 'Time') {//时间
                //checkbox的html
                var datestr = getNowDateString(1);
                var htmlStr = `[${datestr}]`;
                document.execCommand("insertHTML", false, htmlStr);
                setRichText();
            } else if (typ == 'SelFile') {
                //选择文件 并上传
                getSelectionRange();
                selectFile().then((uri) => {
                    console.log(uri);
                    selectFilePath.value = uri;
                    var info = getPathInfo(uri);
                    //弹窗口
                    editFileName.value = info.name;
                    selectFileName.value = info.name + info.ext;
                    showEditFileName.value = true;
                }).catch((e) => {
                    console.log(e);
                    Toast(e);
                });

            }
        }

        let rangeRef = ref(null);
        //获取光标位置
        const getSelectionRange = () => {
            //提前获取光标位置
            let selection = window.getSelection();
            console.log(selection);
            let range = selection.getRangeAt(0); //获取光标位置
            rangeRef.value = range; //保存光标位置
            console.log(range);
        }
        //设置光标位置
        const setSelectionRange = () => {
            //恢复光标位置
            var sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(rangeRef.value);
        }

        //图片网址
        const showPicUrlconfirm = () => {
            if (picUrl.value.trim().length > 0) {
                //showPicUrl.value = false;
                console.log('showPicUrlconfirm');
                console.log('picUrl', picUrl.value);
                richDiv.value.focus();
                //设置光标位置
                setSelectionRange();
                //document.execCommand("insertImage", false, picUrl.value);
                var htmlStr = `<img src="${picUrl.value}" style="width: 100%;">`;
                document.execCommand("insertHTML", false, htmlStr);
                setRichText();
            } else {
                Toast('请输入图片地址')
            }

        }
        //恢复光标位置
        const reCursorposition = (e) => {
            richDiv.value.focus();
            setSelectionRange();
        }
        //处理换行时系统在空的div加上class = 'checkdivChecked'
        //换行时去掉空div的类名checkdivChecked
        const enterAfter = (e) => {
            var parent = e.target;
            //checkbox
            var checkdivList = parent.querySelectorAll('.checkdiv');
            console.log(checkdivList);
            if (checkdivList.length > 0) {
                for (let index = 0; index < checkdivList.length; index++) {
                    const el = checkdivList[index];
                    var inputCheck = el.querySelector('.checkbox');
                    if (inputCheck == null) {
                        let className = el.className;
                        let pclasslist = className.split(' ');
                        let index = pclasslist.indexOf('checkdivChecked');
                        if (index != -1) {
                            pclasslist.splice(index, 1);
                            el.className = pclasslist.join(' ');
                        }
                    }
                }
            }
        }

        //换行自动添加input[checkbox]
        const newInputCheckbox = (range, inc) => {
            console.log('kd', range);
            //在checkbox行换行的时候自动插入inputcheckbox
            let parentCheckbox = range.startContainer.parentNode;
            let classList = parentCheckbox.className.split(' ');
            if (classList.indexOf('checkdiv') != -1) {
                var inputCheck = parentCheckbox.querySelector('.checkbox');
                if (inputCheck != null) {
                    var htmlStr = `<div class="checkdiv box${inc}"><input type="checkbox" class="checkbox"/></div>`;
                    document.execCommand("insertHTML", false, htmlStr);
                    setRichText();
                    console.log('add input[checkbox]');
                }
            }
        }

        //监听换行事件
        const incRef = ref(0);
        const enterKeydown = (e) => {
            console.log('键盘', e)
            let selection = window.getSelection();
            console.log(selection);
            let range = selection.getRangeAt(0); //获取光标位置
            setTimeout(function () {
                enterAfter(e);
                newInputCheckbox(range, incRef.value);
            }, 200)
            incRef.value = incRef.value + 1;
        }

        const editable = ref(props.editable);


        return {
            richDiv,
            blurRichText,
            changeFont,
            enterKeydown,
            clickRichText,
            editable,
            showPicUrl,
            showPicUrlconfirm,
            picUrl,

            showLinkUrl,
            linkUrl,
            showLinkUrlconfirm,

            showPreview,
            previewImages,
            previewIndex,
            startPosition,
            onPreviewChange,
            onLongPressEvent,

            onCancelDownPic,
            showDownPic,
            actionsPic,
            selectDownPicSheet,

            showEditFileName,
            selectFileName,
            editFileName,
            onEditFileNameConfirm,

            showFileActionSheet,
            actionsFileItem,
            editFileActionDes,
            selectEditFileSheet,

        }
    }
}
</script>
<style lang="less">
.richText {
    text-align: left;
    width: 100%;
    height: 100%;
    //border: 1px solid;
    overflow: auto;
}

.richText ul {
    list-style: auto !important;
    margin: 8px 25px;
}

.richText ul li {
    list-style: inside;
    display: list-item !important;
}

.richText ol {
    list-style: auto !important;
    padding: revert !important;
    margin-top: 8px;
    margin-bottom: 8px;
}

.richText .checkbox {
    margin-left: 16px;
    margin-right: 5px;
    position: relative;
    top: 2px;
}

.richText:focus {
    outline: none;
}

.richText .checkdivChecked {
    text-decoration: line-through;
    color: #999;
}

.tooltip {
    position: fixed;
    bottom: 0px;
    width: 100%;
    text-align: left;
    left: 0px;
    background: #fff;

    button {
        width: 42px;
        height: 28px;
        background: #fff;
        border: 1px #111;
    }

    button:active {
        background-color: #d5ddd5;
        color: #fff;
    }

    button.under,
    button.fontColor {
        text-decoration: underline;
    }

    button.backFontColor span {
        position: relative;
        background: #000;
        color: #fff;
        padding: 2px 4px;
    }
}

.showPicUrlDialog input {
    border: 1px solid #eee;
    width: 94%;
    height: 30px;
    border-radius: 2px;
}
</style>