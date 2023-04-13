<template>
  <div id="settingButton" class="setting" @click="show">
    <span class="setting-icon iconfont wyy-zhuti-04"></span>
  </div>
  <div id="showSettingPanel" :style="[{ display: showState ? 'block' : 'none' }]">
    <input type="color" v-model="color">
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import Theme, { LightDarkenColor } from '../../utils/theme';

let showPane: HTMLElement | null = null;
let showState = ref(false)
const color = ref('');

watch(() => color.value, (value, _oldValue) => {
  let primaryBackgroundColor = LightDarkenColor(value)
  Theme.setConfig({ primaryColor: value, primaryBackgroundColor })
})

onMounted(() => {
  showPane = document.getElementById('showSettingPanel')

  document.addEventListener('click', (event) => {
    if (!document.getElementById('settingButton')?.contains(event.target as HTMLElement)) {
      showState.value = false
    }
  })

  showPane?.addEventListener('click', (event) => {
    event.stopPropagation()
  })
})

function show() {
  showState.value = !showState.value
}

</script>

<style lang="less" scoped>
#showSettingPanel {
  // display: none;
  width: 330px;
  height: 270px;
  background: cadetblue;
  position: absolute;
  z-index: 2004;
  top: 60px;
  right: 90px;
  border-radius: 5px;
}

.iconfont:hover {
  color: #fff;
}
</style>