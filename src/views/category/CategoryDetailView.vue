<template>
  <van-nav-bar class="list-title" :title="menuTitle" left-text="返回" left-arrow 
  @click-left="onClickLeft"
  @click-right="onClickRight"
  >
    <template #right>
      <van-icon name="search" size="22" />
    </template>
  </van-nav-bar>
  <div class="list-box-detail">
    <div class="cydes">
      <h2>{{ menuTitle }}</h2>
      <p>{{ menuContent }}</p>
    </div>
    <div class="cybody">
      <a-tree :tree-data="treeData" :default-expandAll=true @select="selectNode"
        v-model:expandedKeys="expandedKeys"
      >
        <template #switcherIcon="{ switcherCls }"><down-outlined :class="switcherCls" /></template>
      </a-tree>
    </div>
  </div>
</template>
<script>
import { onActivated,onMounted,onUnmounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';

import { DownOutlined } from '@ant-design/icons-vue';

export default {
  name: 'CategoryDetailView',
  props: {
  },
  components: {
    DownOutlined,
  },
  setup(props) {

    const router = useRouter();
    const route = useRoute();
    const store = useStore();

    const CyId = ref(!route.query.CyId ? 0 : Number(route.query.CyId));
    console.log(CyId.value)
    const nodeClassName = "cyLleafNote";
    const expandedKeys = ref([]);
    const getNoteListByParentId = async (PId) => {
      await store.dispatch('getNoteListByParentId', { ParentId: PId }).then((resolve) => {
        var listData = resolve;
        console.log('getNoteListByParentId=>' + JSON.stringify(listData));
        let CId = -1;
        treeData.value.length = 0;
        let groupDataChild = null;
        for (let i = 0; i < listData.length; i++) {
          let item = listData[i];
          if (item.note_category_Id != CId) {
            CId = item.note_category_Id;
            groupDataChild = {
              title: item.CName,
              key: 'cy_'+item.note_category_Id,
              selectable: false,
              children: []
            }
            expandedKeys.value.push('cy_'+item.note_category_Id);
            treeData.value.push(groupDataChild);
          }
          groupDataChild.children.push({ title: item.Title, key: item.Id,class:nodeClassName});
        }
        console.log(treeData.value);
      });
    }
    getNoteListByParentId(CyId.value);

    const menuTitle = ref('');
    const menuContent = ref('');
    const getNoteById = (CId)=>{
      store.dispatch('getNoteById', CId).then((resolve) => {
                const data = resolve;
                menuTitle.value = data.Title;
                menuContent.value = data.Content;
            }).catch((reject) => {
                console.log('查询笔记失败：' + reject);
            });
    };
    getNoteById(CyId.value);

    onActivated(() => {
      store.commit('SelectTabBar', 1);
      console.log('cydetail onActivated')
    });
    onMounted(() => {
            store.commit('SelectTabBar', 1);
            console.log('加载');
        });
        onUnmounted(() => {
            store.commit('SelectTabBar', -1);
            console.log('卸载');
        });
    const onClickLeft = () => {
      history.back();
    };
    const treeData = ref([]);

    const selectNode = (key, e) => {
      console.log(key, e.node);
      router.push({
        path: '/ViewNote',
        query: { Id: key }
      });
    }

    const onClickRight = ()=>{
      router.push({
        path: '/Search',
        query: { CyId: CyId.value, CaId: 0, kw: '',lz:1},
      });
    };
    return {
      treeData,
      selectNode,
      expandedKeys,

      onClickLeft,
      onClickRight,

      menuTitle,
      menuContent,

    };
  },
}
</script>

<style lang="less">
.list-title {
  position: fixed;
  width: 100%;
  top: 0px;
}
.list-box-detail{

}
.cybody{
  padding: 6px 12px 6px;
  width: 100%;
  overflow: hidden;
}

.list-box-detail {
  margin-top: 46px;

  .cydes {
    border-bottom: 1px solid #ccc;
    padding: 20px 0px 30px;
  }
}
.cyLleafNote{
  width: 86%;
  border-bottom: 1px solid #eef;
  padding: 6px 1px 6px !important;
  margin-left: 24px;
}
.cyLleafNote .ant-tree-switcher{
  width: 0px;
}
.cyLleafNote .ant-tree-node-content-wrapper{
  white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0px;
}
.cyLleafNote .ant-tree-switcher .anticon,.cyLleafNote .ant-tree-indent{
  display: none;
}
</style>