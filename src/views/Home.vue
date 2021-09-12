<template>
    <div id="home">
        <!-- 判断要不要隐藏cover，如果隐藏cover，给隐藏过程添加动画 -->
        <transition name="cover-sink">
            <Cover v-show="!IfSinkCover" v-bind="{CoverImg: CoverImg, CoverShowArticleDetail: false}"/>
        </transition>

        <!-- 使用懒加载 -->
        <vue-lazy-component>
            <!-- card组件的隐藏动画在组件内判断，不需要再home父组件中判断 -->
            <!-- 一定要加vif，等待父组件Home拿到api返回的值后，子组件articlecard才能加载 -->
            <ArticleCard :DocsRes="RepoDocsFromAPI" v-if="RepoDocsFromAPI" />
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
import { RepoDocs } from '@/api/api.js';
export default {
    components: {
        ArticleCard: resolve => {require(['@/components/ArticleCard.vue'], resolve)},
        Cover,
        Footer: resolve => {require(['@/components/Footer.vue'], resolve)}
    },
    data() {
        return {
            // 传值给cover组件，传入undefined，调用cover组件内部的默认值
            CoverImg: require('@/assets/test2.jpeg'),
            RepoDocsFromAPI: undefined
        }
    },
    computed: {
        // 判断要不要隐藏cover和footer组件
        IfSinkCover() {
            return this.$store.state.IfSinkCover
        }
    },
    async created() {
        // 从语雀api拿到值，复制给子组件articlecard
        let DocsResp = await RepoDocs('20285594');
        // console.log(DocsResp)
        this.RepoDocsFromAPI = DocsResp.data
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