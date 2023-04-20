<template>
  <div class="common-padding" id="artist">
    <div class="recommend-body">
      <div class="field">
        <div class="field-name">语种:</div>
        <div class="field-item">
          <div :class="{ 'common-item-active': item.value == checkArtistType }" v-for="(item, key) in artistArea"
            :key="key">
            {{ item.name }}
          </div>
        </div>
      </div>
      <div class="field">
        <div class="field-name">分类:</div>
        <div class="field-item">
          <div :class="{ 'common-item-active': item.value == checkArtistArea }" v-for="(item, key) in artistType"
            :key="key">
            {{ item.name }}</div>
        </div>
      </div>
      <div class="field">
        <div class="field-name">筛选:</div>
        <div class="field-item">
          <div :class="{ 'common-item-active': item.value == checkArtistInitial }" v-for="(item, key) in artistInitial"
            :key="key">
            {{ item.name }}</div>
        </div>
      </div>

      <div class="artist-body">
        <div v-for="(item, key) in artistList" :key="key">{{ key }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Ref, onMounted, ref } from "vue"
import api from '../../../api/index'

// 语种
const artistType = [
  { value: '-1', name: '全部' },
  { value: '1', name: '男歌手' },
  { value: '2', name: '女歌手' },
  { value: '3', name: '乐队组合' }
]
// 分类
const artistArea = [
  { value: '-1', name: '全部' },
  { value: '7', name: '欧美' },
  { value: '96', name: '女歌手' },
  { value: '8', name: '日本' },
  { value: '16', name: '韩国' },
  { value: '0', name: '其他' }
]
// 筛选
const artistInitial = [
  { value: '-1', name: '热门' },
  { value: 'a', name: 'A' },
  { value: 'b', name: 'B' },
  { value: 'c', name: 'C' },
  { value: 'd', name: 'D' },
  { value: 'e', name: 'E' },
  { value: 'f', name: 'F' },
  { value: 'g', name: 'G' },
  { value: 'h', name: 'H' },
  { value: 'i', name: 'I' },
  { value: 'j', name: 'J' },
  { value: 'k', name: 'K' },
  { value: 'l', name: 'L' },
  { value: 'm', name: 'M' },
  { value: 'n', name: 'N' },
  { value: 'o', name: 'O' },
  { value: 'p', name: 'P' },
  { value: 'q', name: 'Q' },
  { value: 'r', name: 'R' },
  { value: 's', name: 'S' },
  { value: 't', name: 'T' },
  { value: 'u', name: 'U' },
  { value: 'v', name: 'V' },
  { value: 'w', name: 'W' },
  { value: 's', name: 'S' },
  { value: 'y', name: 'Y' },
  { value: 'z', name: 'Z' },
  { value: 0, name: '#' }
]
let checkArtistType = ref('-1');
let checkArtistArea = ref('-1');
let checkArtistInitial = ref('-1');
let artistList: Ref<any[]> = ref([]);
let more = true;
let requestStatus = true;
let page = 0;
const limit = 30;
let singerRef: HTMLElement | null = null

onMounted(() => {
  update()

  singerRef = document.getElementById('artist')
  singerRef?.addEventListener('scroll', (event) => {
    let clientHeight = singerRef!.clientHeight;
    let scrollHeight = singerRef!.scrollHeight;
    let scrollTop = singerRef!.scrollTop;
    let distance = 50;

    if ((scrollTop + clientHeight) >= (scrollHeight - distance)) {
      update()
    }
  })
})

function update() {
  if (!requestStatus) {
    return
  }

  if (more) {
    page += 1;
    requestStatus = false;

    api.artistList({
      limit: limit,
      offset: (page - 1) * limit,
      type: checkArtistType.value,
      area: checkArtistArea.value,
      initial: checkArtistInitial.value
    }).then(res => {
      artistList.value = [...artistList.value, ...(res.artists ?? [])]
      more = res.more ?? false
    })

    setTimeout(() => {
      requestStatus = true
    }, 500);
  }
}
</script>

<style lang="less" scoped>
.common-padding {
  height: 100%;
  overflow-y: overlay;
  display: flex;
  width: 100%;
  justify-content: center;
}

.recommend-body {
  max-width: 1110px;
  width: 100%;
}

.field {
  display: flex;
  font-size: 0.8rem;

  .field-name {
    min-width: 25px;
    padding: 3px;
  }

  .field-item {
    display: flex;
    flex: 1;
    flex-wrap: wrap;
    color: #666666;

    div {
      margin: 0px 10px;
      margin-bottom: 5px;
      padding: 3px 10px;
      min-width: 50px;
      box-sizing: border-box;
      text-align: center;
    }
  }
}
</style>