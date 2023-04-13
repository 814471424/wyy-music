<!-- 每日歌曲推荐 -->
<template>
  <div class="daily" style="">
    <div style="position: relative; width: 100px; height: 100px;">
      <div class=" daily-icon iconfont wyy-a-ziyuan16-copy-copy">
      </div>
      <div class="daily-text">{{ date }}</div>
    </div>

    <div style="margin-left: 20px;">
      <div style="font-size: 23px; font-weight: 600;">每日歌曲推荐</div>
      <div style="font-size: 5px; font-weight: 200;">根据你的音乐口味生成, 每天6:00更新</div>
    </div>
  </div>
  <div>
    <el-button-group class="daily-button-bofang">
      <el-button class="iconfont wyy-caret-right button-left">
        播放全部
      </el-button>
      <el-button class="iconfont wyy-tianjia button-right" @click="playAll" />
    </el-button-group>
  </div>

  <div>
    <el-table class="daily-table" :data="dailySongs" @row-dblclick="tableDbClick" stripe style="width: 100%" size="small">
      <el-table-column type="index" width="50" />
      <el-table-column prop="name" label="音乐标题" :show-overflow-tooltip=true />
      <el-table-column label="歌手" :show-overflow-tooltip=true width="160">
        <template #default="scope">
          {{ scope.row.ar.map((v: any) => v.name).join(' / ') }}
        </template>
      </el-table-column>
      <el-table-column label="专辑" :show-overflow-tooltip=true width="180">
        <template #default="scope">
          {{ scope.row.al.name }}
        </template>
      </el-table-column>
      <el-table-column prop="dt" label="时长" :show-overflow-tooltip=true width="80">
        <template #default="scope">
          {{ millisecondToTime(scope.row.dt ?? 0) }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue"
import api from '../api/index'
import { millisecondToTime } from '../utils/time'
import { usePlayListStore } from '../store/playlist'
import { playOne } from '../utils/player'

let playListStore = usePlayListStore();
let dailySongs = ref([] as Playlist.dailySong[]);
let date = new Date().getDate()

function tableDbClick(row: Playlist.dailySong) {
  playOne({ ...row, songType: 'daily_song' })
  // playListStore.removeOne(row.id);
}

// 全部添加到播放列表
function playAll() {
  let list = dailySongs.value.map(v => {
    return { ...v, songType: 'daily_song' }
  }) as Common.songX[];

  playListStore.replaceAll(list);
}

onMounted(() => {
  api.recommendSongs().then((res) => {
    if (res.code == 200) {
      dailySongs.value = res.data.dailySongs
    }
  })
});

</script>

<style lang="less" scoped>
.daily {
  display: flex;
  padding: 20px 20px 0px 20px;
  align-items: center;

  .daily-icon {
    font-size: 85px;
    color: #ec4141;
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .daily-text {
    font-size: 40px;
    top: 5px;
    width: 100%;
    height: 100%;
    color: #ec4141;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 900;
  }
}

.daily-table {
  border-top-width: 1px;
  border-top-style: solid;
  border-top-color: #e0e0e0;
}

.daily-button-bofang {
  margin: 10px 30px;
  border-radius: 10px;

  .el-button {
    // background-color: rgb(236 65 65);
    padding: 8px 10px;
  }

  .button-left {
    border-radius: 20px 0 0 20px;
  }

  .button-right {
    border-radius: 0 20px 20px 0;
  }
}
</style>