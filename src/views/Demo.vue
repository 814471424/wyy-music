<template>
  <div
    style="background: url(https://img2.baidu.com/it/u=1622322099,1148802506&fm=253&fmt=auto&app=138&f=JPEG?w=691&h=500) fixed no-repeat;">
    <div class="boli">
      <div>dddddddddddddddd</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import squareGridItemRow from '../components/Common/squareGridItemRow.vue'

</script>

<style lang="less" scoped>
.boli {
  width: 300px;
  height: 300px;
  position: absolute;
  background: inherit;
  overflow: overlay;
  z-index: 100;
}

.boli::before {
  content: "";
  width: calc(100% + 20px);
  height: calc(100% + 20px);
  display: block;
  position: absolute;
  left: -10px;
  top: -10px;
  background: inherit;
  box-shadow: inset 0 0 200px rgba(255, 255, 255, 0.25);
  filter: blur(6px);
  overflow: hidden;
  border-radius: 14px;
  z-index: -1;
}
</style>