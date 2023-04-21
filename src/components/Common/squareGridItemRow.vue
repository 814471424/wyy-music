<!-- 多列 -->
<template>
  <div class="item-list">
    <div v-for="(item, key) in props.list" :key="key">
      <div class="item">
        <img class="background" v-lazy="item.picUrl" alt="" :key="item.picUrl">
      </div>
      <div class="title">{{ item.name }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>

// 封面
enum itemType {
  artist = 0  // 歌手
}

type item = {
  type: itemType
  id: string
  // 封面图片
  picUrl: string
  name: string
  playCount?: number,
  copywriter?: string
}

const props = defineProps<{
  list: item[]
}>();
</script>

<style lang="less" scoped>
.item-list {
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(5, 18.7%);
  grid-gap: 7px;
  justify-content: space-between;

  width: 100%;

  .item {
    padding-top: 100%;
    position: relative;

    .background {
      width: 100%;
      height: 100%;
      top: 0px;
      object-fit: cover;
      position: absolute;

      border-radius: 5px;
    }
  }

  .title {
    padding: 7px 0px 10px 0px;
    font-size: 0.9rem;
  }
}

@media screen and (max-width:600px) {
  .item-list {
    grid-template-columns: repeat(3, 32%);
  }
}

@media screen and (min-width:601px) and (max-width:1000px) {
  .item-list {
    grid-template-columns: repeat(4, 24%);
  }
}
</style>