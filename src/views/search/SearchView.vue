<template>
    <div class="list-header">
        <van-nav-bar title="搜索记录" left-text="返回" left-arrow @click-left="onClickLeft" />
        <van-search v-model="searchKeyword" @search="onSearch" placeholder="请输入搜索关键词" />
        <van-dropdown-menu active-color="#ee0a24">
            <van-dropdown-item v-model="selValue1" :options="option1" @change="changeOption1" />
            <van-dropdown-item v-model="selValue2" :options="option2" @change="changeOption2" />
        </van-dropdown-menu>
    </div>
    <div class="list-data">
        <notes-view :ShowNavBar="false" @openNotedetail="openNotedetail" :Lazyload="Lazyload" :QueryItem="QueryItem"
            :IsAll="true"></notes-view>
    </div>
</template>
<script>

import { onUnmounted, ref, onMounted, onActivated, reactive } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';

import NotesView from '../notes/NotesView.vue';

export default {
    name: "Search",
    components: {
        NotesView,
    },
    setup() {
        const store = useStore()
        const route = useRoute();
        const router = useRouter();

        //keep-alive 缓存的组件激活时调用
        onMounted(() => {
            store.commit('SelectTabBar', 1);
            console.log('SelectTabBar加载');
        });
        onUnmounted(() => {
            store.commit('SelectTabBar', -1);
            console.log('SelectTabBar卸载');
        });

        onActivated(() => {
            console.log('onActivated Search');
            store.commit('SelectTabBar', 1);
            console.log('route.query.CyId', route.query.CyId);
        });

        const onClickLeft = () => {
            history.back();
        };

        const lz = ref(!route.query.lz ? 0 : Number(route.query.lz));
        console.log('lz',lz.value,typeof lz.value)
        const Lazyload = ref(lz.value==1);
        console.log(Lazyload.value,typeof Lazyload.value);

        const CyId = ref(!route.query.CyId ? 0 : route.query.CyId);
        const CaId = ref(!route.query.CaId ? 0 : route.query.CaId);
        const kw = ref(!route.query.kw ? '' : route.query.kw);
        const searchKeyword = ref('');
        searchKeyword.value = kw.value;
        

        //搜索关键字
        ///监听确认按钮
        const onSearch = () => {
            QueryItem.Keywords = searchKeyword.value;
            router.push({
                path: '/Search',
                query: { CyId: CyId.value, CaId: CaId.value, kw: searchKeyword.value,lz:1 },
                replace: true
            });

        };
        //筛选
        const QueryItem = reactive({ ParentId: 0, note_category_Id: 0,Keywords:'' });
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
                    option1.push({ text: item.Title + ' (' + item.TotalNoteNum + ')', value: item.Id });
                }
                if (!CyId.value) {
                    CyId.value = 0;
                }
                selValue1.value = Number(CyId.value);
                changeOptionFn(selValue1.value);
            });
        };
        getCyNoteList();
        const changeOptionFn = (val) => {
            option2.length = 0;
            option2.push({ text: '全部分类', value: 0 });
            store.dispatch('getCategoryList', { CyNoteId: val }).then((resolve) => {
                var listData = resolve;
                console.log('getCategoryList=>' + JSON.stringify(listData));
                for (let i = 0; i < listData.length; i++) {
                    option2.push({ value: listData[i].Id, text: listData[i].CName + ' (' + listData[i].TotalNoteNum + ')' });
                }
                if (!CaId.value) {
                    CaId.value = 0;
                }
                selValue2.value = Number(CaId.value);
                QueryItem.note_category_Id = Number(CaId.value);
                QueryItem.ParentId = val;
                QueryItem.Keywords = searchKeyword.value;
                if(searchKeyword.value.trim().length == 0){
                    QueryItem.Keywords = "  ";
                }
            });
        }
        const changeOption1 = (val) => {
            router.push({
                path: '/Search',
                query: { CyId: val, CaId: 0, kw: searchKeyword.value,lz:1 },
                replace: true
            });
            CyId.value = val;
            CaId.value = 0;
            changeOptionFn(val);
        };
        const changeOption2 = (val) => {
            router.push({
                path: '/Search',
                query: { CyId: CyId.value, CaId: val, kw: searchKeyword.value,lz:1},
                replace: true
            });
            CaId.value = val;
            QueryItem.note_category_Id = val;
        };

        const openNotedetail = (data) => {
            console.log('openNotedetail', JSON.stringify(data));
        };

        return {
            onClickLeft,
            searchKeyword,
            onSearch,
            selValue1,
            selValue2,
            option1,
            option2,
            changeOption1,
            changeOption2,
            QueryItem,
            Lazyload,
            openNotedetail,
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

.list-data {
    margin-top: 150px;
}
.task-finish-overlay{
    z-index: 1000000 !important;
}
.task-finish-dialog{
    z-index: 1000000 !important;
}
</style>