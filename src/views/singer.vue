<template>
  <div class="singer" v-loading="!singers.length">
    <index-list
        :data="singers"
        @select="selectSinger"
    ></index-list>
    <router-view v-slot="{ Component }">
      <transition appear name="slide">
        <component :is="Component" :data="selectedSinger"/>
      </transition>
    </router-view>
  </div>
</template>

<script>
import storage from "good-storage";
import {SINGER_KEY} from "@/assets/js/constant";
import {getSingerList} from '@/request/singerApis';
import IndexList from '@/components/index-list/index-list.vue'

export default {
  name: 'singer',
  components: {
    IndexList
  },
  data() {
    return {
      singers: [],
      selectedSinger: null
    }
  },
  async created() {
    const result = await getSingerList()
    this.singers = result.singers
  },
  methods: {
    selectSinger(singer) {
      this.selectedSinger = singer
      this.cacheSinger(singer)
      this.$router.push({
        path: `/singer/${singer.mid}`,
      })
    },
    cacheSinger(singer) {
      storage.session.set(SINGER_KEY, singer)
    }
  }
}
// import { onMounted, ref, computed } from 'vue';
// import { getSingerList } from '@/request/singerApis';
// import { useRouter } from 'vue-router';
// import { useStore } from 'vuex';
// import storage from 'good-storage';
// import { SINGER_KEY } from '@/assets/js/constant';
// const singerList = ref([])//接受返回的所有歌手数据
// const indexTitle = ref([]) //接收所有返回的标题索引
// const selectedSinger = ref(null) //接收选择的歌手数据
// const router = useRouter()
// const store = useStore()

// const loading = computed({
//     get() {
//         return !singerList.value.length
//     }
// })
// const toSingerDetail = singers => { 
//     store.commit('setPic', singers.pic)
//     selectedSinger.value = singers
//     cacheSinger(singers)
//     router.push({
//         path: `/singer/${singers.mid}`,
//     })
// }

// const cacheSinger = singer => {
//     storage.session.set(SINGER_KEY, singer)
// }

// onMounted(async () => {
//     let res = await getSingerList()
//     singerList.value = res.singers
//     singerList.value.forEach(e => {
//         indexTitle.value.push(e.title)
//     });
// })
</script>

<style lang="less" scoped>
.singer {
  position: fixed;
  width: 100%;
  top: 90px;
  bottom: 0;
}
</style>