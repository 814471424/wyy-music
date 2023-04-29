<template>
  <div style="height: 300px;">
    <div style="height: 20px;"></div>
    <!-- <Lyrics :lyric="lyc" :tlyric="tlyric" :romalrc="romalrc" :current-time="currentTime" /> -->
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import Progress from '../components/Common/Progress.vue'
import { useMainStore } from '../store/index'
import { storeToRefs } from 'pinia'
import Lyrics from '../components/Common/Lyrics.vue'

const mainStore = useMainStore()
const { currentTime, duration, lyc, tlyric, romalrc } = storeToRefs(mainStore)

</script>

<style lang="less" scoped></style>