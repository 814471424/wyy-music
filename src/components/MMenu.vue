<template>
  <div class="m-left">
    <el-menu :default-active="path" :router=true class="m-menu">
      <el-menu-item index="/discover">
        <span>发现音乐</span>
      </el-menu-item>
      <el-menu-item index="/podcast">
        <span>播客</span>
      </el-menu-item>
      <el-menu-item index="/video">
        <span>视频</span>
      </el-menu-item>
      <el-menu-item index="/concern">
        <span>关注</span>
      </el-menu-item>
      <el-menu-item index="/broadcast">
        <span>直播</span>
      </el-menu-item>
      <el-menu-item index="/fm">
        <span>私人FM</span>
      </el-menu-item>
      <div><span>我的音乐</span></div>
      <el-menu-item index="/favorite" class="font-no-weight">
        <span class="iconfont wyy-xihuan"> 我喜欢的音乐</span>
      </el-menu-item>
      <el-menu-item index="/download" class="font-no-weight">
        <span class="iconfont wyy-shangchuan"> 本地与下载</span>
      </el-menu-item>
      <el-menu-item index="/recently_played" class="font-no-weight">
        <span class="iconfont wyy-zuijinbofang"> 最近播放</span>
      </el-menu-item>
      <el-menu-item index="/demo">
        <span> 测试页面</span>
      </el-menu-item>
      <div><span>创建的歌单</span></div>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue"
import { useRoute, } from 'vue-router'

const route = useRoute()
let path = computed(() => route.path);
</script>

<style lang="less" scoped>
.m-left {
  width: 100%;

  .el-menu {
    border-right: solid 1px #dcdfe600;
    border-right-width: 1px;
    border-right-style: solid;
    border-right-color: rgba(220, 223, 230, 0);

    li {
      height: 38px;
      border-radius: 5px;
      padding-left: 10px !important;
    }
  }

  .m-menu {
    div {
      margin: 10px 0px 5px 10px;

      span {
        font-size: 13px;
        color: #b0b0b0;
      }
    }

    .font-no-weight {
      font-weight: 100;
    }
  }
}

:deep(.el-menu-item.is-active) {
  font-weight: 900;
  color: #000;
  background-color: #f6f6f7;
}
</style>