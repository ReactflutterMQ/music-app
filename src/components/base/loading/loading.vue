<template>
    <div class="loading">
        <div class="loading-content">
            <img width="24" height="24" src="./loading.gif" alt="">
            <p class="desc">{{ title }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'loading',
    data() {
        return {
            title: '正在载入...'
        }
    },
    methods: {
        setTitle(title) {
            this.title = title
        }
    }
}
</script>

<style lang="less" scoped>
.loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%,-50%,0);
    .loading-content {
        text-align: center;
        .desc {
            line-height: 20px;
            font-size: 16px;
            color: #535253;
        }
    }
}
</style>