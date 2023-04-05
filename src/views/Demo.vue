<template>
  <div>
    <h1>测试页面</h1>
    <div class="context-menu" @click.right.native="showContextMenu($event)">
      展示右键菜单
    </div>
    <div @click="test()">测试cookie</div>
    <div>
      <!-- <User></User> -->
    </div>
    <div v-if="cookie">
      有cookie
    </div>
    <div v-else>没有cookie</div>
    <button @click="testCookie">测试cookie</button>
    <button @click="delCookie">删除cookie</button>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted } from "vue"
import { useUserStore } from '../store/user'
import Windows from '../windows/Windows'
import User from '../components/MHeader/User.vue'

const userStore = useUserStore();

let cookie = computed(() => userStore.cookie);

function test() {
  // console.log(avatarUrl.value);
  // console.log(cookie.value);
  // console.log(nickname.value);
  // (new Windows()).createMini()
}

function testCookie() {
  userStore.setCookie("ddddddddddddddddddddd");
}
function delCookie() {
  userStore.cleanUser()
}

onMounted(() => {
  // let audio = new window.Audio();
  // audio.src = "https://stream.localhost/D:\\CloudMusic\\7!! - オレンジ.MP3"
  // audio.play()
})

const showContextMenu = (e: any) => {
  e.preventDefault()
  console.log('监听右键点击')
}

onMounted(async () => {
})
</script>

<style lang="less" scoped>
:deep(.el-overlay) {
  background-color: rgb(0 0 0 / 0%);
}
</style> 