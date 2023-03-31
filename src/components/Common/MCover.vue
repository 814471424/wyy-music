<template>
  <div class="cover-plays-item">
    <div><img src="http://p2.music.126.net/JTVLtO6EILup8TPfZ_dQfA==/109951166995461526.jpg" alt="">
    </div>
    <div class="item-text">
      标题标题标题标题标题标题标题标题标题标题标题标题标题标题
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"

</script>


<style lang="less" scoped>
.cover-plays-item {
  width: 100%;

  img {
    border-radius: 5px;
    width: 100%;
    height: 100%;
  }

  .item-text {
    width: 100%;
    overflow: hidden; //多出的隐藏
    text-overflow: ellipsis; //多出部分用...代替
    display: -webkit-box; //定义为盒子模型显示
    -webkit-line-clamp: 2; //用来限制在一个块元素显示的文本的行数
    -webkit-box-orient: vertical; //从上到下垂直排列子元素（设置伸缩盒子的子元素排列方式）
  }
}
</style>