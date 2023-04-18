<template>
  <!-- 精品歌单推荐封面 -->
  <div class="highquality-playlist-cover" :style="'background-image: url(' + highquality?.coverImgUrl + ');'"
    v-if="highquality">
    <div class="highquality-content">
      <div class="highquality-image">
        <img v-lazy="highquality.coverImgUrl" alt="">
      </div>
      <div>
        <div class="highquality-icon">精品歌单</div>
        <div class="highquality-name">{{ highquality.name }}</div>
      </div>
    </div>

  </div>
  <div class="tags">
    <div class="catlist">全部歌单<span class="iconfont wyy-xiangyou"></span></div>
    <div class="highquality">
      <div @click="checkCat(item.name ?? '')" :class="[{ 'highquality-active': item.name == cat }]"
        v-for="(item, key) in hotTags" :key="key">
        {{ item.name }}
      </div>
    </div>
  </div>
  <div>
    <SongGridItem :list="list" />
  </div>
  <div style="height: 10px; width: 100%; background-color: aqua;"></div>
</template>

<script lang="ts" setup>
import { Ref, onMounted, ref, watch } from "vue"
import SongGridItem from '../../components/Common/SongGridItem.vue'
import api from '../../api/index'

let highquality: Ref<null | Playlist.playListDetail> = ref(null);
let list: Ref<Playlist.playList[]> = ref([]);
let hotTags: Ref<Playlist.Catlist[]> = ref([]);
let cat = ref('流行')

onMounted(() => {
  search()
})

watch(() => cat.value, (value, _oldValue) => {
  updateList()
})

function search() {
  api.playlistHot().then(res => {
    hotTags.value = res.tags ?? [];
  })


  updateList()
}

function checkCat(newCat: string) {
  cat.value = newCat
}

function updateList() {
  api.highQualityPlaylist({ cat: cat.value }).then(res => {
    highquality.value = res.playlists[0] ?? null
  })

  api.topPlaylist({ cat: cat.value }).then(res => {
    list.value = res.playlists.map(v => { return { picUrl: v.coverImgUrl, ...v, itemType: 1 } });
  })
}

</script>

<style lang="less" scoped>
.highquality-playlist-cover {
  height: 170px;
  width: 100%;
  margin: 15px 0px 10px 0px;
  display: flex;
  border-radius: 7px;
  // object-fit: cover;
  position: relative;
  overflow: hidden;
  background-position: top;
  background-size: 100% 100%;

  .highquality-content {
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: 11;
    display: flex;

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

}

// 背景毛玻璃
.highquality-playlist-cover::before {
  content: "";
  width: 120%;
  height: 120%;
  position: absolute;
  left: -10%;
  top: -10%;
  background: inherit;
  background-size: 140%;
  // background-position: center;
  background-clip: content-box;
  -webkit-filter: blur(10px);
  -moz-filter: blur(10px);
  -ms-filter: blur(10px);
  filter: blur(10px);
}


.highquality-background {
  width: 100%;
  height: 100%;
  position: absolute;
  object-fit: cover;
  border-radius: 7px;
}

.tags {
  display: flex;
  margin: 15px 0;
  justify-content: space-between;
  align-items: center;

  .catlist {
    border: 1px solid #888888;
    border-radius: 20px;
    padding: 3px 10px;
    width: 78px;

    color: #181818;
    font-size: 15px;
  }

  .highquality {
    color: #888888;
    font-size: 10px;
    max-width: 65%;
    display: flex;
    flex-wrap: wrap;

    div {
      padding: 1px 8px;
      margin: 0px 3px;
      border-radius: 20px;
    }

    .highquality-active {
      color: var(--primary-color);
      background-color: var(--primary-opacity-color);
    }
  }
}
</style>