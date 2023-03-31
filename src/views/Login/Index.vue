<template>
  <div data-tauri-drag-region="true" class="login">
    <!-- 登录页面固定表头 -->
    <div class="login-header" data-tauri-drag-region="true">
      <div>
        <div v-if="loginWay == 'login'">
          <div class="login-qr" @click="loginWay = loginType[2]">
            <div class="login-qr-icon iconfont wyy-erweima2"></div>
            <div class="login-qr-snip"></div>
          </div>
        </div>
        <div v-else-if="loginWay == 'register'">
          <span>{{ "< 返回登录" }} </span>
        </div>
        <!-- 二维码扫码点击入口 -->
        <div v-else />
      </div>

      <div class="login-guanbi iconfont wyy-guanbi" @click="loginClose"></div>
    </div>
    <div class="header-body" data-tauri-drag-region="true">
      <div v-if="loginWay == 'login'">
        <Login></Login>
      </div>
      <div v-else-if="loginWay == 'register'">
        <Register></Register>
      </div>
      <div v-else>
        <Qrcode :basckLogin="() => loginWay = loginType[0]"></Qrcode>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue"
import Login from './Login.vue'
import Register from './Register.vue'
import Qrcode from './Qrcode.vue'
import { appWindow } from '@tauri-apps/api/window'


const loginType = ['login', 'register', 'qrcode'];
let loginWay = ref('qrcode')

onMounted(async () => {

})

function loginClose() {
  appWindow.close()
}
</script>

<style lang="less" scoped>
.login {
  height: 100vh;
  background-color: #fff;
  // padding: 10px;
  box-sizing: border-box;

  .login-header {
    height: 50px;
    display: flex;
    justify-content: space-between;

    // 左上角二维码
    .login-qr {
      width: 50px;
      height: 50px;
      background: #58a;
      text-align: center;
      font-size: 37px;
      background-color: #e5e7e8;
      display: flex;
      justify-content: space-evenly;
      align-items: center;

      .login-qr-icon {
        position: absolute;
        font-size: 40px;
      }

      .login-qr-snip {
        position: absolute;
        width: 50px;
        height: 50px;
        text-align: center;
        font-size: 37px;
        background: linear-gradient(135deg, transparent 36px, rgb(255, 255, 255) 0);
      }
    }

    .login-guanbi {
      margin: 9px;
      font-size: 18px;
      color: #9f9f9f;
    }

    .login-guanbi:hover {
      color: #000;
    }
  }

  // 包裹的内容最好不要超过 350*490
  .header-body {
    height: calc(100vh - 50px);
  }
}
</style> 