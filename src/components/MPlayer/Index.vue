<template>
  <div class="m-player">

    <!-- 歌词面板 -->
    <el-drawer v-model="drawer" direction="btt" :modal="false" :destroy-on-close="true"
      :class="[, { cancel_transition: cancelTransition }]" title="I am the title" :with-header="false"
      :close-on-press-escape="true" :show-close="true" :z-index=2002 :height="'100vh'" modal-class="el-drawer-parent">
      <MPlayerPanel :closeDrawer="showDrawer" />
    </el-drawer>

    <!-- 播放器 -->
    <div class="player">
      <!-- 歌曲图片 -->
      <div v-if="musicUrl" class="left-item">
        <div class="bg" @click="showDrawer">
          <img v-lazy="songX?.al?.picUrl || ''" :key="songX?.al?.picUrl || ''" alt=""
            style="width: 100%; height: 100%; border-radius: 5px;">
        </div>
        <div class="left-content">
          <div> {{ songX?.name ?? "未知歌名" }}</div>
          <div class="left-content-rowup">
            <div class="content-rowup">{{ songX?.ar?.map(v => v.name).join(' / ') }}</div>
          </div>
        </div>
      </div>
      <div v-else class="left-item"></div>
      <div class="play-radio">
        <div class="play-radio-button">
          <!-- 播放规则 -->
          <div @click="changePlayRules">
            <div v-if="setting.playRule == PlayRules.listLoop" :class="['other-button', 'iconfont', 'wyy-single-loop']"
              title="列表循环">
            </div>
            <div v-else-if="setting.playRule == PlayRules.singleLoop"
              :class="['other-button', 'iconfont', 'wyy-icon-test']" title="单曲循环"></div>
            <div v-else-if="setting.playRule == PlayRules.random" :class="['other-button', 'iconfont', 'wyy-suijibofang']"
              title="随机播放">
            </div>
            <div v-else :class="['other-button', 'iconfont', 'wyy-shunxubofang1']" title="顺序循环"></div>
          </div>
          <!-- 上一首 -->
          <div class="other-button previous-button iconfont wyy-previous-fill" @click="playPrevious"></div>
          <div v-if="playStatus" @click="audioPause" class="main-button iconfont wyy-24gf-pause2">
          </div>
          <div v-else @click="audioPlay" class="main-button iconfont wyy-play"></div>
          <!-- 下一首 -->
          <div class="other-button iconfont wyy-next-fill" @click="playNext"></div>
          <div class="other-button lycs-button iconfont wyy-geci"></div>
        </div>
        <div class="play-radio-bar" style="z-index: 2005;">
          <div class="radio-time">{{ durationToTime(currentTime) }}</div>
          <Progress :max="duration" v-model="currentTime" :change="sliderChange" />
          <div class="radio-time">{{ durationToTime(duration) }}</div>
        </div>
      </div>
      <div class="right-item">
        <div class="right-icon-volume right-item-data iconfont wyy-shengyin_">
          <div class="right-volume" style="z-index: 2005;">
            <Progress v-model="volume" vertical :input="(value: number) => { mainStore.setVolume(value) }" />
            <div class="corner"></div>
          </div>
        </div>
        <div class="right-item-data iconfont wyy-lianggeren"></div>
        <MPlaylist />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue"
import { storeToRefs } from 'pinia'
import MPlayerPanel from './MPlayerPanel.vue'
import { durationToTime } from '../../utils/time'
import { playNext, playPrevious } from '../../utils/player'
import { useMainStore } from '../../store/index'
import { useSettingStore } from '../../store/setting'
import MPlaylist from '../MPlaylist.vue'
import { PlayRules } from '../../api/typings/enum'
import Progress from '../Common/Progress.vue'

const mainStore = useMainStore(); // 目前关于应该相关的store
const settingStore = useSettingStore();

const drawer = ref(false) // 控制歌词面板是否显示
const cancelTransition = ref(false) // 用于取消 el-drawer 的过度动画，全屏的时候由于过度动画显示有点问题
let viedoDuration = 0;

const { currentTime, duration, volume, playStatus, songX, musicUrl } = storeToRefs(mainStore)
const { setting } = storeToRefs(settingStore);

watch(() => drawer.value, (value, _oldValue) => {
  setTimeout(() => {
    cancelTransition.value = value
  }, 500);
})
watch(() => currentTime.value, (value, _oldValue) => {
  viedoDuration = value
})

function audioPlay() {
  mainStore.setPlayStatus(true);
}
function audioPause() {
  mainStore.setPlayStatus(false);
}
// 滑块修改时
function sliderChange(value: number) {
  mainStore.setCurrentTimeEx(value)
}

