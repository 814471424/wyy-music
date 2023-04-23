<template>
  <div class="song-padding">
    <div class="latest-body">
      <div class="latest-type  common-padding">
        <div @click="checkType = item.value" :class="['type-item', { 'type-item-active': item.value == checkType }]"
          v-for="(item, key) in type" :key="key">
          {{ item.name }}</div>
      </div>
      <TableOne :list="list" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, Ref, watch } from "vue"
import api from '../../../api/index'
import TableOne from '../../../components/Common/TableOne.vue'

const type = [
  { value: '0', name: '全部' },
  { value: '7', name: '华语' },
  { value: '96', name: '欧美' },
  { value: '8', name: '日本' },
  { value: '16', name: '韩国' },
];
let checkType = ref('0');
let list: Ref<Search.song[]> = ref([]);

watch(() => checkType.value, () => {
  update()
})

onMounted(() => {
  update()
})

function update() {
  api.topSong(checkType.value).then(res => {
    list.value = res.data;
  });
}
</script>

<style lang="less" scoped>
.song-padding {
  padding: 10px 0px 0px 0px;
  overflow-y: overlay;
  display: flex;
  width: 100%;
  justify-content: center;
}

.common-padding {
  margin-bottom: 15px;
}

.latest-body {
  max-width: 1110px;
  width: 100%;
}

.latest-type {
  display: flex;
  flex-wrap: wrap;

  &::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }

  .type-item {
    margin-right: 20px;
  }

  .type-item-active {
    font-weight: 700;
  }
}
</style>