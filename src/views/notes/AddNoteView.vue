<template>
    <van-nav-bar :title="PageTitle" left-text="返回" right-text="保存" left-arrow @click-left="onClickLeft"
        @click-right="onClickRight" />
    <div class="addcontent" ref="root">
        <input type="text" class="title" placeholder="标题" v-model="title" />
        <van-cell class="date-info" v-model:title="createTime">
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
            <template #right-icon>
                <div style="display:inline-block;" @click="showPopup = true">
                    <label class="category-name">{{ categoryName }}</label>
                    <van-icon class="arrow-down" size="20px" name="arrow-down" />
                </div>
            </template>
        </van-cell>
        <!-- <textarea class="note-content " v-model="content"></textarea> -->
        <div class="note-content">
            <rich-text @getValue="getValue" :value="tmepContent"></rich-text>
        </div>
    </div>
    <van-popup v-model:show="showPopup" round position="bottom">
        <van-cascader v-model="cascaderValue" title="请选择知识库和分类" :options="options" @close="showPopup = false"
            @change="onChange" @finish="onFinish" />
    </van-popup>
</template>
<script>
import { useRect, useWindowSize } from '@vant/use';
import { Toast } from '@vant/compat';
import { onUnmounted, ref, onMounted, onActivated, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { getNowDateString } from '@/util/date';
import { closeToast, showLoadingToast } from 'vant';

import RichText from '../common/RichTextView.vue';

export default {
    name: 'AddNoteView',
    components: {
        RichText,
    },
    setup() {
        const store = useStore()
        const route = useRoute();

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
            tmepContent.type = '1';
            if (title.value.trim().length == 0) {
                if (content.value.trim().length == 0) {
                    Toast.fail('请输入内容');
                    return;
                } else {
                    title.value = cutTitle(temTitle.value);
                }
            }
            if (Id.value > 0) {
                store.dispatch('updateNote', {
                    Id: Id.value,
                    Title: title.value,
                    Category: categoryName.value,
                    Content: content.value,

                    ParentId:ParentId.value,
                    note_category_Id:note_category_Id.value,
                }).then((resolve) => {
                    if (resolve.rowsAffected > 0) {
                        Toast('保存成功');
                        //history.back();
                    }
                }).catch((reject) => {
                    Toast.fail('保存失败：' + reject);
                });
            } else {
                const nowdate = new Date();
                const y = nowdate.getFullYear();
                const m = nowdate.getMonth() + 1;
                const d = nowdate.getDate();

                store.dispatch('addNote', {
                    Id: Id.value,
                    Title: title.value,
                    Category: categoryName.value,
                    Content: content.value,
                    CreateTime: createTime.value,
                    Year: y,
                    Month: m,
                    Day: d,
                    timestamp: Date.now(),

                    ParentId:ParentId.value,
                    note_category_Id:note_category_Id.value,
                }).then((resolve) => {
                    console.log(JSON.stringify(resolve));
                    if (resolve.rowsAffected > 0) {
                        Toast('添加成功');
                        Id.value = resolve.insertId;
                        store.commit('setRefreshListState', true);
                        //history.back();
                    }
                }).catch((reject) => {
                    Toast.fail('添加失败：' + reject);
                });
            }
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
        const PageTitle = ref('添加笔记');
        const ParentId = ref(0);
        const note_category_Id = ref(0);

        const aId = ref(route.query.aId ?? 0);

        const tmepContent = reactive({ val: '', type: '0' });//进入页面赋值的时候使用一次
        console.log('Id.value', Id.value);
        if (Id.value && Id.value > 0) {
            PageTitle.value = '编辑笔记';
            showLoadingToast('加载中...');
            store.dispatch('getNoteById', Id.value).then((resolve) => {
                const data = resolve;
                title.value = data.Title;
                categoryName.value = data.Category;
                content.value = data.Content;
                tmepContent.val = data.Content;
                createTime.value = data.CreateTime;
                ParentId.value = data.ParentId;
                note_category_Id.value = data.note_category_Id;
                closeToast();
            }).catch((reject) => {
                console.log('查询笔记失败：' + reject);
                Toast.fail('查询笔记失败：' + reject);
            });
        }
        if(aId.value && aId.value>0){
            store.dispatch('getNoteById', aId.value).then((resolve) => {
                const data = resolve;
                categoryName.value = data.Category;
                ParentId.value = data.ParentId;
                note_category_Id.value = data.note_category_Id;
            }).catch((reject) => {
                console.log('查询笔记失败：' + reject);
                Toast.fail('查询笔记失败：' + reject);
            });
        }

        //获取富文本值
        const temTitle = ref('');
        const getValue = (valObj) => {
            console.log(valObj.text, valObj.html);
            content.value = valObj.html;
            temTitle.value = valObj.text;
        }


        //
        const getCyNoteList = () => {
            store.dispatch('getCyNoteList').then((resolve) => {
                var listData = resolve;
                console.log('getCyNoteList=>' + JSON.stringify(listData));
                for (let i = 0; i < listData.length; i++) {
                    var item = listData[i];
                    options.value.push({ text: item.Title, value: item.Id, children: [] });
                }
            });
        };
        getCyNoteList();
        const showPopup = ref(false);
        const cascaderValue = ref('');
        const options = ref([{ text: '未分类', value: 0, children: [{ text: '未分类', value: 0}] }]);

        const onChange = ({ value }) => {
            // 模拟数据请求
            showLoadingToast('加载中...');
            store.dispatch('getCategoryList', { CyNoteId: value }).then((resolve) => {
                var listData = resolve;
                console.log('getCategoryList=>' + JSON.stringify(listData));
                let selectData = [];
                for (let i = 0; i < options.value.length; i++) {
                    const item = options.value[i];
                    if(item.value == value){
                        selectData = item.children;
                        if(value>0){
                            selectData.length = 0;
                        }
                        break;
                    }
                }
                for (let i = 0; i < listData.length; i++) {
                    selectData.push({ value: listData[i].Id, text: listData[i].CName });
                }
                closeToast();
            });
        };

        const onFinish = ({ selectedOptions }) => {
            showPopup.value = false;
            console.log('selectedOptions',JSON.stringify(selectedOptions));
            categoryName.value = selectedOptions.map((option) => option.text).join('/');
            var selectIdstr = selectedOptions.map((option) => option.value).join(' ');
            var selectIdArr = selectIdstr.split(' ');
            ParentId.value = Number(selectIdArr[0]);
            note_category_Id.value = Number(selectIdArr[1]);
            if(ParentId.value == 0){
                categoryName.value = categoryName.value.split('/')[0];
            }
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
            root,
            vheight,
            Id,

            showPopup,
            options,
            onChange,
            onFinish,
            cascaderValue,

        };
    }
}
</script>
<style lang="less">
.addcontent {
    padding: 16px 20px;

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
    }
}
</style>