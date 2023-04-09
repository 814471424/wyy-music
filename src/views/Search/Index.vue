<template>
  <div class="common-padding">
    <div class="search-title">搜索 {{ keyword }}</div>
    <div class="search-message">{{ searchMessage }}</div>
    <el-tabs class="search-tabs" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="单曲" :name="1">
        <Song :list="list"></Song>
      </el-tab-pane>
      <el-tab-pane label="歌手" :name="100">歌手</el-tab-pane>
      <el-tab-pane label="专辑" :name="10">专辑</el-tab-pane>
      <el-tab-pane label="视频" :name="1014">视频</el-tab-pane>
      <el-tab-pane label="歌单" :name="1000">歌单</el-tab-pane>
      <el-tab-pane label="歌词" :name="1006">歌词</el-tab-pane>
      <el-tab-pane label="声音" :name="2000">声音</el-tab-pane>
      <el-tab-pane label="用户" :name="1002">用户</el-tab-pane>
    </el-tabs>
    <div class="search-page">
      <el-pagination small background layout="prev, pager, next" :total="total" v-model:page-size="per_page"
        v-model:current-page="page" @current-change="handleCurrentChange" class="mt-4" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Ref, onMounted, ref, watch } from "vue"
import router from "../../router";
import type { TabsPaneContext } from 'element-plus'
import Song from './components/Song.vue'
import api from "../../api";

const activeName: Ref<Search.searchType> = ref(1)
let keyword: Ref<string> = ref('')
let searchMessage = ''
// 分页相关参数
let page = ref(1);
let per_page = ref(50);
let total = ref(0)
let list: Ref<any[]> = ref([]);

watch(() => router.currentRoute.value.params, (value, _oldValue) => {
  keyword.value = value['keyword'] as string
})
watch(() => activeName.value, (value, _oldValue) => {
  console.log(value)
})
watch(() => total.value, (value, _oldValue) => {
  switch (activeName.value) {
    case 1:
      searchMessage = '找到' + value + '首单曲'
      break;
    default:
      searchMessage = '暂时未设置'
      break;
  }
})

onMounted(() => {
  keyword.value = router.currentRoute.value.params['keyword'] as string

  search()
})

const handleClick = (tab: TabsPaneContext, event: Event) => {
  // console.log(tab, event)
}
const handleCurrentChange = (val: number) => {
  search()
}

function search() {
  api.search(
    {
      keywords: keyword.value,
      limit: per_page.value,
      offset: (page.value - 1) * per_page.value
    },
  ).then(res => {
    if (res.code == 200) {
      list.value = res.list ?? []
      total.value = res.count ?? 0
      console.log(total.value)
    }
  })
}

</script>

<style lang="less" scoped>
.common-padding {
  padding-bottom: 30px;
}

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

.search-page {
  text-align: center;
  display: flex;
  justify-content: center;
}
</style>