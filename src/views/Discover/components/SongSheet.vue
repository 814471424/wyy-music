<template>
  <div class="common-padding" id="songSheet-main">
    <div class="songSheet-body">
      <!-- 精品歌单推荐封面 -->
      <div class="highquality-playlist-cover" :style="'background-image: url(' + highquality?.coverImgUrl + ');'"
        v-if="highquality">
        <div class="highquality-content">
          <div class="highquality-image">
            <img v-lazy="highquality.coverImgUrl" alt="" :key="highquality.coverImgUrl">
          </div>
          <div>
            <div class="highquality-icon">精品歌单</div>
            <div class="highquality-name">{{ highquality.name }}</div>
          </div>
        </div>

      </div>
      <div class="tags">
        <div class="catlist">
          <div id="catlist-button" @click="show" style="margin: 0px 10px;">{{ cat }}
            <span class="iconfont wyy-xiangyou"></span>
          </div>
        </div>
        <div class="highquality">
          <div @click="checkCat(item.name ?? '')" :class="[{ 'highquality-active': item.name == cat }]"
            v-for="(item, key) in hotTags" :key="key">
            {{ item.name }}
          </div>
        </div>

        <!-- 歌单类型面板 -->
        <div class="catlist-panel" v-if="panelStatus">
          <div class="panel">
            <div style="padding: 20px; display: flex;">
              <div :class="['cat-item', { 'highquality-active': catAll?.name == cat }]" @click="checkCat(catAll?.name)">
                {{
                  catAll?.name }}</div>
            </div>
            <div class="common-line-style"></div>
            <div style="padding: 20px;">
              <div class="catlist-sub">
                <div class="sub-title"><span class="iconfont wyy-yuzhongguanli"></span>语种</div>
                <div class="catlist-item">
                  <div v-for="(item, key) in catSub.filter(v => v.category == 0)" :key="item.imgId">
                    <span :class="['cat-item', { 'highquality-active': item.name == cat }]"
                      @click="checkCat(item.name)">{{
                        item.name
                      }}</span>
                  </div>
                </div>
              </div>
              <div class="catlist-sub">
                <div class="sub-title"><span class="iconfont wyy-gangqin"></span>风格</div>
                <div class="catlist-item">
                  <div v-for="(item, key) in catSub.filter(v => v.category == 1)" :key="item.imgId">
                    <span :class="['cat-item', { 'highquality-active': item.name == cat }]"
                      @click="checkCat(item.name)">{{
                        item.name
                      }}</span>
                  </div>
                </div>
              </div>
              <div class="catlist-sub">
                <div class="sub-title"><span class="iconfont wyy-coffekafei"></span>场景</div>
                <div class="catlist-item">
                  <div v-for="(item, key) in catSub.filter(v => v.category == 2)" :key="item.imgId">
                    <span :class="['cat-item', { 'highquality-active': item.name == cat }]"
                      @click="checkCat(item.name)">{{
                        item.name
                      }}</span>
                  </div>
                </div>
              </div>
              <div class="catlist-sub">
                <div class="sub-title"><span class="iconfont wyy-xiaolian"></span>情感</div>
                <div class="catlist-item">
                  <div v-for="(item, key) in catSub.filter(v => v.category == 3)" :key="item.imgId">
                    <span :class="['cat-item', { 'highquality-active': item.name == cat }]"
                      @click="checkCat(item.name)">{{
                        item.name
                      }}</span>
                  </div>
                </div>
              </div>
              <div class="catlist-sub">
                <div class="sub-title"><span class="iconfont wyy-zhuti"></span>主题</div>
                <div class="catlist-item">
                  <div v-for="(item, key) in catSub.filter(v => v.category == 4)" :key="item.imgId">
                    <span :class="['cat-item', { 'highquality-active': item.name == cat }]"
                      @click="checkCat(item.name)">{{
                        item.name
                      }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <SquareGridItem :list="list" :play-icon="true" />
      </div>
      <div class="search-page" v-if="list.length > 0">
        <el-pagination small background layout="prev, pager, next" :total="total" v-model:page-size="per_page"
          v-model:current-page="page" @current-change="handleCurrentChange" class="mt-4" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Ref, onMounted, ref, watch } from "vue"
import SquareGridItem from '../../../components/Common/SquareGridItem.vue'
import api from '../../../api/index'
import { userCacheStore } from '../../../store/cache'
import { storeToRefs } from 'pinia'

// 追加缓存
let userCache = userCacheStore();
const { cache } = storeToRefs(userCache);
// 正常参数
let highquality: Ref<null | Playlist.playListDetail> = ref(cache.value.songListHighquality ?? null);
let list: Ref<Array<Playlist.playList & { type: number }>> = ref(cache.value.songList ?? []);
let hotTags: Ref<Playlist.Catlist[]> = ref(cache.value.songListHotTags ?? []);
let cat = ref('全部歌单')
let catAll: Ref<Playlist.Catlist | null> = ref(cache.value.songListAll ?? null);
let catSub: Ref<Playlist.Catlist[]> = ref(cache.value.songListSub ?? []);
let panelStatus = ref(false);
// 分页相关参数
let total = ref(cache.value.songListTotal ?? 0)
let per_page = ref(30)
let page = ref(1)


watch(() => cat.value, (value, _oldValue) => {
  page.value = 1
  updateList()
})
watch(() => hotTags.value, (value, _oldValue) => {
  userCache.setSongListHotTags(value)
})
watch(() => catAll.value, (value, _oldValue) => {
  userCache.setSongListAll(value)
})
watch(() => catSub.value, (value, _oldValue) => {
  userCache.setSongListSub(value)
})
watch(() => highquality.value, (value, _oldValue) => {
  if (cat.value == '全部歌单') {
    userCache.setSongListHighquality(value)
  }
})
watch(() => list.value, (value, _oldValue) => {
  if (cat.value == '全部歌单' && page.value == 1) {
    userCache.setSongLists(value)
  }
})
watch(() => total.value, (value, _oldValue) => {
  if (cat.value == '全部歌单') {
    userCache.setSongListTotal(value)
  }
})

