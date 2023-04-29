<template>
  <div class="common-padding" style="height: 100%;">
    <div class="common-body">
      <div class="mv-body ">
        <div class="mv-left-body">
          <div class="left-back" @click="router.back()">
            <span style="font-size: 0.8rem;" class="iconfont wyy-xiangzuo-a-copy-copy"></span><span>MV详情</span>
          </div>
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
            <div id="mv-comments" style="height: 1px;"></div>
            <div class="mv-comments">
              <div v-if="hotComments.length > 0" class="comments-title">精彩评论</div>
              <CommentList :list="hotComments" />
              <div v-if="comments.length > 0" class="comments-title">最新评论<span>({{ total }})</span></div>
              <CommentList :list="comments" />
            </div>
            <div style="width: 100%; justify-content: center; display: flex;">
              <el-pagination v-if="total != 0" small background layout="prev, pager, next" :total="total"
                v-model:page-size="limit" v-model:current-page="page" class="mt-4" />
            </div>
            <div style="height: 20px;"></div>
          </div>
        </div>
        <div class="other-mv">
          <div style="font-weight: 600; font-size: 1.1rem; margin-bottom: 13px;">相关推荐</div>
          <div class="other-item" v-for="(item, key) in recommendList.filter(v => v.type == 1)" :key="key">
            <div class="other-cover">
              <img class="other-image" v-lazy="item.data.coverUrl" alt="">
            </div>
            <div class="other-content">
              <div class="other-title">{{ item.data.title }}</div>
              <div class="other-name">by {{ item.data.creator.nickname }}</div>
            </div>
          </div>
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
import { useMainStore } from "../../store";

const mainStore = useMainStore();
let mvid = ref(router.currentRoute.value.params['id'] as string)
let mvUrl: Ref<string> = ref('');
const limit = 20;
let page = ref(1);
let total = ref(0)
let before: number | undefined = undefined;
let comments: Ref<Array<Comment.CommentDetail>> = ref([]);
let hotComments: Ref<Array<Comment.CommentDetail>> = ref([]);
let mvDetail: Ref<MV.mvDetail | null> = ref(null)
let recommendList: Ref<Array<MV.videoRecommend>> = ref([]);

watch(() => page.value, () => {
  api.commentMv(mvid.value, { limit, offset: (page.value - 1) * limit, before }).then(res => {
    comments.value = res.comments;
    hotComments.value = res.hotComments ?? [];
    total.value = res.total
  })

  document.querySelector('#mv-comments')?.scrollIntoView()
})

onMounted(() => {
  mainStore.setPlayStatus(false);

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

  api.videoTimelineRecommend({}).then(res => {
    recommendList.value = res.datas ?? []
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
  width: 240px;
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
      padding: 3px 10px;
      background-color: #f7f7f7;
      margin-right: 5px;
      border-radius: 9px;
      font-size: 0.8rem;
      color: #313131;
    }
  }
}


.other-mv {
  margin-left: 10px;

  div {
    margin-bottom: 10px;
  }

  .other-item {
    display: flex;
    height: 80px;
    align-items: center;

    .other-cover {
      width: 130px;
      flex-shrink: 0;

      .other-image {
        width: 100%;
        border-radius: 5px;
      }
    }

    .other-content {
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      flex: 1;
      padding-left: 5px;
    }

    .other-content .other-title {
      font-size: 0.8rem;

      // 标题最多两行
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .other-content .other-name {
      font-size: 0.7rem;
      color: #999;

      // 标题最多两行
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}

.mv-comments .comments-title {
  font-size: 0.9rem;
  font-weight: 600;
}

.left-back {
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 10px;
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
}

@media screen and (max-width: 1000px) {
  .mv-body .mv-left-body {
    width: 100%;
  }

  .mv-body .other-mv {
    display: none;
  }

  .left-back {
    display: none;
  }
}
</style>