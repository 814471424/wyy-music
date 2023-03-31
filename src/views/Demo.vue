<template>
  <div>
    <h1>测试页面</h1>
    <div class="context-menu" @click.right.native="showContextMenu($event)">
      展示右键菜单
    </div>
    <div @click="test()">测试cookie</div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted } from "vue"
import { useUserStore } from '../store/user'
import Windows from '../windows/Windows'

const userStore = useUserStore();
let list: Common.SongItem[] = [{ id: 1, name: '22', songType: 'local' }];

let avatarUrl = computed(() => userStore.avatarUrl);
let cookie = computed(() => userStore.cookie);
let nickname = computed(() => userStore.nickname);

function test() {
  // console.log(avatarUrl.value);
  // console.log(cookie.value);
  // console.log(nickname.value);
  // (new Windows()).createMini()
  console.log(list)
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