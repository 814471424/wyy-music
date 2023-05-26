
<template>
  <h1>这是demo页面</h1>
</template>
<script>
import { onUnmounted } from "vue";

const sleep = time => {
  return new Promise((reslove, reject) => {
    setTimeout(() => {
      reslove();
    }, time);
  });
};
export default {
  async setup() {
    await sleep(3000);
  }
};

</script>