<template>
  <div class="m-player">

    <!-- 歌词面板 -->
    <el-drawer v-model="drawer" direction="btt" :modal="false" :class="[{ cancel_transition: cancelTransition }]"
      title="I am the title" :with-header="false" :close-on-press-escape="true" :show-close="true" :z-index=2002>
      <MPlayerPanel />
    </el-drawer>

    <!-- 播放器 -->
    <div class="player">
      <!-- 歌曲图片 -->
      <div class="left-item">
        <div class="bg" @click="showDrawer">
        </div>
        <div class="left-content">
          <div>歌曲</div>
          <div class="left-content-rowup">
            <div class="content-rowup">发黄发暗放假啊法律大厦大厦的干撒第四就此展开打死了都是辣的</div>
          </div>
        </div>
      </div>
      <div class="play-radio">
        <div class="play-radio-button">
          <div :class="['other-button', 'iconfont', 'wyy-shunxubofang1']"></div>
          <div class="other-button iconfont wyy-previous-fill"></div>
          <div v-if="playStatus" @click="audioPause" class="main-button iconfont wyy-24gf-pause2">
          </div>
          <div v-else @click="audioPlay" class="main-button iconfont wyy-play"></div>
          <div class="other-button iconfont wyy-next-fill"></div>
          <div class="other-button iconfont wyy-geci"></div>
        </div>
        <div class="play-radio-bar">
          <div style="margin-right: 5px;">{{ durationToTime(currentTime) }}</div>
          <el-slider v-model="currentTime" size="small" height="120" :show-tooltip=false :max="duration"
            @input="sliderChange" />
          <div style="margin-left: 5px;">{{ durationToTime(duration) }}</div>
        </div>
      </div>
      <div class="right-item">
        <div class="right-icon-volume right-item-data iconfont wyy-shengyin_">
          <div class="right-volume">
            <el-slider v-model="volume" vertical height="80px" @input="sliderVolumeChange" :show-tooltip=false />
            <div class="corner"></div>
          </div>
        </div>
        <div class="right-item-data iconfont wyy-lianggeren"></div>
        <Playlist />
      </div>
      <audio id="mp3Btn" ref="audioELe" :src="url" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref, watch } from "vue"
import MPlayerPanel from './MPlayerPanel.vue'
import { durationToTime } from '../../utils/time'
import { useMainStore } from '../../store/index'
import Playlist from '../Playlist.vue'

let audioELe = <HTMLAudioElement | null>(null);  // audio 元素
const mainStore = useMainStore(); // 目前关于应该相关的store

const drawer = ref(false) // 控制歌词面板是否显示
const cancelTransition = ref(false) // 用于取消 el-drawer 的过度动画，全屏的时候由于过度动画显示有点问题
const audioIsPlaying = ref(false);  // 用于同步当前的播放状态

const url = computed(() => mainStore.musicUrl) // 播放资源
const songX = computed(() => mainStore.songX) // 歌词面板信息
const lycs = computed(() => mainStore.lycs); // 歌词面板信息
const currentTime = ref(0); // 歌曲当前播放时间
const duration = ref(0);  // 歌曲总时间
const volume = ref(0)
const playStatus = computed(() => mainStore.playStatus) // 是否播放

watch(() => drawer.value, (value, _oldValue) => {
  setTimeout(() => {
    cancelTransition.value = value
  }, 500);
})
// 监听播放状态
watch(() => playStatus.value, async (value, _oldValue) => {
  if (value) {
    await audioELe?.play().catch((_e) => {
      mainStore.setPlayStatus(false);
    })
    return
  }

  audioELe?.pause()
})

onMounted(async () => {
  // 页面加载完的时候获取audioel
  audioELe = document.querySelector("#mp3Btn");
  // 设置自动播放
  audioELe?.setAttribute("autoplay", "autoplay");
  // 可以播放的时候获取音频总时长
  audioELe?.addEventListener("canplay", function () {
    duration.value = audioELe?.duration ?? 0;
  });
  // 获取播放音量
  volume.value = (audioELe ? audioELe.volume : 0) * 100;

  // 各种对audio的监听事件
  // 更新
  audioELe!.ontimeupdate = () => {
    currentTime.value = audioELe ? audioELe.currentTime : 0
  };
  audioELe!.onplay = () => {
    mainStore.setPlayStatus(true);
  }
  audioELe!.onpause = () => {
    mainStore.setPlayStatus(false);
  }
  audioELe!.onended = () => {
    console.log("播放结束")
  }
})

