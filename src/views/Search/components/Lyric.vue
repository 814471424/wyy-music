<template>
  <el-table :data="tableData" stripe style="width: 100%" size="large">
    <el-table-column type="index" width="50" />
    <el-table-column prop="date" label="音乐标题" />
    <el-table-column prop="name" label="歌手" />
    <el-table-column prop="name" label="专辑" />
    <el-table-column prop="address" label="时长" />
  </el-table>
</template>

<script lang="ts" setup>
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
</script>

<style lang="less" scoped></style>