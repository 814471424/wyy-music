<!-- mv播放列表的第二个效果 -->
<!-- 手机端显示全部多个换行 -->
<template>
  <div style="width: 100%; padding-right: 1px; padding-left: 1px;">
    <div class="wrapper">
      <div v-for="(item, key) in props.list" :key="key" @click="itemClick(item)">
        <div class="item">
          <img class="background" v-lazy="item.picUrl" alt="">
          <div v-if="item.playCount" class="playCount"><span class="iconfont wyy-bofangliang"></span>
            {{ handlePlayCount(item.playCount ?? 0) }}
          </div>
          <div v-if="item.copywriter" class="copywriter">{{ item.copywriter }}</div>
        </div>
        <div class="title">
          <div class="name">{{ item.name }}</div>
          <div v-if="item.artists" class="artists-name">{{ item.artists.map(v => v.name).join(' / ') }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { handlePlayCount } from '../../utils/handle'

type item = {
  name: string
  copywriter: string
  picUrl: string
  playCount?: number
  artists?: Array<{ name: string }>
}

let props = defineProps<{
  list: item[]
}>()

onMounted(async () => {
})

function itemClick(item: item) {
  console.log(item)
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
  justify-content: space-between;
  width: 100%;

  .item {
    padding-top: 55%;
    position: relative;

    overflow: hidden;
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

  .title {
    .name {
      font-size: 14px;
    }

    .artists-name {
      font-size: 12px;
      color: #7f7f7f;
    }
  }

  .item .copywriter {
    position: absolute;
    width: 100%;
    top: 0px;
    padding: 10px 5px;
    font-size: 12px;
    color: #d6d6d6;
    background-color: #30303088;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    box-sizing: border-box;


    transition: all 0.5s;
    // animation-direction: reverse;
    transform: translateY(-100%);
  }

  .item:hover {
    .playCount {
      display: none;
    }

    .copywriter {
      // animation: dialog-active 0.5s;
      // animation-direction: unset;
      transform: translateY(0px);
    }
  }
}


@keyframes dialog-active {
  0% {
    transform: translateY(-100%);
  }

  100% {
    transform: translateY(0px);
  }
}

@keyframes dialog-leave {
  0% {
    transform: translateY(0px);
  }

  100% {
    transform: translateY(-100%);
  }
}

@media screen and (max-width:600px) {
  .wrapper {
    grid-template-columns: repeat(2, 49%);
  }
}

@media screen and (min-width:1201px) {
  .wrapper {
    grid-template-columns: repeat(4, 24%);
  }
}
</style> 