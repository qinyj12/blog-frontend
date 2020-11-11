<template>
    <div class="article-content" v-show="ShowContent">
    <transition name="content-move">
        <div v-show="ShowContent">
            <h1>这是文章详情页</h1>
            <p>一些话一些话一些话一些话一些话一些话一些话一些话一些话一些话一些话一些话一些话一些话一些话一些话一些话一些话一些话一些话</p>
            <p>一些话一些话一些话一些话一些话</p>
            <p>一些话一些话一些话一些话一些话</p>
            <p>一些话一些话一些话一些话一些话</p>
            <p>一些话一些话一些话一些话一些话</p>
            <p>一些话一些话一些话一些话一些话</p>
            <p>一些话一些话一些话一些话一些话</p>
            <p>一些话一些话一些话一些话一些话</p>
            <p>一些话一些话一些话一些话一些话</p>
            <p>一些话一些话一些话一些话一些话</p>
            <p>一些话一些话一些话一些话一些话</p>
            <p>一些话一些话一些话一些话一些话</p>
            <p>一些话一些话一些话一些话一些话</p>
            <p>一些话一些话一些话一些话一些话</p>
        </div>
    </transition>

    </div>
</template>
<script>
export default {
    data() {
        return {
            ShowContent: false
        }
    },
    mounted() {
        this.ShowContent = true
    },
}
</script>
<style lang="stylus" scoped>
sink-time = 0.2s
.article-content {
    text-align left

    h1 {
        text-align center
    }

    .content-move-enter-active, .content-move-leave-active {
        transition all sink-time
    }
    .content-move-enter, .content-move-leave-to {
        transform translateY(100px)
        opacity 0
    }
}
</style>