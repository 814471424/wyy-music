<template>
  <div>
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="item in 6" :key="item">
        <h3 text="2xl" justify="center">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
    <button @click="demo()">测试</button>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue"
// import api from '../../api/index'

let a: bannerData111 = {};
console.log(a)
// let banners = ref([] as Common.bannerData[]);
function demo() {
  // api.banner().then((res) => {
  //   if (res.code == 200) {
  //     bannerData111;
  //     // banners.value = res.banners
  //   }
  // })
}
onMounted(() => {

})


</script>

<style lang="less" scoped>
.el-carousel {
  margin-top: 5px;
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>