<template>
  <div class="common-padding">
    <div style="width: 100%;">
      <div class="search-title">搜索 {{ keyword }}</div>
      <div class="search-message">{{ searchMessage }}</div>
      <el-tabs class="search-tabs" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="单曲" :name="1">
          <Song :list="songList" />
        </el-tab-pane>
        <el-tab-pane label="歌手" :name="100">
          <Artist :list="artistList" :keywords="keyword" />
        </el-tab-pane>
        <el-tab-pane label="专辑" :name="10">
          <Album :list="albumList" :keywords="keyword" />
        </el-tab-pane>
        <el-tab-pane label="视频" :name="1014">
          <Video :list="videoList" />
        </el-tab-pane>
        <el-tab-pane label="歌单" :name="1000">
          <PlayList :list="playList" :keywords="keyword" />
        </el-tab-pane>
        <el-tab-pane label="歌词" :name="1006">
          <Lyric />
        </el-tab-pane>
        <el-tab-pane label="声音" :name="2000">声音</el-tab-pane>
        <el-tab-pane label="用户" :name="1002">用户</el-tab-pane>
      </el-tabs>
      <div class="search-page">
        <el-pagination small background layout="prev, pager, next" :total="total" v-model:page-size="per_page"
          v-model:current-page="page" @current-change="handleCurrentChange" class="mt-4" />
      </div>
      <div style="height: 20px;"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Ref, onMounted, ref, watch } from "vue"
import router from "../../router";
import type { TabsPaneContext } from 'element-plus'
import Song from './components/Song.vue'
import Artist from './components/Artist.vue'
import Album from './components/Album.vue'
import Video from './components/Video.vue'
import PlayList from './components/PlayList.vue'
import Lyric from './components/Lyric.vue'
import api from "../../api";
import { searchType } from '../../api/typings/enum'

const activeName: Ref<Search.searchType> = ref(searchType.song)

let keyword: Ref<string> = ref('')
let searchMessage = ref('')
// 分页相关参数
let page = ref(1);
let per_page = ref(30);
let total = ref(0)
// 各个列表
let songList: Ref<any[]> = ref([]);
let artistList: Ref<any[]> = ref([]);
let albumList: Ref<any[]> = ref([]);
let videoList: Ref<any[]> = ref([]);
let playList: Ref<any[]> = ref([]);
let lyricList: Ref<any[]> = ref([]);

watch(() => router.currentRoute.value.params, (value, _oldValue) => {
  keyword.value = value['keyword'] as string

  search()
})
watch(() => activeName.value, (value, _oldValue) => {
  search()
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
    activeName.value
  ).then(res => {
    if (res.code == 200) {
      total.value = res.count ?? 0
      switch (activeName.value) {
        case searchType.song:
          songList.value = res.list ?? []
          console.log(songList.value)
          searchMessage.value = '找到' + total.value + '首单曲'
          break;
        case searchType.artist:
          artistList.value = res.list ?? []
          searchMessage.value = '找到' + total.value + '位歌手'
          break;
        case searchType.album:
          albumList.value = res.list ?? []
          searchMessage.value = '找到' + total.value + '位专辑'
          break;
        case searchType.video:
          videoList.value = res.list ?? []
          searchMessage.value = '找到' + total.value + '个视频'
          break;
        case searchType.playlist:
          playList.value = res.list ?? []
          searchMessage.value = '找到' + total.value + '个歌单'
          break;
        case searchType.lyric:
          searchMessage.value = '找到' + total.value + '首歌词'
          break;
        default:
          searchMessage.value = ''
          break;
      }
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