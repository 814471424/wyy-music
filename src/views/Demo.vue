<template>
  <div>
    <div style="height: 20px;"></div>
    <div>
      <Progress :max="duration" v-model="currentTime" :change="change" />
    </div>
    <div style="height: 100px;">
      <Progress :max="duration" v-model="currentTime" :change="change" vertical />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import Progress from '../components/Common/Progress.vue'
import { useMainStore } from '../store/index'
import { storeToRefs } from 'pinia'

const mainStore = useMainStore()
const { currentTime, duration } = storeToRefs(mainStore)

function change(data: number) {
  console.log(data)
  mainStore.setCurrentTimeEx(data);
}
</script>

<style lang="less" scoped></style>