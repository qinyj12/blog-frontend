<template>
    <div id="home">
        <!-- 判断要不要隐藏cover，如果隐藏cover，给隐藏过程添加动画 -->
        <transition name="cover-sink">
            <Cover v-show="!IfSinkCover" v-bind="{CoverImg: CoverImg, CoverShowArticleDetail: false}"/>
        </transition>

        <!-- card组件的隐藏动画在组件内判断，不需要再home父组件中判断 -->
        <ArticleCard />

        <!-- 判断要不要隐藏footer组件，如果隐藏，给隐藏过程添加动画 -->
        <transition name="footer-sink">
            <Footer v-show="!IfSinkCover" />
        </transition>
    </div>
</template>
<script>
// import ArticleCard from '@/components/ArticleCard.vue';
import Cover from '@/components/Cover.vue';
import Footer from '@/components/Footer.vue';
export default {
    components: {
        ArticleCard: resolve => {require(['@/components/ArticleCard.vue'], resolve)},
        Cover,
        Footer
    },
    data() {
        return {
            // 传值给cover组件
            CoverImg: require('../assets/cover.png'),
        }
    },
    computed: {
        // 判断要不要隐藏cover和footer组件
        IfSinkCover() {
            return this.$store.state.IfSinkCover
        }
    },
}
</script>
<style lang="stylus" scoped>
sink-time = 0.2s

// cover区域的动画
.cover-sink-leave-active {
    transition all sink-time
}
.cover-sink-leave-to /* .fade-leave-active, 2.1.8 版本以下 */ {
    transform translateY(100px)
    opacity 0
}

// 用于footer下沉的动画
.footer-sink-leave-active {
    transition: all sink-time
}
.footer-sink-leave-to /* .fade-leave-active, 2.1.8 版本以下 */ {
    transform translateY(100px)
    opacity 0
}
</style>