<template>
  <!-- 精品歌单推荐封面 -->
  <div class="highquality-playlist" v-if="highquality">
    <img class="highquality-background" :src="highquality.coverImgUrl" alt="">
    <div class="highquality-playlist-cover">
      <div class="highquality-image">
        <img v-lazy="highquality.coverImgUrl" alt="">
      </div>
      <div>
        <div class="highquality-icon">精品歌单</div>
        <div class="highquality-name">{{ highquality.name }}</div>
      </div>
    </div>
  </div>
  <div>
    <SongSheets :list="[]" />
  </div>
</template>

<script lang="ts" setup>
import { Ref, onMounted, ref } from "vue"
import SongSheets from '../../components/Common/SongSheets.vue'
import api from '../../api/index'

let highquality: Ref<null | Playlist.playListDetail> = ref(null);

onMounted(() => {
  search()
})

function search() {
  api.highQualityPlaylist({ limit: 1 }).then(res => {
    highquality.value = res.playlists[0] ?? null
  })
}

</script>

<style lang="less" scoped>
.highquality-playlist {
  position: relative;

  .highquality-playlist-cover {
    height: 170px;
    width: 100%;
    // background-color: #ffffff00;
    margin: 15px 0px 10px 0px;
    display: flex;
    border-radius: 7px;
    backdrop-filter: blur(50px);

    .highquality-image {
      height: 140px;
      width: 140px;
      margin: 15px;

      img {
        width: 100%;
        height: 100%;
        border-radius: 10px;
      }
    }

    .highquality-icon {
      margin: 30px 0px 20px 0px;
      border-style: solid;
      border-color: #e5a859;
      border-width: 2px;
      border-radius: 20px;
      line-height: 28px;
      display: inline-block;
      padding: 0px 15px;
      color: #e5a859;
      font-size: 13px;
    }

    .highquality-name {
      color: #fff;
    }
  }

  .highquality-background {
    width: 100%;
    height: 100%;
    position: absolute;
    object-fit: cover;
    border-radius: 7px;
  }
}
</style>