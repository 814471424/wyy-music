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
            <div id="kaiqiDemo" class="left-button" @click="showLeftContainer"><span class="iconfont wyy-caidan"></span>
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

watch(() => cookie.value, (value, _oldValue) => {
    if (!value || value == '') {
        refurbishCookie()
    }
})


onMounted(async () => {
    if (cookie) {
        api.loginStatus().then(async res => {
            if (!res.data.profile) {
                // 刷新游客cookie
                console.log('刷新游客cookie111')
                await refurbishCookie()
            }
        }).catch(async _err => {
            // 游客登录
            console.log('刷新游客cookie222')
            await refurbishCookie()
        })
    } else {
        console.log('刷新游客cookie333')
        await refurbishCookie()
    }

    document.addEventListener('click', (event) => {
        if (!document.getElementById('kaiqiDemo')?.contains(event.target as HTMLElement)) {
            leftStatus.value = false
            setTimeout(() => {
                if (leftRef.value) {
                    leftRef.value.style.visibility = 'hidden'
                }
            }, 400);
        }
    })

    leftRef.value?.addEventListener('click', (event) => {
        event.stopPropagation()
    })
})

function showLeftContainer() {
    if (!leftStatus.value) {
        if (leftRef.value) {
            leftRef.value.style.visibility = 'visible'
        }
    } else {
        setTimeout(() => {
            if (leftRef.value) {
                leftRef.value.style.visibility = 'hidden'
            }
        }, 400);
    }

    leftStatus.value = !leftStatus.value
}

// 刷新cookie
async function refurbishCookie() {
    let res = await api.registerAnonimous()
    userStore.setCookie(res.cookie)
    userStore.setUserInfo(null)
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
                width: 60%;
                position: absolute;
                top: 0px;
                visibility: hidden;
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
        animation: dialog-active 0.5s;
    }

    .left-leave-active {
        animation: leave-active 0.5s;
    }

    @keyframes dialog-active {
        0% {
            transform: translateX(-250px);
        }

        100% {
            transform: translateX(0px);
        }
    }

    @keyframes leave-active {
        0% {
            transform: translateX(0px);
        }

        100% {
            transform: translateX(-250px);
        }
    }
}

@media screen and (min-width: 600px) {
    .container-left {
        width: 200px;
        visibility: visible !important;
    }

    .container-right {
        width: calc(100% - 200px);
    }

    .left-button {
        display: none;
    }
}
</style>