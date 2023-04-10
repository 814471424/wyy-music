<template>
  <div class="search-video">
    <div class="search-item" v-for="(item, key) in props.list" :key="key">
      <img :src="item.coverUrl" alt="">
      <div class="viedo-playTime"><span class="iconfont wyy-bofangliang"></span>{{ handlePlayCount(item.playTime ?? 0) }}
      </div>
      <div class="viedo-durationms">{{ millisecondToTime(item.durationms ?? 0) }}</div>
      <div class="viedo-title">
        <div>{{ item.title }}</div>
        <div style="color: #ccc;">{{ (item.creator ?? []).map(v => v.userName).join('/') }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { handlePlayCount } from '../../../utils/handle'
import { millisecondToTime } from '../../../utils/time'

const props = defineProps<{ list: Search.video[] }>()

</script>

<style lang="less" scoped>
// [https://juejin.cn/post/6990520699483848712]
.search-video {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  .search-item {
    width: calc(100% / 3 - 20px);
    padding-top: 18%;
    position: relative;
    margin-bottom: 20px;
    margin: 10px 10px 50px 10px;
  }

  @media screen and (min-width: 1200px) {
    .search-item {
      width: calc(100% / 4 - 20px);
      padding-top: 14%;
      position: relative;
    }
  }

  @media screen and (min-width:1500px) {
    .search-item {
      width: calc(100% / 5 - 20px);
      padding-top: 10%;
      position: relative;
    }
  }

  img {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
    object-fit: cover;
    border-radius: 5px;
  }

  .viedo-title {
    position: absolute;
    margin-bottom: 10px;

    div {
      overflow: hidden; //多出的隐藏
      text-overflow: ellipsis; //多出部分用...代替
      display: -webkit-box; //定义为盒子模型显示
      -webkit-line-clamp: 1; //用来限制在一个块元素显示的文本的行数
      -webkit-box-orient: vertical; //从上到下垂直排列子元素（设置伸缩盒子的子元素排列方式）
    }
  }

  .viedo-playTime {
    position: absolute;
    top: 0px;
    right: 5px;
    color: #fff;
    font-size: 12px;

    span {
      font-size: 12px;
    }
  }

  .viedo-durationms {
    position: absolute;
    bottom: 0px;
    right: 5px;
    color: #fff;
    font-size: 12px;
  }
}
</style>