<template>
    <van-nav-bar :title="PageTitle" left-text="返回" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
        <template #right>
            <van-icon name="ellipsis" size="25" />
        </template>
    </van-nav-bar>
    <div class="content" ref="root">
        <!-- <input type="text" class="title" readonly placeholder="标题" v-model="title" /> -->
        <van-cell class="date-info" v-model:title="createTime">
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
            <template #right-icon>
                <label class="category-name">{{ categoryName }}</label>
            </template>
        </van-cell>
        <!-- <textarea class="note-content " v-model="content"></textarea> -->
        <div class="leftMenu" @click="openMenu">
            <van-icon name="arrow-left" />
        </div>
        <div class="note-content" ref="noteContent">
            <rich-text @getValue="getValue" :value="tmepContent" :editable="false"></rich-text>
        </div>
    </div>
    <van-action-sheet v-model:show="showSheet" @select="selectSheet" :actions="actionsSheet" cancel-text="取消"
        close-on-click-action @cancel="onCancel" />
    <van-popup v-model:show="showRightMenu" position="right" :style="{ width: '80%', height: '100%' }">
        <p class="menutitle">{{ categoryName }}</p>
        <div class="menubox" ref="menuRef">
            <van-swipe-cell v-for="(item, index) in listMenu" :key="index">
                <van-row @click="openOtherNoteDetail(item.Id)" :class="['vrow', item.select == 1 ? 'cur' : '']">
                    <p style="text-align:left;font-size: 14px;">{{ item.name }}</p>
                </van-row>
                <template #right>
                    <van-button v-show="index == 0 ? false : true" square type="default" text="上移"
                        @click="upmove(0, index)" />
                    <van-button v-show="index == item.len ? false : true" square type="default" text="下移"
                        @click="upmove(1, index)" />
                </template>
            </van-swipe-cell>
        </div>
        <van-button type="default" @click="addNote" style="width: 80%;margin: 20px auto 0px;" block>添加笔记</van-button>
    </van-popup>
