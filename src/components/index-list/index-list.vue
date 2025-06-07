<template>
  <scroll
      class="index-list"
      ref="scrollRef"
      :probe-type="3"
      @scroll="onScroll"
  >
    <ul ref="groupRef">
      <li v-for="group in data" :key="group.title" class="group">
        <h2 class="title">{{ group.title }}</h2>
        <ul>
          <li v-for="item in group.list" :key="item.id" class="item" @click="onItemClick(item)">
            <img class="avatar" v-lazy="item.pic">
            <span class="name">{{ item.name }}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="fixed" v-show="fixedTitle" :style="fixedStyle">
      <div class="fixed-title">{{ fixedTitle }}</div>
    </div>
    <div
        class="shortcut"
        @touchstart.stop.prevent="onShortcutTouchStart"
        @touchmove.stop.prevent="onShortcutTouchMove"
        @touchend.stop.prevent=""
    >
      <ul>
        <li v-for="(item, index) in shortcutList" :data-index="index" :key="item" class="item" :class="{'current':currentIndex===index}">{{ item }}</li>
      </ul>
    </div>
  </scroll>
</template>

<script>
import Scroll from '@/components/wrap-scroll'
import useFixed from "@/components/index-list/use-fixed";
import useShortcut from "@/components/index-list/use-shortcut";

export default {
  name: 'index-list',
  components: { Scroll },
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  emits: ['select'],
  setup(props, { emit }) {
    const { groupRef, onScroll, fixedTitle, fixedStyle, currentIndex } = useFixed(props)
    const { shortcutList, scrollRef, onShortcutTouchStart, onShortcutTouchMove } = useShortcut(props, groupRef)

    function onItemClick(item) {
      emit('select', item)
    }

    return {
      onItemClick,
      groupRef,
      onScroll,
      fixedTitle,
      fixedStyle,
      currentIndex,
      shortcutList,
      scrollRef,
      onShortcutTouchStart,
      onShortcutTouchMove
    }
  }
}
</script>

<style scoped lang="less">
.index-list {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #222;
  .group {
    padding-bottom: 30px;
    .title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: 12px;
      color: rgba(255, 255, 255, 0.5);
      background: #333;
    }
    .item {
      display: flex;
      align-items: center;
      padding: 20px 0 0 30px;
      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      .name {
        margin-left: 20px;
        color: rgba(255, 255, 255, 0.5);
        font-size: 14px;
      }
    }
  }
  .fixed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    .fixed-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: 12px;
      color: rgba(255, 255, 255, 0.5);
      background: #333;
    }
  }
  .shortcut {
    position: absolute;
    right: 4px;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    padding: 20px 0;
    border-radius: 10px;
    text-align: center;
    background: rgba(0, 0, 0, 0.3);
    font-family: Helvetica;
    .item {
      padding: 3px;
      line-height: 1;
      color: rgba(255, 255, 255, 0.5);
      font-size: 12px;
      &.current {
        color: #ffcd32;
      }
    }
  }
}
</style>