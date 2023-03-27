<template>
  <div>
    <div>注册页面</div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "vue"
onMounted(() => {
  console.log("Register onMounted")
})

onUnmounted(() => {
  console.log("Register onUnmounted")
})
</script>

<style lang="less" scoped></style>