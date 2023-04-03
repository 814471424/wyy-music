<template>
  <div v-if="cookie">
    <div id="showUserButton" class="header-system-login" @click.stop="showPanel">
      <img class="header-user-image" :src="avatarUrl" alt="">
      <div class="header-user-text">{{ nickname }}</div>
      <span class="header-user-image iconfont wyy-xiangxia"></span>
    </div>
    <div id="showUserPanel" :style="[{ display: showState ? 'block' : 'none' }]">
      <div class="panel-content">
        <div class="common-info" style="display: flex; justify-content: space-around;">
          <div class="common-info-item">
            <div class="info-number">{{ trends }}</div>
            <div class="info-text">动态</div>
          </div>
          <div class="common-info-item">
            <div class="info-number">{{ follow }}</div>
            <div class="info-text">关注</div>
          </div>
          <div class="common-info-item">
            <div class="info-number">{{ fans }}</div>
            <div class="info-text">粉丝</div>
          </div>
        </div>
        <div class="common-line"></div>
        <div class="common-button" style="display: flex; justify-content: space-between;">
          <div>个人信息设置</div>
          <div>></div>
        </div>
        <div class="common-line"></div>
        <div class="common-button" @click="logout">退出登录</div>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="header-system-login" @click="showLogin()">
      <span class="header-user-image iconfont wyy-ziyuanxhdpi" style="background-color: #fff;" src="" alt="" />
      <div class="div-no-select">未登录</div>
      <span class="header-user-image iconfont wyy-xiangxia"></span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from '../../store/user'
import Windows from '../../windows/Windows';
import { onMounted, onUnmounted, ref } from 'vue';
import api from '../../api/index'
import router from '../../router/index'

let userStore = useUserStore();
const { avatarUrl, nickname, cookie } = storeToRefs(userStore);
let showPane: HTMLElement | null = null
let showState = ref(false)
let trends = ref(0);
let follow = ref(0);
let fans = ref(0);

// 显示登录页面
function showLogin() {
  console.log(avatarUrl.value);
  (new Windows()).createLoginWin()
}
function showPanel() {
  if (showState.value) {
    showState.value = false;
  } else {
    showState.value = true;
  }
}
// 退出登录
async function logout() {
  await api.logout();
  userStore.cleanUser();
  router.replace('/discover')
}

onMounted(() => {
  showPane = document.getElementById('showUserPanel')

  document.addEventListener('click', (event) => {
    showState.value = false;
  })
  showPane?.addEventListener('click', (event) => {
    event.stopPropagation()
  })
})

onUnmounted(() => {
  document.removeEventListener('click', () => { });
  showPane = null;
}) 
</script>

<style lang="less" scoped>
.header-system-login {
  display: flex;
  align-items: center;
  font-size: 10px;

  .header-user-image {
    font-size: 28px;
    width: 28px;
    height: 28px;
    border-radius: 28px;
    margin-right: 3px;
    color: #e0e0e0;
  }

  .header-user-text {
    color: #e0e0e0;
  }
}

#showUserPanel {
  width: 280px;
  display: none;
  position: absolute;
  top: 60px;
  right: 220px;
  z-index: 2004;
  padding: 15px 0px 5px 0px;
  box-sizing: border-box;
  box-shadow: 0px 0px 5px 1px #aaa;
  border-top: none;
  color: #333333c3;
  background-color: #fff;

  .panel-content {
    width: 100%;
    height: 100%;
  }
}

.common-info {
  display: flex;
  padding-bottom: 10px;

  .common-info-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 13px;

    .info-number {
      font-size: 17px;
      font-weight: 900;
    }
  }

  .common-info-item:hover {
    .info-text {
      color: #000;
    }
  }
}

.common-button {
  padding: 12px 15px;
  font-size: 13px;
}

.common-button:hover {
  background-color: #aaaaaa26;
}

.common-line {
  margin: 0px 15px 0 15px;
  border-top: 1px solid #dadada;
}
</style>