<template>
    <div class="list-header">
        <van-nav-bar title="搜索笔记" left-text="返回" left-arrow @click-left="onClickLeft" />
        <van-search v-model="searchKeyword" @search="onSearch" placeholder="请输入搜索关键词" />
        <van-dropdown-menu active-color="#ee0a24">
            <van-dropdown-item v-model="selValue1" :options="option1" />
            <van-dropdown-item v-model="selValue2" :options="option2" />
        </van-dropdown-menu>
    </div>
    <div class="list-data">
        <notes-view :ShowNavBar="false" :Keywords="confirmSearchKeyword" :IsAll="true"></notes-view>
    </div>
</template>
<script>

import { onUnmounted, ref, onMounted, onActivated } from 'vue';
import { useStore } from 'vuex';

import NotesView from '../notes/NotesView.vue';

export default {
    name: "Search",
    components: {
        NotesView,
    },
    setup() {
        const store = useStore()

        //keep-alive 缓存的组件激活时调用
        onMounted(() => {
            console.log('SelectTabBar加载');
        });
        onUnmounted(() => {
            console.log('SelectTabBar卸载');
        });

        onActivated(() => {
            console.log('onActivated Search');
            store.commit('SelectTabBar', 1);
        });

        const onClickLeft = () => {
            history.back();
        };

        //搜索关键字
        const searchKeyword = ref('');
        const confirmSearchKeyword = ref('');
        ///监听确认按钮
        const onSearch = (val) => {
            confirmSearchKeyword.value = searchKeyword.value;
        };
        //筛选
        const selValue1 = ref(0);
        const selValue2 = ref('a');
        const option1 = [
            { text: '全部分类', value: 0 },
            { text: '新款分类', value: 1 },
            { text: '活动分类', value: 2 },
        ];
        const option2 = [
            { text: '默认排序', value: 'a' },
            { text: '时间正序', value: 'b' },
            { text: '时间倒序', value: 'c' },
        ];

        return {
            onClickLeft,
            searchKeyword,
            confirmSearchKeyword,
            onSearch,
            selValue1,
            selValue2,
            option1,
            option2,
        }
    }
}
</script>
<style lang="less">
.list-header {
    position: fixed;
    width: 100%;
    top: 0px;
    z-index: 1000000;
}
.list-data{
    margin-top: 150px;
}
</style>