// 引入全局样式文件
import '@/assets/less/index.less'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'
import lazyPlugin from 'vue3-lazy'

import lazy_img from '@/assets/images/default.png'

import loadingDirective from './components/base/loading/directive'
import noResultDirective from './components/base/no-result/directive'
import { load, saveAll } from './assets/js/array-store'
import { FAVORITE_KEY, PLAY_KEY } from './assets/js/constant'
import { processSongs } from './request/songApis'

const favoriteSongs = load(FAVORITE_KEY)
if (favoriteSongs.length > 0) {
    processSongs(favoriteSongs).then(songs => {
        store.commit('setFavoriteList', songs)
        saveAll(songs, FAVORITE_KEY)
    })
}

const historySongs = load(PLAY_KEY)
if (historySongs.length > 0) {
    processSongs(historySongs).then(songs => {
        store.commit('setPlayHistory', songs)
        saveAll(songs, PLAY_KEY)
    })
}

const app = createApp(App)

app.use(router)
app.use(store)

app.use(lazyPlugin, {loading: lazy_img})
.directive('loading',loadingDirective)
.directive('no-result', noResultDirective)
.mount('#app')
