<template>
  <div class="m-player-panel">
    <p class="bgi">
      <img :src="songX?.al?.picUrl" />
    </p>
    <!-- 头部 -->
    <div class="m-player-panel-header" data-tauri-drag-region="true">
      <div @click="props.closeDrawer()"><span class="iconfont wyy-xiangxia-a" style="margin-left: 35px;"></span></div>
      <div></div>
      <div class="m-player-panel-header-system">
        <div title="设置" class="iconfont wyy-xitongguanli"></div>
        <div title="消息" class="iconfont wyy-youjian_o"></div>
        <div v-if="tauriResult" class="div-no-select">丨</div>
        <div v-if="tauriResult" title="mini模式" class="iconfont wyy-mini"> </div>
        <div v-if="tauriResult" title="最小化" class="iconfont wyy-suoxiao" @click="minimizeMain()"></div>
        <div v-if="tauriResult && !isMinimize" title="最大化" class="iconfont wyy-CZ_029" @click="maximizeMain()"></div>
        <div v-if="tauriResult && isMinimize" title="向下还原" class="iconfont wyy-huanyuan" @click="unmaximizeMain()"></div>
        <div v-if="tauriResult" title="关闭" class="iconfont wyy-guanbi" @click="closeMain()"></div>
      </div>
    </div>

    <!-- 播放面板 -->
    <div class="panel-main">
      <!-- 封面跟歌词部分 -->
      <div class="panel-main-one">
        <!-- 唱片部分 -->
        <div class="record-black" v-show="showStatus" @click="showStatus = !showStatus">
          <div class="record-black-title">
            <div class="panel-main-title">{{ songX?.name }}</div>
            <div class="panel-main-info">
              <div>歌手: {{ (songX?.ar ?? []).map(res => res.name).join(' / ') ?? '未知' }}</div>
              <div>专辑: {{ songX?.al?.name ?? '未知' }}</div>
              <!-- <div>来源: {{ songX?.songType ?? '未知' }}</div> -->
            </div>
          </div>
          <div style="width: 100%;height: 130px;text-align: center;z-index: 1; position: relative"
            :class="[{ 'pause-needle': playStatus == false, 'resume-needle': playStatus == true }]">
            <img :class="['play-needle-img']" :src="play_needle" />
          </div>
          <div :class="['record-in', 'xuanzhuan']" ref="cd">
            <div class="lines">
              <img
                v-lazy="songX?.al?.picUrl || 'https://ts1.cn.mm.bing.net/th/id/R-C.987f582c510be58755c4933cda68d525?rik=C0D21hJDYvXosw&riu=http%3a%2f%2fimg.pconline.com.cn%2fimages%2fupload%2fupc%2ftx%2fwallpaper%2f1305%2f16%2fc4%2f20990657_1368686545122.jpg&ehk=netN2qzcCVS4ALUQfDOwxAwFcy41oxC%2b0xTFvOYy5ds%3d&risl=&pid=ImgRaw&r=0'"
                :key="songX?.al?.picUrl" class="cd" />
            </div>
          </div>
        </div>
        <div class="panel-main-lycs" v-show="!showStatus" @click="showStatus = !showStatus">
          <div>
            <div class="panel-main-title">{{ songX?.name }}</div>
            <div class="panel-main-info">
              <div>歌手: {{ (songX?.ar ?? []).map(res => res.name).join(' / ') ?? '未知' }}</div>
              <div>专辑: {{ songX?.al?.name ?? '未知' }}</div>
              <div>来源: {{ songX?.songType ?? '未知' }}</div>
            </div>
          </div>
          <!-- 歌词部分 -->
          <div class="main-lycs">
            <Lyrics :lyric="lyc" :tlyric="tlyric" :romalrc="romalrc" :current-time="currentTime" :lycs-type="lycsType"
              :yrc="yrc" />
            <div class="lycs-type">
              <div :class="['lycs-type-button', { 'active-type': lycsType == lycsTypeEnum.sound }]"
                @click="changeLycsType(lycsTypeEnum.sound)">
                音</div>
              <div style="border-top: 1px solid #dadada;"></div>
              <div :class="['lycs-type-button', { 'active-type': lycsType == lycsTypeEnum.translate }]"
                @click="changeLycsType(lycsTypeEnum.translate)">译</div>
              <div style="border-top: 1px solid #dadada;"></div>
              <div :class="['lycs-type-button', { 'active-type': lycsType == lycsTypeEnum.all }]"
                @click="changeLycsType(lycsTypeEnum.all)">全
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 评论及推荐歌单啥的 -->
      <div class="panel-main-two" style="display: none;">
        <div class="panel-main-comment">
          <span>全部评论</span>
        </div>
        <div class="panel-three">
          <div>
            <span>包含这首页的歌单</span>
            <div></div>
          </div>
          <div>
            <span>该歌手的播客</span>
            <div></div>
          </div>
          <div>
            <span>喜欢这首歌的人也听</span>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { UnlistenFn } from "@tauri-apps/api/event";
