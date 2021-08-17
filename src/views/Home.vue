<template>
    <div id="home">
        <!-- 判断要不要隐藏cover，如果隐藏cover，给隐藏过程添加动画 -->
        <transition name="cover-sink">
            <Cover v-show="!IfSinkCover" v-bind="{CoverImg: CoverImg, CoverShowArticleDetail: false}"/>
        </transition>

        <!-- 使用懒加载 -->
        <vue-lazy-component>
            <!-- card组件的隐藏动画在组件内判断，不需要再home父组件中判断 -->
            <ArticleCard />
        </vue-lazy-component>
        
        <!-- 判断要不要隐藏footer组件，如果隐藏，给隐藏过程添加动画 -->
        <transition name="footer-sink">
            <Footer v-show="!IfSinkCover" />
        </transition>
    </div>
</template>
<script>
// import ArticleCard from '@/components/ArticleCard.vue';
import Cover from '@/components/Cover.vue';
export default {
    components: {
        ArticleCard: resolve => {require(['@/components/ArticleCard.vue'], resolve)},
        Cover,
        Footer: resolve => {require(['@/components/Footer.vue'], resolve)}
    },
    data() {
        return {
            // 传值给cover组件，传入undefined，调用cover组件内部的默认值
            CoverImg: undefined,
        }
    },
    computed: {
        // 判断要不要隐藏cover和footer组件
        IfSinkCover() {
            return this.$store.state.IfSinkCover
        }
    },
    mounted() {
        // 当访问首页时，就在localstorage中设置cover的默认值。
        localStorage.setItem('DefaultCoverImg', '')
        // 然后强行让cover组件的背景图改成默认值。
        this.CoverImg = localStorage.getItem('DefaultCoverImg')
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