<template>
    <div class="singer-detail">
        <musicList
            :songs="songs"
            :title="title"
            :pic="pic"
            :loading="loading">
        </musicList>
    </div>
</template>

<script>
import createDetailComponent from '@/assets/js/create-detail-component';
import { getSingerDetail } from '@/request/singerApis';
import { SINGER_KEY } from '@/assets/js/constant';

export default createDetailComponent('singer_detail', SINGER_KEY, getSingerDetail)
</script>

<style lang="less" scoped>
.singer-detail {
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: #222;
}
</style>