import { WebviewWindow, appWindow, } from "@tauri-apps/api/window";
import { ref, onMounted, onUnmounted, watch, Ref } from "vue"
import Windows from "../../windows/Windows";
import { useMainStore } from '../../store/index'
import { storeToRefs } from 'pinia'
import play_needle from '../../assets/play_needle.png'
import Lyrics from '../Common/Lyrics/index.vue'
import { lycsTypeEnum } from '../../components/Common/Lyrics/types'

const mainStore = useMainStore();
let isMinimize = ref(false);
let unlisten: UnlistenFn;
// 音乐播放状态
let { playStatus, lyc, currentTime, songX, tlyric, romalrc, yrc } = storeToRefs(mainStore);
let lycsType = ref(lycsTypeEnum.null)
let cd: Ref<HTMLElement | null> = ref(null);
let showStatus = ref(true); // 歌词或者唱片切换状态
// 判断是否在tauri环境中
const tauriResult = (window as any).__TAURI__ != undefined;

const props = defineProps({
  // 点击选择其他登录模式时的事件
  closeDrawer: {
    type: Function,
    default: function (): void {
      return undefined;
    }
  },
});
watch(() => playStatus.value, (value, _oldValue) => {
  if (cd.value) {
    if (!playStatus.value) {
      cd.value.style.animationPlayState = 'paused'
    } else {
      cd.value.style.animationPlayState = 'running '
    }
  }
})

onMounted(async () => {
  // 监听窗口大小是否变化
  if ((window as any).__TAURI__ != undefined) {
    unlisten = await appWindow.onResized(({ payload: size }) => {
      WebviewWindow.getByLabel('main')?.isMaximized().then((res) => {
        isMinimize.value = res
      })
    });
  }

  // 唱片旋转状态
  if (cd.value) {
    if (!playStatus.value) {
      cd.value.style.animationPlayState = 'paused'
    } else {
      cd.value.style.animationPlayState = 'running '
    }
  }
})

onUnmounted(() => {
  unlisten ? unlisten() : null
})

// 关闭窗口
function closeMain() {
  Windows.closeMainWin()
}

// 最大化窗口
function maximizeMain() {
  Windows.maximizeMainWin().then(() => {
    isMinimize.value = true;
  })
}

// 取消最大化
function unmaximizeMain() {
  Windows.unmaximizeMainWin().then(() => {
    isMinimize.value = false;
  })
}

// 最小化窗口
function minimizeMain() {
  Windows.minimizeMainWin()
}

// 修改歌词显示类型
function changeLycsType(value: lycsTypeEnum) {
  if (lycsType.value == value) {
    lycsType.value = lycsTypeEnum.null
  } else {
    lycsType.value = value
  }
}

</script>

