<template>
    <div id="main-content">
        <Cover v-bind="{CoverImg: CoverImg, CoverShowDetail: true}"/>

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

            <Comments />

        </div>

        <Footer />

    </div>
</template>
<script>
import Cover from '@/components/Cover.vue';
import Footer from '@/components/Footer.vue';
import AuthorCard from '@/components/AuthorCard.vue';
import ArticlesRecommended from '@/components/ArticlesRecommended.vue';
import Comments from '@/components/Comments.vue'
export default {
    components: {
        Cover,
        Footer,
        AuthorCard,
        ArticlesRecommended,
        Comments
    },
    data() {
        return {
            // 传值给cover组件
            CoverImg: require('../assets/featured-image.png'),
            ShowContent: false,
        }
    },
    mounted() {
        this.ShowContent = true;
        // 从home=>content时的瞬间变成的scroll，目的是防止动画撕裂。进入content后，重新变成auto
        this.$store.commit('ChangeBodyScrollStatus', 'auto');
        // 从home=>content时会给home组件留500ms的缓冲时间，目的是给home留一些动画时间。进入content后清零
        this.$store.commit('ChangeHomeBuffer', 0)
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