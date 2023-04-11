<template>
    <div class="common-padding">
        歌手详情: {{ id }}
    </div>
</template>
  
<script lang="ts" setup>
import router from '../../router/index'

let id = router.currentRoute.value.params['id'] as string

</script>
  
<style lang="less" scoped></style>