<template>
  <div class="search-play" v-for="(item, key) in  props.list" :key="key">
    <div class="search-pic">
      <img class="" :src="item.coverImgUrl" alt="">
    </div>
    <div class="search-name" style="display: flex;" v-html="handleKeyword(item.name, props.keywords ?? '')">
    </div>
    <div class="search-trackCount"> {{ item.trackCount }}首</div>
    <div class="search-creatorname">by {{ item.creator.nickname }}</div>
    <div class="search-playCount"><span class="iconfont wyy-bofang"></span>{{ handlePlayCount(item.playCount ?? 0) }}万
    </div>
  </div>
</template>

<script lang="ts" setup>
import { handleKeyword, handlePlayCount } from '../../../utils/handle'

const props = defineProps<{
  list: Search.playlist[],
  keywords?: string
}>();

</script>

<style lang="less" scoped>
.search-play {
  height: 78px;
  display: flex;
  align-items: center;

  .search-pic {
    height: 60px;
    width: 60px;
    margin: 0 15px;

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      border-radius: 5px;
    }
  }

  .search-name {
    width: 40%;
    overflow: hidden; // 超出长度的文字隐藏
    text-overflow: ellipsis; // 文字隐藏以后添加省略号
    white-space: nowrap; // 强制不换行
    font-size: 15px;
  }

  .search-play {
    margin-left: 15px;
  }

  .search-trackCount {
    width: 10%;
    color: #969696;
    font-size: 12px;
  }

  .search-creatorname {
    width: 20%;
    color: #969696;
    font-size: 12px;
  }

  .search-playCount {
    color: #969696;
    font-size: 12px;
    display: flex;
    align-items: center;

    span {
      font-size: 15px;
    }
  }

  &:hover {
    background-color: #f5f5f5 !important;
  }

  &:nth-child(2n) {
    background-color: #fafafa
  }
}
</style>