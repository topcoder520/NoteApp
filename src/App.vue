<template>
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
  <router-view name="NewNote"></router-view>
  <van-tabbar route v-show="IsShowTabBar">
    <van-tabbar-item icon="notes-o" to="/">笔记</van-tabbar-item>
    <van-tabbar-item icon="plus" to="/AddNote">添加</van-tabbar-item>
    <van-tabbar-item icon="calendar-o" to="/Calendar">日历</van-tabbar-item>
    <van-tabbar-item icon="setting-o">设置</van-tabbar-item>
  </van-tabbar>
</template>
<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { mapGetters, useStore } from 'vuex';

export default {
  setup() {
    const router = useRouter();

    const active = ref(0);

    const store = useStore();
    //页面挂载后执行
    onMounted(() => {
      store.dispatch('startupDatabase').then(() => {
        router.push({
          path: '/'
        })
      }).catch((reject) => {
        console.log('startupDatabase-err=>' + reject);
      });

    })

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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
</style>
