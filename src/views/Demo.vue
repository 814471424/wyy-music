<template>
  <div class="demo" style="">
    <SquareGridItem :list="globalList" :single-row="false" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, Ref } from 'vue';
import SquareGridItem from '../components/Common/SquareGridItem.vue'
import api from '../api/index'

// 全球榜
let globalList: Ref<Array<Playlist.playListDetail & { picUrl: string, type: number }>> = ref([]);

onMounted(() => {
  api.toplist().then(res => {
    globalList.value = res.list.map(v => { return { ...v, picUrl: v.coverImgUrl, type: 1 } })
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