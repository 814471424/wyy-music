<template>
  <el-table :data="props.list" stripe style="width: 100%" size="small" @row-dblclick="tableDbClick">
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
import { millisecondToTime } from '../../../utils/time'
import { playOne } from "../../../utils/player";
import { onMounted } from 'vue';

const props = defineProps<{
  list: Search.song[]
}>();

function tableDbClick(value: Common.songX) {
  playOne(value);
}

onMounted(() => {
  console.log(props.list)
})

</script>

<style lang="less" scoped></style>