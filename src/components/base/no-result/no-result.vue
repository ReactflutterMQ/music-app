<template>
    <div class="no-result">
        <div class="no-result-content">
            <div class="icon"></div>
            <p class="text">{{ title }}</p>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    name: 'no-result',
    data() {
        return {
            title: '抱歉，没有结果'
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
.no-result {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    .no-result-content {
        text-align: center;
        .icon {
            width: 86px;
            height: 90px;
            margin: 0 auto;
            background: url(./no-result@3x.png) top center/cover;
            background-size: 86px 90px;
        }
        .text {
            margin-top: 30px;
            font-size: 14px;
            color: rgba(255, 255, 255, 0.3);
        }
    }
}
</style>