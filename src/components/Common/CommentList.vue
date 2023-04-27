<template>
  <div class="comment-body" v-for="(item, key) in props.list" :key="key">
    <div class="comment-avatar">
      <img :src="item.user.avatarUrl" alt="">
    </div>
    <div>
      <div class="comment-list">
        <div>
          <span class="comment-nickname">{{ item.user.nickname }}</span>
          <span class="comment-content"> : {{ item.content }}</span>
        </div>
        <div class="comment-beReplied" v-if="item.beReplied.length > 0">
          <div v-for="(v, k) in item.beReplied" :key="k">
            <span class="comment-nickname">{{ v.user.nickname }}</span>
            <span class="comment-content"> : {{ v.content }}</span>
          </div>
        </div>
      </div>
      <div>
        <div class="comment-time"> {{ millisecondToDateTime(item.time, item.timeStr) }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  list: Comment.CommentDetail[]
}>()

/**
 * 时间格式 时间戳转换成 0000年00月00 00:00 格式
 * @param value 时间戳(毫秒)
 */
function millisecondToDateTime(value: number, timeStr = "") {
  const nowDate = new Date()
  if (nowDate.getTime() < (value + 24 * 60 * 60 * 1000)) {
    return timeStr
  }


  const datetime = new Date(value);
  const year = datetime.getFullYear();
  const month = datetime.getMonth() + 1;
  const date = datetime.getDate();
  let hour: number | string = datetime.getHours();
  hour = hour > 10 ? hour : '0' + hour;
  let minute: string | number = datetime.getMinutes();
  minute = minute > 10 ? minute : '0' + minute;
  if (nowDate.getFullYear() == year) {
    return month + '月' + date + '日 ' + hour + ':' + minute
  } else {
    return year + '年' + month + '月' + date + '日 ' + hour + ':' + minute
  }
}

</script>

<style lang="less" scoped>
.comment-body {
  padding: 10px 5px 10px 0px;
  display: flex;
}

.comment-avatar {
  width: 35px;
  height: 35px;
  margin-right: 15px;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}

.comment-body .comment-list {
  div {
    margin-bottom: 5px;
  }
}

.comment-beReplied {
  padding: 5px;
  background-color: #cfcfcf43;
  border-radius: 7px;
}

.comment-content {
  font-size: 0.8rem;
  color: #555555;
}

.comment-nickname {
  font-size: 0.8rem;
  color: #3d6086;
}

.comment-time {
  font-size: 0.85rem;
  color: #898989;
}
</style>