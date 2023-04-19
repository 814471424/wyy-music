<template>
  <!-- 精品歌单推荐封面 -->
  <div class="highquality-playlist-cover" :style="'background-image: url(' + highquality?.coverImgUrl + ');'"
    v-if="highquality">
    <div class="highquality-content">
      <div class="highquality-image">
        <img v-lazy="highquality.coverImgUrl" alt="">
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
      <div class="catlist-panel" v-if="panelStatus">
        <div class="panel">
          <div style="padding: 20px; display: flex;">
            <div :class="['cat-item', { 'highquality-active': catAll?.name == cat }]" @click="checkCat(catAll?.name)">{{
              catAll?.name }}</div>
          </div>
          <div class="common-line-style"></div>
          <div style="padding: 20px;">
            <div class="catlist-sub">
              <div class="sub-title"><span class="iconfont wyy-yuzhongguanli"></span>语种</div>
              <div class="catlist-item">
                <div v-for="(item, key) in catSub.filter(v => v.category == 0)" :key="item.imgId">
                  <span :class="['cat-item', { 'highquality-active': item.name == cat }]" @click="checkCat(item.name)">{{
                    item.name
                  }}</span>
                </div>
              </div>
            </div>
            <div class="catlist-sub">
              <div class="sub-title"><span class="iconfont wyy-gangqin"></span>风格</div>
              <div class="catlist-item">
                <div v-for="(item, key) in catSub.filter(v => v.category == 1)" :key="item.imgId">
                  <span :class="['cat-item', { 'highquality-active': item.name == cat }]" @click="checkCat(item.name)">{{
                    item.name
                  }}</span>
                </div>
              </div>
            </div>
            <div class="catlist-sub">
              <div class="sub-title"><span class="iconfont wyy-coffekafei"></span>场景</div>
              <div class="catlist-item">
                <div v-for="(item, key) in catSub.filter(v => v.category == 2)" :key="item.imgId">
                  <span :class="['cat-item', { 'highquality-active': item.name == cat }]" @click="checkCat(item.name)">{{
                    item.name
                  }}</span>
                </div>
              </div>
            </div>
            <div class="catlist-sub">
              <div class="sub-title"><span class="iconfont wyy-xiaolian"></span>情感</div>
              <div class="catlist-item">
                <div v-for="(item, key) in catSub.filter(v => v.category == 3)" :key="item.imgId">
                  <span :class="['cat-item', { 'highquality-active': item.name == cat }]" @click="checkCat(item.name)">{{
                    item.name
                  }}</span>
                </div>
              </div>
            </div>
            <div class="catlist-sub">
              <div class="sub-title"><span class="iconfont wyy-zhuti"></span>主题</div>
              <div class="catlist-item">
                <div v-for="(item, key) in catSub.filter(v => v.category == 4)" :key="item.imgId">
                  <span :class="['cat-item', { 'highquality-active': item.name == cat }]" @click="checkCat(item.name)">{{
                    item.name
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="highquality">
      <div @click="checkCat(item.name ?? '')" :class="[{ 'highquality-active': item.name == cat }]"
        v-for="(item, key) in hotTags" :key="key">
        {{ item.name }}
      </div>
    </div>
  </div>
  <div>
    <SongGridItem :list="list" />
  </div>
  <div class="search-page">
    <el-pagination small background layout="prev, pager, next" :total="total" v-model:page-size="per_page"
      v-model:current-page="page" @current-change="handleCurrentChange" class="mt-4" />
  </div>
</template>

<script lang="ts" setup>
import { Ref, onMounted, ref, watch } from "vue"
import SongGridItem from '../../../components/Common/SongGridItem.vue'
import api from '../../../api/index'

let highquality: Ref<null | Playlist.playListDetail> = ref(null);
let list: Ref<Playlist.playList[]> = ref([]);
let hotTags: Ref<Playlist.Catlist[]> = ref([]);
let cat = ref('全部歌单')
let catAll: Ref<Playlist.Catlist | null> = ref(null);
let catSub: Ref<Playlist.Catlist[]> = ref([]);
let panelStatus = ref(false);
let total = ref(100)
let per_page = ref(50)
let page = ref(1)

onMounted(() => {
  search()
})

watch(() => cat.value, (value, _oldValue) => {
  updateList()

  document.addEventListener('click', (event) => {
    if (!document.getElementById('catlist-button')?.contains(event.target as HTMLElement)) {
      panelStatus.value = false
    }
  })
})

function search() {
  api.playlistHot().then(res => {
    hotTags.value = res.tags ?? [];
  })
  api.playlistCatlist().then(res => {
    catAll.value = res.all
    catSub.value = res.sub
  })

  updateList()
}

// 重新选择歌单分类
function checkCat(newCat: string | undefined) {
  if (newCat) {
    cat.value = newCat
  }

  document.documentElement.scrollTo(0, 0);
}

// 更新歌单数据
function updateList() {
  api.highQualityPlaylist({ cat: cat.value }).then(res => {
    highquality.value = res.playlists[0] ?? null
  })

  api.topPlaylist({ cat: cat.value }).then(res => {
    list.value = res.playlists.map(v => { return { picUrl: v.coverImgUrl, ...v, itemType: 1 } });
  })
}

// 显示隐藏歌单分类面板
function show() {
  panelStatus.value = !panelStatus.value
}

// 分页相关
function handleCurrentChange() { }

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

  .catlist {
    border: 1px solid #888888;
    border-radius: 20px;
    padding: 3px 0px;
    min-width: 78px;
    text-align: center;

    color: #181818;
    font-size: 15px;


    .catlist-panel {
      margin-top: 10px;
      max-width: 750px;
      left: 0.16px;
      // width: 100%;
      position: absolute;
      z-index: 2;
      border-radius: 3px;

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

  margin: 10px 0px 30px 0px;
}

.highquality-active {
  color: var(--primary-color);
  background-color: var(--primary-opacity-color);
}

.cat-item {
  border-radius: 15px;
  padding: 1px 8px;
}
</style>