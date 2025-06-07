<template>
  <div class="music-list">
    <div class="back" @click="goBack">
      <i class="icon-back"></i>
    </div>
    <h1 class="title">{{ props.title }}</h1>
    <div class="bg-image" :style="bgImageStyle" ref="bgImage">
      <div class="play-btn-wrapper" :style="playBtnStyle">
        <div v-show="props.songs.length > 0" class="play-btn" @click="random">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter" :style="filterStyle"></div>
    </div>

    <scroll class="list" :style="scrollStyle" v-loading="props.loading" v-no-result:[props.noResultText]="noResult"
      :probe-type="3" @scroll="onScroll">
      <div class="song-list-wrapper">
        <songList @select="selectItem" :songs="props.songs" :rank="props.rank"></songList>
      </div>
    </scroll>
  </div>
</template>

<script setup>
import Scroll from '@/components/wrap-scroll';
import songList from '../song-list/song-list.vue';
import { onMounted, defineProps, ref, computed, reactive } from 'vue'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
// data
const store = useStore()
const router = useRouter()
const bgImage = ref(null)

const RESERVED_HEIGHT = 40

const BGstyle = reactive({
  imageHeight: 0,
  scrollY: 0,
  maxTranslateY: 0
})
// props
const props = defineProps({
  songs: {
    type: Array,
    default() {
      return []
    }
  },
  title: String,
  pic: String,
  loading: Boolean,
  noResultText: {
    type: String,
    default: '抱歉，没有找到可播放的歌曲'
  },
  rank: Boolean
})
/** computed */
const bgImageStyle = computed(() => {
  const scrollY = BGstyle.scrollY
  let zIndex = 0
  let paddingTop = '70%'
  let height = 0
  let translateZ = 0

  if (scrollY > BGstyle.maxTranslateY) {
    zIndex = 10
    paddingTop = 0
    height = `${RESERVED_HEIGHT}px`
    translateZ = 1
  }

  let scale = 1
  if (scrollY < 0) {
    scale = 1 + Math.abs(scrollY / BGstyle.imageHeight)
  }

  return {
    zIndex,
    paddingTop,
    height,
    backgroundImage: `url(${props.pic})`,
    transform: `scale(${scale})translateZ(${translateZ}px)`
  }
})
const playBtnStyle = computed(() => {
  let display = ''
  if (BGstyle.scrollY >= BGstyle.maxTranslateY) {
    display = 'none'    
  }
  return {
    display
  }
})
const scrollStyle = computed(() => {
  const bottom = store.state.playlist.length ? '60px' : '0'
  return {
    top: `${BGstyle.imageHeight}px`,
    bottom
  }
})
const filterStyle = computed(() => {
  let blur = 0
  const scrollY = BGstyle.scrollY
  const imageHeight = BGstyle.imageHeight
  if (scrollY >= 0) {
    blur = Math.min(BGstyle.maxTranslateY / imageHeight, scrollY / imageHeight) * 20
  }
  return {
    backdropFilter: `blur(${blur}px)`
  }
})
// const loading = computed({
//   get() {
//     return !props.songs.length;
//   }
// })
/** methods */
const onScroll = (pos) => {
  BGstyle.scrollY = -pos.y
}
const goBack = () => {
  router.back()
}
const selectItem = ({ song, index }) => {
  store._actions.selectPlay[0]({
    list: props.songs,
    index
  })
}
const random = () => {
  store._actions.randomPlay[0](props.songs)
}
onMounted(() => {
  // console.log('store', store.state.playlist);
  BGstyle.imageHeight = bgImage.value.clientHeight
  BGstyle.maxTranslateY = BGstyle.imageHeight - RESERVED_HEIGHT
})
</script>

<style lang="less" scoped>
.music-list {
  position: relative;
  height: 100%;
  .back {
    position: absolute;
    top: 0;
    left: 6px;
    z-index: 20;
    transform: translateZ(2px);
    .icon-back {
      display: block;
      padding: 10px;
      font-size: 22px;
      color: #ffcd32;
    }
  }
  .title {
    position: absolute;
    top: 0;
    left: 10%;
    width: 80%;
    z-index: 20;
    transform: translateZ(2px);
    @include no-wrap();
    text-align: center;
    line-height: 40px;
    font-size: 18px;
    color: #fff;
  }
  .bg-image {
    position: relative;
    width: 100%;
    transform-origin: top;
    background-size: cover;
    .play-btn-wrapper {
      position: absolute;
      bottom: 20px;
      z-index: 10;
      width: 100%;
      .play-btn {
        box-sizing: border-box;
        width: 135px;
        padding: 7px 0;
        margin: 0 auto;
        text-align: center;
        border: 1px solid #ffcd32;
        color: #ffcd32;
        border-radius: 100px;
        font-size: 0;
      }
      .icon-play {
        display: inline-block;
        vertical-align: middle;
        margin-right: 6px;
        font-size: 16px;
      }
      .text {
        display: inline-block;
        vertical-align: middle;
        font-size: 12px;
      }
      .play-btn:active {
        background-color: #f0ab08;
      }
      .play-btn:active .icon-play {
        color: #fff;
      }
      .play-btn:active .text {
        color: #fff;
      }
    }
    .filter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.4);
    }
  }
  .list {
    position: absolute;
    bottom: 0;
    width: 100%;
    z-index: 0;
    .song-list-wrapper {
      padding: 10px 20px;
      background: #222;
    }
  }
}
</style>