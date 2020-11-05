<template>
    <div class="author">
        <!-- 判断要不要隐藏cover，如果隐藏cover，给隐藏过程添加动画 -->
        <transition name="cover-footer-sink">
            <Cover 
                v-show="!IfSinkCover" 
                v-bind="{
                    CoverImg: require('../assets/featured-image.png'), 
                    CoverShowArticleDetail: false, 
                    CoverShowAuthorDetail: true}" 
            />
        </transition>

        <ArticleCard />

        <!-- 判断要不要隐藏footer组件，如果隐藏，给隐藏过程添加动画 -->
        <transition name="cover-footer-sink">
            <Footer v-show="!IfSinkCover" />
        </transition>
    </div>
</template>
<script>
import Cover from '@/components/Cover.vue';
import ArticleCard from '@/components/ArticleCard.vue';
import Footer from '@/components/Footer.vue'
export default {
    components: {
        Cover,
        ArticleCard,
        Footer
    },
    mounted() {
        // 加载author页面时，使得author头像不能被点击，因为已经在author页面里了
        this.$store.commit('DisableClickAuthor', true)
    },
    destroyed() {
        // 离开author页面时，恢复vuex为原状，使得author头像可以被点击
        this.$store.commit('DisableClickAuthor', false)
    },
    computed: {
        // 判断要不要隐藏cover和footer组件
        IfSinkCover() {
            return this.$store.state.IfSinkCover
        }
    }
}
</script>
<style lang="stylus" scoped>
sink-time = 0.2s
.author {
    .cover-footer-sink-leave-active {
        transition all sink-time
    }
    .cover-footer-sink-leave-to {
        transform translateY(100px)
        opacity 0
    }
    
}
</style>