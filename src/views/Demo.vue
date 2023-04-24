<template>
  <VideoGridItem :list="list" :show-copywriter="true" />
  <VideoGridItem :list="privatecontentList" :single-row="true" />
</template>

<script lang="ts" setup>
import { onMounted, ref, Ref } from 'vue';
import VideoGridItem from '../components/Common/VideoGridItem.vue'
import api from '../api/index'

let list: Ref<Array<MV.mvItem>> = ref([])
let privatecontentList: Ref<Array<MV.privatecontentItem>> = ref([]) // 独家放送(入口列表)

onMounted(() => {
  api.personalizedMv().then((res) => {
    list.value = res.result ?? []
  })

  api.personalizedPrivatecontent().then(res => {
    privatecontentList.value = (res.result ?? []).map(v => { v.picUrl = v.sPicUrl; return v })
  })
})

</script>

<style lang="less" scoped>
.demo {
  overflow: hidden;
  overflow-y: overlay;
  width: 100%;
  height: 100%;
  // background-image: url('https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201502%2F05%2F20150205121433_iGBik.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1684805654&t=0376c5bdc24c761654bffbc72a10ba16');
  background-repeat: round;
}
</style>