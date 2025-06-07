<template>
    <transition name="mini">
        <div 
            class="mini-player"
            v-show="!fullScreen"
            @click="showNormalPlayer"
        >
            <div class="cd-wrapper">
                <div 
                  class="cd"
                  ref="cdRef"
                >
                    <img
                     ref="cdImageRef"
                     width="40"
                     height="40" 
                     :src="currentSong.pic"
                     :class="cdCls"
                    >
                </div>
            </div>
            <div
                ref="sliderWrapperRef"
                class="slider-wrapper"
            >
                <div class="slider-group">
                    <div 
                        class="slider-page"
                        v-for="song in playlist"
                        :key="song.id"
                    >
                        <h2 class="name">{{ song.name }}</h2>
                        <p class="desc">{{ song.singer }}</p>
                    </div>
                </div>
            </div>
            <div class="control">
                <progress-circle :radius="32" :progress="props.progress">
                    <i 
                     class="icon-mini" 
                     :class="miniPlayIcon"
                     @click.stop="props.togglePlay"
                    ></i>
                </progress-circle>
            </div>
            <div class="control" @click.stop="showPlaylist">
              <i class="icon-playlist"></i>
            </div>
            <Playlist ref="playlistRef"></Playlist>
        </div>
    </transition>
</template>

<script setup>
import { useStore } from "vuex"
import { computed, ref, defineProps } from "vue"
import ProgressCircle from "./progress-circle.vue"
import Playlist from "./playlist.vue";
import useMiniSlider from "./use-mini-slider";
import useCd from "./use-cd";
// props
const props = defineProps({
    progress: {
        type: Number,
        default: 0
    },
    togglePlay: Function
})
// data
const playlistRef = ref(null)
// vuex
const store = useStore()
const fullScreen = computed(() => store.state.fullScreen)
const currentSong = computed(() => store.getters.currentSong)
const playing = computed(() => store.state.playing)
const playlist = computed(() => store.state.playlist)

const { cdCls, cdRef, cdImageRef } = useCd()
const { sliderWrapperRef } = useMiniSlider()

const miniPlayIcon = computed(() => {
    return playing.value ? 'icon-pause-mini' : 'icon-play-mini'
})
// methods
const showNormalPlayer = () => {
    store.commit('setFullScreen', true)    
}
const showPlaylist = () => {
  playlistRef.value.show()
}
</script>

<style lang="less" scoped>
.mini-player {
    display: flex;
    align-items: center;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 180;
    width: 100%;
    height: 60px;
    background: #333;
    .cd-wrapper {
      flex: 0 0 40px;
      width: 40px;
      height: 40px;
      padding: 0 10px 0 20px;
      .cd {
        height: 100%;
        width: 100%;
        img {
          border-radius: 50%;
          &.playing {
            animation: rotate 10s linear infinite;
          }
          &.pause {
            animation-play-state: paused;
          }
        }
      }
    }
    .slider-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;
      line-height: 20px;
      overflow: hidden;
      padding-left: 5px;
      .slider-group {
        position: relative;
        overflow: hidden;
        white-space: nowrap;
        .slider-page {
          display: inline-block;
          width: 100%;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          .name {
            margin-bottom: 2px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            font-size: 14px;
            color: #fff;
          }
          .desc {
            font-size: 12px;
            color: rgba(255, 255, 255, 0.3);
            /*强制文本在一行内显示*/
            white-space: nowrap; 
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
    .control {
      flex: 0 0 30px;
      width: 30px;
      padding: 0 10px;
      .icon-playlist {
        position: relative;
        top: -2px;
        font-size: 28px;
        color: rgba(255, 205, 49, 0.5);
      }
      .icon-mini {
        position: absolute;
        left: 0;
        top: 0;
        color: rgba(255, 205, 49, 0.5);
        font-size: 32px;
      }
    }
    &.mini-enter-active, &.mini-leave-active {
      transition: all 0.6s cubic-bezier(0.45, 0, 0.55, 1);
    }
    &.mini-enter-from, &.mini-leave-to {
      opacity: 0;
      transform: translate3d(0, 100%, 0)
    }
  }
</style>