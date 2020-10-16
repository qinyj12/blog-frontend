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
                            <!-- 动态添加微博、微信、github等icon -->
                            <i :class="'fab fa-' + item"></i>
                        </li>
                    </ul>
                </div>
            </div>

            <ul class="articles-recommended">
                <li class="single-article-recommended">
                    <img src="../assets/featured-image.png" alt="cover" class="article-recommended-cover">
                    <div class="article-recommended-introduction">
                        <div class="article-recommended-tag-wrap">
                            <div class="article-recommended-tag">案例</div>
                        </div>
                        <!-- 文字溢出添加省略号 -->
                        <v-clamp 
                            max-height="calc(100% - 84px)" 
                            autoresize="true"
                            class="article-recommended-title"
                        >
                            这是第一篇文章这是第一篇文章这是第一篇文章这是第一篇文章这是第一篇文章第一篇文章第一篇文章第一篇文章第一篇文章123
                        </v-clamp>
                        <div class="recommended-avatar-views">
                            <div class="recommended-avatar"></div>
                            <div class="recommended-author">测试用户</div>
                            <i class="far fa-eye"></i>
                            <div>50</div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>

        <Footer />

    </div>
</template>
<script>
import Cover from '@/components/Cover.vue';
import Footer from '@/components/Footer.vue';
import VClamp from 'vue-clamp'
export default {
    components: {
        Cover,
        Footer,
        VClamp
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

        ul.articles-recommended {
            list-style none
            padding 0

            li.single-article-recommended {
                height 200px
                width 100%
                display flex
                border-radius 4px
                overflow hidden
                box-sizing border-box
                box-shadow 0px 1px 4px 0px rgba(0, 0, 0, 0.15)

                img.article-recommended-cover {
                    width 50%
                    height 100%
                    object-fit cover
                    box-sizing border-box
                }

                .article-recommended-introduction {
                    height 100%
                    width 50%
                    box-sizing border-box
                    text-align left 
                    padding 30px

                    display flex
                    flex-direction column

                    .article-recommended-tag-wrap {
                        height 24px
                        margin-bottom 10px

                        .article-recommended-tag {
                            display inline-block
                            border-radius 12px
                            padding 0 15px
                            background-color #009CFF
                            color white
                            height 100%
                        }
                    }

                    .article-recommended-title {
                        font-weight bold
                        font-size large
                        flex 1
                    }

                    .recommended-avatar-views {
                        display flex
                        align-items center
                        height 40px

                        margin-top 10px

                        * {
                            margin-right 5px
                        }

                        .recommended-avatar {
                            width 32px
                            height 32px
                            border-radius 50%
                            background-image url('../assets/avatar.png')
                            background-size cover
                        }

                        .recommended-author {
                            margin-right 15px
                        }
                    }
                }
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