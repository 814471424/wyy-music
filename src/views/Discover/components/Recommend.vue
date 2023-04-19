<template>
  <div class="common-padding">
    <div>
      <el-carousel :interval="4000" class="banner">
        <el-carousel-item v-for="(item, key) in banners" :key="key">
          <img class="banner-image" v-lazy="item.imageUrl" alt="">
          <div class="banner-title" :style="[{ 'background-color': item.titleColor }]">{{ item.typeTitle }}</div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="playlists">

      <!-- 推荐歌单 -->
      <div class="common-title">推荐歌单<span class="iconfont wyy-xiangyou"></span></div>
      <div class="plays">
        <div class="plays-item" @click="router.push('daily_song')">
          <div class="item-img">
            <img v-lazy="dailybg" alt="">
            <div class="item-img-text iconfont wyy-a-ziyuan16-copy-copy"></div>
            <div class="item-img-text" style="font-size: 30px; top: 5px;">{{ date }}</div>
          </div>
          <div class="item-text">
            每日歌曲推荐
          </div>
        </div>
        <div class="plays-item" v-for="(item, key) in playlists" :key="key">
          <MCover :value="item" @callback="() => { router.push('/playlist/' + item.id) }" />
        </div>
      </div>

      <!-- 热门播客 -->
      <div class="common-title">热门播客<span class="iconfont wyy-xiangyou"></span></div>
      <div class="common-title">听见好书<span class="iconfont wyy-xiangyou"></span></div>
      <div class="common-title">独家放送<span class="iconfont wyy-xiangyou"></span></div>
      <div class="common-title">最新音乐<span class="iconfont wyy-xiangyou"></span></div>
      <div class="common-title">主题播客<span class="iconfont wyy-xiangyou"></span></div>
      <div class="common-title">推荐MV<span class="iconfont wyy-xiangyou"></span></div>
      <div class="common-title">听听<span class="iconfont wyy-xiangyou"></span></div>
      <div class="common-title">看看<span class="iconfont wyy-xiangyou"></span></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue"
import api from '../../../api/index'
import MCover from '../../../components/Common/MCover.vue'
import router from "../../../router";
import dailybg from '../../../assets/dailybg.jpg'

let banners = ref([] as Common.bannerData[]);
let playlists = ref([] as Playlist.playList[]);
let date = new Date().getDate()

onMounted(async () => {
  // 获取轮播图
  api.banner().then((res) => {
    if (res.code == 200) {
      banners.value = res.banners
    }
  })
  // 获取推荐歌单
  let res = await api.dailyRecommendPlaylist()
  if (res.code == 200) {
    playlists.value = res.recommend;
  }
  if (playlists.value.length >= 9) {
    playlists.value = playlists.value.slice(0, 9)
  } else {
    let limit = 9 - playlists.value.length;
    api.recommendPlaylist({ limit: limit }).then(res => {
      if (res.code == 200) {
        playlists.value = [...playlists.value, ...res.result]
      }
    })
  }


  // 热门播客
  // 听见好书-新用户免费听
  // 独家放送
  // 最新音乐
  // 主题播客
  // 推荐MV
  // 听听
})


</script>

<style lang="less" scoped>
// 轮播图相关
// .el-carousel__item--card.is-active {
//   width: 60%;
//   left: -5%;
// }

.banner {
  margin-top: 5px;

  .el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }

  .el-carousel__item {
    border-radius: 7px;
  }

  .banner-image {
    display: block;
    width: 100%;
    height: 100%;
    background-position: center;
  }

  .banner-title {
    position: absolute;
    bottom: 0px;
    right: 0px;
    padding: 5px;
    border-top-left-radius: 7px;
    color: #fff;
    font-size: 10px;
  }

  :deep(.el-carousel__container) {
    height: 200px !important;
  }


}

// 推荐表单
.playlists {
  margin-bottom: 20px;

  .plays {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 5px 0px 35px 0px;

    .plays-item {
      width: 18%;
      // border-radius: 5px;
      margin-top: 10px;

      .item-img {
        position: relative;

        .item-img-text {
          width: 100%;
          height: 100%;
          color: #fff;
          position: absolute;
          top: 0px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 60px;
        }
      }

      img {
        border-radius: 5px;
        width: 100%;
        height: 100%;
      }

      .item-text {
        width: 100%;
        overflow: hidden; //多出的隐藏
        text-overflow: ellipsis; //多出部分用...代替
        display: -webkit-box; //定义为盒子模型显示
        -webkit-line-clamp: 2; //用来限制在一个块元素显示的文本的行数
        -webkit-box-orient: vertical; //从上到下垂直排列子元素（设置伸缩盒子的子元素排列方式）
      }
    }
  }
}

// 公共部分的
.common-title {
  font-size: 20px;
  font-weight: 800;
  color: #333333;
  margin-top: 20px;

  span {
    font-size: 20px;
  }

  &:hover {
    color: #000;
  }
}

.common-padding {
  height: 100%;
  overflow-y: overlay;
}


@media screen and (max-width: 600px) {
  .banner {
    :deep(.el-carousel__container) {
      height: 150px !important;
    }

    :deep(.el-carousel__button) {
      width: 10px;
    }
  }
}
</style>