<template>
  <el-tabs v-model="activeName" class="discover-tabs common-padding" @tab-click="handleClick">
    <el-tab-pane label="个性推荐" name="recommend">
      <div class="right-main">
        <div class="right-content">
          <Recommend />
        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="专属订制" name="customized">Config</el-tab-pane>
    <el-tab-pane label="歌单" name="playlist">
      <div class="right-main">
        <div class="right-content">
          <SongSheet />
        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="排行榜" name="ranking">Task</el-tab-pane>
    <el-tab-pane label="歌手" name="singer">Task</el-tab-pane>
    <el-tab-pane label="最新音乐" name="latest">Task</el-tab-pane>
  </el-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import Recommend from './components/Recommend.vue'
import SongSheet from './components/SongSheet.vue'

const activeName = ref('playlist')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  // console.log(tab, event)
}
</script>

<style lang="less" scoped>
.el-tabs {
  width: calc(100% + 30px);
  height: 100%;
  overflow: hidden;
  padding-right: 30px;
}

:deep(.el-tabs__content) {
  height: calc(100% - 46px);
  overflow-y: overlay;
  padding-right: 30px;
}

:deep(.el-tabs__nav-wrap::after) {
  background-color: #e4e7ed00;
}

:deep(.el-tabs__header) {
  margin-bottom: 8px;
}


.right-main {
  display: flex;
  justify-content: center;

  .right-content {
    // background-color: aqua;
    width: 100%;
    max-width: 1110px
  }
}


@media screen and (max-width: 600px) {
  .el-tabs {
    width: calc(100% + 10px);
    padding-right: 10px;
  }

  :deep(.el-tabs__content) {
    padding-right: 10px;
  }
}
</style>
