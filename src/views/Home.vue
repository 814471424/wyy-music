<template>
  <div class="common-layout">
    <el-container>
      <!-- 头部 -->
      <el-header data-tauri-drag-region="true" class="common-header">
        <MHeader />
      </el-header>
      <el-container class="common-main">
        <!-- 侧边栏路由部分 -->
        <el-aside width="200px" class="common-left">
          <MMenu />
        </el-aside>
        <!-- 嵌套路由，主要内容 -->
        <el-container>
          <el-main class="common-right">
            <router-view />
          </el-main>
        </el-container>
      </el-container>
      <!-- 播放器 -->
      <el-footer class="common-footer">
        <MPlayer />
      </el-footer>
      <MAudio></MAudio>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import MHeader from '../components/MHeader/Index.vue'
import MPlayer from '../components/MPlayer/Index.vue'
import MMenu from '../components/MMenu.vue'
import MAudio from '../components/MAudio.vue';
import { onMounted, watch } from 'vue';
import api from '../api/index'
import { useUserStore } from '../store/user';
import { storeToRefs } from 'pinia';


// 这边需要做用户判断
// // 如果存在cookie，校验cookie是否正确
// // 正确，获取一遍用户信息
// // 不正确，生成游客cookie(游客的cookie也执行此操作)
// if (cookie) {
//   api.userAccount().then(res => {
//     userStore.setUserInfo(res.profile)
//   })
// } else {
//   // 没用cookie的情况下生成游客cookie
// }
let userStore = useUserStore();
const { cookie } = storeToRefs(userStore);

watch(() => cookie.value, (value, _oldValue) => {
  if (!value || value == '') {
    refurbishCookie()
  }
})

onMounted(async () => {
  if (cookie) {
    api.loginStatus().then(async res => {
      if (!res.data.profile) {
        // 刷新游客cookie
        console.log('刷新游客cookie111')
        await refurbishCookie()
      }
    }).catch(async _err => {
      // 游客登录
      console.log('刷新游客cookie222')
      await refurbishCookie()
    })
  } else {
    console.log('刷新游客cookie333')
    await refurbishCookie()
  }
})

async function refurbishCookie() {
  let res = await api.registerAnonimous()
  userStore.setCookie(res.cookie)
  userStore.setUserInfo(null)
}
</script>

<style lang="less" scoped>
.common-header {
  height: 60px;
  // background-color: #ec4141;
  // background-color: var(--primary-color);
  border-bottom-color: #e0e0e0;
  border-bottom-width: 1px;
  border-bottom-style: solid;
}

.common-left {
  width: 200px;
  border-right-color: #e0e0e0;
  border-right-width: 1px;
  border-right-style: solid;
  padding: 10px 0 0 10px;
  overflow-y: hidden;
}

.common-left:hover {
  overflow-y: overlay;
}

.common-main {
  height: calc(100vh - 134px);
}

.common-footer {
  height: 74px;
  border-top-color: #e0e0e0;
  border-top-width: 1px;
  border-top-style: solid;
  padding: 0;
}

.common-right {
  padding: 0px 0px 0px 0px;
  overflow: hidden;
  overflow-y: overlay;
}
</style>