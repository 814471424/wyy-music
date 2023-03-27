<template>
  <div class="common-layout">
    <el-container>
      <!-- 头部 -->
      <el-header data-tauri-drag-region="true" class="common-header">
        <MHeader />
      </el-header>
      <el-container class="common-main">
        <!-- 侧边栏路由部分 -->
        <el-aside width="200px" class="common-left">
          <MMenu />
        </el-aside>
        <!-- 嵌套路由，主要内容 -->
        <el-container>
          <el-main>
            <router-view />
          </el-main>
        </el-container>
      </el-container>
      <!-- 播放器 -->
      <el-footer class="common-footer">
        <MPlayer />
      </el-footer>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import MHeader from '../components/MHeader.vue'
import MPlayer from '../components/MPlayer/Index.vue'
import MMenu from '../components/MMenu.vue'

</script>

<style lang="less" scoped>
.common-header {
  height: 60px;
  background-color: #ec4141;
}

.common-left {
  width: 200px;
  border-right-color: #e0e0e0;
  border-right-width: 1px;
  border-right-style: solid;
  padding: 10px 0 0 10px;
}

.common-main {
  height: calc(100vh - 134px);
}

.common-footer {
  height: 74px;
  border-top-color: #e0e0e0;
  border-top-width: 1px;
  border-top-style: solid;
  padding: 0;
}

.el-main {
  padding: 10px 30px 0px 30px;
  overflow: overlay;
}
</style>