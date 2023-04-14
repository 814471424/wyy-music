<!-- 歌单等列表 -->
<template>
  <div class="song-list">
    <div class='image-wrapper' v-for="i in 10">
      <img class="background"
        src='https://images.pexels.com/photos/4587991/pexels-photo-4587991.jpeg?cs=srgb&dl=pexels-anna-shvets-4587991.jpg&fm=jpg'>
      <img class="playIcon" :src="paly_icon" alt="">
      <div class="playCount"><span class="iconfont wyy-bofangliang"></span> {{ handlePlayCount(10000) }}</div>
      <div class="title">
        <div>歌单标题</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import paly_icon from '../../assets/paly_icon.png'
import { handlePlayCount } from '../../utils/handle'

let props = defineProps<{
  list: Playlist.playList[]
}>()

</script>

<style lang="less" scoped>
.song-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  .image-wrapper {
    margin-bottom: 20px;
    margin: 20px 10px;
    width: calc(100% / 4 - 20px);
    padding-top: 20%;
    position: relative;

    .playCount {
      position: absolute;
      top: 3px;
      right: 5px;
      font-size: 10px;
      color: #fff;

      span {
        font-size: 10px;
      }
    }

    .title {
      position: absolute;

    }

    .playIcon {
      bottom: 7px;
      right: 7px;
      width: 42px;
      position: absolute;
      display: none;
    }

    &:hover {
      .playIcon {
        display: block;
      }
    }
  }



  @media screen and (min-width: 1200px) and (max-width: 1500px) {
    .image-wrapper {
      width: calc(100% / 5 - 20px);
      padding-top: 16%;
      position: relative;
    }
  }

  @media screen and (min-width:1500px) {
    .image-wrapper {
      width: calc(100% / 6 - 20px);
      padding-top: 15%;
      position: relative;
    }
  }

  .background {
    position: absolute;
    height: 100%;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
    object-fit: cover;
    width: 100%;
    border-radius: 5px;
  }
}
</style>