<!-- 歌词相关面板 -->
<template>
    <div class="lyrics" ref="lyricsRef">
        <div style="height: calc(50% - 20px)"></div>

        <div v-if="lyrics.length > 0">
            <div :class="{ lycs_item_active: lycindex == key }" style="height: 60px; transition: 0.5s;"
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
import { lycsTypeEnum, lycItem } from './types'
import { handleLrc, timeupdate } from './index'

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
let lyrics: Ref<Array<lycItem>> = ref([]);
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
    // console.log(lyrics.value)
    lyricsRef.value!.scrollTo(0, value * 60)
})

onMounted(() => {
    lyrics.value = handleLrc(props.lyric, props.tlyric, props.romalrc)
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

.lycs_item_active {
    color: #000;
    font-weight: 600;
    font-size: 1.2rem;
}
</style>