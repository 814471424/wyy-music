<!-- 多列 -->
<template>
  <div :class="{ 'item-list': !props.singleRow, 'item-box-list': props.singleRow }">
    <div class="item" v-for="(item, key) in props.list" :key="key">
      <div class="item-cover">
        <img class="background" v-lazy="item.picUrl" alt="" :key="item.picUrl">
      </div>
      <div class="title">
        <div>
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>
  
<script lang="ts" setup>

// 封面
enum itemType {
  artist = 0,  // 歌手
  playlist = 1 // 表单
}

type item = {
  type: itemType
  id: number
  // 封面图片
  picUrl?: string
  name: string
  playCount?: number,
  copywriter?: string
}

const props = defineProps({
  list: Array<item>,
  // 600px以下显示时的方向
  singleRow: {
    type: Boolean,
    default: false
  },
});

</script>
  
<style lang="less" scoped>
.item-list {
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(5, 18.7%);
  grid-gap: 7px;
  justify-content: space-between;
  width: 100%;
}

.item-box-list {
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(5, 18.7%);
  grid-gap: 7px;
  justify-content: space-between;
  width: 100%;
}

.item-cover {
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
  margin: 7px 0px 10px 0px;
  font-size: 0.9rem;
  width: 100%;

  // 标题最多两行
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

@media screen and (max-width:600px) {
  .item-list {
    grid-template-columns: repeat(3, 32%);
  }

  .item-box-list {
    display: -webkit-box;
    overflow-x: scroll;
    overflow-y: hidden;
  }

  .item-box-list .item {
    width: 32%;
  }

  .item-box-list::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
}

@media screen and (min-width:601px) and (max-width:1000px) {
  .item-list {
    grid-template-columns: repeat(4, 24%);
  }
}
</style>