<template>
    <div class="common-padding">
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane label="下载管理" name="download">暂无功能</el-tab-pane>
            <el-tab-pane label="本地音乐" name="local">
                <Local />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import Local from './Local.vue'

const activeName = ref('local')

const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event)
}
</script>
<style lang="less" scoped>
:deep(.el-tabs__header) {
    margin-bottom: 17px;
}

:deep(.el-tabs__item) {
    font-size: 15px;
    color: black;
}

:deep(.is-active) {
    font-weight: 900;
    color: #000;
    font-size: 20px;
}

:deep(.el-tabs__item:hover) {
    color: #000;
}

:deep(.el-tabs__item.is-active) {
    color: #000;
}

:deep(.el-tabs__active-bar) {
    background-color: red;
}

:deep(.el-tabs__nav-wrap::after) {
    height: 0px;
}
</style>