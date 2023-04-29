<!-- 歌词相关面板 -->
<template>
  <div class="lyrics" ref="lyricsRef">
    <div style="height: calc(50% - 20px)"></div>

    <div v-if="lyrics.length > 0">
      <div :class="{ lycs_item_active: lycindex == key }" style="height: 60px; transition: 0.5s;"
        v-for="(item, key) in  lyrics" :key="key">
        <div>{{ item.lyric }}</div>
        <div v-if="props.lycsType == lycsTypeEnum.translate || props.lycsType == lycsTypeEnum.all">{{ item.tlyric }}</div>
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
import { lycsTypeEnum } from '../../api/typings/enum'
import { handleLrc } from '../../utils/player'

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
let lyrics: Ref<Array<Common.lycItem>> = ref([]);
let lyricsRef: Ref<HTMLElement | null> = ref(null);
let lycindex = ref(-1);

watch(() => props.lyric, (value) => {
  lyrics.value = handleLrc(props.lyric, props.tlyric, props.romalrc)
  lycindex.value = 0;
})

watch(() => props.currentTime, (value) => {
  lycindex.value = timeupdate(Number(value * 1000) + props.delayed, lyrics.value)
})

watch(() => lycindex.value, (value) => {
  lyricsRef.value!.scrollTo(0, value * 60)
})

onMounted(() => {
  lyrics.value = handleLrc(props.lyric, props.tlyric, props.romalrc)
})


// 当前播放时长
function timeupdate(currentTime: number, lycs: Array<Common.lycItem>): number {
  if (lycs.length == 0 || currentTime == 0) {
    return 0
  }

  for (let i = 0; i < lycs.length; i++) {
    if (i == lycs.length - 1) {
      if (lycs[i].time <= currentTime) {
        return i
      }
    } else {
      if (lycs[i].time <= currentTime && currentTime < lycs[i + 1].time) {
        return i;
      }
    }
  }

  return 0;
}

</script>

<style lang="less" scoped>
.lyrics {
  width: 100%;
  height: 100%;
  color: #85817f;
  overflow: hidden;

  z-index: 2005;

  &:hover {
    overflow-y: overlay;
  }
}

.lycs_item_active {
  color: #000;
  font-weight: 600;
  font-size: 1.2rem;
}
</style>