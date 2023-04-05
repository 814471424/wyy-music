<template>
  <div v-if="cookie">
    <div id="showUserButton" class="header-system-login" @click.stop="showPanel">
      <img class="header-user-image" :src="profile?.avatarUrl" alt="">
      <div class="header-user-text">{{ profile?.nickname }}</div>
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
            <div class="info-number">{{ followCount }}</div>
            <div class="info-text">关注</div>
          </div>
          <div class="common-info-item">
            <div class="info-number">{{ fans }}</div>
            <div class="info-text">粉丝</div>
          </div>
        </div>
        <!-- 签到按钮 -->
        <div class="signin" @click="signin">
          <div v-if="!todaySignedIn" class="signin-button signin-button-black">签到</div>
          <div v-else class="signin-button">已签到</div>
        </div>

        <div class="common-line"></div>
        <div class="common-button" @click="router.push('user_info')">
          <div>个人信息设置</div>
          <div><span class="iconfont wyy-xiangyou"></span></div>
        </div>
        <div class="common-line"></div>
        <div class="common-button" @click="logout">退出登录</div>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="header-system-login" @click="showLogin()">
      <span class="header-user-image iconfont wyy-ziyuanxhdpi" style="background-color: #fff;" />
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
import { WebviewWindow, } from '@tauri-apps/api/window'
import { UnlistenFn } from '@tauri-apps/api/event';

let userStore = useUserStore();
const { profile, cookie } = storeToRefs(userStore);
let showPane: HTMLElement | null = null
let showState = ref(false)
let unlistenClose: UnlistenFn | undefined;
let todaySignedIn = ref(false); //  签到状态
let followCount = ref(0);
let fans = ref(0);
let trends = ref(0);

// 显示登录页面
async function showLogin() {
  await (new Windows()).createLoginWin();

  // 目前先这样子来刷新头像
  setTimeout(async () => {
    let win = WebviewWindow.getByLabel('login');
    unlistenClose = await win?.listen('tauri://destroyed', (event) => {
      if (event.windowLabel == 'login') {
        userStore.reLoad();
        router.replace('discover')
      }
    })
  }, 1000);
}

function showPanel() {
  if (showState.value) {
    showState.value = false;
  } else {
    // 获取签到状态
    api.signinProgress(true).then(res => {
      if (res.code == 200) {
        todaySignedIn.value = res.data.today.todaySignedIn
      }
    })
    // 获取收藏数量
    api.userFollows({ uid: profile.value?.userId ?? '', offset: 0, limit: 10000 }).then(res => {
      if (res.code == 200) {
        followCount.value = res.follow.length
      }
    })
    // 粉丝数量
    api.userFolloweds({ uid: profile.value?.userId ?? '' }).then(res => {
      if (res.code == 200) {
        fans.value = res.size
      }
    })
    // 动态数量
    api.userEvent({ uid: profile.value?.userId ?? '' }).then(res => {
      if (res.code == 200) {
        trends.value = res.size
      }
    })
    showState.value = true;
  }
}
// 退出登录
async function logout() {
  await api.logout();
  userStore.cleanUser();
  router.replace('/discover')
}

// 签到
function signin() {
  // 已签到
  if (todaySignedIn.value) {
    showState.value = false;
    return
  }

  // 未签到
  api.dailySignin().then(res => {
    if (res.code == 200) {
      todaySignedIn.value = true;
    }
  })
}

onMounted(async () => {
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
  unlistenClose ? unlistenClose() : null;
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
  box-shadow: -2px 0px 20px 0px #94929252;
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

.signin {
  display: flex;
  justify-content: center;
  padding: 10px;

  .signin-button {
    border: 1px dotted #b2b2b2;
    border-top-style: dotted;
    width: 85px;
    height: 29px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    color: #b2b2b2;
  }

  .signin-button-black {
    border: 1px dotted #000000;
    color: #000000;
  }
}

.common-button {
  padding: 12px 15px;
  font-size: 13px;
  display: flex;
  justify-content: space-between;
}

.common-button:hover {
  background-color: #aaaaaa26;
}

.common-line {
  margin: 0px 15px 0 15px;
  border-top: 1px solid #dadada;
}
</style>