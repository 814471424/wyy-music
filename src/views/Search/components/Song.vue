<template>
  <el-table :data="songList" stripe style="width: 100%" size="small">
    <el-table-column type="index" width="50" />
    <el-table-column prop="name" label="音乐标题" :show-overflow-tooltip=true>
    </el-table-column>
    <el-table-column label="歌手">
      <template #default="scope">
        {{ scope.row.artists.map((v: any) => v.name).join(' / ') }}
      </template>
    </el-table-column>
    <el-table-column prop="address" label="专辑" :show-overflow-tooltip=true>
      <template #default="scope">
        {{ scope.row.album.name }}
      </template>
    </el-table-column>
    <el-table-column label="时长" :show-overflow-tooltip=true>
      <template #default="scope">
        {{ millisecondToTime(scope.row.duration) }}
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { ref, onMounted, } from "vue"
import api from '../../../api/index'
import { millisecondToTime } from '../../../utils/time'

let songList = ref([] as Search.song[])
let page = ref(1);
let per_page = ref(50);
let count = ref(0)
const props = defineProps<{
  keywords: string
}>();

onMounted(async () => {
  setTimeout(() => {
    api.search(
      {
        keywords: props.keywords,
        limit: per_page.value,
        offset: (page.value - 1) * per_page.value
      },
    ).then(res => {
      if (res.code == 200) {
        console.log(res)
        songList.value = res.result.songs ?? []
      }
    })
  }, 500)
})

</script>

<style lang="less" scoped></style>