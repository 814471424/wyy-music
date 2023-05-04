<template>
  <div class="common-padding">
    <div class="recommend-body">
      <div ref="bannerRef">
        <a-carousel class="banner">
          <div v-for="(item, key) in banners" :key="key" class="banner-body">
            <img class="banner-image" v-lazy="item.imageUrl" alt="" :key="item.imageUrl">
            <div class="banner-title" :style="[{ 'background-color': item.titleColor }]">{{ item.typeTitle }}</div>
          </div>
        </a-carousel>
      </div>

      <div class="playlists">
        <!-- 推荐歌单 -->
        <div class="common-title">推荐歌单<span class="iconfont wyy-xiangyou"></span></div>
        <SquareGridItem :list="playlists" :single-row="true" :play-icon="true" />
        <!-- 热门播客 -->
        <!-- <div class="common-title">热门播客<span class="iconfont wyy-xiangyou"></span></div> -->
        <!-- <div class="common-title">听见好书<span class="iconfont wyy-xiangyou"></span></div> -->
        <div class="common-title">独家放送<span class="iconfont wyy-xiangyou"></span></div>
        <VideoGridItem :list="privatecontentList" :single-row="false" />
        <!-- <div class="common-title">最新音乐<span class="iconfont wyy-xiangyou"></span></div> -->
        <!-- <div class="common-title">主题播客<span class="iconfont wyy-xiangyou"></span></div> -->
        <div class="common-title">推荐MV<span class="iconfont wyy-xiangyou"></span></div>
        <VideoGridItem :list="personalizedMvs" :show-copywriter="true" />
        <!-- <div class="common-title">听听<span class="iconfont wyy-xiangyou"></span></div>
        <div class="common-title">看看<span class="iconfont wyy-xiangyou"></span></div> -->
      </div>
      <div style="height: 10px;"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Ref, onMounted, ref, watch } from "vue"
import api from '../../../api/index'
import dailybg from '../../../assets/dailybg.jpg'
import SquareGridItem from '../../../components/Common/SquareGridItem.vue'
import VideoGridItem from '../../../components/Common/VideoGridItem.vue'
import { userCacheStore } from '../../../store/cache'
import { storeToRefs } from 'pinia'

// 追加缓存
let userCache = userCacheStore();
const { cache } = storeToRefs(userCache);

let banners: Ref<Array<Common.bannerData>> = ref(cache.value.banners ?? []);
let playlists: Ref<Array<Playlist.playList & { type: number }>> = ref(cache.value.playlists ?? []);
let personalizedMvs: Ref<Array<MV.mvItem>> = ref(cache.value.personalizedMvs ?? []) // 推荐的mv
let privatecontentList: Ref<Array<MV.privatecontentItem>> = ref(cache.value.privatecontents ?? []) // 独家放送(入口列表)
let bannerRef: Ref<HTMLElement | null> = ref(null);

watch(() => banners.value, (value) => {
  userCache.setBanners(value)
})
watch(() => playlists.value, (value) => {
  userCache.setPlaylists(value)
})
watch(() => personalizedMvs.value, (value) => {
  userCache.setPersonalizedMvs(value)
})
watch(() => privatecontentList.value, (value) => {
  userCache.setPrivatecontents(value)
})

onMounted(async () => {
  // 获取轮播图
  if (banners.value.length == 0) {
    api.banner().then((res) => {
      if (res.code == 200) {
        banners.value = res.banners
      }
    })
  }

  // 获取推荐歌单
  let limitValue = 10;

  // 加入每日推荐页面
  if (playlists.value.length < 10) {
    playlists.value = [{
      name: '每日歌曲推荐',
      id: 0,
      picUrl: dailybg,
      type: 2,
    }]

    api.dailyRecommendPlaylist().then(res => {
      if (res.code == 200) {
        playlists.value = [...playlists.value, ...res.recommend.map(v => {
          v.playCount = (v.playCount || v.playcount) ?? 0;
          return { ...v, type: 1 }
        })]
      }
      if (playlists.value.length >= limitValue) {
        playlists.value = playlists.value.slice(0, limitValue)
      } else {
        let limit = limitValue - playlists.value.length;
        api.recommendPlaylist({ limit: limit }).then(res => {
          if (res.code == 200) {
            playlists.value = [...playlists.value, ...res.result.map(v => {
              v.playCount = (v.playCount || v.playcount) ?? 0;
              return { ...v, type: 1 }
            })]
          }
        })
      }
    })
  }

  // 热门播客
  // 听见好书-新用户免费听
  // 独家放送
  if (privatecontentList.value.length == 0) {
    api.personalizedPrivatecontent().then(res => {
      privatecontentList.value = (res.result ?? []).map(v => { v.picUrl = v.sPicUrl; v.copywriter = ''; return v })
    })
  }

  // 最新音乐
  // 主题播客
  // 推荐MV
  if (personalizedMvs.value.length == 0) {
    api.personalizedMv().then((res) => {
      personalizedMvs.value = res.result ?? []
    })
  }

  // 听听

  // 移除banner上的事件
  bannerRef.value!.addEventListener('touchstart', (event) => {
    event.stopPropagation()
  })
  bannerRef.value!.addEventListener('touchend', (event) => {
    event.stopPropagation()
  })
  bannerRef.value!.addEventListener('touchmove', (event) => {
    event.stopPropagation()
  })
})


</script>

<style lang="less" scoped>
// 轮播图相关
.banner .van-swipe__track,
.banner .banner-body {
  height: 250px;
  width: 100%;
}

.banner-body {
  position: relative;
}

.banner-image {
  height: 100%;
  width: 100%;
  border-radius: 7px;
}

.banner-title {
  position: absolute;
  bottom: 0px;
  right: 0px;
  padding: 5px;
  border-top-left-radius: 7px;
  border-bottom-right-radius: 7px;
  color: #fff;
  font-size: 10px;
}

// 推荐表单
.playlists {
  margin-bottom: 20px;
}

// 公共部分的
.common-title {
  font-size: 20px;
  font-weight: 800;
  color: #333333;
  margin-top: 20px;
  margin-bottom: 10px;

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
  display: flex;
  width: 100%;
  justify-content: center;

  padding-top: 20px;
}

.recommend-body {
  max-width: 1110px;
  width: 100%;
}


@media screen and (max-width: 1000px) {

  .banner .van-swipe__track,
  .banner .banner-body {
    height: 150px;
  }
}
</style>