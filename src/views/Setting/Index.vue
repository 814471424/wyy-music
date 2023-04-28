<template>
  <div class="common-padding">
    <h1>
      设置
    </h1>
    <div>
      <div>下载目录</div>
      <span>{{ setting.savePath ?? '' }}</span> <button @click="changeSavePath">更改目录</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useSettingStore } from '../../store/setting'
import { storeToRefs } from 'pinia'
import { open } from '@tauri-apps/api/dialog'

const settingStore = useSettingStore();
const { setting } = storeToRefs(settingStore);

function changeSavePath() {
  // 查找文件夹
  open({
    directory: true,
    multiple: false,
  }).then((res) => {
    // 如果查找到的
    if (res) {
      settingStore.setSavePath(res as string)
    }
  });
}

</script>

<style lang="less" scoped>
.common-padding {
  flex-direction: column;
}
</style>