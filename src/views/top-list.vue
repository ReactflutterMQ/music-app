<template>
    <div class="top-list" v-loading="loading">
        <scroll class="top-list-content">
            <ul>
                <li class="item" v-for="item in top_List" :key="item.id" @click="selectItem(item)">
                    <div class="icon">
                        <img width="100" height="100" v-lazy="item.pic" />
                    </div>
                    <ul class="song-list">
                        <li class="song" v-for="(song, index) in item.songList" :key="song.id">
                            <span>{{ index + 1 }}. </span>
                            <span>{{ song.songName }}-{{ song.singerName }}</span>
                        </li>
                    </ul>
                </li>
            </ul>
        </scroll>
        <router-view v-slot="{ Component }">
            <transition appear name="slide">
                <component :is="Component" :data="selectedTop" />
            </transition>
        </router-view>
    </div>
</template>

<script setup>
import Scroll from '@/components/wrap-scroll';
import { onMounted, ref, computed } from 'vue'
import { getTopList } from '@/request/top-list'
import { TOP_KEY } from '@/assets/js/constant';
import storage from 'good-storage';
import { useRouter } from 'vue-router';
const router = useRouter()
// data
const top_List = ref([]) //排行榜
const selectedTop = ref(null)
// computed
const loading = computed({
    get() {
        return !top_List.value.length
    }
})
// methods
const selectItem = (item) => {
    selectedTop.value = item
    cacheTop(item)
    router.push(`/top-list/${item.id}`)
}
const cacheTop = (item) => {
    storage.session.set(TOP_KEY, item)
}
// mounted
onMounted(async () => {
    let res = await getTopList()
    console.log(res);
    top_List.value = res.topList
})
</script>

<style lang="less" scoped>
.top-list {
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
    .top-list-content {
      height: 100%;
      overflow: hidden;
      .item {
        display: flex;
        margin: 0 20px;
        padding-top: 20px;
        height: 100px;
        &:last-child {
          padding-bottom: 20px;
        }
        .icon {
          flex: 0 0 100px;
          width: 100px;
          height: 100px;
        }
        .song-list {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 20px;
          height: 100px;
          overflow: hidden;
          background: #333;
          color: rgba(255, 255, 255, 0.3);
          font-size: 12px;
          .song {
            white-space: nowrap;
            line-height: 26px;
            text-overflow: ellipsis;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>