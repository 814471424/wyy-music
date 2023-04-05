<template>
  <div>
    <audio id="mp3Btn" :src="musicUrl" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, watch } from "vue"
import { useMainStore } from "../store";
import { storeToRefs } from 'pinia'

const mainStore = useMainStore(); // 目前关于应该相关的store
let audioELe = <HTMLAudioElement | null>(null);  // audio 元素
const { musicUrl, playStatus, volume, currentTimeEx } = storeToRefs(mainStore)


// 监听播放状态
watch(() => playStatus.value, async (value, _oldValue) => {
  if (value) {
    await audioELe?.play().catch((_e) => {
      mainStore.setPlayStatus(false);
    })
    return
  }
  audioELe?.pause()
})
watch(() => musicUrl.value, (value, _oldValue) => {
  audioELe?.setAttribute("autoplay", "autoplay");
})

watch(() => currentTimeEx.value, async (value, _oldValue) => {
  audioELe!.currentTime = value
  audioELe!.currentTime = value
})
watch(() => volume.value, async (value, _oldValue) => {
  audioELe!.volume = value / 100
})

onMounted(async () => {
  // 页面加载完的时候获取audioel
  audioELe = document.querySelector("#mp3Btn");
  // 设置自动播放
  // audioELe?.setAttribute("autoplay", "autoplay");
  // 可以播放的时候获取音频总时长
  audioELe?.addEventListener("canplay", function () {
    mainStore.setDuration(audioELe?.duration ?? 0);
  });
  // 获取播放音量
  mainStore.setVolume((audioELe ? audioELe.volume : 0) * 100)

  // 各种对audio的监听事件
  // 更新
  audioELe!.ontimeupdate = () => {
    mainStore.setCurrentTime(audioELe ? audioELe.currentTime : 0)
  };
  audioELe!.onplay = () => {
    mainStore.setPlayStatus(true);
  }
  audioELe!.onpause = () => {
    mainStore.setPlayStatus(false);
  }
  audioELe!.onended = () => {
    console.log("播放结束")
  }
  audioELe!.onerror = (_event, _source, _lineno, _colno, error) => {
    console.log("播放错误:" + error)
  }
})

onUnmounted(() => {
  audioELe = null
})
</script>

<style lang="less" scoped></style>