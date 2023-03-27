<template>
  <div>
    <h1>功能开发中</h1>
    <h1>路由地址: {{ route.path }}</h1>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import { useRoute } from 'vue-router'

const route = useRoute();

</script>

<style lang="less" scoped></style>