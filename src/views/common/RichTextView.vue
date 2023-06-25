<template>
    <div class="richText" contenteditable="true" @blur="blurRichText" ref="richDiv"></div>
    <div class="tooltip">
        <button @click="changeFont('B')">B</button>
        <button class="under" @click="changeFont('U')">U</button>
        <button @click="changeFont('I')">I</button>
        <button @click="changeFont('L')">
            <van-icon name="link-o" />
        </button>
        <button class="fontColor" @click="changeFont('A')">A</button>
        <button class="backFontColor" @click="changeFont('AB')"><span>A</span></button>
        <!--TODO插入图片-->
        <!--TODO待办：光标位置加个复选框-->
        <!--TODO有序/无序列表-->
        <!--TODO加个查看页面，在查看页面可以点击编辑按钮进入编辑页面编辑内容-->
    </div>
</template>
<script>
import { ref } from 'vue';

import { watch } from 'vue';


export default {
    name: "RichText",
    props: {
        value: String
    },
    emits: {
        'getValue': null,
    },
    setup(props, context) {

        const content = ref('');

        watch(() => props.value, (newVal, oldVal) => {
            richDiv.value.innerHTML = newVal;
        }, { deep: true });


        const blurRichText = (e) => {
            console.log(e);
            context.emit('getValue', { html: e.target.innerHTML, text: e.target.innerText });
        }

        const setRichText = () => {
            context.emit('getValue', { html: richDiv.value.innerHTML, text: richDiv.value.innerText });
        }

        const changeFont = (typ) => {
            if (typ == 'B') {//粗体
                document.execCommand("Bold", false, null);
            } else if (typ == 'U') {//下划线
                document.execCommand("Underline", false, null);
            } else if (typ == 'I') {//斜体
                document.execCommand("Italic", false, null);
            } else if (typ == 'L') {//设置超链接,链接地址是选中的文字
                const selection = window.getSelection();
                if (selection.rangeCount > 0) {
                    document.execCommand("CreateLink", false, selection.toString());
                }
            } else if (typ == 'A') {//字体颜色
                document.execCommand("ForeColor", false, '#ff4d4f');
            }else if (typ == 'AB') {//字体背景颜色
                document.execCommand("BackColor", false, '#40a9ff');
            }
            setRichText();
        }


        const richDiv = ref(null);

        return {
            richDiv,
            content,
            blurRichText,
            changeFont,
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

.richText:focus {
    outline: none;
}

.tooltip {
    position: fixed;
    bottom: 0px;
    width: 100%;
    text-align: left;
    left: 0px;

    button {
        width: 42px;
        height: 28px;
        background: #fff;
        border: 1px #111;
    }
    button:active{
        background-color: #d5ddd5;
        color: #fff;
    }

    button.under,
    button.fontColor {
        text-decoration: underline;
    }
    button.backFontColor span{
        position: relative;
        background: #000;
        color: #fff;
        padding: 2px 4px;
    }
}
</style>