import { PLAY_MODE, SEARCH_KEY } from "@/assets/js/constant"
import { load } from "@/assets/js/array-store"

const state = {
    sequenceList: [],
    playlist: [],
    playing: false,//是否正在播放
    playModel: PLAY_MODE.sequence,
    currentIndex: 0,
    fullScreen: false,
    favoriteList: [],//收藏列表
    searchHistory: load(SEARCH_KEY),
    playHistory: []
}
export default state