<template>
  <van-nav-bar class="list-title" title="知识库详情" left-text="返回" left-arrow @click-left="onClickLeft">
    <template #right>
      <div class="icon-box" @click="onSearch"><van-icon name="search" size="22" /></div>
      <div class="icon-box" @click="onAddNote"><van-icon name="plus" size="22" /></div>
      <div class="icon-box" @click="onShowActionsheet"><van-icon name="ellipsis" size="25" /></div>
    </template>
  </van-nav-bar>
  <div class="list-box-detail">
    <div class="cydes">
      <h2>{{ menuTitle }}</h2>
      <p>{{ menuContent }}</p>
    </div>
    <div class="cybody">
      <a-tree :tree-data="treeData" :default-expandAll=true @expand="expandNode" @select="selectNode"
        v-model:expandedKeys="expandedKeys">
        <template #switcherIcon="{ switcherCls }"><down-outlined :class="switcherCls" /></template>
      </a-tree>
    </div>
  </div>
  <van-action-sheet v-model:show="showSheet" @select="selectSheet" :actions="actionsSheet" cancel-text="取消"
    close-on-click-action @cancel="onCancel" />
</template>
<script>
import { onActivated, onMounted, onUnmounted, ref } from 'vue';
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
    const expandedKeys = ref([]);
    const getNoteListByParentId = (PId) => {
      store.dispatch('getCategoryList', { CyNoteId: PId }).then((resolve) => {
        var listData = resolve;
        console.log('getCategoryList=>' + JSON.stringify(listData));
        let sortlistData = [];
        for (let i = 0; i < listData.length; i++) {
          sortlistData.push({
            key: 'cy_' + listData[i].Id,
            title: listData[i].CName,
            selectable: true,
            class: 'cyLParentNote',
            timestamp: listData[i].Timestamp,
            children: []
          });
          expandedKeys.value.push('cy_' + listData[i].Id);
        }
        store.dispatch('getNoteListByParentId', { ParentId: PId }).then((resolve) => {
          var listData = resolve;
          console.log('getNoteListByParentId=>' + JSON.stringify(listData));
          treeData.value.length = 0;
          for (let i = 0; i < listData.length; i++) {
            let item = listData[i];
            if (item.note_category_Id == 0) {
              insertDataSortTimestamp({
                title: item.Title,
                key: item.Id,
                class: 'cyLleafNote',
                timestamp: item.Timestamp
              }, sortlistData);
              continue;
            }
            for (let j = 0; j < sortlistData.length; j++) {
              const categoryItem = sortlistData[j];
              let cykey = 'cy_' + item.note_category_Id;
              if (categoryItem.key == cykey && categoryItem.children) {
                categoryItem.children.push({ title: item.Title, key: item.Id, class: 'cyLleafNote' });
                break;
              }
            }
          }
          for (let i = 0; i < sortlistData.length; i++) {
            const categoryItem = sortlistData[i];
            treeData.value.push(categoryItem);
          }
          console.log(treeData.value);
        });
      });
    }
    getNoteListByParentId(CyId.value);

    const insertDataSortTimestamp = (item, arr) => {
      if (!item || !arr || arr.length == 0) {
        return;
      }
      for (let i = arr.length - 1; i >= 0; i--) {
        const el = arr[i];
        if (item.timestamp > el.timestamp) {
          arr.splice(i + 1, 0, item);
          break;
        }
        if (i == 0) {
          arr.splice(i, 0, item);
        }
      }
    };

    const menuTitle = ref('');
    const menuContent = ref('');
    const getNoteById = (CId) => {
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
    const NCId = ref(-1);

    const selectNode = (keys, e) => {
      console.log(keys, e);
      if (keys.length > 0) {
        let keystr = e.node.key + '';
        if (keystr.indexOf('cy_') != -1) {
          NCId.value = Number(keystr.substring(keystr.indexOf('cy_') + 3));
        } else {
          NCId.value = -1;
          router.push({
            path: '/ViewNote',
            query: { Id: keystr }
          });
        }
      } else {
        NCId.value = -1;
      }
    };
    const expandNode = (key, e) => {
      console.log(key, e);
      //NCId.value = -1;
    };

    const onSearch = () => {
      router.push({
        path: '/Search',
        query: { CyId: CyId.value, CaId: NCId.value, kw: '', lz: 1 },
      });
    };
    const onAddNote = () => {
      router.push({
        path: '/AddNote',
        query: { Id: 0, CyId: CyId.value, NCId: NCId.value,State:0 },
      });
    };

    const showSheet = ref(false);
    const onShowActionsheet = () => {
      showSheet.value = true;
    };
    const actionsSheet = [
      { name: '编辑', },
      { name: '刷新', },
    ];
    const onCancel = () => console.log('取消');
    const selectSheet = (action, index) => {
      console.log(action, index);
      if (index == 0) {
        router.push({
          path: '/AddCategory',
          query: { Id: CyId.value, back: 1 }
        });
      } else if (index == 1) {
        getNoteById(CyId.value);
        getNoteListByParentId(CyId.value);
      }
    }

    return {
      treeData,
      selectNode,
      expandNode,
      expandedKeys,

      onClickLeft,
      onSearch,
      onAddNote,

      menuTitle,
      menuContent,

      showSheet,
      selectSheet,
      actionsSheet,
      onCancel,
      onShowActionsheet,

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

.cybody {
  padding: 6px 12px 6px;
  width: 100%;
  overflow: hidden;
}

.list-box-detail {
  margin-top: 46px;

  .cydes {
    padding: 20px 0px 30px;
    background-image: url(@/assets/img/bg-cy-detail.jpg);
    background-size: 100%;

    h2 {
      word-wrap: break-word;
      word-break: break-all;
      white-space: pre-wrap;
    }

    p {
      word-wrap: break-word;
      word-break: break-all;
      white-space: pre-wrap;
    }
  }
}

.ant-tree {
  margin-bottom: 12px;
}

.cyLParentNote {
  margin-top: 8px;
}

.cyLParentNote span.ant-tree-node-selected {
  background-color: #b9c1c8 !important;
}

.cyLleafNote {
  width: 86%;
  border-bottom: 1px solid #f3f3f8;
  padding: 8px 1px 8px !important;
  margin-left: 24px;
}

.cyLleafNote .ant-tree-switcher {
  width: 0px;
}

.cyLleafNote .ant-tree-node-content-wrapper {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0px;
}

.cyLleafNote .ant-tree-switcher .anticon,
.cyLleafNote .ant-tree-indent {
  display: none;
}

.icon-box {
  display: inline-block;
  padding-left: 18px;
}
</style>