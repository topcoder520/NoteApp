<template>
    <div class="richText" @click="clickRichText" :contenteditable="editable" @keydown.enter="myKeydown" @blur="blurRichText"
        ref="richDiv"></div>
    <van-back-top v-if="!editable" target=".richText"  bottom="5vh" right="3vw"/>
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
    </div>
    <van-dialog class="showPicUrlDialog" v-model:show="showPicUrl" title="图片地址" show-cancel-button
        @confirm="showPicUrlconfirm" @closed="reCursorposition">
        <input type="text" v-model="picUrl" />
    </van-dialog>
</template>
<script>
import { Toast } from '@vant/compat';
import { ref } from 'vue';

import { watch } from 'vue';

import { Takefromgalery } from '@/plugin/camera';

import { getNowDateString } from '@/util/date';

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
            if (newVal.type == '0') {
                richDiv.value.innerHTML = newVal.val;
            }
            setRichText();
        }, { deep: true });
        //input[checkbox] 状态保存
        const clickRichText = (e) => {
            console.log('clickRichText', e)
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
        }

        const showPicUrl = ref(false); //是否展示图片地址弹框
        const picUrl = ref(''); //图片网络地址
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
                const selection = window.getSelection();
                if (selection.rangeCount > 0) {
                    document.execCommand("CreateLink", false, selection.toString());
                    setRichText();
                }
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
                Takefromgalery().then((resole)=>{
                    console.log(resole);
                    if(resole.type == 'base64'){
                        var htmlStr = `<div class="photobox" style="width: 100%;"><img src="data:image/jpeg;base64,${resole.data}" style="width: 100%;"></div>`;
                        document.execCommand("insertHTML", false, htmlStr);
                    }else{
                        var htmlStr = `<div class="photobox" style="width: 100%;"><img src="${resole.data}" style="width: 100%;"></div>`;
                        //document.execCommand("insertText", false, htmlStr);
                        document.execCommand("insertHTML", false, htmlStr);
                    }
                }).catch((e)=>{
                    console.log(e);
                    Toast(e);
                });
            } else if (typ == 'Time') {//时间
                //checkbox的html
                var datestr = getNowDateString(1);
                var htmlStr = `[${datestr}]`;
                document.execCommand("insertHTML", false, htmlStr);
                setRichText();
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
        const myKeydown = (e) => {
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
            myKeydown,
            clickRichText,
            editable,
            showPicUrl,
            showPicUrlconfirm,
            picUrl,
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