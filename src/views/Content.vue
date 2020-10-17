<template>
    <div id="main-content">
        <Cover :CoverImg="CoverValue"/>
        <div class="component-wrap">
            <transition name="content-rise">
                <div class="content-area" v-show="ShowContent">
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

            <AuthorCard />

            <ArticlesRecommended />

        </div>

        <Footer />

    </div>
</template>
<script>
import Cover from '@/components/Cover.vue';
import Footer from '@/components/Footer.vue';
import AuthorCard from '@/components/AuthorCard.vue';
import ArticlesRecommended from '@/components/ArticlesRecommended.vue';
export default {
    components: {
        Cover,
        Footer,
        AuthorCard,
        ArticlesRecommended
    },
    data() {
        return {
            // 传值给cover组件
            CoverValue: require('../assets/featured-image.png'),
            ShowContent: false,
        }
    },
    mounted() {
        this.ShowContent = true
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

        .content-area {
            text-align left

            h1 {
                text-align center
            }
        }

        .content-rise-enter-active {
            transition: all sink-time
        }

        .content-rise-enter {
            transform translateY(100px)
            opacity 0
    }
    }



}
</style>