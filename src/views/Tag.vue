<template>
    <div class="tag">
        <!-- 判断要不要隐藏cover，如果隐藏cover，给隐藏过程添加动画 -->
        <transition name="cover-footer-sink">
            <Cover 
                v-show="!IfSinkCover" 
                v-bind="{
                    CoverImg: require('../assets/featured-image.png'), 
                    CoverShowArticleDetail: false, 
                    //CoverShowAuthorDetail: true
                }" 
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
import Footer from '@/components/Footer.vue';
export default {
    components: {
        Cover,
        ArticleCard,
        Footer
    },
    computed: {
        // 判断要不要隐藏cover和footer组件
        IfSinkCover() {
            return this.$store.state.IfSinkCover
        }
    },
    // tag => tag时触发。其实不是tag=>tag，只是复用tag组件而已，router不会有任何变化
    beforeRouteUpdate (to, from, next) {
        console.log(from.name, '=>', to.name)
        next(
            // 如果tag=>tag，vuex的状态恢复默认值，不然cover和card组件就消失不复现了
            setTimeout(() => {
                this.$store.commit('ChangeHomeBuffer', 0),
                this.$store.commit('SinkCoverAndArticle', false)
            }, 500)
        )
    }
}
</script>
<style lang="stylus" scoped>
sink-time = 0.2s
.tag {
    .cover-footer-sink-leave-active {
        transition all sink-time
    }
    .cover-footer-sink-leave-to {
        transform translateY(100px)
        opacity 0
    }
    
}
</style>