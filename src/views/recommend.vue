<template>
    <div class="recommend" v-loading="loading">
        <scroll class="recommend-content">
            <div>
                <div class="slider-wrapper">
                    <div class="slider-content">
                        <slider v-if="recomData.sliders.length" :sliders="recomData.sliders"></slider>
                    </div>
                </div>
                <div class="recommend-list">
                    <h1 class="list-title" v-show="!loading">热门歌曲推荐</h1>
                    <ul>
                        <li v-for="item in recomData.albums" class="item" :key="item.id" @click="selectItem(item)">
                            <div class="icon">
                                <img width="60" height="60" v-lazy="item.pic" alt="">
                            </div>
                            <div class="text">
                                <h2 class="name">
                                    {{ item.username }}
                                </h2>
                                <p class="title">
                                    {{ item.title }}
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </scroll>
        <router-view v-slot="{ Component }">
            <transition appear name="slide">
                <component :is="Component" :data="recomData.selectedAlbum" />
            </transition>
        </router-view>
    </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue';
import { getRecommend } from '@/request/recommendApis';
import slider from '@/components/base/slider/slider.vue'
import scroll from '@/components/wrap-scroll'
import storage from 'good-storage';
import { ALBUM_KEY } from '@/assets/js/constant';
import { useRouter } from 'vue-router';
const router = useRouter()
// data
const recomData = reactive({
    sliders: [],
    albums: [],
    selectedAlbum: null
})
// methods
const selectItem = (album) => {
    // console.log('album', album.id);
    recomData.selectedAlbum = album
    cacheAlbum(album)
    router.push(`/recommend/${album.id}`)
}
const cacheAlbum = (album) => {
    storage.session.set(ALBUM_KEY, album)
}
// mounted
onMounted(async () => {
    let res = await getRecommend()
    recomData.sliders = res.sliders
    recomData.albums = res.albums
})
</script>

<style lang="less" scoped>
.recommend {
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
    overflow: scroll;
    .recommend-content {
        height: 100%;
        overflow: hidden;
        .slider-wrapper {
            position: relative;
            width: 100%;
            height: 0;
            padding-top: 40%;
            overflow: hidden;
            .slider-content {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
            }
        }
        .recommend-list {
            .list-title {
                height: 65px;
                line-height: 65px;
                text-align: center;
                font-size: 14px;
                color: #ffcd32;
            }
            .item {
                display: flex;
                box-sizing: border-box;
                align-items: center;
                padding: 0 20px 20px 20px;
                .icon {
                    flex: 0 0 60px;
                    width: 60px;
                    padding-right: 20px;
                }
                .text {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    flex: 1;
                    line-height: 20px;
                    overflow: hidden;
                    font-size: 14px;
                }
                .name {
                    margin-bottom: 10px;
                    color: #fff;
                }
                .title {
                    color: rgba(255, 255, 255, 0.3);
                }
            }
        }
    }
}
</style>
