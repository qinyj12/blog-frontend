<template>
    <div class="tag">
        <!-- 判断要不要隐藏cover，如果隐藏cover，给隐藏过程添加动画 -->
        <transition-group name="tag-content-sink">
            <Cover 
                v-show="!IfSink" 
                v-bind="{
                    CoverImg: require('../assets/featured-image.png'), 
                    CoverShowArticleDetail: false, 
                    //CoverShowAuthorDetail: true
                }" 
                key="cover"
            />

            <ArticleCard v-show="!IfSink" key="card" />

        <!-- 判断要不要隐藏footer组件，如果隐藏，给隐藏过程添加动画 -->
            <Footer v-show="!IfSink" key="footer" />
        </transition-group>
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
        IfSink() {
            return this.$store.state.IfSinkCover
        }
    },
    mounted() {
        // 恢复滚动条为默认
        this.$store.commit('ChangeBodyScrollStatus', 'auto')
    },
    // tag => tag时触发。其实不是tag=>tag，只是复用tag组件而已，router不会有任何变化
    beforeRouteUpdate (to, from, next) {
        // 给0.5s动画时间
        setTimeout(() => {
            next(
                this.$store.commit('ChangeHomeBuffer', 0),
                this.$store.commit('SinkCoverAndArticle', false),
            )
        }, this.$store.state.HomeBuffer);
    }
}
</script>
<style lang="stylus" scoped>
sink-time = 0.2s
.tag {
    .tag-content-sink-enter, .tag-content-sink-leave-to {
        opacity 0
        transform translateY(100px)
    }
    .tag-content-sink-enter-active, .tag-content-sink-leave-active {
        transition all sink-time
    }
}
</style>