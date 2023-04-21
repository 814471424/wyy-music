<!-- mv播放列表的第二个效果 -->
<!-- 手机端不显示全部，左右拖动查看 -->
<template>
  <div style="width: 100%; padding: 0px 1px; box-sizing: border-box;">
    <div class="grid-item-two">
      <div v-for="(item, key) in props.list" class="item-detail" :key="key">
        <div class="item">
          <img class="background" v-lazy="item.picUrl" alt="" :key="item.picUrl">
        </div>
        <div class="title">
          <div class="name">{{ item.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

type item = {
  picUrl: string
  name: string
}

let props = defineProps<{
  list: item[]
}>()


</script>

<style lang="less" scoped>
.grid-item-two {
  display: grid;
  grid-template-columns: repeat(3, 32%);
  grid-gap: 7px;
  justify-content: space-between;
  width: 100%;

  .item-detail .item {
    width: 100%;
    padding-top: 55%;
    position: relative;
    overflow: hidden;
    border-radius: 5px;

    .background {
      position: absolute;
      top: 0;
      left: 0;
      object-fit: cover;
      width: 100%;
      height: 100%;
      border-radius: 5px;
    }
  }

  .item-detail .title {
    font-size: 0.9rem;
  }
}

@media screen and (max-width: 600px) {
  .grid-item-two {
    display: -webkit-box;
    overflow-x: scroll;
    overflow-y: hidden;

    .item-detail {
      width: 49%;
    }

    &::-webkit-scrollbar {
      width: 0px;
      height: 0px;
    }
  }
}

@media screen and (min-width: 1201px) {
  .grid-item-two {
    grid-template-columns: repeat(4, 24%);
  }
}
</style>