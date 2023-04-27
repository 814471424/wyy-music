<template>
  <div class="container" style="">
    <div class="container-header">
      <MHeader />
    </div>
    <div class="container-main">
      <div :class="['container-left', { 'left-enter-active': leftStatus, 'left-leave-active': !leftStatus }]"
        ref="leftRef">
        <MMenu />
      </div>
      <div id="kaiqi" class="left-button" @click="showLeftContainer"><span class="iconfont wyy-caidan"></span>
      </div>
      <div class="container-right">
        <router-view />
      </div>
    </div>
    <div class="container-footer">
      <MPlayer />
    </div>
    <MAudio />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, Ref, watch } from "vue"
import MHeader from '../components/MHeader/Index.vue'
import MPlayer from '../components/MPlayer/Index.vue'
import MMenu from '../components/MMenu.vue'
import MAudio from '../components/MAudio.vue';
import { useUserStore } from "../store/user";
import { storeToRefs } from "pinia";
import api from "../api";

const leftRef: Ref<HTMLElement | null> = ref(null);
const leftStatus = ref(false);
let userStore = useUserStore();
const { cookie } = storeToRefs(userStore);

// 手指是否被按下
let touchStatus = ref(false);
// 手指按下/移动/松开时的坐标
let touchStartXY: Ref<Touch | null> = ref(null);
let touchMoveXY: Ref<Touch | null> = ref(null);
let touchEndXY: Ref<Touch | null> = ref(null);
// 差值
let diff = ref(0);

watch(() => cookie.value, (value, _oldValue) => {
  if (!value || value == '') {
    refurbishCookie()
  }
})


onMounted(async () => {
  if (cookie) {
    api.loginStatus().then(async res => {
      // 不是游客且不是登录用户是触发
      if (!res.data.profile && !res.data.account) {
        // 刷新游客cookie
        console.log('刷新游客cookie111')
        refurbishCookie()
      }
    }).catch(async err => {
      // 游客登录
      console.log('loginStatus() 获取请求错误:' + err)
      console.log(err)
      // refurbishCookie()
    })
  } else {
    console.log('刷新游客cookie333')
    refurbishCookie()
  }

  document.addEventListener('click', (event) => {
    if (!document.getElementById('kaiqi')?.contains(event.target as HTMLElement)) {
      leftStatus.value = false
    }
  })

  leftRef.value?.addEventListener('click', (event) => {
    event.stopPropagation()
  })


  // leftRef.value?.addEventListener('scroll', (event) => {
  //   touchStatus.value = false
  // })
  // leftRef.value?.addEventListener('touchstart', (event) => {
  //   touchStartXY.value = event.touches[0]
  //   setTimeout(() => {
  //     touchStatus.value = true
  //   }, 200);

  //   event.stopPropagation()
  // })
  // leftRef.value?.addEventListener('touchmove', (event) => {


  //   if (touchStatus.value && touchStartXY.value) {
  //     // let clientX = touchMoveXY.value?.clientX ?? touchStartXY.value.clientX
  //     let clientX = touchStartXY.value.clientX

  //     diff.value = clientX - event.touches[0].clientX
  //     touchMoveXY.value = event.touches[0]

  //     console.log('每一次移动的差值: ' + diff.value)
  //     if (leftRef.value) {
  //       leftRef.value.style.transform = 'translateX(' + diff.value * -5 + 'px)'
  //     }
  //   }

  //   event.stopPropagation()
  // })
  // leftRef.value?.addEventListener('touchend', (event) => {
  //   touchEndXY.value = event.touches[0]
  //   touchStatus.value = false

  //   if (leftRef.value) {
  //     leftRef.value.style.transform = ''
  //   }
  //   leftStatus.value = false
  //   event.stopPropagation()
  // })
})

function showLeftContainer() {
  leftStatus.value = !leftStatus.value
}

// 刷新cookie
async function refurbishCookie() {
  let res = await api.registerAnonimous()
  userStore.cleanUser()
  userStore.setCookie(res.cookie)
  // userStore.setUserInfo(null)
}

</script>

<style lang="less" scoped>
.container {
  height: 100vh;
  width: 100vw;
  overflow-y: hidden;

  .container-header {
    height: 60px;
    display: flex;
    align-items: center;
    padding: 0px 20px;

    border-bottom-color: #e0e0e0;
    border-bottom-width: 1px;
    border-bottom-style: solid;
  }

  .container-main {
    height: calc(100vh - 134px);
    display: flex;

    .left-button {
      width: 60px;
      height: 60px;
      top: 0px;
      left: 0px;
      position: absolute;
      align-items: center;
      justify-content: center;


      span {
        font-size: 30px;
        color: #e0e0e0;
      }
    }

    .container-left {
      width: 200px;
      height: 100%;
      overflow-x: hidden;
      overflow-y: hidden;

      border-right-color: #e0e0e0;
      border-right-width: 1px;
      border-right-style: solid;
      // background-color: rgba(194, 194, 194, 0.511);
      // backdrop-filter: blur(10px);

      &:hover {
        overflow-y: overlay;
      }

      &:active {
        overflow-y: overlay;
      }
    }

    .container-right {
      height: 100%;
      overflow-y: overlay;
      overflow-x: hidden;
    }
  }

  .container-footer {
    height: 74px;

    border-top-color: #e0e0e0;
    border-top-width: 1px;
    border-top-style: solid;
  }
}


// 小于某个宽度
@media screen and (max-width: 600px) {
  .container {
    .container-main {
      .container-left {
        width: 70%;
        position: absolute;
        top: 0px;
        // visibility: hidden;
        z-index: 9999;

        overflow-y: overlay;

        &::-webkit-scrollbar {
          width: 1px;
          height: 1px;
        }
      }
    }
  }

  .container-right {
    width: 100%;
  }

  .left-button {
    display: flex;
    z-index: 1;
  }

  .left-enter-active {
    transform: translateX(0px);
    transition: all 0.5s;
  }

  .left-leave-active {
    transform: translateX(-100%);
    transition: all 0.5s;
  }
}

@media screen and (min-width: 600px) {
  .container-left {
    width: 200px;
    transform: translateX(0px) !important;
  }

  .container-right {
    width: calc(100% - 200px);
  }

  .left-button {
    display: none;
  }
}
</style>