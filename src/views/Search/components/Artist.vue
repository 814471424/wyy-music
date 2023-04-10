<template>
  <div class="search-artist" v-for="(item, key) in  props.list" :key="key">
    <div class="search-pic">
      <img class="" :src="item.img1v1Url || item.picUrl" alt="">
    </div>
    <div style="display: flex;" v-html="dealKeyword(item.name, props.keywords ?? '')"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue"

const props = defineProps<{
  list: Search.artist[],
  keywords?: string
}>();

onMounted(() => {
})

function dealKeyword(data: string, keyword: string): string {
  let key = data;
  if (keyword) {
    key = data.replaceAll(keyword, '<div style="color: #507daf">' + keyword + '</div>');
  }
  return key
}

</script>

<style lang="less" scoped>
.search-artist {
  height: 78px;
  display: flex;
  align-items: center;

  .search-pic {
    height: 60px;
    width: 60px;
    margin: 0 15px;

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      border-radius: 5px;
    }
  }
}

.search-artist:hover {
  background-color: #f5f5f5 !important;
}

.search-artist:nth-child(2n) {
  background-color: #fafafa
}
</style>