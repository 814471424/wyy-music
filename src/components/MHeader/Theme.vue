<template>
  <div class="theme">
    <div id="settingButton" class="setting" @click="show">
      <span class="setting-icon iconfont wyy-zhuti-04"></span>
    </div>
    <div id="showSettingPanel" :style="[{ display: showState ? 'block' : 'none' }]">
      <input type="color" v-model="color">
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import Theme from '../../utils/theme';

let showPane: HTMLElement | null = null;
let showState = ref(false)
const color = ref('');

watch(() => color.value, (value, _oldValue) => {
  Theme.setByColor(value)
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
.theme {
  position: relative;

}


.setting {
  display: flex;
  align-items: center;
  font-size: 10px;
  min-height: 60px;
}

#showSettingPanel {
  width: 160px;
  height: 150px;
  background: cadetblue;
  position: absolute;
  right: -80px;
  z-index: 2004;
  border-radius: 5px;
}

.iconfont:hover {
  color: #fff;
}
</style>