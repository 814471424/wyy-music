<template>
  <div class="common-padding">
    <div class="artist">
      <div class="artist-cover">
        <img v-lazy="artist?.avatar" alt="">
      </div>
      <div class="artist-info">
        <div class="name">{{ artist?.name }}</div>
        <div class="alias">{{ artist?.alias.join('; ') }}</div>
        <div class="artist-number">
          单曲数: {{ artist?.musicSize }} 专辑数: {{ artist?.albumSize }} MV数: {{ artist?.mvSize }}
        </div>
      </div>
    </div>
    <div class="artist-tabs">
      <div :class="{ 'tab-active': activeName == 'album' }" @click="activeName = 'album'">
        专辑
      </div>
      <div :class="{ 'tab-active': activeName == 'mv' }" @click="activeName = 'mv'">
        MV
      </div>
      <div :class="{ 'tab-active': activeName == 'detail' }" @click="activeName = 'detail'">
        歌手详情
      </div>
      <div :class="{ 'tab-active': activeName == 'simiArtist' }" @click="activeName = 'simiArtist'">
        相似歌手
      </div>
    </div>
    <div class="artist-body">
      <div class="artist-albums" v-show="activeName == 'album'">
        <SquareGridItem :list="hotAlbums" :play-icon="true" />
      </div>
      <div class="artist-detail" v-show="activeName == 'detail'">
        <div class="title">{{ artist?.name }}简介</div>
        <div class="desc"> {{ artistDesc?.briefDesc || artist?.briefDesc }}</div>
        <div v-for="(item, key) in artistDesc?.introduction" :key="key">
          <div class="title">{{ item.ti }}简介</div>
          <div class="desc" v-for="i in item.txt.split('\n')"> {{ i }}</div>
        </div>
      </div>
      <div class="artist-simi" v-show="activeName == 'simiArtist'">
        <SquareGridItem :list="artistList" />
      </div>
    </div>
  </div>
</template>
  
<script lang="ts" setup>
import { onMounted, watch, ref, Ref } from 'vue';
import router from '../../router/index'
import api from '../../api/index'
import SquareGridItem from '../../components/Common/SquareGridItem.vue'

let id = ref(router.currentRoute.value.params['id'] as unknown as number)
let artist: Ref<Common.artistDetail | null> = ref(null);
let activeName = ref('album');
// 歌手详情
let artistDesc: Ref<Common.artistDesc | null> = ref(null);
// 相似歌手
let artistList: Ref<Array<Search.artist & { type: number }>> = ref([]);
// 热门专辑
let hotAlbums: Ref<Array<Search.album & { type: number }>> = ref([])


watch(() => id.value, (value, _oldValue) => {
  console.log(value)
})

watch(() => activeName.value, () => {
  console.log(activeName.value)
  updateDetail()
})

onMounted(() => {
  api.artistDetail(id.value).then(res => {
    artist.value = res.data.artist

    updateDetail()
  })
})

function updateDetail() {
  switch (activeName.value) {
    case 'album':
      if (hotAlbums.value.length == 0) {
        api.artistAlbum(id.value, { limit: 100 }).then(res => {
          hotAlbums.value = res.hotAlbums.map(v => { return { ...v, type: 4 } })
        })
      }
      break;
    case 'mv':
      break;
    case 'detail':
      if (!artistDesc.value) {
        api.artistDesc(id.value).then(res => {
          artistDesc.value = res
        })
      }
      break;
    case 'simiArtist':
      if (artistList.value.length == 0) {
        api.simiArtist(id.value).then(res => {
          artistList.value = res.artists.map(v => { return { ...v, type: 0 } })
        })
      }
      break;
    default:
      break;
  }
}

</script>
  
<style lang="less" scoped>
.common-padding {
  margin-top: 20px;
}


.artist {
  display: flex;
}

.artist-cover {
  width: 30%;
  min-width: 100px;
  max-width: 180px;
  flex-shrink: 0;
  margin-right: 20px;

  img {
    width: 100%;
    border-radius: 7px;
  }
}

.artist-info {
  div {
    padding-bottom: 10px;
  }

  .name {
    font-size: 20px;
    font-weight: 600;
  }

  .alias {
    font-size: 0.85rem;
    color: rgb(67, 67, 67);
  }

  .artist-number {
    font-size: 0.85rem;
    color: rgb(67, 67, 67);
  }
}

.artist-tabs {
  display: -webkit-box;
  overflow-x: scroll;
  overflow-y: hidden;
  padding-top: 30px;
  padding-bottom: 20px;

  div {
    margin-right: 20px;
    border-bottom-color: rgba(255, 255, 255, 0);
    border-bottom-width: 3px;
    border-bottom-style: solid;
  }

  .tab-active {
    font-weight: 800;
    font-size: 1.1rem;
    border-bottom-color: var(--primary-color) !important;
  }

  &::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
}

.artist-detail {
  .title {
    font-weight: 800;
  }

  .desc {
    text-indent: 2em;
    line-height: 30px;
    font-size: 0.9rem;
    font-weight: 320;
    margin: 10px 0px;
  }
}
</style>