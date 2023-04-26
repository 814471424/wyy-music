<template>
  <div style="overflow: hidden; height: 100%; width: 100%;">
    <van-tabs v-model:active="activeName" swipeable shrink @change="changeName">
      <van-tab title="个性推荐" name="recommend">
        <Recommend />
      </van-tab>
      <van-tab title="歌单" name="playlist">
        <SongSheet />
      </van-tab>
      <van-tab title="排行榜" name="ranking">
        <Ranking />
      </van-tab>
      <van-tab title="歌手" name="singer">
        <Artist />
      </van-tab>
      <van-tab title="最新音乐" name="latest">
        <NewSong />
      </van-tab>
    </van-tabs>
  </div>
</template>
<script lang="ts" setup>
import { ref, } from 'vue'
import Recommend from './components/Recommend.vue'
import SongSheet from './components/SongSheet.vue'
import Artist from './components/Artist.vue'
import NewSong from './components/NewSong.vue'
import Ranking from './components/Ranking.vue'
import router from '../../router/index'

const activeName = ref(router.currentRoute.value.query['type'] as string ?? 'recommend')

function changeName(name: string | number, _title: string) {
  router.replace({ path: '/discover', query: { ...router.currentRoute.value.query, type: name } })
}
</script>

<style lang="less" scoped>
// 样式二
:deep(.van-tabs) {
  height: 100%;

  .van-tabs__content {
    height: calc(100% - 44px);

    .van-tab__panel {
      height: calc(100%);
      overflow-y: overlay;
    }

    .van-swipe {
      cursor: default;
    }
  }

  .van-tabs__nav--line.van-tabs__nav--shrink,
  .van-tabs__nav--line.van-tabs__nav--complete {
    padding-right: 22px;
    padding-left: 22px;
  }

  :deep(.van-tab--active) {
    border-color: #000;
  }

  .van-tab .van-tab__text {
    font-size: 16px;
  }

  .van-tabs__nav--line .van-tabs__line {
    background: var(--primary-color);
  }
}


@media screen and (max-width: 600px) {
  :deep(.van-tabs) {

    .van-tabs__nav--line.van-tabs__nav--shrink,
    .van-tabs__nav--line.van-tabs__nav--complete {
      padding-right: 2px;
      padding-left: 2px;
    }
  }
}
</style>
