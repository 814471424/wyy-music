<!-- 播放列表 -->
<template>
  <div id="showButton" class="right-item-data iconfont wyy-bofangliebiao" :title="title"></div>
  <!-- 要隐藏的div -->
  <div id="showDiv" :class="[{ 'dialog-enter-active': show }, { 'dialog-leave-active': !show }]">
    <div class="palylist-header">
      <div class="palylist-title">当前播放</div>
      <div class="palylist-button">
        <div class="palylist-count">共{{ list.length ?? 0 }}首</div>
        <div class="palylist-clear"><span @click="cleanAll">清空列表</span></div>
      </div>
    </div>
    <div class="palylist-content">
      <el-table :data="list" stripe
        style="width: 100%;border-top-width: 1px;border-top-style: solid;border-top-color: #e0e0e0;" size="small"
        :show-header="false" @row-click="tableDbClick">
        <el-table-column prop="name" label="音乐标题" :show-overflow-tooltip=true />
        <el-table-column label="歌手" :show-overflow-tooltip=true width="160">
          <template #default="scope">
            {{ (scope.row.ar ?? []).map((v: any) => v.name).join(' / ') }}
          </template>
        </el-table-column>
        <el-table-column prop="dt" label="时长" :show-overflow-tooltip=true width="80">
          <template #default="scope">
            {{ millisecondToTime(scope.row.dt) }}
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { usePlayListStore } from '../store/playlist'
import { storeToRefs } from 'pinia'
import { millisecondToTime } from '../utils/time'
import { playOne } from '../utils/player'

let playListStore = usePlayListStore();
let title = ref('打开播放列表')
let show = ref(false)
const { list } = storeToRefs(playListStore);

function cleanAll() {
  playListStore.removeAll()
}

function tableDbClick(value: Common.songX) {
  playOne(value);
}


onMounted(() => {
  const bt = document.getElementById('showButton');
  const div = document.getElementById('showDiv');

  bt?.addEventListener('click', function (event) {
    if (show.value) {
      title.value = '打开播放列表';
      show.value = false;
    } else {
      title.value = '关闭播放列表';
      show.value = true;
    }
    // event.stopPropagation();//阻止冒泡
  })

  document.addEventListener('click', function (event) {
    if (!document.getElementById('showButton')?.contains(event.target as HTMLElement)) {
      title.value = '打开播放列表';
      show.value = false;
    }
  });

  div?.addEventListener('click', function (event) {
    event.stopPropagation();//阻止冒泡
  })
})

</script>
<style lang="less" scoped>
#showDiv {
  top: 60px;
  height: calc(100vh - 133px);
  width: 100%;
  max-width: 420px;
  background-color: #fff;
  right: 0px;
  position: fixed;
  box-shadow: 0px -8px 20px 0px #94929252;
  z-index: 2004;
}

.right-item-data {
  height: 22px;
  width: 22px;
  margin-right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
}

.palylist-header {
  padding: 20px 20px 10px 20px;
  height: 55px;

  .palylist-title {
    font-size: 20px;
    font-weight: 800;
  }

  .palylist-button {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;

    .palylist-count {
      font-size: 10px;
      color: #cccccc;
    }

    .palylist-clear {
      font-size: 14px;

      span {
        color: #507daf;
      }
    }
  }
}

.palylist-content {
  height: calc(100% - 85px);
  overflow-y: auto;
}

.dialog-enter-active {
  transition: all 0.5s;
  transform: translateX(0px);
}

.dialog-leave-active {
  transition: all 0.5s;
  transform: translateX(100%);
}
</style>