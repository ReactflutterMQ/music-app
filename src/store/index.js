import { createLogger, createStore } from "vuex";
import VuexPersistence from "vuex-persist";
import state from "./state";
import mutations from './mutations'
import * as getters from './getters'
import * as actions from './actions'
// 引入vuex持久化存储
const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
    reducer: (state) => ({pic: state.pic})//指定只持久化存储歌手详情图
})

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
    state,
    getters,
    mutations,
    actions,
    strict: debug,
    plugins: debug ? [createLogger(), vuexLocal.plugin] : [vuexLocal.plugin]
})
