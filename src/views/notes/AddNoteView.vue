<template>
    <van-nav-bar :title="PageTitle" left-text="返回" right-text="保存" left-arrow @click-left="onClickLeft"
        @click-right="onClickRight" />
    <div class="content" ref="root">
        <input type="text" class="title" placeholder="标题" v-model="title" />
        <van-cell class="date-info" v-model:title="createTime" icon="calendar-o">
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
            <template #right-icon>
                <van-popover placement="left-start" v-model:show="showPopover" :actions="actions" @select="onSelect">
                    <template #reference>
                        <van-icon size="22px" name="label-o" />
                        <label class="category-name">{{ categoryName }}</label>
                        <van-icon class="arrow-down" size="20px" name="arrow-down" />
                    </template>
                </van-popover>
            </template>
        </van-cell>
        <textarea class="note-content" v-model="content"></textarea>
    </div>
</template>
<script>
import { useRect, useWindowSize } from '@vant/use';
import { Toast } from 'vant';
import { onUnmounted, ref, onMounted} from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { getNowDateString } from '@/util/date'

export default {
    name: 'AddNoteView',
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

        //
        const cutTitle = (content) => {
            content = content ?? '';
            if (content.length > 0) {
                if (content.length > 18) {
                    content = content.substring(0, 18);
                }
            }
            return content;
        };

        const onClickLeft = () => {
            store.commit('setRefreshListState', false);
            history.back();
        };
        const onClickRight = () => {
            if (title.value.length == 0) {
                if (content.value.length == 0) {
                    Toast.fail('请输入内容');
                    return;
                } else {
                    title.value = cutTitle(content.value);
                }
            }
            if (Id > 0) {
                store.dispatch('updateNote', {
                    Id: Id,
                    Title: title.value,
                    Category: categoryName.value,
                    Content: content.value
                }).then((resolve) => {
                    if (resolve.rowsAffected > 0) {
                        Toast('保存成功');
                        store.commit('setRefreshListState', true);
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
                    Id: Id,
                    Title: title.value,
                    Category: categoryName.value,
                    Content: content.value,
                    CreateTime: createTime.value,
                    Year: y,
                    Month: m,
                    Day: d,
                    timestamp:Date.now()
                }).then((resolve) => {
                    if (resolve.rowsAffected > 0) {
                        Toast('添加成功');
                        store.commit('setRefreshListState', true);
                        history.back();
                    }
                }).catch((reject) => {
                    Toast.fail('添加失败：' + reject);
                });
            }
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
            vheight.value = (height.value - rect.height) + 'px';
        });

        //内容
        const Id = route.query.Id ?? 0;
        const title = ref('');
        const categoryName = ref('未分类');
        const content = ref('');
        const createTime = ref(getNowDateString());
        const PageTitle = ref('添加笔记');

        if (Id) {
            PageTitle.value = '编辑笔记';
            store.dispatch('getNoteById', Id).then((resolve) => {
                const data = resolve;
                title.value = data.Title;
                categoryName.value = data.Category;
                content.value = data.Content;
                createTime.value = data.CreateTime;
            }).catch((reject) => {
                console.log('查询笔记失败：' + reject);
                Toast.fail('查询笔记失败：' + reject);
            });
        }

        return {
            onClickLeft,
            onClickRight,
            PageTitle,
            title,
            categoryName,
            content,
            createTime,
            actions,
            showPopover,
            onSelect,
            root,
            vheight
        };
    }
}
</script>
<style lang="less">
#app {

    .content {
        padding: 16px 20px;

        .title {
            width: 100%;
            height: 40px;
            font-size: 36px;
            line-height: 36px;
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
            min-height: v-bind("vheight");
        }
    }
}
</style>