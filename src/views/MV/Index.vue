<template>
  <div class="common-padding" style="height: 100%;">
    <div class="common-body">
      <div class="mv-body ">
        <div class="mv-left-body">
          <div class="mv-video">
            <video style="width: 100%;" :src="mvUrl" controls autoplay></video>
          </div>
          <CommentList :list="comments" />
          <!-- <div class="mv-content">
            <van-tabs v-model:active="active" swipeable shrink>
              <van-tab v-for="index in 4" :title="'选项 ' + index">
                <CommentList :list="comments" />
              </van-tab>
            </van-tabs>
          </div> -->
        </div>
        <div class="other-mv">
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, Ref, onMounted } from "vue"
import router from "../../router";
import api from '../../api/index'
import CommentList from '../../components/Common/CommentList.vue'


let mvid = ref(router.currentRoute.value.params['id'] as string)
let mvUrl: Ref<String> = ref('');
let active = ref(0)
const limit = 20;
let page = ref(1);
let before: number = 0;
let comments: Ref<Array<Comment.CommentDetail>> = ref([]);
let hotComments: Ref<Array<Comment.CommentDetail>> = ref([]);

onMounted(() => {
  api.mvUrl(mvid.value).then(res => {
    if (res.code == 200) {
      mvUrl.value = res.data.url
    }
  })

  api.mvDetail(mvid.value).then(res => {
  })

  api.commentMv(mvid.value, { limit, offset: (page.value - 1) * limit }).then(res => {
    console.log(res.comments)
    comments.value = res.comments;
    hotComments.value = res.hotComments
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
  flex: 1;
}

.mv-body .mv-left-body .mv-video {
  width: 100%;
}

.mv-body .other-mv {
  width: 200px;
  background-color: rgb(45, 65, 65);
}


:deep(.van-tabs) {
  height: 100%;

  .van-tabs__content {
    height: calc(100% - 44px);
  }

  .van-tab__panel {
    height: 100%;
    overflow: auto;
  }
}

@media screen and (max-width: 600px) {
  .mv-body {
    // overflow: hidden;
  }

  .mv-body .mv-content {
    flex: 1;
  }

  .common-padding {
    padding: 0px !important;
  }

  :deep(.van-tabs) {
    height: 100%;

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