<template>
  <div style="overflow: hidden; height: 100%; width: 100%;">
    <!-- <div class="discover-tabs common-padding">
      <div :class="['tab', { 'tab-active': activeName == 'recommend' }]" @click="changeName('recommend')">
        个性推荐
      </div>
      <div :class="['tab', { 'tab-active': activeName == 'customized' }]" @click="changeName('customized')">
        专属订制
      </div>
      <div :class="['tab', { 'tab-active': activeName == 'playlist' }]" @click="changeName('playlist')">
        歌单
      </div>
      <div :class="['tab', { 'tab-active': activeName == 'ranking' }]" @click="changeName('ranking')">
        排行榜
      </div>
      <div :class="['tab', { 'tab-active': activeName == 'singer' }]" @click="changeName('singer')">
        歌手
      </div>
      <div :class="['tab', { 'tab-active': activeName == 'latest' }]" @click="changeName('latest')">
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
      <NewSong v-if="activeName == 'latest'" />
    </div> -->
    <van-tabs v-model:active="activeName" swipeable shrink @change="changeName">
      <van-tab title="个性推荐" name="recommend">
        <Recommend v-if="activeName == 'recommend'" />
      </van-tab>
      <van-tab title="歌单" name="playlist">
        <SongSheet v-if="activeName == 'playlist'" />
      </van-tab>
      <van-tab title="排行榜" name="ranking">
        <Ranking v-if="activeName == 'ranking'" />
      </van-tab>
      <van-tab title="歌手" name="singer">
        <Artist v-if="activeName == 'singer'" />
      </van-tab>
      <van-tab title="最新音乐" name="latest">
        <NewSong v-if="activeName == 'latest'" />
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

let nameList = ['recommend', 'customized', 'playlist', 'ranking', 'singer', 'latest']

const activeName = ref(router.currentRoute.value.query['type'] as string ?? 'recommend')
if (nameList.findIndex(item => item == activeName.value) == -1) {
  activeName.value = 'recommend'
}

function changeName(name: string | number, _title?: string) {
  activeName.value = name as string
  router.replace({ path: '/discover', query: { ...router.currentRoute.value.query, type: name } })
}
</script>

<style lang="less" scoped>
// // 样式一
// .discover-tabs {
//   display: -webkit-box;
//   font-size: 17px;
//   align-items: flex-end;
//   height: 50px;
//   padding-top: 18px;
//   padding-bottom: 5px;
//   box-sizing: border-box;
//   overflow-x: scroll;
//   overflow-y: hidden;

//   .tab {
//     // margin: 0px 10px;
//     margin-right: 20px;
//     border-bottom-color: rgba(255, 255, 255, 0);
//     border-bottom-width: 2px;
//     border-bottom-style: solid;
//   }

//   .tab-active {
//     font-weight: 800;
//     transform: scale(1.1);
//     border-bottom-color: var(--primary-color) !important;
//   }

//   &::-webkit-scrollbar {
//     width: 0px;
//     height: 0px;
//   }
// }

// .discover-body {
//   height: calc(100% - 50px);
//   box-sizing: border-box;

//   div {
//     height: 100%;
//   }
// }

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


// 自适应相关布局
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
