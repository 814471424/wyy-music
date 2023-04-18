<template>
  <div>
    <h1>测试页面</h1>
    <div class="wrapper">
      <div class="item" v-for="i in 17" :key="i">
        <img class="background"
          src="https://images.pexels.com/photos/4587991/pexels-photo-4587991.jpeg?cs=srgb&dl=pexels-anna-shvets-4587991.jpg&fm=jpg"
          alt="">
        <img class="playIcon" :src="paly_icon" alt="">
        <div class="title">
          <div>歌单标题</div>
        </div>
      </div>
    </div>
    <div style="margin-top: 200px;"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import paly_icon from '../assets/paly_icon.png'

onMounted(async () => {

})
</script>

<style lang="less" scoped>
.wrapper {
  /* 声明一个容器 */
  display: grid;
  // /*  声明列的宽度  */
  grid-template-columns: repeat(3, 32%);
  // /*  声明行间距和列间距  */
  grid-gap: 7px;
  // grid-g // overflow: scroll;
  justify-content: space-between;

  .item {
    padding-top: 100%;
    position: relative;
    // background-color: aquamarine;
    margin-bottom: 40px;
  }

  .item .background {
    position: absolute;
    height: 100%;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
    object-fit: cover;
    width: 100%;
    border-radius: 5px;
  }

  .item .playIcon {
    bottom: 7px;
    right: 7px;
    width: 42px;
    position: absolute;
    display: none;
  }

  .item .title {
    width: 100%;
    height: 40px;
    position: absolute;
    background-color: aqua;
    color: #000;

    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .item:hover {
    .playIcon {
      display: block;
    }
  }
}


@media screen and (min-width:601px) and (max-width:1200px) {
  .wrapper {
    grid-template-columns: repeat(4, 24%);
  }
}

@media screen and (min-width:1201px) {
  .wrapper {
    grid-template-columns: repeat(5, 19.8%);
  }
}
</style> 