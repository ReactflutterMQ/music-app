<template>
    <div class="music_list">
        <!-- <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad"> -->
            <div class="list_content" v-for="item in hotmusic" :key="item" :title="item">
                <img style="width: 70px;" v-lazy="item.pic" alt="" />
                <div class="right">
                    <span class="username">{{ item.username }}</span>
                    <span class="title">{{ item.title }}</span>
                </div>
            </div>
        <!-- </van-list> -->
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { getRecommend } from '@/request/recommendApis';
const hotmusic = ref([])    //热门歌单推荐

onMounted(async () => {
    let res = await getRecommend()
    hotmusic.value = res.albums
})

const list = ref([]);
// const loading = ref(false);
// const finished = ref(false);
// const num = ref(0)

// const onLoad = async () => {
//     let res = await getRecommend()
//     // 异步更新数据
//     setTimeout(() => {
//         for (let i = 0; i < 5; i++) {
//             // 数据全部加载完成
//             if (list.value.length >= res.albums.length) {
//                 num.value = 0
//                 finished.value = true;
//                 return
//             }
//             list.value.push(hotmusic.value[num.value]);
//             num.value = num.value + 1
//         }
//         // 加载状态结束
//         loading.value = false;
//     }, 1000);
// };
</script>

<style lang="less" scoped>
    .list_content:first-of-type {
        margin: 0 auto;
    }
    .list_content {
        display: flex;
        width: 88%;
        margin: 22px auto;
        .list_content:first-of-type {
            margin: 0 auto;
        }
        .right {
            margin-left: 7%;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            .title {
                color: #4e4e4e;
                font-weight: 600;
            }
        }
    }
</style>