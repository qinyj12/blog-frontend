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

            <div class="author-card">
                <img src="../assets/avatar.png" alt="avatar" class="author-avatar">
                <div class="author-introduction">
                    <h4>{{AboutAuthor.name}}</h4>
                    <div>{{AboutAuthor.introduction}}</div>
                    <ul>
                        <li v-for="item in AboutAuthor.contact" :key="item">
                            <i :class="'fab fa-' + item"></i>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="articles-recommended">
                <div class="single-article-recommended"></div>
                <div></div>
            </div>
        </div>

        <Footer />

    </div>
</template>
<script>
import Cover from '@/components/Cover.vue';
import Footer from '@/components/Footer.vue'
export default {
    components: {
        Cover,
        Footer
    },
    data() {
        return {
            // 传值给cover组件
            CoverValue: require('../assets/featured-image.png'),
            ShowContent: false,
            // 关于作者
            AboutAuthor: {
                name: '测试用户', 
                introduction: '这是一段关于文章作者的介绍', 
                contact: ['weibo', 'qq', 'weixin', 'github']
            }
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

        .author-card {
            text-align left
            width 100%
            border-radius 4px
            box-shadow 0px 1px 4px 0px rgba(0, 0, 0, 0.15)
            box-sizing border-box
            padding 24px
            display flex

            .author-avatar {
                width 96px
                height 96px
                object-fit cover
                margin-right 15px
                border-radius 4px
            }

            .author-introduction {
                flex 1

                * {
                    margin 0 0 10px 0
                }

                ul {
                    list-style none
                    margin 0
                    padding 0
                    display flex

                    i {
                        margin-right 16px
                        color gray
                    }

                    i:hover {
                        color #19DDC4
                        cursor pointer
                    }
                }
            }
        }

        .articles-recommended {
            border 1px solid
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