// 显示歌词面板
function showDrawer() {
  cancelTransition.value = false;
  drawer.value = !drawer.value
}

// 切换播放规则
function changePlayRules() {
  switch (setting.value.playRule) {
    case PlayRules.order:
      settingStore.setPlayRule(PlayRules.listLoop)
      break;
    case PlayRules.listLoop:
      settingStore.setPlayRule(PlayRules.singleLoop)
      break;
    case PlayRules.singleLoop:
      settingStore.setPlayRule(PlayRules.random)
      break;
    case PlayRules.random:
      settingStore.setPlayRule(PlayRules.order)
      break;
    default:
      settingStore.setPlayRule(PlayRules.listLoop)
      break;
  }
}


</script>

<style lang="less" scoped>
:deep(.el-drawer) {
  height: calc(100vh - 73px) !important;
  margin-bottom: 73px;
  border-bottom-color: #e0e0e000;
  // border-bottom-width: 1px;
  border-bottom-width: 0px;
  border-bottom-style: solid;
  padding: 0px !important;
  box-shadow: none;

  .el-drawer__body {
    padding: 0px;
  }
}

.player {
  display: flex;
  height: 100%;
  width: 100%;
  max-height: 74px;
  align-items: center;
  z-index: 2003;
  border-top-color: #e0e0e000;
  border-top-width: 1px;
  border-top-style: solid;
  justify-content: space-between;
  position: fixed;
  // position: absolute;

  .left-item {
    display: flex;
    width: 30%;
    align-items: center;

    .bg {
      background-color: #e4e4e4;
      width: 50px;
      height: 50px;
      margin: 0 10px 0px 10px;
      border-radius: 5px;
    }

    .left-content {
      width: calc(100% - 100px);

      div {
        // width: 10em;; //保证文字不会被半汉字截断,显示10个文字
        // max-width: 250px;
        overflow: hidden; // 超出长度的文字隐藏
        // text-overflow: ellipsis; // 文字隐藏以后添加省略号
        white-space: nowrap; // 强制不换行
      }
    }
  }

  .right-item {
    width: 30%;
    display: flex;
    justify-content: flex-end;

    .right-item-data {
      height: 22px;
      width: 22px;
      margin-right: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 22px;
    }
  }

  .play-radio {
    width: 430px;

    .play-radio-button {
      display: flex;
      justify-content: center;
      align-items: center;

      div {
        height: 20px;
        width: 20px;
        margin: 0px 15px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .main-button {
        background-color: #f5f5f5;
        height: 35px;
        width: 35px;
        border-radius: 20px;

        &:hover {
          background-color: #e0e0e0;
        }
      }

      .other-button:hover {
        color: #ec4141;
      }
    }

    .play-radio-bar {
      font-size: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;

      div {
        margin: 0px 3px;
      }

      .radio-time {
        margin-right: 5px;
      }
    }
  }
}


// 取消过度动画
:deep(.cancel_transition) {
  transition: none !important;
}

// 音量相关样式
.right-icon-volume:hover .right-volume {
  display: block;
}

.right-volume {
  position: fixed;
  height: 80px;
  bottom: 55px;
  border-radius: 5px;
  display: none;
  padding: 10px 3px;
  border: 1px solid #bfbfbf87;
  background-color: #fff;

  .corner {
    width: 0px;
    /*  宽高设置为0，很重要，否则达不到效果 */
    height: 0px;
    border: 6px solid #d6d5d5;
    border-bottom-color: transparent;
    /* 设置透明背景色 */
    border-left-color: transparent;
    border-right-color: transparent;
    left: 10px;
    bottom: -11px;
    position: absolute;
  }
}

:deep(.el-drawer-parent) {
  height: 100vh;
}

@media screen and (max-width: 600px) {
  .m-player {
    .player {
      .left-item {
        width: 50%;

        .left-content {
          width: calc(100% - 70px);
        }
      }

      .play-radio {
        width: 140px;

        .play-radio-button {
          .previous-button {

            display: none;
          }

          .lycs-button {
            display: none;
          }

          .main-button {
            // margin: 0px 10px;
            // padding: 0px 10px;
            box-sizing: border-box;
            margin: 0px;
          }
        }

        .play-radio-bar {
          position: absolute;
          top: -13px;
          left: 0px;
          width: 100%;

          padding: 0px 1px;
          box-sizing: border-box;
        }

        .play-radio-bar .radio-time {
          display: none;
        }
      }

      .right-item {
        width: 40px;

        .right-icon-volume {
          display: none;
        }

        .right-item-data {
          display: none;
        }
      }
    }
  }
}
</style>