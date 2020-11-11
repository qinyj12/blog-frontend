<template>
    <div id="main-content">
        <!-- 判断要不要隐藏cover，给隐藏过程添加动画 -->
        <transition name="cover-move">
            <Cover 
                v-show="!IfSink" 
                v-bind="{CoverImg: CoverImg, CoverShowArticleDetail: true}"
                :key="ReRenderCover"
            />
        </transition>

        <div class="component-wrap">
            <!-- 判断要不要隐藏content，给隐藏过程添加动画 -->
            <transition name="components-move">
                <ArticleContent v-show="!IfSink" />
            </transition>

            <!-- 判断要不要隐藏author，给隐藏过程添加动画 -->
            <transition name="components-move">
                <AuthorCard v-show="!IfSink" />
            </transition>

            <!-- recommended组件的隐藏动画在组件内判断，不需要在content父组件中判断 -->
            <ArticlesRecommended />

            <!-- 判断要不要隐藏comments，给隐藏过程添加动画 -->
            <transition name="components-move">
                <Comments v-show="!IfSink" />
            </transition>
        </div>

        <!-- 判断要不要隐藏footer，给隐藏过程添加动画 -->
        <transition name="components-move">
            <Footer v-show="!IfSink" />
        </transition>

    </div>
</template>
<script>
import Cover from '@/components/Cover.vue';
import Footer from '@/components/Footer.vue';
import AuthorCard from '@/components/AuthorCard.vue';
import ArticlesRecommended from '@/components/ArticlesRecommended.vue';
import Comments from '@/components/Comments.vue';
import ArticleContent from '@/components/ArticleContent.vue'
export default {
    components: {
        Cover,
        Footer,
        AuthorCard,
        ArticlesRecommended,
        Comments,
        ArticleContent
    },
    data() {
        return {
            // 传值给cover组件
            CoverImg: require('../assets/featured-image.png'),
            // 这个值是用来重新渲染cover组件的
            ReRenderCover: 0,
        }
    },
    computed: {
        // 判断要不要隐藏cover和footer组件
        IfSink() {
            return this.$store.state.IfSinkSomething
        },

    },
    mounted() {
        // 从home=>content时的瞬间变成的scroll，目的是防止动画撕裂。进入content后，重新变成auto
        this.$store.commit('ChangeBodyScrollStatus', 'auto');
        // 从home=>content时会给home组件留500ms的缓冲时间，目的是给home留一些动画时间。进入content后清零
        this.$store.commit('ChangeHomeBuffer', 0)
    },
    // 路由复用时，即/content/1 => /content/2
    beforeRouteUpdate (to, from, next) {
        next(
            // 把router.push的延时时间归零
            this.$store.commit('ChangeHomeBuffer', 0),
            // sinksomething是用来判断要不要隐藏除recommended之外的其他组件的，路由复用后，这些组件要回复原位
            this.$store.commit('SinkSomething', false),
            // 改变key，强制重新渲染cover组件，触发cover组件内部定义的mounted时的动画
            this.ReRenderCover += 1
        )
    },
}
</script>
<style lang="stylus" scoped>
sink-time = 0.2s
#main-content {
    .component-wrap {
        max-width 720px
        margin 0 auto
        padding 20px
        box-sizing border-box

        >* {
            margin-bottom 32px
        }
    }

    .cover-move-leave-to, .components-move-leave-to, .components-move-enter {
        transform translateY(100px)
        opacity 0
    }
    .cover-move-leave-active, .components-move-leave-active, .components-move-enter-active {
        transition all sink-time
    }
}
</style>