onMounted(() => {
  search()

  document.addEventListener('click', (event) => {
    if (!document.getElementById('catlist-button')?.contains(event.target as HTMLElement)) {
      panelStatus.value = false
    }
  })
})

function search() {
  if (hotTags.value.length == 0) {
    api.playlistHot().then(res => {
      hotTags.value = res.tags ?? [];
    })
  }

  if (catSub.value.length == 0) {
    api.playlistCatlist().then(res => {
      catAll.value = res.all
      catSub.value = res.sub
    })
  }

  if (!(cat.value == '全部歌单' && list.value.length > 0)) {
    updateList()
  }
}

// 重新选择歌单分类
function checkCat(newCat: string | undefined) {
  if (newCat) {
    cat.value = newCat

    setTimeout(() => {
      document.getElementById('songSheet-main')?.scrollTo(0, 0)
    }, 500);
  }
}

// 更新歌单数据
function updateList() {
  api.highQualityPlaylist({ cat: cat.value }).then(res => {
    highquality.value = res.playlists[0] ?? null
  })

  updateTopList()
}

function updateTopList() {
  api.topPlaylist({
    cat: cat.value,
    limit: per_page.value,
    offset: (page.value - 1) * per_page.value
  }).then(res => {
    list.value = res.playlists.map(v => { return { picUrl: v.coverImgUrl, ...v, type: 1 } });
    total.value = res.total ?? 0
  })
}

// 显示隐藏歌单分类面板
function show() {
  panelStatus.value = !panelStatus.value
}

// 分页相关
const handleCurrentChange = (val: number) => {
  updateTopList()

  setTimeout(() => {
    document.getElementById('songSheet-main')?.scrollTo(0, 0)
  }, 500);
}

</script>

<style lang="less" scoped>
.highquality-playlist-cover {
  height: 170px;
  width: 100%;
  margin: 15px 0px 10px 0px;
  display: flex;
  border-radius: 7px;
  // object-fit: cover;
  position: relative;
  overflow: hidden;
  background-position: top;
  background-size: 100% 100%;

  .highquality-content {
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: 11;
    display: flex;

    .highquality-image {
      height: 140px;
      width: 140px;
      margin: 15px;

      img {
        width: 100%;
        height: 100%;
        border-radius: 10px;
      }
    }

    .highquality-icon {
      margin: 30px 0px 20px 0px;
      border-style: solid;
      border-color: #e5a859;
      border-width: 2px;
      border-radius: 20px;
      line-height: 28px;
      display: inline-block;
      padding: 0px 15px;
      color: #e5a859;
      font-size: 13px;
    }

    .highquality-name {
      color: #fff;
    }
  }

}

// 背景毛玻璃
.highquality-playlist-cover::before {
  content: "";
  width: 120%;
  height: 120%;
  position: absolute;
  left: -10%;
  top: -10%;
  background: inherit;
  background-size: 140%;
  // background-position: center;
  background-clip: content-box;
  -webkit-filter: blur(10px);
  -moz-filter: blur(10px);
  -ms-filter: blur(10px);
  filter: blur(10px);
}


.highquality-background {
  width: 100%;
  height: 100%;
  position: absolute;
  object-fit: cover;
  border-radius: 7px;
}

.tags {
  display: flex;
  margin: 15px 0;
  justify-content: space-between;
  align-items: center;
  position: relative;

  .catlist {
    border: 1px solid #888888;
    border-radius: 20px;
    padding: 3px 0px;
    min-width: 78px;
    text-align: center;

    color: #181818;
    font-size: 15px;
  }

  .catlist-panel {
    margin-top: 10px;
    max-width: 750px;
    position: absolute;
    z-index: 2;
    border-radius: 3px;
    top: 30px;

    .panel {
      width: 100%;
      height: 100%;
      background-color: #ffffff;
      border-radius: 3px;
      box-shadow: -2px 0px 20px 0px #94929252;
      padding-bottom: 50px;

      .catlist-sub {
        display: flex;

        .sub-title {
          width: 20%;
          min-width: 70px;
          max-width: 100px;
          display: flex;
          color: #9c9c9c;
          font-size: 13px;

          span {
            font-size: 23px;
            margin-right: 5px;
          }
        }

        .catlist-item {
          flex: 1;
          display: flex;
          flex-wrap: wrap;
          padding-bottom: 20px;
          min-width: 60px;

          div {
            width: 16%;
            font-size: 13px;
            margin-bottom: 10px;
            display: flex;
          }
        }
      }
    }
  }

  .highquality {
    color: #888888;
    font-size: 0.625rem;
    max-width: 65%;
    display: flex;
    flex-wrap: wrap;

    div {
      padding: 1px 8px;
      margin: 0px 1px;
      border-radius: 20px;
    }
  }
}

.search-page {
  text-align: center;
  display: flex;
  justify-content: center;

  padding: 10px 0px 0px 0px;
}

.highquality-active {
  color: var(--primary-color);
  background-color: var(--primary-opacity-color);
}

.cat-item {
  border-radius: 15px;
  padding: 1px 8px;
}

.common-padding {
  overflow-y: overlay;
  display: flex;
  width: 100%;
  justify-content: center;
}

.songSheet-body {
  max-width: 1110px;
  width: 100%;
}
</style>