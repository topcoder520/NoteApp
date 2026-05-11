<template>
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
  <router-view name="NewNote">
  </router-view>
  <router-view name="SearchNote" v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
  <van-tabbar route v-show="IsShowTabBar">
    <van-tabbar-item icon="notes-o" to="/">笔记</van-tabbar-item>
    <van-tabbar-item icon="apps-o" to="/Category">归类</van-tabbar-item>
    <van-tabbar-item icon="calendar-o" to="/Calendar">日历</van-tabbar-item>
    <van-tabbar-item icon="setting-o" to="/Setting">设置</van-tabbar-item>
  </van-tabbar>
</template>
<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { mapGetters, useStore } from 'vuex'
import { FingerprintVerification } from '@/plugin/fingerprint';
import { Toast } from '@vant/compat';

export default {
  setup() {
    const router = useRouter();

    const active = ref(0);

    const store = useStore();
    //页面挂载后执行
    onMounted(() => {
      store.dispatch('startupDatabase').then(() => {
        getLocalItemFn().then((data) => {
          console.log('flag', data);
          if (data == 'true') {
            console.log('开启指纹解锁');
            //指纹验证 验证成功之后这里不做其他的操作
            FingerprintVerification().then((resolve) => {
              console.log('FingerprintVerification' + JSON.stringify(resolve));
              //Toast('FingerprintVerification' + JSON.stringify(resolve));
              router.push({
                path: '/',
                replace:true,
              })
            }).catch(rs => {
              console.log('FingerprintVerification',JSON.stringify(rs));
              if(rs.code == 3){
                navigator.app.exitApp(); //退出app
              }else{
                Toast(rs.msg);
              }
            });
          } else {
            console.log('不不不开启指纹解锁');
            router.push({
              path: '/',
              replace:true,
            })
          }
        });

        navigator.splashscreen.show();
        window.setTimeout(() => {
          navigator.splashscreen.hide();
        }, 500);
      }).catch((reject) => {
        console.log('startupDatabase-err=>' + reject);
      });
    });

    const getLocalItemFn = async () => {
      return await store.getters.getLocalItem(store.state.localFingerKey);
    }

    return {
      active
    };
  },
  computed: {
    ...mapGetters([
      'IsShowTabBar'
    ])
  },
}
</script>

<style lang="less">
#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #f5f7fa;
}

.van-tabbar {
  box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.05);
  border-top: 1px solid #f0f0f0;
}

.van-tabbar-item {
  transition: color 0.2s ease;
}

.van-tabbar-item--active {
  font-weight: 600;
}

.van-nav-bar {
  background-color: #fff !important;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.04);
}

.van-nav-bar__title {
  font-weight: 600;
  color: #1a1a1a;
}
</style>
