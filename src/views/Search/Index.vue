<template>
  <div class="common-padding">
    <div class="search-title">搜索 {{ keyword }}</div>
    <div class="search-message">{{ searchMessage }}</div>
    <el-tabs class="search-tabs" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="单曲" :name="1">
        <Song :keywords="keyword"></Song>
      </el-tab-pane>
      <el-tab-pane label="歌手" :name="100">歌手</el-tab-pane>
      <el-tab-pane label="专辑" :name="10">专辑</el-tab-pane>
      <el-tab-pane label="视频" :name="1014">视频</el-tab-pane>
      <el-tab-pane label="歌单" :name="1000">歌单</el-tab-pane>
      <el-tab-pane label="歌词" :name="1006">歌词</el-tab-pane>
      <el-tab-pane label="声音" :name="2000">声音</el-tab-pane>
      <el-tab-pane label="用户" :name="1002">用户</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import { Ref, onMounted, ref, watch } from "vue"
import router from "../../router";
import type { TabsPaneContext } from 'element-plus'
import Song from './components/Song.vue'

const activeName: Ref<Search.searchType> = ref(1)
let keyword: Ref<string> = ref('')
let searchMessage = '找到225首单曲'

watch(() => router.currentRoute.value.params, (value, _oldValue) => {
  keyword.value = value['keyword'] as string
})
watch(() => activeName.value, (value, _oldValue) => {
  console.log(value)
})

onMounted(() => {
  keyword.value = router.currentRoute.value.params['keyword'] as string
})

const handleClick = (tab: TabsPaneContext, event: Event) => {
  // console.log(tab, event)
}

</script>

<style lang="less" scoped>
.search-title {
  font-size: 20px;
  margin: 10px 0px;
  font-weight: 700;
}

.search-message {
  display: flex;
  justify-content: flex-end;
  height: 40px;
  align-items: center;
  font-size: 13px;
  color: #999999;
}

.search-tabs {
  position: relative;
  top: -40px;
}
</style>