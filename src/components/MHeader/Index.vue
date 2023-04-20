<template>
  <div class="header-container" data-tauri-drag-region="true">
    <!-- 网易云图标搜索部分 -->

    <div class="header-ico-search">
      <div class="header-ico" @click="() => router.push('/discover')" data-tauri-drag-region="true">
        <span class="iconfont wyy-wangyiyunyinle1" data-tauri-drag-region="true">
        </span>网易云音乐
      </div>

      <!-- 搜索 -->
      <div class="header-search" data-tauri-drag-region="true">
        <div class="header-back-url" @click="router.go(-1)"><span class="iconfont wyy-xiangzuo"></span></div>
        <div class="header-back-url" @click="router.go(1)"><span class="iconfont wyy-xiangyou"></span></div>
        <div class="header-input">
          <el-input v-model="inputText" placeholder="Type something" @keyup.enter="inputSearch" :prefix-icon="Search" />
        </div>
        <div class="header-maikefeng"><span class="iconfont wyy-maikefengxianxing"></span></div>
      </div>
    </div>
    <div class="header-system" data-tauri-drag-region="true">

      <!-- 用户信息(目前就未登录状态) -->
      <div class="header-user" style="width: 140px;">
        <User />
      </div>

      <!-- 右上角各种设置跟窗体操作 -->
      <div class="header-button" style="">
        <Theme />
        <div title="设置" class="iconfont wyy-xitongguanli" @click="router.push('/setting')"></div>
        <div title="消息" class="iconfont wyy-youjian_o"></div>
        <div v-if="tauriResult" class="div-no-select">丨</div>
        <div v-if="tauriResult" title="mini模式" class="iconfont wyy-mini" @click="mimiMain()"> </div>
        <div v-if="tauriResult" title="最小化" class="iconfont wyy-suoxiao" @click="minimizeMain()"></div>
        <div v-if="tauriResult && !isMinimize" title="最大化" class="iconfont wyy-CZ_029" @click="maximizeMain()"></div>
        <div v-if="tauriResult && isMinimize" title="向下还原" class="iconfont wyy-huanyuan" @click="unmaximizeMain()"></div>
        <div v-if="tauriResult" title="关闭" class="iconfont wyy-guanbi" @click="closeMain()"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';
import Windows from '../../windows/Windows'
import { Search } from '@element-plus/icons-vue'
import { WebviewWindow, appWindow } from '@tauri-apps/api/window'
import { UnlistenFn, listen } from '@tauri-apps/api/event'
import User from './User.vue'
import router from '../../router/index'
import Theme from './Theme.vue'

let inputText = ref("");
let isMinimize = ref(false);
let unlisten: UnlistenFn;
// 判断是否在tauri环境中
const tauriResult = (window as any).__TAURI__ != undefined;


onMounted(async () => {
  if ((window as any).__TAURI__ != undefined) {
    WebviewWindow.getByLabel('main')?.isFullscreen().then((res) => {
      isMinimize.value = res
    })

    unlisten = await appWindow.onResized(({ payload: size }) => {
      WebviewWindow.getByLabel('main')?.isMaximized().then((res) => {
        isMinimize.value = res
      })
    });
  }
})


onUnmounted(() => {
  unlisten ? unlisten() : null
})

// 关闭窗口
function closeMain() {
  // Windows.closeMainWin()
  Windows.miniWin()
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

// mini模式
function mimiMain() {
  Windows.miniWin()
}

// 跳转到search页面
function inputSearch() {
  if (inputText.value) {
    router.replace('/search/' + inputText.value)
  }
}

</script>

<style lang="less" scoped>
.header-container {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fce4e4dd;


  .header-ico-search {
    // width: 480px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .header-ico {
      width: 200px;
      font-size: 18px;
      display: flex;
      color: #fff;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;

      span {
        font-size: 25px;
        padding-right: 5px;
      }
    }

    .header-search {
      display: flex;
      align-items: center;

      div {
        margin: 4px;
      }

      .header-back-url {
        height: 24px;
        width: 24px;
        background-color: var(--primary-background-color);
        border-radius: 24px;
        text-align: center;
      }

      .header-maikefeng {
        height: 32px;
        width: 32px;
        background-color: var(--primary-background-color);
        border-radius: 32px;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 8px;
        margin-right: 7px;

        .iconfont {
          font-size: 20px;
        }
      }

      .header-input {
        width: 160px;
      }
    }
  }

  .header-system {
    display: flex;
    // min-width: 400px;
    justify-content: space-between;
    align-items: center;

    .header-system-login {
      display: flex;
      align-items: center;
      font-size: 10px;

      span {
        font-size: 28px;
        width: 28px;
        height: 28px;
        border-radius: 28px;
        margin-right: 3px;
        color: #e0e0e0;
      }
    }

    .header-user:hover {
      color: #fff;
    }

    .iconfont:hover {
      color: #fff;
    }

    .header-button {
      display: flex;
      align-items: center;

      div {
        margin-left: 15px;
      }
    }
  }
}

:deep(.el-input) {
  .el-input__wrapper {
    border-radius: 20px !important;
    background-color: var(--primary-background-color);
    box-shadow: 0 0 0 1px #409eff00 inset;
    color: #fff;

    .el-input__prefix {
      color: #fce4e4dd;
    }

    .el-input__inner {
      color: #fff;
      --el-input-placeholder-color: #fce4e4dd;
    }
  }

  .is-focus {
    box-shadow: 0 0 0 1px #409eff00 inset;
  }
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


@media screen and (max-width: 600px) {
  .header-container {
    justify-content: space-around;

    .header-ico-search {
      .header-ico {
        display: none;
      }

      .header-search {
        .header-maikefeng {
          display: none;
        }
      }
    }

    .header-system {
      display: none;
    }
  }
}

// @media screen and (max-width: 850px) {
//   .header-container {
//     .header-system {
//       .header-user {
//         display: none;
//       }
//     }
//   }
// }


@media screen and (max-width: 850px) {
  .header-container {
    justify-content: space-around;

    .header-ico-search {
      .header-ico {
        display: none;
      }
    }
  }
}
</style>