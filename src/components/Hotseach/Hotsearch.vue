<template>
    <div class="hotSearch" v-loading="loading">
        <span class="hot_key" v-for="item in hotkeys" :key="item.id">{{ item.key }}</span>
    </div>
</template>

<script setup>
import { getHotKeys } from '../../request/searchApis'
import { onMounted, ref, computed } from 'vue';
const hotkeys = ref([])//热门搜索关键词

const loading = computed({
    get() {
        return !hotkeys.value.length
    }
})

onMounted(async () => {
    let res = await getHotKeys()
    console.log(res);
    hotkeys.value = res.hotKeys
})
</script>

<style lang="less" scoped>
.hotSearch {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    width: 90%;
    margin: 0 auto;
    .hot_key {
        padding: 3px 10px;
        margin: 0 20px 10px 0;
        box-sizing: border-box;
        background-color: #2d2d2d;
        border-radius: 5px;
        color: #565656;
        font-weight: bold;
    }
    .hot_key:active {
        background-color: #fff;
    }
}
</style>