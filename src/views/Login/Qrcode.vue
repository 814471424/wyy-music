<template>
  <div style="text-align: center;" data-tauri-drag-region="true">
    <div class="login-qr-title">扫码登录</div>
    <vue-qr :margin="15" text="Hello world!" qid="testid"></vue-qr>
    <div class="login-qr-msg">
      <span>使用</span>
      <a href="https://music.163.com/download" target="_blank">网易云音乐APP</a>
      <span>扫码登录</span>
    </div>
    <div class="check-login-type" @click="basckLogin">选择其他登录模式 ></div>
  </div>
</template>

<script lang="ts" setup>
import vueQr from 'vue-qr/src/packages/vue-qr.vue'
import { onMounted, onUnmounted } from "vue"

const props = defineProps({
  // 点击选择其他登录模式时的事件
  basckLogin: {
    type: Function,
    default: function (): void {
      return undefined;
    }
  },
});


onMounted(() => {
  console.log("Scan onMounted")
})

onUnmounted(() => {
  console.log("Scan onUnmounted")
})

function basckLogin() {
  props.basckLogin()
}

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