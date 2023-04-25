<template>
  <van-tabs v-model:active="active" swipeable shrink>
    <van-tab title="标签 1">
      <div class="demo">
        <div v-for="i in 100">内容 1</div>
      </div>
    </van-tab>
    <van-tab title="标签 2">
      <div class="demo">内容 2</div>
    </van-tab>
    <van-tab title="标签 3">
      <div class="demo">内容 3</div>
    </van-tab>
    <van-tab title="标签 4">
      <div class="demo">内容 4</div>
    </van-tab>
  </van-tabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'

const active = ref(0);

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
</script>

<style lang="less" scoped>
.demo-tabs>.el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.demo {
  width: 100%;
  height: 100%;
  background-color: antiquewhite;
}
</style>