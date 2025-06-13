<template>
    <div class="search">
        <div class="search-input-wrapper">
            <search-input v-model="query"></search-input>
        </div>
        <scroll ref="scrollRef" class="search-content" v-show="!query">
            <div>
                <div class="hot-keys">
                    <h1 class="title">热门搜索</h1>
                    <ul>
                        <li class="item" v-for="item in hotKeys" :key="item.id" @click="addQuery(item.key)">
                            <span>{{ item.key }}</span>
                        </li>
                    </ul>
                </div>
                <div class="search-history" v-show="searchHistory.length">
                    <h1 class="title">
                        <span class="text">搜索历史</span>
                        <span class="clear" @click="showConfirm">
                            <i class="icon-clear"></i>
                        </span>
                    </h1>
                    <confirm
                     ref="confirmRef"
                     text="是否清空所有搜索历史"
                     confirm-btn-text="清空"
                     @confirm="clearSearch"
                    ></confirm>
                    <search-list :searches="searchHistory" @select="addQuery" @delete="deleteSearch"></search-list>
                </div>
            </div>
        </scroll>
        <div class="search-result" v-show="query">
            <suggest :query="query" @select-song="selectSong" @select-singer="selectSinger"></suggest>
        </div>
        <router-view v-slot="{ Component }">
            <transition appear name="slide">
                <component :is="Component" :data="selectedSinger" />
            </transition>
        </router-view>
    </div>
</template>

<script setup>
import { ref, watch, computed, nextTick } from 'vue'
import SearchInput from '@/components/Search/search-input.vue'
import Suggest from '@/components/Search/suggest.vue'
import searchList from '@/components/base/search-list/search-list.vue'
import Confirm from '@/components/base/confirm/confirm.vue'
import { getHotKeys } from '@/request/searchApis';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import storage from 'good-storage';
import { SINGER_KEY } from '@/assets/js/constant';
import useSearchHistory from '@/components/Search/use-search-history';
import Scroll from '@/components/wrap-scroll';
// data
const query = ref('')
const hotKeys = ref([])
const selectedSinger = ref(null)
const scrollRef = ref(null)
const confirmRef = ref(null)

const store = useStore()
const router = useRouter()

const { saveSearch, deleteSearch, clearSearch } = useSearchHistory()

const searchHistory = computed(() => store.state.searchHistory)

getHotKeys().then(res => {
    hotKeys.value = res.hotKeys
})

watch(query, async (newQuery) => {
    if (!newQuery) {
        await nextTick()
        refreshScroll()
    }
})

function refreshScroll() {
    scrollRef.value.scroll.refresh()   
}

function addQuery(s) {
    query.value = s
}

function selectSong(song) {
    saveSearch(query.value)
    store.dispatch('addSong', song)
}

function selectSinger(singer) {
    saveSearch(query.value)

    selectedSinger.value = singer
    cacheSinger(singer)
    router.push(`/search/${singer.mid}`)
}

function cacheSinger(singer) {
    storage.session.set(SINGER_KEY, singer)
}

function showConfirm() {
    confirmRef.value.show()   
}

// watch
watch(query, (val) => {
    console.log(val);
})
</script>

<style lang="less" scoped>
.search {
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
    display: flex;
    flex-direction: column;
    .search-input-wrapper {
        margin: 20px;
    }
    .search-content {
        flex: 1;
        overflow: hidden;
        .hot-keys {
            margin: 0 20px 20px 20px;
            .title {
                margin-bottom: 20px;
                font-size: 14px;
                color: rgba(255, 255, 255, 0.5);
            }
            .item {
                display: inline-block;
                padding: 5px 10px;
                margin: 0 20px 10px 0;
                border-radius: 6px;
                background: #333;
                font-size: 14px;
                color: rgba(255, 255, 255, 0.3);
            }
            .item:active {
                background: #fff;
                color: #333;
            }
        }
        .search-history {
            position: relative;
            margin: 0 20px;
            .title {
                display: flex;
                align-items: center;
                height: 40px;
                font-size: 14px;
                color: rgba(255, 255, 255, 0.5);
                .text {
                    flex: 1;
                }
                .clear {
                    @include extend-click();

                    .icon-clear {
                        font-size: 14px;
                        color: rgba(255, 255, 255, 0.3);
                    }
                }
            }
        }
    }
    .search-result {
        flex: 1;
        overflow: hidden;
    }
}
</style>