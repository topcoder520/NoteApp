<template>
  <van-pull-refresh v-model="Refresh" @refresh="onRefresh">
    <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-swipe-cell v-for="(item, index) in list" :key="index" :before-close="beforeClose">
        <van-row @click="onNoteDetail(item.Id)">
          <van-col span="24">
            <p class="van-ellipsis">{{ item.Title }}</p>
            <p>{{ item.CreateTime }}</p>
          </van-col>
        </van-row>
        <template #right>
          <van-button square style="height: 100% !important" text="删除" @click="preDelItem(item.Id)" type="danger" class="delete-button" />
        </template>
      </van-swipe-cell>
    </van-list>
  </van-pull-refresh>
</template>
<script>
import { onActivated, ref } from 'vue';
import { Dialog, Notify, Toast } from 'vant';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { useWindowSize } from '@vant/use';
export default {
  name: 'NotesView',
  setup() {

    const router = useRouter();
    const store = useStore();
    const Refresh = ref(false);
    const list = ref([]);
    const loading = ref(false);
    const finished = ref(false);
    var initPageIndex = 0;

    const onRefresh = () => {
      setTimeout(() => {
        Toast('刷新成功');
        initPageIndex = 1;
        list.value = [];
        getNoteListByPage(initPageIndex, 20);
        Refresh.value = false;
      }, 1000);
    };

    const onLoad = () => {
      // 异步更新数据
      initPageIndex = initPageIndex + 1;
      getNoteListByPage(initPageIndex, 20);
    };

    let willDelItemId = 0;
    const preDelItem = (Id) => {
      willDelItemId = Id;
      console.log(willDelItemId);
    };

    // position 为关闭时点击的位置
    const beforeClose = ({ position }) => {
      switch (position) {
        case 'left':
        case 'cell':
        case 'outside':
          return true;
        case 'right':
          return new Promise(() => {
            Dialog.confirm({
              title: '确定删除吗？',
            }).then(() => {
               store.dispatch('delNote',willDelItemId).then((resolve,reject)=>{
                  if(resolve.rowsAffected>0){
                    for (let index = 0; index < list.value.length; index++) {
                      const item = list.value[index];
                      if(item.Id == willDelItemId){
                        list.value.splice(index,1);
                        break;
                      }
                    }
                    Notify({ type: 'success', message: '已删除',position:'bottom' });
                  }else{
                    Toast.fail('删除失败：'+reject);
                  }
               });
            }).catch(() => {
              // on cancel
            });
          });
      }
    };

    onActivated(() => {
      const RefreshListState = store.state.RefreshListState;
      if (RefreshListState) {
        list.value = [];
        initPageIndex = 1;
        getNoteListByPage(initPageIndex, 20);
      }
    });

    const getNoteListByPage = (pageIndex, pageSize) => {
      store.dispatch('getNoteListByPage', { pageIndex: pageIndex, pageSize: pageSize }).then((resolve) => {
        var listData = resolve;
        console.log(pageIndex + ', ' + pageSize);
        console.log('getNoteListByPage=>' + JSON.stringify(listData));
        for (let i = 0; i < listData.length; i++) {
          list.value.push(listData[i]);
        }
        // 加载状态结束
        loading.value = false;

        // 数据全部加载完成
        if (listData.length == 0) {
          finished.value = true;
        }
      });
    };

    //查看详情
    const onNoteDetail = (Id) => {
      console.log(Id);
      router.push({
        path: '/AddNote',
        query: { Id: Id }
      });
    };

    const { height } = useWindowSize();
    const vheight = ref(height.value+'px');

    return {
      Refresh,
      onRefresh,
      list,
      onLoad,
      loading,
      finished,
      onNoteDetail,
      preDelItem,
      beforeClose,
      vheight
    };
  },
}
</script>

<style lang="less">
.van-pull-refresh {
  background-color: #f9f9f9;

  .van-list{
    height: v-bind("vheight");
  }

  .van-row {
    margin: 12px 20px;
    background-color: #fff;
    border-radius: 0.8em;

    .van-col {

      padding: 3px 12px;

      p {
        margin: 6px;
        text-align: left;
      }

      p:first {
        font-size: 15px;
      }

      p:last-child {
        font-size: 13px;
        color: #666;
      }
    }
  }
}
</style>