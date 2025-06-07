<template>
    <div class="search-input">
        <i class="icon-search"></i>
        <input class="input-inner" v-model="query" :placeholder="placeholder">
        <i v-show="query" class="icon-dismiss" @click="clear"></i>
    </div>
</template>

<script>
import { debounce } from 'throttle-debounce';
export default {
    name: 'search-input',
    props: {
        modelValue: String,
        placeholder: {
            type: String,
            default: '搜索歌曲、歌手'
        }
    },
    data() {
        return {
            query: this.modelValue
        }
    },
    methods: {
        clear() {
            this.query = ''
        }
    },
    created() {
        this.$watch('query', debounce(300, (newQuery) => {
            this.$emit('update:modelValue', newQuery.trim())
        }))

        this.$watch('modelValue', (newVal) => {
            this.query = newVal
        })
    }
}
</script>

<style lang="less" scoped>
.search-input {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    padding: 0 6px;
    height: 32px;
    background: #333;
    border-radius: 6px;
    .icon-search {
        font-size: 24px;
        color: rgba(255, 255, 255, 0.3);
    }
    .input-inner {
        flex: 1;
        margin: 0 5px;
        line-height: 18px;
        background: #333;
        color: #fff;
        font-size: 14px;
        outline: 0;

        &::placeholder {
            color: rgba(255, 255, 255, 0.3);
        }
    }
    .icon-dismiss {
        font-size: 16px;
        color: rgba(255, 255, 255, 0.3);
    }
    .icon-dismiss:active {
        color: #fff;
    }
}
</style>