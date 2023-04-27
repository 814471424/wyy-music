<template>
  <div class="common-padding">
    <div class="ranking-body">
      <div v-if="officialList.length > 0" style="font-weight: 700; margin-bottom: 20px;">官方榜</div>
      <div class="rank" v-for="(item, key) in officialList" :key="key">
        <div class="rank-background" @click="goTO(item.id)">
          <img v-lazy="item.coverImgUrl" alt="">
          <div class="update-date">{{ millisecondToDateName(item.updateTime ?? 0) }}更新</div>
          <img :src="paly_icon" class="play-icon">
        </div>
        <div class="rank-list">
          <div class="list-item" v-for="(i, index) in officialTracks[item.id]" :key="i.id">
            <div class="rank-name">{{ index + 1 }} {{ i.name }}</div>
            <div class="rank-ar">{{ (i.ar ?? []).map(v => v.name).join(' / ') }}</div>
          </div>
          <div class="list-item" @click="goTO(item.id)">查看全部 ></div>
        </div>
      </div>
      <div v-if="globalList.length > 0" style="font-weight: 700; margin-bottom: 20px;">全球榜</div>
      <SquareGridItem :list="globalList" />
      <div style="height: 20px;"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Ref, onMounted, ref, watch } from 'vue';
import api from '../../../api/index'
import SquareGridItem from '../../../components/Common/SquareGridItem.vue'
import paly_icon from '../../../assets/paly_icon.png'
import { millisecondToDateName } from '../../../utils/time'
import router from '../../../router';

import { userCacheStore } from '../../../store/cache'
import { storeToRefs } from 'pinia'

// 追加缓存
let userCache = userCacheStore();
const { cache } = storeToRefs(userCache);

// 官方榜
let officialList: Ref<Playlist.playListDetail[]> = ref(cache.value.rankingOfficialList ?? []);
let officialTracks: Ref<{ [key: number]: Playlist.dailySong[] }> = ref(cache.value.rankingOfficialTracks ?? {});
// 全球榜
let globalList: Ref<Array<Playlist.playListDetail & { type: number, picUrl: string }>> = ref(cache.value.rankingGlobalList ?? []);

watch(() => officialList.value, (value) => {
  userCache.setRankingOfficialList(value)
})
watch(() => officialTracks.value, (value) => {
  userCache.setRankingOfficialTracks(value)
})
watch(() => globalList.value, (value) => {
  userCache.setRankingGlobalList(value)
})

onMounted(() => {
  if (
    officialList.value.length == 0
    || JSON.stringify(officialTracks.value) == '{}'
    || globalList.value.length == 0
  ) {
    api.toplist().then(res => {
      officialList.value = res.list.filter(v => v.ToplistType);
      globalList.value = res.list.filter(v => !v.ToplistType).map(v => { return { ...v, picUrl: v.coverImgUrl, type: 1 } })

      // 查找榜单中的歌单前五首
      for (let i of officialList.value) {
        api.getPlaylistDetail({ id: i.id }).then(res => {
          officialTracks.value = { ...officialTracks.value, [i.id]: (res.playlist.tracks ?? []).splice(0, 5) }
        })
      }
    })
  }
})

function goTO(id: number) {
  router.push('/playlist/' + id)
}
</script>

<style lang="less" scoped>
.common-padding {
  height: 100%;
  overflow-y: overlay;
  display: flex;
  width: 100%;
  justify-content: center;
  padding-top: 20px;
}

.ranking-body {
  max-width: 1110px;
  width: 100%;
}

.rank {
  margin: 10px 0px;
  display: flex;

  .rank-background {
    width: 170px;
    height: 170px;
    margin-right: 20px;
    position: relative;
    flex-shrink: 0;

    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 100%;
      object-fit: cover;
      border-radius: 5px;
    }

    .update-date {
      position: absolute;
      top: 63%;
      color: #fff;
      font-size: 10px;

      width: 100%;
      text-align: center;
    }

    .play-icon {
      position: absolute;
      width: 45px;
      height: 45px;
      display: none;
    }

    &:hover {
      .play-icon {
        display: block;
      }
    }
  }

  .rank-list {
    flex: auto;
    width: 0;

    div {
      line-height: 32px;
      font-size: 13px;
    }

    .list-item {
      display: flex;
      justify-content: space-between;
      padding: 0px 10px;

      &:nth-child(2n+1) {
        background-color: #dfdfdf33;
      }

      &:hover {
        background-color: #dfdfdf64;
      }
    }

    .rank-name {
      width: 50%;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }

    .rank-ar {
      // 标题最多两行
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
  }
}

@media screen and (max-width:600px) {
  .rank {
    .rank-list {
      .rank-name {
        width: auto;
      }

      .rank-ar {
        display: none;
      }
    }
  }
}
</style>