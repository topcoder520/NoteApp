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
:root {
  /* === 色彩体系：极简原木治愈风 === */

  /* 背景色 */
  --bg-page: #F9F6F0;
  --bg-card: #FFFDF9;
  --bg-input: #FFFDF9;

  /* 文字色 */
  --text-primary: #4A4036;
  --text-secondary: #9B8E7E;
  --text-muted: #BFB5A5;

  /* 强调色 — 低饱和豆沙绿 */
  --accent: #8B9E8B;
  --accent-dark: #6B7E6B;
  --accent-light: #F0EDE5;
  --accent-light2: #F5F2EC;

  /* 状态色 */
  --success: #7FA98B;
  --danger: #C4927A;
  --warning: #D4A08A;

  /* 边框色 */
  --border: #EBE5DA;
  --border-light: #F0ECE4;
  --border-input: #D4CFC6;

  /* 阴影 — 暖色基调 */
  --shadow-color-base: 74, 64, 54;
  --shadow-accent: 139, 158, 139;

  /* 圆角 */
  --radius-card: 16px;
  --radius-input: 10px;
  --radius-btn: 8px;
  --radius-tag: 6px;

  /* Vant 组件变量覆盖 */
  --van-nav-bar-background: #FFFDF9;
  --van-nav-bar-title-text-color: #4A4036;
  --van-tabbar-background: #FFFDF9;
  --van-tabbar-item-text-color: #9B8E7E;
  --van-tabbar-item-active-color: #8B9E8B;
  --van-primary-color: #8B9E8B;
  --van-danger-color: #C4927A;
  --van-success-color: #7FA98B;
  --van-switch-on-background: #8B9E8B;
  --van-cell-text-color: #4A4036;
  --van-cell-text-color-secondary: #9B8E7E;
  --van-text-color: #4A4036;
  --van-text-color-secondary: #9B8E7E;
  --van-background: #F9F6F0;
  --van-background-2: #FFFDF9;
}

#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', 'Helvetica Neue', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--text-primary);
  background-color: var(--bg-page);
}

/* === Tabbar === */
.van-tabbar {
  background-color: var(--bg-card) !important;
  box-shadow: 0 -2px 16px rgba(var(--shadow-color-base), 0.04);
  border-top: 1px solid var(--border);
}

.van-tabbar-item {
  transition: color 0.25s ease;
}

.van-tabbar-item--active {
  font-weight: 600;
}

/* === NavBar === */
.van-nav-bar {
  background-color: var(--bg-card) !important;
  box-shadow: 0 1px 8px rgba(var(--shadow-color-base), 0.03);
}

.van-nav-bar__title {
  font-weight: 600;
  color: var(--text-primary);
}

/* === Button overrides === */
.van-button--primary {
  --van-button-primary-background: var(--accent);
  --van-button-primary-border-color: var(--accent);
}

.van-button--success {
  --van-button-success-background: var(--success);
  --van-button-success-border-color: var(--success);
}

.van-button--danger {
  --van-button-danger-background: var(--danger);
  --van-button-danger-border-color: var(--danger);
}

/* === Switch === */
.van-switch--on {
  background-color: var(--accent);
}

/* === Cell === */
.van-cell {
  color: var(--text-primary);
}

.van-cell__value {
  color: var(--text-secondary);
}

/* === Dialog / Popup === */
.van-dialog {
  border-radius: var(--radius-card);
}

.van-popup--round {
  border-radius: var(--radius-card) var(--radius-card) 0 0;
}
</style>
