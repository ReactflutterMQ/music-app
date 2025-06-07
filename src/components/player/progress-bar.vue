<template>
    <div ref="el" class="progress-bar" @click="onClick">
        <!-- 黑色的条 -->
        <div class="bar-inner">
            <div class="progress"
            ref="bar_progress"
            :style="progressStyle"
            ></div>
            <div class="progress-btn-wrapper"
            :style="btnStyle"
            @touchstart.prevent="onTouchStart"
            @touchmove.prevent="onTouchMove"
            @touchend.prevent="onTouchEnd"
            >
                <div class="progress-btn"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits, watch, ref, computed } from "vue"
const el = ref(null)//进度条
const progressBtnWidth = 16 //button宽度
const offset = ref(0)
const touch = ref({})
const bar_progress = ref(null)
const props = defineProps({
    progress: {
        type: Number,
        default: 0
    }
})
const emit = defineEmits(['progress-changing', 'progress-changed'])
const progressStyle = computed(() => {
    return `width: ${offset.value}px`
})
const btnStyle = computed(() => {
    return `transform: translate3d(${offset.value}px, 0, 0)`
})
const onTouchStart = (e) => {
    touch.value.x1 = e.touches[0].pageX
    touch.value.beginWidth = bar_progress.value.clientWidth
}
const onTouchMove = (e) => {
    const delta = e.touches[0].pageX - touch.value.x1
    const tempWidth = touch.value.beginWidth + delta
    const barWidth = el.value.clientWidth - progressBtnWidth
    const progress = Math.min(1, Math.max(tempWidth / barWidth, 0))//拖动后的歌曲播放进度
    offset.value = barWidth * progress//按钮位移量
    emit('progress-changing', progress)
}
const onTouchEnd = () => {
    const barWidth = el.value.clientWidth - progressBtnWidth
    const progress = bar_progress.value.clientWidth / barWidth
    emit('progress-changed', progress)
}
const onClick = (e) => {//进度条点击事件
    const rect = el.value.getBoundingClientRect()
    const offsetWidth = e.pageX - rect.left;
    const barWidth = el.value.clientWidth - progressBtnWidth
    const progress = offsetWidth / barWidth
    emit('progress-changed', progress)
}
const setOffset = progress => {
    const barWidth = el.value.clientWidth - progressBtnWidth
    offset.value = barWidth * progress
}
watch(() => props.progress, (newProgress) => {
    setOffset(newProgress)
})
//暴露offset
defineExpose({
    offset,
    setOffset
})
</script>

<style lang="less" scoped>
.progress-bar {
    height: 30px;
    .bar-inner {
      position: relative;
      top: 13px;
      height: 4px;
      background: rgba(0, 0, 0, 0.3);
      .progress {
        position: absolute;
        height: 100%;
        background: #ffcd32;
      }
      .progress-btn-wrapper {
        position: absolute;
        left: -8px;
        top: -13px;
        width: 30px;
        height: 30px;
        .progress-btn {
          position: relative;
          top: 7px;
          left: 7px;
          box-sizing: border-box;
          width: 16px;
          height: 16px;
          border: 3px solid #fff;
          border-radius: 50%;
          background: #ffcd32;
        }
      }
    }
  }
</style>