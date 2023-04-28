<template>
  <div class="common-padding" style="height: 100%;">
    <div class="common-body">
      <div class="mv-body ">
        <div class="mv-left-body">
          <div class="mv-video">
            <video style="width: 100%;" :src="mvUrl" :poster="mvDetail?.cover" controls autoplay></video>
          </div>
          <div class="mv-content">
            <div class="mv-detail">
              <div class="mv-artist">
                <img :src="mvDetail?.artists[0].img1v1Url" alt="">
                <span class="artist-name"> {{ mvDetail?.artists.map(v => v.name).join(' / ') }}</span>
              </div>
              <div class="mv-name">{{ mvDetail?.name }}</div>
              <div class="mv-time">
                <span>发布: {{ mvDetail?.publishTime }}</span>
                <span style="margin-left: 20px;">播放: {{ handlePlayCount(mvDetail?.playCount ?? 0) }}次</span>
              </div>
              <div class="mv-group">
                <div class="mv-group-name" v-for="item in mvDetail?.videoGroup" :key="item.id">{{ item.name }}</div>
              </div>
              <div class="mv-desc">{{ mvDetail?.desc }}</div>
            </div>
            <div class="mv-comments">
              <div v-if="hotComments.length > 0">精彩评论</div>
              <CommentList :list="hotComments" />
              <div v-if="hotComments.length > 0">最新评论<span>({{ total }})</span></div>
              <CommentList :list="comments" />
            </div>
            <van-pagination v-model="page" :total-items="total" :items-per-page="limit" />
            <!-- <van-tabs v-model:active="active" swipeable shrink>
              <van-tab :title="'简介'" name="info">
                内容
              </van-tab>
              <van-tab :title="'评论(' + total + ')'" name="comments">
                <CommentList class="commom-padding" :list="comments" />
              </van-tab>
            </van-tabs> -->
          </div>
        </div>
        <div class="other-mv">
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, Ref, onMounted, watch } from "vue"
import router from "../../router";
import api from '../../api/index'
import CommentList from '../../components/Common/CommentList.vue'
import { handlePlayCount } from '../../utils/handle'

let mvid = ref(router.currentRoute.value.params['id'] as string)
let mvUrl: Ref<string> = ref('');
// let active = ref('info')
const limit = 20;
let page = ref(1);
let total = ref(0)
let before: number | undefined = undefined;
let comments: Ref<Array<Comment.CommentDetail>> = ref([]);
let hotComments: Ref<Array<Comment.CommentDetail>> = ref([]);
let mvDetail: Ref<MV.mvDetail | null> = ref(null)

watch(() => page.value, () => {
  api.commentMv(mvid.value, { limit, offset: (page.value - 1) * limit, before }).then(res => {
    comments.value = res.comments;
    hotComments.value = res.hotComments ?? [];
    total.value = res.total
  })
})

onMounted(() => {
  api.mvUrl(mvid.value).then(res => {
    mvUrl.value = res.data.url
  })

  api.mvDetail(mvid.value).then(res => {
    mvDetail.value = res.data
  })

  api.commentMv(mvid.value, { limit, offset: (page.value - 1) * limit, before }).then(res => {
    comments.value = res.comments;
    hotComments.value = res.hotComments ?? [];
    total.value = res.total
  })
})

</script>

<style lang="less" scoped>
.mv-body {
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
}

.mv-body .mv-left-body {
  display: flex;
  flex-direction: column;
  width: calc(100% - 230px);
}

.mv-body .mv-left-body .mv-video {
  width: 100%;
}

.mv-body .other-mv {
  width: 230px;
  background-color: rgb(45, 65, 65);
}

.mv-body .mv-content {
  width: 100%;
  position: relative;
}

.mv-body .mv-content .mv-detail {
  padding: 10px 0px;

  .mv-artist {
    display: flex;
    align-items: center;

    img {
      width: 45px;
      height: 45px;
      border-radius: 50%;

    }

    .artist-name {
      margin-left: 10px;
      font-size: 0.8rem;
      color: rgb(105, 105, 105);
    }
  }

  .mv-name {
    font-size: 1.3rem;
    font-weight: 600;
    margin: 20px 0px 10px 0px;
  }

  .mv-time {
    font-size: 0.7rem;
    color: rgb(169, 169, 169);
  }

  .mv-desc {
    margin: 10px 0px;
    font-size: 0.8rem;
    color: #333333;
  }

  .mv-group {
    margin: 10px 0px;
    display: flex;
    align-items: center;

    .mv-group-name {
      padding: 5px 10px;
      background-color: #f7f7f7;
      margin-right: 5px;
      border-radius: 155px;
      font-size: 0.8rem;
      color: #313131;
    }
  }
}

:deep(.van-tabs) {
  .van-tabs__content .van-swipe {
    cursor: default;
  }

  .van-tabs__nav--line .van-tabs__line {
    background: var(--primary-color);
  }
}

@media screen and (max-width: 600px) {
  .mv-body {
    overflow: hidden;
  }

  .mv-body .mv-left-body {
    height: 100%;
  }

  .mv-body .mv-content {
    flex: 1;
    overflow-y: overlay;
    overflow-x: overlay;
    padding: 0px 10px;
    box-sizing: border-box;
  }

  .common-padding {
    padding: 0px !important;
  }

  :deep(.van-tabs) {
    height: 100%;
    overflow: hidden;

    .van-tabs__content {
      height: calc(100% - 44px);
      overflow: auto;
    }

    .van-tab__panel {
      height: 100%;
      overflow: auto;
    }
  }
}

@media screen and (max-width: 1000px) {
  .mv-body .mv-left-body {
    width: 100%;
  }

  .mv-body .other-mv {
    display: none;
  }
}
</style>