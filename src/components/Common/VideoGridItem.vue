<!-- mv播放列表的第二个效果 -->
<!-- 手机端显示全部多个换行 -->
<template>
  <div style="width: 100%; padding-right: 1px; padding-left: 1px;">
    <div id="video-item-box-list-not-touch" :class="{
      'video-item-list': !props.singleRow,
      'video-item-box-list': props.singleRow,
      'video-item-box-list-no-touch': props.singleRow
    }">
      <div class="item" v-for="(item, key) in props.list" :key="key" @click="itemClick(item)">
        <div class="item-cover" @click="router.push('/mv/' + item.id)">
          <img class="background" v-lazy="item.picUrl" alt="" :key="item.picUrl">
          <div v-if="item.playCount" class="playCount"><span class="iconfont wyy-bofangliang"></span>
            {{ handlePlayCount(item.playCount ?? 0) }}
          </div>
          <div v-if="props.showCopywriter && item.copywriter" class="copywriter">{{ item.copywriter }}</div>
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
import router from '../../router/index'

type item = {
  // mv id
  id: number,
  // 名称
  name: string
  // 封面
  picUrl: string
  // 播放数量
  playCount?: number
  // 作者数组
  artists?: Array<{ name: string }>
  // 描述
  copywriter?: string
}

let props = defineProps({
  list: Array<item>,
  showCopywriter: {
    type: Boolean,
    default: false
  },
  // 600px以下显示时的方向 true单行 false多行(默认)
  singleRow: {
    type: Boolean,
    default: false
  },
})

onMounted(async () => {
  document.querySelectorAll('.video-item-box-list-no-touch').forEach(el => {
    el.addEventListener('touchstart', (event) => {
      event.stopPropagation()
    })
    el.addEventListener('touchend', (event) => {
      event.stopPropagation()
    })
    el.addEventListener('touchmove', (event) => {
      event.stopPropagation()
    })
  })
})

function itemClick(item: item) {
  console.log(item)
}
</script>

<style lang="less" scoped>
.video-item-list,
.video-item-box-list {
  /* 声明一个容器 */
  display: grid;
  // /*  声明列的宽度  */
  grid-template-columns: repeat(3, 32%);
  // /*  声明行间距和列间距  */
  grid-gap: 7px;
  justify-content: space-between;
  width: 100%;
}

.item-cover {
  padding-top: 55%;
  position: relative;

  overflow: hidden;

  .background {
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

  .playCount {
    position: absolute;
    top: 3px;
    right: 5px;
    font-size: 10px;
    color: #fff;

    span {
      font-size: 15px;
    }
  }
}

// 标题相关
.title {
  width: 100%;
  min-height: 35px;

  color: #000;
  font-size: 14px;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  padding-top: 5px;

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
  transform: translateY(-100%);
}

.item:hover {
  .playCount {
    display: none;
  }

  .copywriter {
    transform: translateY(0px);
  }
}

@media screen and (max-width:600px) {
  .video-item-list {
    grid-template-columns: repeat(2, 49%);
  }

  .video-item-box-list {
    display: -webkit-box;
    overflow-x: scroll;
    overflow-y: hidden;

    .item {
      width: 49%;
    }

    &::-webkit-scrollbar {
      width: 0px;
      height: 0px;
    }
  }
}

@media screen and (min-width:601px) and (max-width:1000px) {

  .video-item-list,
  .video-item-box-list {
    grid-template-columns: repeat(2, 49%);
  }
}

@media screen and (min-width:1201px) {

  .video-item-list,
  .video-item-box-list {
    grid-template-columns: repeat(4, 24%);
  }
}
</style> 