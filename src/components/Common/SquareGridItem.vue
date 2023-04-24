<template>
  <div :class="{ 'item-list': !props.singleRow, 'item-box-list': props.singleRow }">
    <div class="item" v-for="(item, key) in props.list" :key="key" @click="itemClick(item)">
      <div class="item-cover">
        <img class="background" v-lazy="item.picUrl" alt="" :key="item.picUrl">
        <!-- 每日推荐特有的 -->
        <div v-if="item.type == itemType.dailySong" class="dailySong-text iconfont wyy-a-ziyuan16-copy-copy">
        </div>
        <div v-if="item.type == itemType.dailySong" class="dailySong-text" style="font-size: 25px; top: 5px;">
          {{ new Date().getDate() }}
        </div>
        <!-- 歌单特有的 -->
        <div v-if="item.type == itemType.playlist" class="playlist-playCount">
          <span class="iconfont wyy-bofangliang"></span>
          {{ handlePlayCount(item.playCount ?? 0) }}
        </div>
        <!-- 追加字段用于显示或者隐藏播放按钮的 -->
        <img v-if="props.playIcon" class="playIcon" :src="paly_icon" alt="">
      </div>
      <div class="title">
        <div>{{ item.name }}</div>
        <div v-if="item.type == itemType.album" style="color: #999999; font-size: 0.7rem;">{{
          millisecondToDate(item.publishTime ?? 0) }}
        </div>
      </div>
    </div>
  </div>
</template>
  
<script lang="ts" setup>
import router from '../../router'
import { handlePlayCount } from '../../utils/handle'
import paly_icon from '../../assets/paly_icon.png'
import { millisecondToDate } from '../../utils/time'

// 封面
enum itemType {
  artist = 0,     // 歌手
  playlist = 1,   // 表单
  dailySong = 2,  // 每日推荐
  ranking = 3,    // 排行榜
  album = 4,      // 专辑
}

type item = {
  type: itemType
  id: number
  // 封面图片
  picUrl?: string
  name: string
  playCount?: number,
  copywriter?: string
  publishTime?: number // 专辑特有的
}

const props = defineProps({
  list: Array<item>,
  // 600px以下显示时的方向 true单行 false多行(默认)
  singleRow: {
    type: Boolean,
    default: false
  },
  // 是否显示播放按钮
  playIcon: {
    type: Boolean,
    default: false
  }
});

function itemClick(item: item) {
  switch (item.type) {
    case itemType.playlist:
      router.push('/playlist/' + item.id)
      break;
    case itemType.dailySong:
      router.push('/daily_song')
      break;
    case itemType.artist:
      router.push('/artist/' + item.id)
      break;
    case itemType.ranking:
      router.push('/playlist/' + item.id)
      break;
    case itemType.album:
      router.push('/album/' + item.id)
      break;
    default:
      console.log("默认")
      break;
  }
}
</script>
  
<style lang="less" scoped>
.item-list,
.item-box-list {
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(5, 18.7%);
  grid-gap: 7px;
  justify-content: space-between;
  width: 100%;
}

.item-cover {
  padding-top: 100%;
  position: relative;

  .background {
    width: 100%;
    height: 100%;
    top: 0px;
    object-fit: cover;
    position: absolute;

    border-radius: 5px;
  }
}

.title {
  margin: 7px 0px 10px 0px;
  font-size: 0.9rem;
  width: 100%;

  // 标题最多两行
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.dailySong-text {
  position: absolute;
  top: 0%;
  color: #fff;
  font-size: 60px;

  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.playlist-playCount {
  position: absolute;
  top: 3px;
  right: 5px;
  font-size: 10px;
  color: #fff;

  span {
    font-size: 13px;
  }
}

// 播放按钮样式
.item-cover .playIcon {
  bottom: 7px;
  right: 7px;
  width: 42px;
  position: absolute;
  display: none;
}

.item-cover:hover {
  .playIcon {
    display: block;
  }
}

@media screen and (max-width:600px) {
  .item-list {
    grid-template-columns: repeat(3, 32%);
  }

  .item-box-list {
    display: -webkit-box;
    overflow-x: scroll;
    overflow-y: hidden;
  }

  .item-box-list .item {
    width: 32%;
  }

  .item-box-list::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
}

@media screen and (min-width:601px) and (max-width:1000px) {
  .item-list {
    // grid-template-columns: repeat(4, 24%);
    grid-template-columns: repeat(3, 32%);
  }

  .item-box-list {
    grid-template-columns: repeat(3, 32%);
  }
}
</style>