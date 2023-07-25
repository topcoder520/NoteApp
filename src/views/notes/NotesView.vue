<template>
  <van-nav-bar class="list-title" title="待完成列表" v-show="showNavbar">
    <template #right>
      <router-link v-if="showSwitchBtn" to="/Search"> <van-icon name="search" size="18" /></router-link>
    </template>
  </van-nav-bar>
  <div class="list-box">
    <van-pull-refresh v-model="Refresh" @refresh="onRefresh">
      <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-swipe-cell v-for="(item, index) in list" :key="index" :before-close="beforeClose">
          <template #left>
            <van-button square type="primary" style="height: 100% !important" :text="item.Sort > 1 ? '取消置顶' : '置顶'"
              @click="nextTop(item.Id)" />
          </template>
          <van-row @click="onNoteDetail(item.Id)">
            <van-col span="24">
              <p class="van-multi-ellipsis--l3">{{ item.Title }}</p>
              <p>{{ item.CreateTime }}<span class="top-tag" v-show="item.Sort > 1">置顶</span></p>
            </van-col>
          </van-row>
          <template #right v-if="showSwitchBtn">
            <van-button square style="height: 100% !important" text="已完成" @click="preDelItem(item.Id)" type="danger"
              class="delete-button" />
          </template>
        </van-swipe-cell>
      </van-list>
    </van-pull-refresh>
    <div class="add-box" v-show="showNavbar">
      <span class="border" @click="addNote">
        <van-icon name="plus" />
      </span>
    </div>
  </div>
</template>
<script>
import { onActivated, ref, watch } from 'vue';
import { showConfirmDialog, showNotify } from 'vant';
import { Toast } from '@vant/compat';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { useWindowSize } from '@vant/use';

export default {
  name: 'NotesView',
  props: {
    Date: {
      type: Object,
      default: () => ({ Year: 0, Month: 0, Day: 0 })
    },
    IsAll: Boolean,
    Keywords: String,
    ShowNavBar: {
      type: Boolean,
      default: () => true
    }, //是否展示
  },
  emits: {
    'openNotedetail': null,
  },
  setup(props, context) {

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
        console.log('getNoteListByPage5');
        getNoteListByPage(initPageIndex, 20);
        Refresh.value = false;
      }, 1000);
    };

    const onLoad = () => {
      // 异步更新数据
      initPageIndex = initPageIndex + 1;
      console.log('getNoteListByPage6');
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
            console.log('getNoteListByPage7');
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
            console.log('getNoteListByPage1');
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
            showConfirmDialog({
              title: '任务已完成，移出当前列表？',
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
                  showNotify({ type: 'success', message: '已移出', position: 'bottom' });
                } else {
                  Toast.fail('移出失败：' + reject);
                }
              });
            }).catch(() => {
              // on cancel
            });
          });
      }
    };

    onActivated(() => {

      store.commit('SelectTabBar', -1);

      const RefreshListState = store.state.RefreshListState;
      console.log('store.state.RefreshListState:' + RefreshListState,typeof RefreshListState);
      if (RefreshListState) {
        store.commit('setRefreshListState', false);
        list.value = [];
        initPageIndex = 1;
        console.log('getNoteListByPage2');
        getNoteListByPage(initPageIndex, 20);
      }
    });

    //监听传入的日期是否变化
    watch(() => props.Date, (newVal, oldVal) => {
      console.log(JSON.stringify(newVal), JSON.stringify(oldVal));
      list.value = [];
      initPageIndex = 1;
      console.log('getNoteListByPage3');
      getNoteListByPage(initPageIndex, 20);
    }, { deep: true });
    //监听关键字
    watch(() => props.Keywords, (newVal, oldVal) => {
      console.log(JSON.stringify(newVal), JSON.stringify(oldVal));
      list.value = [];
      initPageIndex = 1;
      console.log('getNoteListByPage4');
      getNoteListByPage(initPageIndex, 20);
    }, { deep: true });

    const getNoteListByPage = (pageIndex, pageSize) => {
      finished.value = false;
      console.log(pageIndex + ', ' + pageSize + ', ' + props.Date.Year + ', ' + props.Date.Month + ', ' + props.Date.Day + ', ' + props.Keywords);
      store.dispatch('getNoteListByPage', { pageIndex: pageIndex, pageSize: pageSize, Year: props.Date.Year, Month: props.Date.Month, Day: props.Date.Day, State: (props.IsAll ? 0 : 1), Sort: props.IsAll, kw: props.Keywords }).then((resolve) => {
        var listData = resolve;
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
      context.emit('openNotedetail', { Id: Id });
      router.push({
        path: '/ViewNote',
        query: { Id: Id }
      });
    };

    //是否展示navbar
    const showNavbar = ref(props.ShowNavBar);

    const { height } = useWindowSize();
    const vheight = ref(height.value + 'px');

    //添加笔记
    const addNote = () => {
      router.push({
        path: '/AddNote',
      })
    }

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
      nextTop,
      showNavbar,
      showSwitchBtn: !props.IsAll,
      addNote,
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

.list-box {
  margin-top: 46px;
}

.list-box .add-box {
  display: inline-block;
  width: 60px;
  height: 60px;
  position: fixed;
  border-radius: 50%;
  bottom: 60px;
  right: 12px;
}

.list-box .add-box .border {
  display: inline-block;
  width: 42px;
  height: 42px;
  background: #fff;
  border: 1px solid #1989fa;
  border-radius: 50%;
  background-color: #1989fa;
}

.list-box .add-box .border .van-icon {
  line-height: 42px;
  font-size: 22px;
  color: #ededed;
}

.list-box .add-box .border .van-icon:hover {
  font-size: 24px;
  color: #fff;
}

.van-pull-refresh {
  background-color: #f9f9f9;
  //margin-bottom: 120px;

  .van-list {
    margin-bottom: 80px;
    min-height: v-bind("vheight");
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
}</style>