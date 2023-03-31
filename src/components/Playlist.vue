<!-- 播放列表 -->
<template>
  <div id="showButton" class="right-item-data iconfont wyy-bofangliebiao" title="打开播放列表" @click="showButton()"></div>
  <!-- 要隐藏的div -->
  <div id="showDiv"></div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'

let title = ref('打开播放列表')
let show = ref(false)

function showButton() {

}

onMounted(() => {
  const bt = document.getElementById('showButton');
  const div = document.getElementById('showDiv');

  bt?.addEventListener('click', function (event) {
    if (show.value) {
      div!.style.display = 'none';
      title.value = '打开播放列表';
      show.value = false;
    } else {
      div!.style.display = 'block';
      title.value = '关闭播放列表';
      show.value = true;
    }
    event.stopPropagation();//阻止冒泡
  })

  document.addEventListener('click', function () {
    title.value = '打开播放列表';
    div!.style.display = 'none';//隐藏
  });

  div?.addEventListener('click', function (event) {
    event.stopPropagation();//阻止冒泡
  })
})

</script>
<style lang="less" scoped>
#showDiv {
  display: none;
  top: 60px;
  height: calc(100vh - 134px);
  width: 420px;
  background-color: aqua;
  right: 0px;
  position: fixed;
}

.right-item-data {
  height: 22px;
  width: 22px;
  margin-right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
}
</style>