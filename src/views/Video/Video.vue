<template>
  <div class="common-padding">
    <div class="video-body">
      <div class="video-left">
        <div v-html="'< MV详情'"></div>
        <div>
          <video style="width: 100%;" controls ref="viedoRef" :src="viedoUrl?.url"></video>
        </div>
      </div>
      <div class="video-right">
        <div></div>
      </div>
    </div>
  </div>
</template>
  
<script lang="ts" setup>
import { onMounted, ref, Ref } from "vue"
import router from '../../router/index'
import api from '../../api/index'

let id = ref(router.currentRoute.value.params['id'] as string);
let viedoRef: Ref<HTMLVideoElement | null> = ref(null)
let viedoDetail: Ref<Common.videoDetail | null> = ref(null)
let viedoUrl: Ref<Common.videoUrl | null> = ref(null)

onMounted(() => {
  console.log(viedoRef)
  if (viedoRef.value) {
    viedoRef.value.autoplay = true
  }

  if (id.value) {
    api.videoUrl(id.value).then(res => {
      viedoUrl.value = res.urls[0]
    })

    api.videoDetail(id.value).then(res => {
      viedoDetail.value = res.data
    })
  }
})

</script>
  
<style lang="less" scoped>
.common-padding {
  overflow-y: overlay;
  display: flex;
  justify-content: center;
}

.video-body {
  max-width: 1000px;
  display: flex;
  width: 100%;
  background-color: aqua;
  justify-content: space-between;

  .video-left {
    width: 65%;
    max-width: 630px;
  }

  .video-right {
    width: 30%;
    background-color: bisque;
  }
}

@media screen and (max-width: 600px) {
  .video-body {
    .video-left {
      width: 100%;
    }

    .video-right {
      display: none;
    }
  }
}

@media screen and (min-width:601px) and (max-width:1000px) {

  .video-body {
    .video-left {
      width: 100%;
      max-width: 1000px
    }

    .video-right {
      display: none;
    }
  }
}
</style>