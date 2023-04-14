<template>
  <div class="search-artist" v-for="(item, key) in  props.list" :key="key" @click="jumpArtist(item.id)">
    <div class="search-pic">
      <img class="" :src="item.img1v1Url || item.picUrl" alt="">
    </div>
    <div style="display: flex; font-size: 15px;" v-html="handleKeyword(item.name, props.keywords ?? '')"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue"
import { handleKeyword } from '../../../utils/handle'
import router from '../../../router/index'

const props = defineProps<{
  list: Search.artist[],
  keywords?: string
}>();

function jumpArtist(id: number) {
  router.push('/artist/' + id)
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

  &:hover {
    background-color: #f5f5f5 !important;
  }

  &:nth-child(2n) {
    background-color: #fafafa
  }
}
</style>