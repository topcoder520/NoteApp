<template>
    <div class="list-header">
        <van-nav-bar title="搜索记录" left-text="返回" left-arrow @click-left="onClickLeft" />
        <van-search v-model="searchKeyword" @search="onSearch" placeholder="请输入搜索关键词" />
        <van-dropdown-menu active-color="#ee0a24">
            <van-dropdown-item v-model="selValue1" :options="option1" @change="changeOption1"/>
            <van-dropdown-item v-model="selValue2" :options="option2" @change="changeOption2"/>
        </van-dropdown-menu>
    </div>
    <div class="list-data">
        <notes-view :ShowNavBar="false" :SelectItem="SelectItem" :Keywords="confirmSearchKeyword" :IsAll="true"></notes-view>
    </div>
</template>
<script>

import { onUnmounted, ref, onMounted, onActivated,reactive } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

import NotesView from '../notes/NotesView.vue';
import { isFunction } from '@vue/shared';

export default {
    name: "Search",
    components: {
        NotesView,
    },
    setup() {
        const store = useStore()
        const route = useRoute();

        //keep-alive 缓存的组件激活时调用
        onMounted(() => {
            store.commit('SelectTabBar', 1);
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
        const SelectItem = reactive({ ParentId: 0, note_category_Id: 0 });
        const selValue1 = ref(0);
        const selValue2 = ref(0);
        const option1 = [
            { text: '全部知识库', value: 0 },
        ];
        const option2 = [
            { text: '全部分类', value: 0 },
        ];
        const getCyNoteList = () => {
            store.dispatch('getCyNoteList').then((resolve) => {
                var listData = resolve;
                console.log('getCyNoteList=>' + JSON.stringify(listData));
                for (let i = 0; i < listData.length; i++) {
                    var item = listData[i];
                    option1.push({ text: item.Title, value: item.Id});
                }
                if(!CyId.value){
                    CyId.value = 0;
                }
                selValue1.value = Number(CyId.value);
                if(selValue1.value>0){
                    changeOption1(selValue1.value);
                }
            });
        };
        getCyNoteList();
        const changeOption1 = (val)=>{
            option2.length = 0;
            option2.push({ text: '全部分类', value: 0 });
            store.dispatch('getCategoryList', { CyNoteId: val }).then((resolve) => {
                var listData = resolve;
                console.log('getCategoryList=>' + JSON.stringify(listData));
                for (let i = 0; i < listData.length; i++) {
                    option2.push({ value: listData[i].Id, text: listData[i].CName });
                }
                selValue2.value = 0;
                SelectItem.note_category_Id = 0;
                SelectItem.ParentId = val;
            });
        };
        const changeOption2 = (val)=>{
            SelectItem.note_category_Id = val;
        };

        const CyId = ref(route.query.CyId ?? 0);


        return {
            onClickLeft,
            searchKeyword,
            confirmSearchKeyword,
            onSearch,
            selValue1,
            selValue2,
            option1,
            option2,
            changeOption1,
            changeOption2,
            SelectItem,
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