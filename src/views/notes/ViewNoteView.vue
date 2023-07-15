<template>
    <van-nav-bar :title="PageTitle" left-text="返回" right-text="编辑" left-arrow @click-left="onClickLeft"
        @click-right="onClickRight" />
    <div class="content" ref="root">
        <!-- <input type="text" class="title" readonly placeholder="标题" v-model="title" /> -->
        <van-cell class="date-info" v-model:title="createTime" icon="calendar-o">
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
            <template #right-icon>
                <van-icon size="20px" style="position: relative;top: 2px" name="label-o" />
                <label class="category-name">{{ categoryName }}</label>
            </template>
        </van-cell>
        <!-- <textarea class="note-content " v-model="content"></textarea> -->
        <div class="note-content">
            <rich-text @getValue="getValue" :value="tmepContent" :editable="false"></rich-text>
        </div>
    </div>
</template>
<script>
import { useRect, useWindowSize } from '@vant/use';
import { Toast } from '@vant/compat';
import { onUnmounted, ref, onMounted, onActivated, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { getNowDateString } from '@/util/date';

import RichText from '../common/RichTextView.vue';

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
            store.commit('setRefreshListState', false);
            history.back();
        };
        const onClickRight = () => {
            router.push({
                path: '/AddNote',
                query: { Id: Id.value }
            });
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
        const vheight = ref(height + 'px');
        onMounted(() => {
            const rect = useRect(root);
            vheight.value = (height.value - rect.height-50) + 'px';
        });

        //内容
        const Id = ref(route.query.Id ?? 0);
        const title = ref('');
        const categoryName = ref('未分类');
        const content = ref('');
        const createTime = ref(getNowDateString());
        const PageTitle = ref('详情');

        const tmepContent = reactive({ val: '', type: '0' });//进入页面赋值的时候使用一次
        if (Id.value) {
            store.dispatch('getNoteById', Id.value).then((resolve) => {
                const data = resolve;
                title.value = data.Title;
                PageTitle.value = data.Title;
                categoryName.value = data.Category;
                content.value = data.Content;
                tmepContent.val = data.Content;
                createTime.value = data.CreateTime;
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
            //查看页面点击checkbox 保存结果
            if (valObj.changeInputCheck) {
                store.dispatch('updateNote', {
                    Id: Id.value,
                    Title: title.value,
                    Category: categoryName.value,
                    Content: content.value
                }).then((resolve) => {
                    if (resolve.rowsAffected > 0) {
                        //Toast('保存成功');
                    }
                }).catch((reject) => {
                    Toast.fail('保存失败：' + reject);
                });
            }
        }
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
            Id
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
}
</style>