<template>
  <teleport to="body">
      <transition name="list-fade">
        <div class="playlist" v-show="visible && playlist.length" @click="hide">
            <div class="list-wrapper" @click.stop>
                <div class="list-header">
                    <h1 class="title">
                        <i class="icon" :class="modeIcon" @click="changeMode">
                        </i>
                        <span class="text">{{ modeText }}</span>
                        <span class="clear" @click="showConfirm">
                            <i class="icon-clear"></i>
                        </span>
                    </h1>
                </div>
                <scroll ref="scrollRef" class="list-content">
                    <transition-group ref="listRef" name="list" tag="ul">
                      <li class="item" v-for="song in sequenceList" :key="song.id" @click="selectItem(song)">
                          <i class="current" :class="getCurrentIcon(song)"></i>
                          <span class="text">{{ song.name }}</span>
                          <span class="favorite" @click.stop="toggleFavorite(song)">
                              <i :class="getFavoriteIcon(song)"></i>
                          </span>
                          <span class="delete" @click.stop="removeSong(song)" :class="{ 'disable': removing }">
                              <i class="icon-delete"></i>
                          </span>
                      </li>
                    </transition-group>
                </scroll>
                <div class="list-add">
                    <div class="add" @click="showAddSong">
                        <i class="icon-add"></i>
                        <span class="text">添加歌曲到队列</span>
                    </div>
                </div>
                <div class="list-footer" @click="hide">
                    <span>关闭</span>
                </div>
            </div>
            <confirm ref="confirmRef" @confirm="confirmClear" text="是否清空播放列表？" confirm-btn-text="清空"></confirm>
            <add-song ref="addSongRef"></add-song>
        </div>
      </transition>
  </teleport>
</template>

<script setup>
import Scroll from '@/components/base/scroll/scroll.vue';
import Confirm from '../base/confirm/confirm.vue';
import AddSong from '@/components/add-song/add-song.vue';
import { computed, nextTick, ref, watch } from 'vue'
import { useStore } from 'vuex'

import useMode from './use-mode';
import useFavorite from './use-favorate';
// data
const visible = ref(false)
const scrollRef = ref(null)
const listRef = ref(null)
const confirmRef = ref(null)
const addSongRef = ref(null)
// vuex
const store = useStore()
const playlist = computed(() => store.state.playlist)
const sequenceList = computed(() => store.state.sequenceList)
const currentSong = computed(() => store.getters.currentSong)
// hook
const { modeIcon, modeText, changeMode } = useMode()
const { getFavoriteIcon, toggleFavorite } = useFavorite()
// methods
const getCurrentIcon = song => {
  if (song.id === currentSong.value.id) {
    return 'icon-play'
  }
}
const show = async () => {
  visible.value = true

  await nextTick()
  refreshScroll()
  scrollToCurrent()
}
const hide = () => {
  visible.value = false
}
const refreshScroll = () => {
  scrollRef.value.scroll.refresh()
}
const scrollToCurrent = () => {
  const index = sequenceList.value.findIndex((song) => {
    return currentSong.value.id === song.id
  })
  const target = listRef.value.$el.children[index]

  scrollRef.value.scroll.scrollToElement(target, 300)
}
const selectItem = song => {
  const index = playlist.value.findIndex(item => {
    return song.id === item.id
  })

  store.commit('setCurrentIndex', index)
  store.commit('setPlayingState', true)
}
const removeSong = song => {
  store.dispatch('removeSong', song)
}
const confirmClear = () => {
  store.dispatch('clearSongList')
  hide()
}
const showConfirm = () => {
  confirmRef.value.show()
}
const showAddSong = () => {
  addSongRef.value.show()
}
// watch
watch(currentSong, async () => {
  if (!visible.value) {
    return
  }
  await nextTick()
  scrollToCurrent()
})
// 暴露show方法
defineExpose({
  show
})
</script>

<style lang="less" scoped>
  .playlist {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 200;
    background-color: rgba(0, 0, 0, 0.3);
    &.list-fade-enter-active, &.list-fade-leave-active {
      transition: opacity .3s;
      .list-wrapper {
        transition: all .3s;
      }
    }
    &.list-fade-enter-from, &.list-fade-leave-to {
      opacity: 0;
      .list-wrapper {
        transform: translate3d(0, 100%, 0);
      }
    }
    .list-wrapper {
      position: fixed;
      left: 0;
      bottom: 0;
      z-index: 210;
      width: 100%;
      background-color: #333;
      .list-header {
        position: relative;
        padding: 20px 30px 10px 20px;
        .title {
          display: flex;
          align-items: center;
          .icon {
            margin-right: 10px;
            font-size: 24px;
            color: rgba(255, 205, 49, 0.5);
          }
          .text {
            flex: 1;
            font-size: 14px;
            color: rgba(255, 255, 255, 0.5);
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
      .list-content {
        max-height: 240px;
        overflow: hidden;
        .item {
          display: flex;
          align-items: center;
          height: 40px;
          padding: 0 30px 0 20px;
          overflow: hidden;
          .current {
            flex: 0 0 20px;
            width: 20px;
            font-size: 12px;
            color: rgba(255, 205, 49, 0.5);
          }
          .text {
            flex: 1;
            @include no-wrap();
            font-size: 14px;
            color: rgba(255, 255, 255, 0.3);
          }
          .favorite {
            @include extend-click();
            margin-right: 15px;
            font-size: 12px;
            color: #ffcd32;
            .icon-favorite {
              color: #d93f30;
            }
          }
          .delete {
            @include extend-click();
            font-size: 12px;
            color: #ffcd32;
            &.disable {
              color: rgba(255, 205, 49, 0.5);
            }
          }
        }
      }
      .list-add {
        width: 140px;
        margin: 20px auto 30px auto;
        .add {
          display: flex;
          align-items: center;
          padding: 8px 16px;
          border: 1px solid rgba(255, 255, 255, 0.5);
          border-radius: 100px;
          color: rgba(255, 255, 255, 0.5);
          .icon-add {
            margin-right: 5px;
            font-size: 10px;
          }
          .text {
            font-size: 12px;
          }
        }
      }
      .list-footer {
        text-align: center;
        line-height: 50px;
        background: #222;
        font-size: 16px;
        color: rgba(255, 255, 255, 0.5);
      }
    }
  }
</style>