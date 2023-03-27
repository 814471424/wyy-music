<template>
  <div class="m-player-panel">
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
    <span>Hi there!</span>
  </div>
</template>

<script lang="ts" setup>
import { UnlistenFn } from "@tauri-apps/api/event";
import { WebviewWindow, appWindow, } from "@tauri-apps/api/window";
import { ref, onMounted, onUnmounted } from "vue"
import Windows from "../../windows/Windows";

let isMinimize = ref(false);
let unlisten: UnlistenFn;

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

  .m-player-panel-header {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;

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
}
</style>