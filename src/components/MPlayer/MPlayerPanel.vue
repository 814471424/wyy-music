<template>
  <div class="m-player-panel">
    <!-- 头部 -->
    <div class="m-player-panel-header" data-tauri-drag-region="true">
      <div><span class="iconfont wyy-xiangxia-a" style="margin-left: 35px;"></span></div>
      <div></div>
      <div class="m-player-panel-header-system">
        <div title="设置" class="iconfont wyy-xitongguanli"></div>
        <div title="消息" class="iconfont wyy-youjian_o"></div>
        <div class="div-no-select">|</div>
        <div title="mini模式" class="iconfont wyy-mini"> </div>
        <div title="最小化" class="iconfont wyy-suoxiao" @click="minimizeMain()"></div>
        <div v-if="!isMinimize" title="最大化" class="iconfont wyy-CZ_029" @click="maximizeMain()"></div>
        <div v-else title="向下还原" class="iconfont wyy-huanyuan" @click="unmaximizeMain()"></div>
        <div title="关闭" class="iconfont wyy-guanbi" @click="closeMain()"></div>
      </div>
    </div>

    <!-- 播放面板 -->
    <div class="panel-main">
      <!-- 封面跟歌词部分 -->
      <div class="panel-main-one">
        <!-- 唱片部分 -->
        <div class="record-black">
          <div style="width: 100%;height: 130px;text-align: center;z-index: 1; position: relative;"
            :class="[{ 'pause-needle': playStatus == false, 'resume-needle': playStatus == true }]">
            <img :class="['play-needle-img']" src="../../assets/play_needle.png" />
          </div>
          <div :class="['record-in', { 'xuanzhuan': playStatus == true }]">
            <div class="lines">
              <img
                src="https://ts1.cn.mm.bing.net/th/id/R-C.987f582c510be58755c4933cda68d525?rik=C0D21hJDYvXosw&riu=http%3a%2f%2fimg.pconline.com.cn%2fimages%2fupload%2fupc%2ftx%2fwallpaper%2f1305%2f16%2fc4%2f20990657_1368686545122.jpg&ehk=netN2qzcCVS4ALUQfDOwxAwFcy41oxC%2b0xTFvOYy5ds%3d&risl=&pid=ImgRaw&r=0"
                class="cd" />
            </div>
          </div>
        </div>
        <div class="panel-main-lycs">
          <span>歌曲名称</span>
          <div>
            <button @click="demo1">测试</button>
            <span>歌手: 1</span>
            <span>专辑: 2</span>
            <span>来源: 3</span>
          </div>
          <div class="main-lycs">
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
          </div>
        </div>
      </div>
      <!-- 评论及推荐歌单啥的 -->
      <div class="panel-main-two">
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
import { ref, onMounted, onUnmounted, computed } from "vue"
import Windows from "../../windows/Windows";
import { useMainStore } from '../../store/index'

const mainStore = useMainStore();
let isMinimize = ref(false);
let unlisten: UnlistenFn;
// 音乐播放状态
let playStatus = computed(() => mainStore.playStatus) // 是否播放

function demo1() {
  mainStore.setPlayStatus(!playStatus.value);
}
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

onMounted(async () => {
  // 监听窗口大小是否变化
  unlisten = await appWindow.onResized(({ payload: size }) => {
    WebviewWindow.getByLabel('main')?.isMaximized().then((res) => {
      isMinimize.value = res
    })
  });
})

onUnmounted(() => {
  unlisten()
})
</script>

<style lang="less" scoped>
.m-player-panel {
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, #dfd8d3, #ffffff);
  color: #85817f;
  overflow-y: hidden;


  .m-player-panel-header {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    top: 0;
    background-color: #e3dcd8;
    z-index: 2;

    .m-player-panel-header-system {
      min-width: 265px;
      display: flex;
      align-items: center;
      justify-content: space-evenly;

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
    overflow-y: auto;

    .panel-main-one {
      display: flex;
      justify-content: center;

      .record-black {
        width: 400px;
        height: 490px;
        background-color: blueviolet;
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
      }

      .panel-main-lycs {
        width: 450px;
        height: 490px;
        background-color: aqua;

        .main-lycs {
          min-height: 200px;
          max-height: 350px;
          background-color: cornflowerblue;
          overflow-y: auto;
        }
      }
    }

    .panel-main-two {
      display: flex;
      justify-content: center;

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
</style>