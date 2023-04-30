<!-- 歌词相关面板 -->
<template>
  <div class="lyrics" ref="lyricsRef">
    <div style="height: calc(50% - 20px)"></div>
    <div v-if="yrcs.length > 0">
      <div class="lycs_item" :class="{ lycs_item_active: lycindex == key }" v-for="(item, key) in  yrcs" :key="key">
        <span style="position: relative;"
          :class="['lycs_item_name', { lycs_item_name_active: lycindex == key && v.time <= Number(currentTime * 1000) }]"
          :style="`transition: ${(v.length) / 1000}s linear;`" v-for="(v, k) in item.list" :key="v.time">
          {{ v.name }}
        </span>
      </div>
    </div>
    <div v-else-if="lyrics.length > 0">
      <div class="lycs_item" style="transition: 0.3s;" :class="{ lycs_item_active: lycindex == key }"
        v-for="(item, key) in  lyrics" :key="key">
        <div>{{ item.lyric }}</div>
        <div v-if="props.lycsType == lycsTypeEnum.translate || props.lycsType == lycsTypeEnum.all">{{ item.tlyric }}
        </div>
        <div v-if="props.lycsType == lycsTypeEnum.sound || props.lycsType == lycsTypeEnum.all">{{ item.romalrc }}
        </div>
      </div>
    </div>
    <div v-else>
      <div>暂无歌词</div>
    </div>
    <div style="height: calc(50% - 40px);"></div>
  </div>
</template>
  
<script lang="ts" setup>
import { ref, Ref, onMounted, watch } from "vue";
import { lycsTypeEnum, lycItem, yrcItem } from './types'
import { handleLrc, handleYrc, timeupdate } from './index'

let props = defineProps({
  // 歌词
  lyric: {
    type: String,
    default: ''
  },
  // 英译
  tlyric: {
    type: String,
    default: ''
  },
  // 罗马音
  romalrc: {
    type: String,
    default: ''
  },
  // 逐字歌词
  yrc: {
    type: String,
    default: ''
  },
  // 当前时间
  currentTime: {
    type: Number,
    default: 0
  },
  // 延时
  delayed: {
    type: Number,
    default: 0
  },
  // 显示的歌词类型
  lycsType: {
    type: Number,
    default: lycsTypeEnum.null
  }
})
let lyrics: Ref<Array<lycItem>> = ref([]);
let lyricsRef: Ref<HTMLElement | null> = ref(null);
let lycindex = ref(-1);
let yrcs: Ref<Array<yrcItem>> = ref([]);

watch(() => props.lyric, (value) => {
  lyrics.value = handleLrc(props.lyric, props.tlyric, props.romalrc)
  lycindex.value = 0;
})
// 
watch(() => props.yrc, (value) => {
  yrcs.value = handleYrc(value)
})
// 根据时间定位歌词
watch(() => props.currentTime, (value) => {
  if (yrcs.value.length > 0) {
    lycindex.value = timeupdate(Number(value * 1000) + props.delayed, yrcs.value)
  } else if (lyrics.value.length > 0) {
    lycindex.value = timeupdate(Number(value * 1000) + props.delayed, lyrics.value)
  }
})
// 控制屏幕滚动
watch(() => lycindex.value, (value) => {
  lyricsRef.value!.scrollTo(0, value * 60 + 40)
})

onMounted(() => {
  lyrics.value = handleLrc(props.lyric, props.tlyric, props.romalrc)
  yrcs.value = handleYrc(props.yrc)
})

</script>
  
<style lang="less" scoped>
.lyrics {
  width: 100%;
  height: 100%;
  color: #85817f;
  overflow: hidden;

  &:hover {
    overflow-y: overlay;
  }
}

.lycs_item {
  height: 60px;
  // transition: 0.2s;
  // transition-timing-function: ease-out;

  color: #85817f;
  font-size: 0.9rem;
}

.lycs_item_active {
  color: #000;
  font-weight: 600;
  font-size: 1.2rem;
  transition: none;

  margin: 40px 0px;

  .lycs_item_name {
    --fill-color: #000000;
    position: relative;
    text-decoration: none;
    text-transform: uppercase;
    -webkit-text-stroke: 0.5px var(--fill-color);
    background: linear-gradient(var(--primary-color) 0 100%) left / 0 no-repeat;
    color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
  }

  .lycs_item_name_active {
    background-size: 100%;
  }
}
</style>