onUnmounted(() => {
  audioELe = null
})

function audioPlay() {
  audioELe?.play().catch((_e) => {
    audioELe?.pause()
  })
}
function audioPause() {
  audioELe?.pause()
}
// 滑块修改时
function sliderChange(value: number) {
  if (!isNaN(value)) {
    audioELe!.currentTime = value
  } else {
    currentTime.value = 0
  }
}
// 滑块修改时
function sliderVolumeChange(value: number) {
  console.log(value);
  if (!isNaN(value)) {
    audioELe!.volume = value / 100
  }
}

// 显示歌词面板
function showDrawer() {
  cancelTransition.value = false;
  drawer.value = !drawer.value
}

</script>

<style lang="less" scoped>
:deep(.el-drawer) {
  height: calc(100vh - 74px) !important;
  margin-bottom: 74px;
  border-bottom-color: #e0e0e000;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  padding: 0px !important;

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
  position: fixed;
  background-color: #fff;
  border-top-color: #e0e0e000;
  border-top-width: 1px;
  border-top-style: solid;
  justify-content: space-between;

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
      }

      .main-button:hover {
        background-color: #e0e0e0;
      }

      .other-button:hover {
        color: #ec4141;
      }
    }

    .play-radio-bar {
      font-size: 5px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      div {
        margin: 0px 3px;
      }
    }
  }
}


// 取消过度动画
:deep(.cancel_transition) {
  transition: none !important;
}

.play-radio-bar {

  // 滑块
  :deep(.el-slider__runway) {
    height: 3px;
    background-color: #cecece;
  }

  :deep(.el-slider__bar) {
    height: 3px;
    background-color: #ec4141;
  }

  :deep(.el-slider__button) {
    height: 11px;
    width: 11px;
    border: solid 2px #ec4141;
  }

  :deep(.el-slider__button-wrapper) {
    height: 32px;
  }

  :deep(.el-slider) {
    width: 350px;
  }
}

// 音量相关样式
.right-icon-volume:hover .right-volume {
  display: block;
}

.right-volume {
  position: fixed;
  width: 30px;
  height: 105px;
  bottom: 45px;
  border-radius: 5px;
  display: none;
  padding: 0px 10px 10px 10px;

  .el-slider {
    left: -3px;
    border: 1px solid #bfbfbf87;
    background-color: #ffffff;
    border-radius: 5px;
  }

  :deep(.el-slider__button) {
    height: 10px;
    width: 10px;
    border: solid 2px #ec4141;
    position: absolute;
    left: 13px;
    top: 13px;
    background-color: #ec4141;
  }

  // 滑块
  :deep(.el-slider__runway) {
    width: 4px;
    background-color: #cecece;
  }

  :deep(.el-slider__bar) {
    width: 4px;
    background-color: #ec4141;
  }

  .corner {
    width: 0px;
    /*  宽高设置为0，很重要，否则达不到效果 */
    height: 0px;
    border: 6px solid #d6d5d5;
    border-bottom-color: transparent;
    /* 设置透明背景色 */
    border-left-color: transparent;
    border-right-color: transparent;
    left: 20px;
    position: absolute;
  }
}

// 歌曲信息滚动 todo!()
// .left-content-rowup {
//   width: 100%;
//   display: inline-block;
//   vertical-align: top;
//   overflow: hidden;
//   white-space: nowrap;

//   .content-rowup {
//     animation: scroll linear 4s alternate infinite;
//     position: relative;
//   }
// }

// @keyframes scroll {
//   0% {
//     margin-left: 0;
//     transform: translateX(0);
//   }

//   10% {
//     margin-left: 0;
//     transform: translateX(0);
//   }

//   90% {
//     margin-left: 100%;
//     transform: translateX(-100%);
//   }

//   100% {
//     margin-left: 100%;
//     transform: translateX(-100%);
//   }
// }
</style>