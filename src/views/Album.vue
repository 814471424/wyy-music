<template>
  <div class="common-padding" style="width: 100%; height: 100%; box-sizing: border-box;">
    <div class="playlist">
      <div class="playlist-cover">
        <img v-lazy="albumDetail?.picUrl" alt="" :key="albumDetail?.picUrl">
      </div>
      <div class="playlist-info">
        <div>
          <div class="playlist-title">{{ albumDetail?.name ?? '未知' }}</div>
        </div>
        <!-- <div>按钮</div> -->
        <div class="playlist-info-detail">
          <div class="playlist-description">歌手 : <span style="color: #507daf">{{ albumDetail?.artist.name ?? "未知"
          }}</span></div>
          <div class="playlist-description">时间 : <span>{{ millisecondToDate(albumDetail?.publishTime ?? 0) }}</span></div>
        </div>
      </div>
    </div>
    <div>
      <el-table class="daily-table" :data="tracks" @row-dblclick="tableDbClick" stripe style="width: 100%" size="small">
        <el-table-column type="index" width="50" />
        <el-table-column prop="name" label="音乐标题" :show-overflow-tooltip=true />
        <el-table-column label="歌手" :show-overflow-tooltip=true>
          <template #default="scope">
            {{ scope.row.ar.map((v: any) => v.name).join(' / ') }}
          </template>
        </el-table-column>
        <el-table-column label="专辑" :show-overflow-tooltip=true>
          <template #default="scope">
            {{ scope.row.al.name }}
          </template>
        </el-table-column>
        <el-table-column prop="dt" label="时长" :show-overflow-tooltip=true>
          <template #default="scope">
            {{ millisecondToTime(scope.row.dt) }}
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Ref, onMounted, ref, watch } from "vue"
import router from '../router/index'
import api from "../api";
import { millisecondToTime, millisecondToDate } from '../utils/time'
import { playOne } from "../utils/player";

// 获取路由参数
let id = (router.currentRoute.value.params['id'] as string) ?? '';
let tracks = ref([] as Playlist.dailySong[]);
let albumDetail: Ref<null | Search.album> = ref(null);

watch(() => router.currentRoute.value.params, async (value, _oldValue) => {
  id = value['id'] as string
  await getPlaylistDetail()
})

onMounted(async () => {
  await getPlaylistDetail()
})

function tableDbClick(row: Playlist.dailySong) {
  playOne({ ...row, songType: 'playlist' })
}

async function getPlaylistDetail() {
  tracks.value = [];
  let trackIds = [] as number[];
  // 获取歌单详情
  let res = await api.getAlbum(id)
  if (res.code == 200) {
    // 获取所有歌曲的
    albumDetail.value = res.album
    trackIds = res.songs.map(v => v.id)
  }

  // 获取所有的歌曲信息
  let newArr = [] as number[][];
  for (let i = 0; i < trackIds.length;) {
    newArr.push(trackIds.slice(i, i += 300));
  }
  for (let i of newArr) {
    let res = await api.getTrackDetail(i.join(','));
    if (res.code == 200) {
      tracks.value = [...tracks.value, ...res.songs ?? []]
    }
  }
}
</script>

<style lang="less" scoped>
.playlist {
  display: flex;
  height: 180px;
  margin-top: 20px;
  margin-bottom: 40px;

  .playlist-cover {
    width: 180px;

    img {
      width: 100%;
      border-radius: 7px;
    }
  }

  .playlist-info {
    max-width: 540px;
    margin: 0px 20px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;

    .playlist-title {
      font-size: 22px;
      font-weight: 700;
    }

    .playlist-creator {
      font-size: 12px;
      margin-top: 10px;
      height: 25px;
      display: flex;
      align-items: center;
      color: #666666;

      img {
        height: 100%;
        border-radius: 50%;
      }
    }

    .playlist-info-detail {
      font-size: 13px;
      color: #666666;

      .playlist-description {
        overflow: hidden;
        /*出现省略号*/
        text-overflow: ellipsis;
        /*是在第几行*/
        -webkit-line-clamp: 2;
        display: -webkit-box;
        -webkit-box-orient: vertical;
      }
    }
  }
}
</style>