<template>
    <div class="search-artist" v-for="(item, key) in  props.list" :key="key">
        <div class="search-pic">
            <img class="" :src="item.picUrl" alt="">
        </div>
        <div class="search-name">
            {{ item.name }}
        </div>
        <div class="search-artist">
            <div style="display: flex;"
                v-html="dealKeyword(item.artist.name + (item.artist.trans ? '(' + item.artist.trans + ')' : ''), props.keywords ?? '')">
            </div>

        </div>
    </div>
</template>
  
<script lang="ts" setup>
const props = defineProps<{
    list: Search.album[],
    keywords?: string
}>();

function dealKeyword(data: string, keyword: string): string {
    let key = data;
    if (keyword) {
        key = data.replaceAll(keyword, '<div style="color: #507daf">' + keyword + '</div>');
    }
    return key
}
</script>
  
<style lang="less" scoped>
.search-artist {
    height: 78px;
    display: flex;
    align-items: center;

    .search-pic {
        height: 60px;
        width: 60px;
        margin: 0 15px;

        img {
            height: 100%;
            width: 100%;
            object-fit: cover;
            border-radius: 5px;
        }
    }

    .search-name {
        width: 40%;
        overflow: hidden; // 超出长度的文字隐藏
        text-overflow: ellipsis; // 文字隐藏以后添加省略号
        white-space: nowrap; // 强制不换行
    }

    .search-artist {
        margin-left: 15px;
    }
}

.search-artist:hover {
    background-color: #f5f5f5 !important;
}

.search-artist:nth-child(2n) {
    background-color: #fafafa
}
</style>