<template>
  <div class="slider" ref="rootRef">
    <div class="slider-group">
      <div class="slider-page" v-for="item in props.sliders" :key="item.id">
        <a :href="item.link">
          <img :src="item.pic" alt="" />
        </a>
      </div>
    </div>
    <div class="dots-wrapper">
      <span class="dot" v-for="(item, index) in props.sliders" :key="item.id"
        :class="{ 'active': currentPageIndex === index }">
      </span>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue';
import useSlider from './use-slider';
// props
const props = defineProps({
  sliders: {
    type: Array,
    default: () => []
  }
})
// data
const rootRef = ref(null)
const { currentPageIndex } = useSlider(rootRef)
</script>

<style lang="less" scoped>
.slider {
  min-height: 1px;
  font-size: 0;
  touch-action: pan-y;
  .slider-group {
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    .slider-page {
      display: inline-block;
      transform: translate3d(0, 0, 0);
      backface-visibility: hidden;
      a {
        display: block;
        width: 100%;
      }
      img {
        display: block;
        width: 100%;
      }
    }
  }
  .dots-wrapper {
    position: absolute;
    left: 50%;
    bottom: 12px;
    line-height: 12px;
    transform: translateX(-50%);
    .dot {
      display: inline-block;
      margin: 0 4px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.5);
      &.active {
        width: 20px;
        border-radius: 5px;
        background: rgba(255, 255, 255, 0.8);
      }
    }
  }
}
</style>
