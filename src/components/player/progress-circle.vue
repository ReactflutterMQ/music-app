<template>
    <div class="progress-circle">
      <svg
        :width="radius"
        :height="radius"
        viewBox="0 0 100 100"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          class="progress-background"
          r="50"
          cx="50"
          cy="50"
          fill="transparent"
        />
        <circle
          class="progress-bar"
          r="50"
          cx="50"
          cy="50"
          fill="transparent"
          :stroke-dasharray="dashArray"
          :stroke-dashoffset="dashOffset"
        />
      </svg>
      <slot></slot>
    </div>
  </template>

<script setup>
import { defineProps, computed, ref } from "vue"
const dashArray = ref(Math.PI * 100)
const props = defineProps({
    radius: {
        type: Number,
        default: 100
    },
    progress: {
        type: Number,
        default: 0
    }
})
const dashOffset = computed(() => {
    return (1 - props.progress) * dashArray.value
})
</script>

<style lang="less" scoped>
  .progress-circle {
    position: relative;
    circle {
      stroke-width: 8px;
      transform-origin: center;
      &.progress-background {
        transform: scale(0.9);
        stroke: rgba(255, 205, 49, 0.5);
      }
      &.progress-bar {
        transform: scale(0.9) rotate(-90deg);
        stroke: #ffcd32;
      }
    }
  }
</style>