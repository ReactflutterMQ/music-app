import { computed } from "vue";
import { useStore } from "vuex";
import { save, remove } from "@/assets/js/array-store";
import { FAVORITE_KEY } from "@/assets/js/constant";

export default function useFavorite() {
    const store = useStore()
    const favoriteList = computed(() => store.state.favoriteList)
    const maxLen = 100

    const getFavoriteIcon = (song) => {
        return isFavorite(song) ? 'icon-favorite' : 'icon-not-favorite'
    }

    // 收藏按钮点击
    const toggleFavorite = song => {
        let list
        if (isFavorite(song)) {
            // 移除
            list = remove(FAVORITE_KEY, compare)
        } else {
            // 添加
            list = save(song, FAVORITE_KEY, compare, maxLen)
        }
        store.commit('setFavoriteList', list)

        function compare(item) {
            return item.id === song.id           
        }
    }

    const isFavorite = song => {//判断当前歌曲是否在收藏歌曲中
        return favoriteList.value.findIndex(item => {
            return item.id === song.id
        }) > -1
    }

    return {
        getFavoriteIcon,
        toggleFavorite
    }
}