<template>
  <div style="overflow: hidden; height: 100%; width: 100%;">
    <div class="discover-tabs common-padding">
      <div :class="['tab', { 'tab-active': activeName == 'recommend' }]" @click="handleClick('recommend')">
        个性推荐
      </div>
      <div :class="['tab', { 'tab-active': activeName == 'customized' }]" @click="handleClick('customized')">
        专属订制
      </div>
      <div :class="['tab', { 'tab-active': activeName == 'playlist' }]" @click="handleClick('playlist')">
        歌单
      </div>
      <div :class="['tab', { 'tab-active': activeName == 'ranking' }]" @click="handleClick('ranking')">
        排行榜
      </div>
      <div :class="['tab', { 'tab-active': activeName == 'singer' }]" @click="handleClick('singer')">
        歌手
      </div>
      <div :class="['tab', { 'tab-active': activeName == 'latest' }]" @click="handleClick('latest')">
        最新音乐
      </div>
    </div>
    <div class="discover-body">
      <Recommend v-show="activeName == 'recommend'" />
      <div v-show="activeName == 'customized'">
        专属订制
      </div>
      <SongSheet v-show="activeName == 'playlist'" />
      <div v-show="activeName == 'ranking'">
        排行榜
      </div>
      <div v-show="activeName == 'singer'">
        歌手
      </div>
      <div v-show="activeName == 'latest'">
        最新音乐
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import Recommend from './components/Recommend.vue'
import SongSheet from './components/SongSheet.vue'

const activeName = ref('playlist')

const handleClick = (tab: string) => {
  activeName.value = tab
}
</script>

<style lang="less" scoped>
.discover-tabs {
  display: -webkit-box;
  font-size: 17px;
  align-items: flex-end;
  height: 45px;
  padding-top: 18px;
  overflow-x: scroll;
  overflow-y: hidden;

  .tab {
    margin: 0px 10px;
    border-bottom-color: rgba(255, 255, 255, 0);
    border-bottom-width: 3.5px;
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
  height: calc(100% - 45px);

  div {
    height: 100%;
  }
}
</style>
