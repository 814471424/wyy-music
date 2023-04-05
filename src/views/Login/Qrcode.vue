<template>
  <div style="text-align: center;" data-tauri-drag-region="true">
    <div class="login-qr-title" data-tauri-drag-region="true">扫码登录</div>
    <vue-qr :margin="15" :text="qrurl" qid="testid"></vue-qr>
    <div class="login-qr-msg">
      <span>使用</span>
      <a href="https://music.163.com/download" target="_blank">网易云音乐APP</a>
      <span>扫码登录</span>
    </div>
    <div class="check-login-type" data-tauri-drag-region="true"><span @click="basckLogin">选择其他登录模式 ></span></div>
  </div>
</template>

<script lang="ts" setup>
import vueQr from 'vue-qr/src/packages/vue-qr.vue'
import { onMounted, onUnmounted, ref } from "vue"
import api from '../../api/index'
import { useUserStore } from '../../store/user'
import { appWindow, } from '@tauri-apps/api/window'

const userStore = useUserStore();
let avatarUrl = "";
let nickname = "";
let key = "";
let polling = false;  // 是否检测扫码状态接口
let timer: NodeJS.Timeout | string | number | undefined = undefined;
let qrurl = ref('');
let showCreate = ref(false);

const props = defineProps({
  // 点击选择其他登录模式时的事件
  basckLogin: {
    type: Function,
    default: function (): void {
      return undefined;
    }
  },
});

// 获取key并且获取二维码
async function getKeyAndCreateQr() {
  // 初始获取key
  let res = await api.loginQrCodeKey();
  if (res.data.code == 200) {
    key = res.data.unikey;

    api.loginQrCodeCreate({ key: key }).then((res) => {
      if (res.code == 200) {
        qrurl.value = res.data.qrurl
        polling = true;
      }
    })
  }
}

// 处理二维码检测扫码状态接口
async function checkQr() {
  if (polling && key != '') {
    let res = await api.loginQrCodeCheck(key);
    if (res.code == 803) {  // 成功扫码
      polling = false;
      userStore.setCookie(res.cookie);

      let userReq = await api.userAccount().then()
      userStore.setUserInfo(userReq.profile)
      appWindow.close()
    } else if (res.code == 800) { // 需要显示重新扫码按钮
      polling = false;
      showCreate.value = true;
    } else if (res.code == 802) { // 用户正在扫码 这里能获取到avatarUrl跟nickname
      avatarUrl = res.avatarUrl ?? ''
      nickname = res.nickname ?? ''
    } else {  // 801 不需要管

    }
  }
}

function basckLogin() {
  // props.basckLogin()
}

onMounted(() => {
  getKeyAndCreateQr()

  timer = setInterval(async () => {
    checkQr()
  }, 2000);
})

onUnmounted(() => {
  clearInterval(timer);
})



</script>

<style lang="less" scoped>
.login-qr-title {
  font-size: 30px;
  padding: 40px 0px 20px 0px;
}

.login-qr-msg {
  font-size: 15px;

  a {
    text-decoration: none;
    color: #0c89d4;
  }
}

.check-login-type {
  position: absolute;
  width: 100%;
  bottom: 60px;
  font-size: 12px;
  color: #666666;
}
</style>