<style lang="less" scoped>
.m-player-panel {
  width: 100%;
  height: 100%;
  // background: linear-gradient(to bottom, #dfd8d3, #ffffff);
  // background: -webkit-linear-gradient(272deg, rgb(167 167 167), rgb(122 122 122 / 95%), rgba(255,255,255,1)),url(https://p2.music.126.net/T01LxKNXKebyWE0GBPzyeA==/109951167953959333.jpg);
  color: #85817f;
  overflow-y: hidden;
  background-size: 100%;

  .m-player-panel-header {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    top: 0;
    // background-color: #e3dcd8;
    z-index: 2;

    .m-player-panel-header-system {
      display: flex;
      align-items: center;
      margin-right: 20px;

      div {
        margin-left: 15px;
      }

      .div-no-select {
        -webkit-user-select: none;
        /* 禁止 DIV 中的文本被鼠标选中 */
        -moz-user-select: none;
        /* 禁止 DIV 中的文本被鼠标选中 */
        -ms-user-select: none;
        /* 禁止 DIV 中的文本被鼠标选中 */
        user-select: none;
        /* 禁止 DIV 中的文本被鼠标选中 */
      }
    }
  }

  .panel-main {
    height: calc(100vh - 134px);
    top: 60px;
    position: relative;
    overflow-y: hidden;

    &:hover {
      overflow-y: overlay;
    }

    .panel-main-one {
      display: flex;
      justify-content: center;

      .record-black {
        width: 430px;
        height: 490px;
        text-align: center;

        // 唱片上的
        .play-needle-img {
          width: 100px;
          height: 157px;
          top: 43px;
          position: relative;
          left: 24px;
        }

        // 唱片
        .record-in {
          width: 300px;
          height: 300px;
          background-color: rgb(0, 0, 0);
          border-radius: 50%;
          border-style: solid;
          border-width: 15px;
          text-align: center;
          display: -webkit-inline-box;

          .lines {
            width: 280px;
            height: 280px;
            position: relative;
            top: 10px;
            left: 10px;
            border-radius: 50%;
            background: repeating-radial-gradient(black, #000 5px, #1e1e1e 7px);

            .cd {
              width: 210px;
              height: 210px;
              border-radius: 50%;
              background-color: #dfd8d3;
              position: relative;
              top: 35px;
              left: 0px;
            }
          }
        }

        // 唱片上的标题
        .record-black-title {
          .panel-main-title {
            font-size: 23px;
            margin: 5px 0px;
            color: #000;
          }

          .panel-main-info {
            font-size: 13px;
            display: flex;
            flex-direction: column;

            div {
              overflow: hidden; // 超出长度的文字隐藏
              text-overflow: ellipsis; // 文字隐藏以后添加省略号
              white-space: nowrap; // 强制不换行
              margin-right: 15px;
            }
          }
        }
      }

      .panel-main-lycs {
        width: 380px;
        height: 490px;
        margin-left: 40px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: relative;

        // 歌词部分
        .main-lycs {
          height: 360px;

          // 歌词翻译选项部分
          .lycs-type {
            display: none;
            position: absolute;
            bottom: 0px;
            right: -25px;
            font-size: 10px;
            color: #858585;
            padding-left: 25px;
            padding-right: 10px;

            .lycs-type-button {
              padding: 1px;
              background-color: #e9e9e9;

              &:hover {
                color: #161616;
              }
            }

            .active-type {
              color: #161616;
            }
          }

          &:hover {
            .lycs-type {
              display: block;
            }
          }
        }

        .panel-main-title {
          font-size: 23px;
          margin: 5px 0px;
          color: #000;
        }

        .panel-main-info {
          display: flex;
          font-size: 13px;

          div {
            width: 30%;
            overflow: hidden; // 超出长度的文字隐藏
            text-overflow: ellipsis; // 文字隐藏以后添加省略号
            white-space: nowrap; // 强制不换行
            margin-right: 15px;
          }
        }
      }
    }

    .panel-main-two {
      display: flex;
      justify-content: center;
      padding-top: 20px;

      .panel-main-comment {
        width: 620px;
        background-color: bisque;
      }

      .panel-three {
        width: 280px;
        background-color: aquamarine;
      }
    }
  }
}

// 背景颜色
.bgi {
  width: 100%;
  height: 100px;
  position: fixed;
  filter: blur(108px);
  -moz-filter: blur(108px);
  background-color: white;
  // z-index: -1;
  transition: all 1s;
}

.bgi img {
  position: absolute;
  left: -50%;
  width: 200%;
  height: 100%;
}

// 旋转图片特效
.xuanzhuan {
  -webkit-animation: play 25s linear infinite;
  -moz-animation: play 25s linear infinite;
  animation: play 60s linear infinite;
}

@-webkit-keyframes play {
  0% {
    -webkit-transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@-moz-keyframes play {
  0% {
    -moz-transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes play {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

// 磁针的动画
.pause-needle {
  animation: rotate-needle-pause 0.5s 1 normal linear;
  animation-fill-mode: forwards;
}

.resume-needle {
  animation: rotate-needle-resume 0.5s 1 normal linear;
  animation-fill-mode: forwards;
}

@keyframes rotate-needle-pause {
  100% {
    transform: rotateZ(-30deg);
  }
}

@keyframes rotate-needle-resume {
  0% {
    transform: rotateZ(-20deg);
  }

  100% {
    transform: rotateZ(0deg);
  }
}

@media screen and (max-width: 600px) {
  .m-player-panel {
    .m-player-panel-header {
      .m-player-panel-header-system {
        display: none;
      }
    }

    .panel-main {
      .panel-main-one {
        overflow-x: hidden;
        overflow-y: hidden;

        .record-black {
          height: 100%;

          .record-in {
            width: 250px;
            height: 250px;

            .lines {
              height: 230px;
              width: 230px;

              .cd {
                height: 160px;
                width: 160px;
              }
            }
          }
        }

        .panel-main-lycs {
          width: 100%;
          justify-content: space-around;
          margin-left: 0px;

          .main-lycs {
            :deep(.lyrics) {
              overflow-y: overlay;

              div {
                text-align: center;
              }
            }

            .lycs-type {
              right: 20px;
            }
          }

          .panel-main-title {
            text-align: center;
          }

          .panel-main-info {
            text-align: center;
            flex-direction: column;
            align-items: center;

            div {
              width: 100%;
            }
          }
        }
      }
    }
  }
}

@media screen and (min-width: 601px) {
  .record-black {
    display: block !important;

    .record-black-title {
      display: none;
    }
  }

  .panel-main-lycs {
    display: flex !important;

    justify-content: space-between;
  }
}
</style>