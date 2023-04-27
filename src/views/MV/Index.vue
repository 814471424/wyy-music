<template>
  <div class="common-padding" style="height: 100%;">
    <div class="common-body">
      <div class="mv-body ">
        <div class="mv-left-body">
          <div class="mv-video">
            <video style="width: 100%;" :src="mvUrl" controls autoplay></video>
          </div>
          <CommentList :list="comments" />
          <!-- <div class="mv-body">
            <van-tabs v-model:active="active" swipeable shrink sticky>
              <van-tab v-for="index in 4" :title="'选项 ' + index">
                内容 {{ index }}
                <div v-for="i in 100"> {{ i }}</div>
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
let mvUrl: Ref<String | null> = ref(null);
let active = ref(0)
const limit = 20;
let page = ref(1);
let before: number | undefined = undefined;
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

  api.commentMv(mvid.value, { limit, offset: (page.value - 1) * limit, before }).then(res => {
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
  background-color: aqua;
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
    overflow: hidden;
  }

  .common-padding {
    padding: 0px !important;
  }
}

@media screen and (max-width: 1000px) {
  .mv-body .other-mv {
    display: none;
  }
}
</style>