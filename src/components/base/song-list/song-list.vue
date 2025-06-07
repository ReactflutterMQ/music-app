<template>
    <ul class="song-list">
        <li class="item" v-for="(song, index) in props.songs" :key="song.id" @click="selectItem(song, index)">
            <div class="rank" v-if="rank">
                <span :class="getRankCls(index)">{{ getRankText(index) }}</span>
            </div>
            <div class="content">
                <h2 class="name">{{ song.name }}</h2>
                <p class="desc">{{ getDesc(song) }}</p>
            </div>
        </li>
    </ul>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
const emit = defineEmits(['select'])
const props = defineProps({
    songs: {
        type: Array,
        default: () => []
    },
    rank: Boolean
})
// methods
const getDesc = song => {
    return `${song.singer}·${song.album}`
}
const selectItem = (song, index) => {
    emit('select', { song, index })
}
const getRankCls = index => {
    if (index <= 2) {
        return `icon icon${index}`
    } else {
        return 'text'
    }
}
const getRankText = index => {
    if (index > 2) {
        return index + 1
    }
}
</script>

<style lang="less" scoped>
.song-list {
    .item {
        display: flex;
        align-items: center;
        box-sizing: border-box;
        height: 64px;
        font-size: 14px;
        .rank {
            flex: 0 0 25px;
            width: 25px;
            margin-right: 20px;
            text-align: center;
            .icon {
                display: inline-block;
                width: 25px;
                height: 24px;
                background-size: 25px 24px;
                &.icon0 {
                    background: url(./first@3x.png) top center/cover;
                }
                &.icon1 {
                    background: url(./second@3x.png) top center/cover;
                }
                &.icon2 {
                    background: url(./third@3x.png) top center/cover;
                }
            }
            .text {
                color: #ffcd32;
                font-size: 18px;
            }
        }
        .content {
            flex: 1;
            line-height: 20px;
            overflow: hidden;
            .name {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                color: #fff;
            }
            .desc {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                margin-top: 4px;
                color: rgba(255, 255, 255, 0.3);
            }
        }
    }
}
</style>