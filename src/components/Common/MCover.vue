<!-- 歌单样式 -->
<template>
  <div class="cover-plays-item" @click="callback">
    <div><img :src="props.value.picUrl" alt="">
    </div>
    <div class="item-text">
      {{ props.value.name }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import router from '../../router/index'

const props = defineProps<{
  value: Playlist.playList,
  callback?: () => {}
}>();

function callback() {
  if (props.callback) {
    props.callback()
  } else {
    router.push('/playlist/' + props.value.id)
  }
}

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