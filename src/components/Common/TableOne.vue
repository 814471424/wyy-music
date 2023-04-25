<template>
  <div class="table-item" v-for="(item, key) in props.list" :key="key">
    <div class="table-index font-weak" v-html="key < 9 ? '0' + (key + 1) : key + 1"></div>
    <div class="table-image" @click="play(item)">
      <img class="table-background" v-lazy="item.album.picUrl" alt="">
      <img class="paly_icon" :src="paly_icon" alt="">
    </div>
    <div class="table-name">{{ item.name }}</div>
    <div class="table-author font-weak">{{ item.artists.map(v => v.name).join(' / ') }}</div>
    <div class="table-album font-weak">{{ item.album.name }}</div>
    <div class="table-time font-weak">{{ millisecondToTime(item.duration) }}</div>
  </div>
</template>

<script lang="ts" setup>
import paly_icon from '../../assets/paly_icon.png'
import { millisecondToTime } from '../../utils/time'
import { playOne } from '../../utils/player'

const props = defineProps<{
  list: Search.song[]
}>();

function play(item: Search.song) {
  playOne({ ...item, songType: 'topSong', alia: [], dt: 0, ar: [] })
}
</script>

<style lang="less" scoped>
.table-item {
  height: 80px;
  display: flex;
  align-items: center;
  font-size: 0.8rem;

  .table-index {
    min-width: 30px;
    max-height: 40px;
  }

  .table-image {
    position: relative;
    width: 60px;
    height: 60px;
    margin: 0px 10px;
    flex-shrink: 0;

    display: flex;
    justify-content: center;
    align-items: center;

    .paly_icon {
      width: 27px;
      height: 27px;
      z-index: 1;
    }

    .table-background {
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 5px;
    }
  }

  .table-name {
    width: 40%;
    flex-shrink: 0;

    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  .table-author {
    width: 20%;
    flex-shrink: 0;

    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  .table-album {
    flex: auto;

    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  &:nth-child(2n+1) {
    background-color: #dfdfdf33;
  }

  &:hover {
    background-color: #dfdfdf64;
  }
}

.font-weak {
  color: #505050;
}

.table-item {
  padding: 0px 30px;
  box-sizing: border-box;
}

@media screen and (max-width: 600px) {
  .table-item {
    padding: 0px 10px;
  }

  .table-item .table-album {
    display: none;
  }

  .table-item .table-author {
    flex: auto;
  }
}
</style>