</template>
<script>
import { useRect, useWindowSize } from '@vant/use';
import { Toast } from '@vant/compat';
import { onUnmounted, ref, onMounted, onActivated, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { getNowDateString } from '@/util/date';
import { showConfirmDialog, closeToast, showLoadingToast } from 'vant';

import html2canvas from 'html2canvas';

import RichText from '../common/RichTextView.vue';

import { saveImage,cutImage } from '@/plugin/file'

export default {
    name: 'ViewNoteView',
    components: {
        RichText,
    },
    setup() {
        const store = useStore()
        const route = useRoute();
        const router = useRouter();

        //keep-alive 缓存的组件激活时调用
        onMounted(() => {
            store.commit('SelectTabBar', 1);
            console.log('加载');
        });
        onUnmounted(() => {
            store.commit('SelectTabBar', -1);
            console.log('卸载');
        });
        onActivated(() => {
            console.log('addNote onActivated');
        });

        //
        const cutTitle = (content) => {
            content = content ?? '';
            if (content.length > 0) {
                if (content.length > 50) {
                    content = content.substring(0, 50);
                }
            }
            return content;
        };

        const onClickLeft = () => {
            history.back();
        };
        const onClickRight = () => {
            showSheet.value = true;
        };

        const showPopover = ref(false);
        const actions = [
            { text: '生活', icon: 'add-o' },
            { text: '工作', icon: 'music-o' },
            { text: '旅游', icon: 'more-o' },
        ];
        const onSelect = (action) => {
            categoryName.value = action.text;
        };

        const { height } = useWindowSize();
        const root = ref();
        const vheight = ref(height.value - 92 + 'px');


        //内容
        const Id = ref(route.query.Id ?? 0);
        const title = ref('');
        const categoryName = ref('未分类');
        const content = ref('');
        const createTime = ref(getNowDateString());
        const PageTitle = ref('详情');
        const ParentId = ref(0);
        const note_category_Id = ref(0);

        const tmepContent = reactive({ val: '', type: '0' });//进入页面赋值的时候使用一次

        const getNoteById = (cId) => {
            showLoadingToast('加载中...');
            store.dispatch('getNoteById', cId).then((resolve) => {
                const data = resolve;
                title.value = data.Title;
                PageTitle.value = data.Title;
                categoryName.value = data.Category;
                content.value = data.Content;
                tmepContent.val = data.Content;
                createTime.value = data.CreateTime;
                ParentId.value = data.ParentId;
                note_category_Id.value = data.note_category_Id;
                closeToast();
                showRightMenu.value = false;
            }).catch((reject) => {
                console.log('查询笔记失败：' + reject);
                Toast.fail('查询笔记失败：' + reject);
            });

        };
        if (Id.value) {
            getNoteById(Id.value);
        }


        //获取富文本值
        const temTitle = ref('');
        const getValue = (valObj) => {
            console.log(valObj.text, valObj.html);
            content.value = valObj.html;
            temTitle.value = valObj.text;
            //查看页面点击checkbox 保存结果
            if (valObj.changeInputCheck) {
                store.dispatch('updateNote', {
                    Id: Id.value,
                    Title: title.value,
                    Category: categoryName.value,
                    Content: content.value,
                    ParentId: ParentId.value,
                    note_category_Id: note_category_Id.value,
                }).then((resolve) => {
                    if (resolve.rowsAffected > 0) {
                        //Toast('保存成功');
                    }
                }).catch((reject) => {
                    Toast.fail('保存失败：' + reject);
                });
            }
        }

        //
        const showSheet = ref(false);
        const actionsSheet = [
            { name: '编辑', },
            { name: '复制', },
            { name: '笔记截图', },
            { name: '删除', color: 'red', },
        ];
        const onCancel = () => console.log('取消');
        const noteContent = ref(null);
        const selectSheet = (action, index) => {
            console.log(action, index);
            if (index == 0) {
                router.push({
                    path: '/AddNote',
                    query: { Id: Id.value }
                });
            } else if (index == 1){
                //复制笔记
                router.push({
                    path: '/AddNote',
                    query: { cpId: Id.value, State: 0},
                    replace:true,
                });
            }else if (index == 2) {
                console.log('笔记截图');
                const el = document.getElementById('richTextID')
                console.log('el.scrollHeight',el.scrollHeight);
                console.log('el.clientWidth',el.clientWidth);
                
                
                showLoadingToast('截图中...');
                cutImage(el).then(resole=>{
                    closeToast();
                    Toast.success('截图已保存');
                }).catch(reject=>{
                    closeToast();
                    console.log('截图失败：' + JSON.stringify(reject));
                    Toast.fail('截图失败：' + JSON.stringify(reject));
                });
            }
            else if (index == 3) {
                showConfirmDialog({
                    title: '确认删除该笔记？',
                }).then(() => {
                    console.log('shanchu biji ');
                    store.dispatch('delNote', { Id: Id.value, real: 1 }).then((resolve, reject) => {
                        if (resolve.rowsAffected > 0) {
                            Toast.fail('删除成功');
                            store.commit('setRefreshListState', true);
                            setTimeout(function () {
                                history.back();
                            }, 400)
                        } else {
                            Toast.fail('移出失败：' + reject);
                        }
                    }).catch((reject) => {
                        console.log(reject);
                    });
                }).catch(() => {
                    // on cancel
                });
            }
        }
        //目录
        const showRightMenu = ref(false);
        const openMenu = () => {
            showRightMenu.value = true;
            if (note_category_Id.value > 0) {
                onLoadMenuData(note_category_Id.value);
            }
        };
        const listMenu = ref([]);
        const menuRef = ref(null);
        const onLoadMenuData = (CyId) => {
            listMenu.value.length = 0;
            showLoadingToast('加载中...');
            store.dispatch('getNoteList', { note_category_Id: CyId }).then((resolve) => {
                var listData = resolve;
                console.log('getNoteList=>' + JSON.stringify(listData));
                let len = listData.length - 1;
                let selectheight = 0;
                for (let i = 0; i < listData.length; i++) {
                    var select = 0;
                    if (listData[i].Id == Id.value) {
                        select = 1;
                        selectheight = i + 1;
                    }
                    listMenu.value.push({ Id: listData[i].Id, name: listData[i].Title, timestamp: listData[i].Timestamp, select: select, len: len });
                }
                setTimeout(() => {
                    var rowHeight = document.querySelector('.vrow').clientHeight + 1;
                    selectheight = selectheight * rowHeight;
                    console.log('vrow height', rowHeight);
                    var menuClientHeight = menuRef.value.clientHeight;
                    console.log('selectheight', selectheight, 'menuClientHeight', menuClientHeight)
                    menuRef.value.scrollTop = (selectheight - menuClientHeight) + menuClientHeight / 2;
                }, 100);
                closeToast();
            });
        }
        //flag 0上移 1下移
        const upmove = (flag, index) => {
            var item1Id = 0;
            var item1Timestamp = 0;
            var item2Id = 0;
            var item2Timestamp = 0;
            if (flag == 0) {
                item1Id = listMenu.value[index].Id;
                item1Timestamp = listMenu.value[index - 1].timestamp;
                item2Id = listMenu.value[index - 1].Id;
                item2Timestamp = listMenu.value[index].timestamp;
            } else {
                item1Id = listMenu.value[index].Id;
                item1Timestamp = listMenu.value[index + 1].timestamp;
                item2Id = listMenu.value[index + 1].Id;
                item2Timestamp = listMenu.value[index].timestamp;
            }
            store.dispatch('updateNoteTimestamp', {
                Id: item1Id,
                timestamp: item1Timestamp,
            }).then((resolve) => {
                if (resolve.rowsAffected > 0) {
                    store.dispatch('updateNoteTimestamp', {
                        Id: item2Id,
                        timestamp: item2Timestamp,
                    }).then((resolve2) => {
                        if (resolve2.rowsAffected > 0) {
                            onLoadMenuData(note_category_Id.value);
                        }
                    }).catch((reject) => {
                        Toast.fail('保存失败：' + reject);
                    });
                }
            }).catch((reject) => {
                Toast.fail('保存失败：' + reject);
            });
        }
        //文章详情
        const openOtherNoteDetail = (cId) => {
            router.push({
                path: '/ViewNote',
                query: { Id: cId },
                replace: true
            });
            Id.value = cId;
            document.querySelector('.richText').scrollTop = 0;
            getNoteById(cId);
        }
        //添加新文章
        const addNote = () => {
            router.push({
                path: '/AddNote',
                query: { Id: 0, aId: Id.value, State: 0 },
                replace: true
            });
        };

        return {
            getValue,

            onClickLeft,
            onClickRight,
            PageTitle,
            title,
            categoryName,
            content,
            tmepContent,
            createTime,
            actions,
            showPopover,
            onSelect,
            root,
            vheight,
            Id,

            showSheet,
            actionsSheet,
            onCancel,
            selectSheet,
            noteContent,

            openMenu,
            showRightMenu,
            listMenu,
            upmove,
            openOtherNoteDetail,
            addNote,
            menuRef,

        };
    }
}
</script>
<style lang="less">
.content {
    padding: 1px 20px;

    .title {
        width: 100%;
        font-size: 20px;
        line-height: 20px;
        border: none;
    }

    .title::placeholder {
        font-size: x-large;
        font-weight: 600;
        color: #666;
    }

    .date-info {
        text-align: left;
        padding-left: 0px !important;
        padding-right: 0px !important;

        .category-name,
        .arrow-down {
            color: deepskyblue;
        }
    }

    .note-content {
        width: 100%;
        border: none;
        height: v-bind("vheight");
        word-wrap: break-word;
    }

    .leftMenu {
        display: inline-block;
        position: fixed;
        width: 48px;
        height: 48px;
        right: -28px;
        bottom: 200px;
        background: #fdfdfd;
        line-height: 48px;
        padding-left: 3px;
        text-align: left;
        border-radius: 50%;
        box-shadow: 0 0 3px #bfb8b8;
        z-index: 2000;
    }
}

.menutitle {
    margin: 0px;
    padding: 12px 3px;
    width: 100%;
    border-bottom: 1px solid #e3dddd;
}

.menubox {
    overflow: auto;
    height: 80%;
}

.vrow {
    border-bottom: 1px solid #eee;
    padding: 15px 10px;
}

.cur {
    background: #d6d6d6;
}

.vrow p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0px;
}
</style>