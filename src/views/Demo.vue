<template>
  <div>
    <h1>测试页面</h1>
    <div class="context-menu" @click.right.native="showContextMenu($event)">
      展示右键菜单
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Ref, onMounted, ref } from "vue"
import { FileEntry, readDir, readBinaryFile } from '@tauri-apps/api/fs'
import useLocalStorage from '../hooks/useLocalStorage';



onMounted(() => {
  // let audio = new window.Audio();
  // audio.src = "https://stream.localhost/D:\\CloudMusic\\7!! - オレンジ.MP3"
  // audio.play()
})

const showContextMenu = (e: any) => {
  e.preventDefault()
}

onMounted(async () => {
})
</script>

<style lang="less" scoped></style> 