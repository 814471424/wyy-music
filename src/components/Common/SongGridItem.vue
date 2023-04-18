<template>
  <div style="width: 100%;">
    <div class="wrapper">
      <div class="item" v-for="(item, key) in props.list" :key="key" @click="itemClick(item)">
        <img class="background" :src="item.picUrl" alt="">
        <img class="playIcon" :src="paly_icon" alt="">
        <div class="playCount"><span class="iconfont wyy-bofangliang"></span> {{ handlePlayCount(item.playCount ?? 0) }}
        </div>
        <div class="title">
          <div>{{ item.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import paly_icon from '../../assets/paly_icon.png'
import { handlePlayCount } from '../../utils/handle'
import router from '../../router';

enum itemEnumType {
  // 每日
  dailySong = 0,
  // 歌单
  playList = 1,
}

interface listItem extends Playlist.playList {
  itemType?: itemEnumType
}

let props = defineProps<{
  list: listItem[]
}>()

onMounted(async () => {
})

function itemClick(item: listItem) {
  switch (item.itemType) {
    case itemEnumType.dailySong:
      break;
    case itemEnumType.playList:
      router.push('/playlist/' + item.id)
      break;
    default:
      console.log("默认")
      break;
  }
}
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
  width: 100%;

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
    color: #000;
    font-size: 14px;

    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .item .playCount {
    position: absolute;
    top: 3px;
    right: 5px;
    font-size: 10px;
    color: #fff;

    span {
      font-size: 15px;
    }
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