<template>
  <van-pull-refresh v-model="Refresh" @refresh="onRefresh">
    <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-swipe-cell v-for="(item, index) in list" :key="index" :before-close="beforeClose">
        <template #left>
          <van-button square type="primary" style="height: 100% !important" :text="item.Sort > 1 ? '取消置顶' : '置顶'"
            @click="nextTop(item.Id)" />
        </template>
        <van-row @click="onNoteDetail(item.Id)">
          <van-col span="24">
            <p class="van-ellipsis">{{ item.Title }}</p>
            <p>{{ item.CreateTime }}<span class="top-tag" v-show="item.Sort > 1">置顶</span></p>
          </van-col>
        </van-row>
        <template #right>
          <van-button square style="height: 100% !important" text="删除" @click="preDelItem(item.Id)" type="danger"
            class="delete-button" />
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
    //删除
    const preDelItem = (Id) => {
      willDelItemId = Id;
      console.log(willDelItemId);
    };
    //置顶
    let willTopItemId = 0;
    const nextTop = (Id) => {
      willTopItemId = Id;
      console.log(willTopItemId);
    };

    const topItem = (item) => {
      if (item.Sort > 1) {
        //取消置顶
        store.dispatch('updateNoteSort', {
          Id: item.Id,
          Sort: 1
        }).then((resolve) => {
          if (resolve.rowsAffected > 0) {
            initPageIndex = 1;
            list.value = [];
            getNoteListByPage(initPageIndex, 20);
            setTimeout(function () {
              Toast('已取消置顶');
            }, 300);
          }
        }).catch((reject) => {
          Toast.fail('取消置顶失败：' + reject);
        });
      } else {
        //置顶
        store.dispatch('updateNoteSort', {
          Id: item.Id,
          Sort: Date.now()
        }).then((resolve) => {
          if (resolve.rowsAffected > 0) {
            initPageIndex = 1;
            list.value = [];
            getNoteListByPage(initPageIndex, 20);
            setTimeout(function () {
              Toast('已置顶');
            }, 300);
          }
        }).catch((reject) => {
          Toast.fail('置顶失败：' + reject);
        });
      }
    };

    // position 为关闭时点击的位置
    const beforeClose = ({ position }) => {
      switch (position) {
        case 'left':
          return new Promise(() => {
            for (let index = 0; index < list.value.length; index++) {
              const item = list.value[index];
              if (item.Id == willTopItemId) {
                topItem(item);
                break;
              }
            }
          });
        case 'cell':
        case 'outside':
          return true;
        case 'right':
          return new Promise(() => {
            Dialog.confirm({
              title: '确定删除吗？',
            }).then(() => {
              store.dispatch('delNote', willDelItemId).then((resolve, reject) => {
                if (resolve.rowsAffected > 0) {
                  for (let index = 0; index < list.value.length; index++) {
                    const item = list.value[index];
                    if (item.Id == willDelItemId) {
                      list.value.splice(index, 1);
                      break;
                    }
                  }
                  Notify({ type: 'success', message: '已删除', position: 'bottom' });
                } else {
                  Toast.fail('删除失败：' + reject);
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
      console.log('store.state.RefreshListState:' + store.state.RefreshListState);
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
    const vheight = ref(height.value + 'px');

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
      vheight,
      nextTop
    };
  },
}
</script>

<style lang="less">
.van-pull-refresh {
  background-color: #f9f9f9;
  padding-bottom: 40px;

  .van-list {
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

  .top-tag {
    font-size: 12px;
    display: inline-block;
    padding: 2px 3px;
    background-color: blue;
    color: #fff;
    border-radius: 3px;
    margin-left: 9px;
  }
}
</style>