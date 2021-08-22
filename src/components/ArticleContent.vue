<template>
    <div class="article-content" v-show="ShowContent" ref="ContentBox">
        <transition name="content-move">
            <div v-show="ShowContent" v-html="ArticleContentByFather"></div>
        </transition>
    </div>
</template>
<script>
export default {
    props: {
        ArticleContentByFather: String
    },
    data() {
        return {
            ShowContent: false,
            ArticleContent: undefined
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

        .content-move-enter-active, .content-move-leave-active {
            transition all sink-time
        }
        .content-move-enter, .content-move-leave-to {
            transform translateY(100px)
            opacity 0
        }
    }
</style>
<style lang="stylus">
    .lake-engine {
        text-align left

        * img {
            max-width 100%
        }

        u, a {
            color #096DD9
        }
    }
</style>