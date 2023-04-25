<template>
  <div style="overflow: hidden; height: 100%; width: 100%;">
    <!-- <div class="discover-tabs common-padding">
      <div :class="['tab', { 'tab-active': activeName == 'recommend' }]" @click="activeName.value = 'recommend'">
        个性推荐
      </div>
      <div :class="['tab', { 'tab-active': activeName == 'customized' }]" @click="activeName.value = 'customized'">
        专属订制
      </div>
      <div :class="['tab', { 'tab-active': activeName == 'playlist' }]" @click="activeName.value = 'playlist'">
        歌单
      </div>
      <div :class="['tab', { 'tab-active': activeName == 'ranking' }]" @click="activeName.value = 'ranking'">
        排行榜
      </div>
      <div :class="['tab', { 'tab-active': activeName == 'singer' }]" @click="activeName.value = 'singer'">
        歌手
      </div>
      <div :class="['tab', { 'tab-active': activeName == 'latest' }]" @click="activeName.value = 'latest'">
        最新音乐
      </div>
    </div>
    <div class="discover-body">
      <Recommend v-if="activeName == 'recommend'" />
      <div v-if="activeName == 'customized'">
        专属订制
      </div>
      <SongSheet v-if="activeName == 'playlist'" />
      <Ranking v-if="activeName == 'ranking'" />
      <Artist v-if="activeName == 'singer'" />
      <TopSong v-if="activeName == 'latest'" />
      <div style="height: 20px;"></div>
    </div> -->

    <van-tabs v-model:active="activeName" swipeable shrink>
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
        <TopSong />
      </van-tab>
    </van-tabs>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import Recommend from './components/Recommend.vue'
import SongSheet from './components/SongSheet.vue'
import Artist from './components/Artist.vue'
import TopSong from './components/TopSong.vue'
import Ranking from './components/Ranking.vue'

const activeName = ref('recommend')

</script>

<style lang="less" scoped>
// 样式一
.discover-tabs {
  display: -webkit-box;
  font-size: 17px;
  align-items: flex-end;
  height: 50px;
  padding-top: 18px;
  padding-bottom: 5px;
  box-sizing: border-box;
  overflow-x: scroll;
  overflow-y: hidden;

  .tab {
    // margin: 0px 10px;
    margin-right: 20px;
    border-bottom-color: rgba(255, 255, 255, 0);
    border-bottom-width: 2px;
    border-bottom-style: solid;
  }

  .tab-active {
    font-weight: 800;
    transform: scale(1.1);
    border-bottom-color: var(--primary-color) !important;
  }

  &::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
}

.discover-body {
  height: calc(100% - 50px);
  box-sizing: border-box;

  div {
    height: 100%;
  }
}

// 样式二
:deep(.van-tabs) {
  height: 100%;

  .van-tabs__content {
    height: calc(100% - 44px);

    .van-tab__panel {
      height: calc(100%);
      overflow-y: overlay;
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
