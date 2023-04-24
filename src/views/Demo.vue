<template>
  <div @click="demo">点击</div>
</template>

<script lang="ts" setup>
import { onMounted, ref, Ref } from 'vue';

onMounted(() => {

})
function demo() {
  console.log(getNextDate())
}

function getNextDate(): number {
  let day = 1;
  let currentDate = new Date();

  let lastDaysTimes = day * 24 * 60 * 60 * 1000;
  let lastDate = new Date(currentDate.getTime() + lastDaysTimes); //最后得到得时间
  lastDate.setHours(0, 0, 0);//将时间设置到0点0刻。

  return lastDate.getTime()
}

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