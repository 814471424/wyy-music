<template>
  <div class="m-left">
    <div class="left-user">
      <User />
    </div>
    <div class="common-line-style"></div>
    <el-menu :default-active="path" :router=true class="m-menu">
      <el-menu-item index="/discover">
        <span>发现音乐</span>
      </el-menu-item>
      <!-- <el-menu-item index="/podcast">
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
      </el-menu-item> -->
      <div><span>我的音乐</span></div>
      <el-menu-item v-if="lovePlayList" :index="'/playlist/' + lovePlayList.id" class="font-no-weight">
        <span class="iconfont wyy-xihuan"> 我喜欢的音乐</span>
      </el-menu-item>
      <el-menu-item v-if="tauriResult" index="/download" class="font-no-weight">
        <span class="iconfont wyy-shangchuan"> 本地与下载</span>
      </el-menu-item>
      <el-menu-item index="/recently_played" class="font-no-weight">
        <span class="iconfont wyy-zuijinbofang"> 最近播放</span>
      </el-menu-item>
      <el-menu-item index="/demo">
        <span> 测试页面</span>
      </el-menu-item>
      <div><span>创建的歌单</span></div>
      <el-menu-item :index="'/playlist/' + item.id" class="font-no-weight" v-for="(item, key) in createPlaylist"
        :key="key">
        <span class="iconfont wyy-iconfont-gedan"> {{ ' ' + item.name }}</span>
      </el-menu-item>
      <div><span>收藏的歌单</span></div>
      <el-menu-item :index="'/playlist/' + item.id" class="font-no-weight" v-for="(item, key) in collectPlaylist"
        :key="key">
        <span class="iconfont wyy-iconfont-gedan"> {{ ' ' + item.name }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { Ref, computed, onMounted, ref, watch } from "vue"
import { useRoute, } from 'vue-router'
import api from '../api/index'
import { useUserStore } from '../store/user'
import { storeToRefs } from 'pinia'
import User from './MHeader/User.vue'

const route = useRoute()
const userStore = useUserStore()
const { profile } = storeToRefs(userStore)
let path = computed(() => route.path);
let lovePlayList: Playlist.playListDetail | null = null;
let createPlaylist: Ref<Playlist.playListDetail[]> = ref([]);
let collectPlaylist: Ref<Playlist.playListDetail[]> = ref([]);
// 判断是否在tauri环境中
const tauriResult = (window as any).__TAURI__ != undefined;

watch(() => profile.value, (value, _oldValue) => {
  getPlayList()
})
onMounted(() => {
  getPlayList()
})


function getPlayList() {
  if (profile.value?.userId) {
    api.userPlaylist({ uid: profile.value.userId }).then(res => {
      if (res.code == 200) {
        lovePlayList = res.playlist.filter(v => v.name == '我喜欢的音乐')[0] ?? null;
        createPlaylist.value = res.playlist.filter(v => (v.creator.userId == profile.value?.userId) && v.name != '我喜欢的音乐');
        collectPlaylist.value = res.playlist.filter(v => v.creator.userId != profile.value?.userId);
      }
    })
  }
}

</script>

<style lang="less" scoped>
.m-left {
  width: 100%;
  padding-right: 8px;
  box-sizing: border-box;

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

    .el-menu-item span {
      line-height: initial;
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

      span {
        font-size: 14px;
        width: 100%;
        overflow: hidden; // 超出长度的文字隐藏
        text-overflow: ellipsis; // 文字隐藏以后添加省略号
        white-space: nowrap; // 强制不换行
      }
    }
  }
}

:deep(.el-menu-item.is-active) {
  font-weight: 900;
  color: #000;
  background-color: #f6f6f7;
}

// 用户相关
.left-user {
  display: none;
  padding-top: 10px;
}

.common-line-style {
  display: none;
}

@media screen and (max-width: 600px) {
  .left-user {
    display: block;

    :deep(.header-system-login) {
      justify-content: space-evenly;
    }

    :deep(.showUserButton) {
      justify-content: space-evenly;
    }

    :deep(.showUserPanel) {
      display: block !important;
      position: unset;
      width: 100%;
      box-shadow: none
    }
  }

  .common-line-style {
    display: block;
    margin-top: 20px;
    margin-bottom: 20px;
  }

}
</style>