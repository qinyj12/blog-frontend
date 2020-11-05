// 头图，放在首页和文章详情页
<template>
    <div class="cover-component">
        <div class="cover" :style="{backgroundImage: 'url(' + CoverImg + ')'}">

            <!-- 以下是点击进入到文章详情页时展示的部分，包括标题、文章分类、作者、时间等 -->
            <transition name="article-detail-rise">
                <div v-show="IfShowArticleDetail">
                    <div><span class="article-category">案例</span></div>
                    <h1 class="article-title">这是文章详情页</h1>
                    <div class="article-author-time">
                        <span>测试用户</span>
                        <span>2020.10.23</span>
                    </div>
                </div>
            </transition>

            <!-- 以下是点击进入到作者页时展示的部分，包括头像、名字等 -->
            <div class="author-avatar-detail" v-show="CoverShowAuthorDetail">
                <transition-group name="author-detail-rise">
                    <div class="author-avatar" key="author-avatar"></div>
                    <!-- 这个元素的动画默认会从上方飘下来，不知道是根据什么定位的-->
                    <div class="author-detail" key="author-detail" v-show="IfShowAuthorDetail">
                        <h1>测试用户</h1>
                        <p>这是一个测试用户的介绍</p>
                        <ul>
                            <li v-for="item in AuthorContact" :key="item">
                                <i :class="'fab fa-' + item"></i>
                            </li>
                            <span class="author-position">
                                <i class="fas fa-map-marker-alt no-hover"></i>
                                <span>无锡</span>
                            </span>

                        </ul>
                    </div>
                </transition-group>
            </div>
        </div>

        <!-- 给cover组件加一层遮罩，当显示article-detail和author-detail时显示 -->
        <transition name="cover-mask-show">
            <div class="cover-mask" v-show="IfShowArticleDetail || IfShowAuthorDetail"></div>
        </transition>
        
    </div>
</template>
<script>
export default {
    props: ['CoverImg', 'CoverShowArticleDetail', 'CoverShowAuthorDetail'],
    data() {
        return {
            // 这个字段是用来判断要不要显示article detail的
            IfShowArticleDetail: false,
            // 这个字段用来判断要不要显示author detail的
            IfShowAuthorDetail: false,
            AuthorContact: ['weibo', 'qq', 'weixin', 'github']
        }
    },
    methods: {
        // 监听父组件传值，用来判断要不要显示article-detail
        ShowArticleDetail() {
            // DOM加载完成后
            this.$nextTick(
                () => {
                    // 如果接收到的值CoverShowArticleDetail==true，说明进入的是文章详情页
                    if (this.CoverShowArticleDetail) {
                        // 那就动态修改v-show
                        this.IfShowArticleDetail = true
                    // 否则的话
                    } else {
                        // 啥也不干
                    }
                }
            )
        },
        // 监听父组件传值，用来判断要不要显示author-detail
        ShowAuthorDetail() {
            this.$nextTick(
                () => {
                    if (this.CoverShowAuthorDetail) {
                        this.IfShowAuthorDetail = true
                    } else {
                        // 啥也不干
                    }
                }
            )
        },
    },
    mounted() {
        // 监听父组件传值，用来判断要不要显示article-detail
        this.ShowArticleDetail();
        // 监听父组件传值，用来判断要不要显示author-detail
        this.ShowAuthorDetail();

        
    },
}
</script>
<style lang="stylus" scoped>
* {
    box-sizing border-box
}
.cover-component {
    .cover {
        width 100%
        height 450px
        background-repeat no-repeat
        background-size cover
        background-position 50% 50%
        display flex
        flex-direction column
        justify-content center
        color white
        position relative

        // 所有元素浮在遮罩上方
        * {
            z-index 1
        }

        .article-category {
            height 24px
            position relative
        }

        .article-category:before, .article-category:after {
            content ""
            width 16px
            height 1px
            background white
            position absolute
            top 50%
        }
        .article-category:before {
            left -24px
        }
        .article-category:after {
            right -24px
        }

        .article-title {
            margin 32px 0
        }

        .article-author-time {
            span:not(:last-child):after {
                content ''
                margin 0 10px
                border-right 1px solid 
            }
        }
        .article-detail-rise-enter-active {
            transition: all 0.2s
        }
        .article-detail-rise-enter {
            transform translateY(100px)
            opacity 0
        }

        .author-avatar-detail {
            // position relative

            .author-avatar {
                width 96px
                height 96px
                background-image url('../assets/avatar.png')
                background-size cover
                border-radius 50%
                border 4px solid white
                box-sizing border-box
                margin 0 auto
                transition all 0.2s
            }

            .author-detail {
                width 100%
                word-break break-all
                transition all 0.2s
                display block
                font-size 14px

                ul {
                    list-style none
                    margin 0
                    padding 0
                    display flex
                    justify-content center
                    height 20px
                    align-items center

                    i {
                        margin-right 16px
                        color white
                        transition all 0.1s
                    }

                    i:hover:not(.no-hover) {
                        color #19DDC4
                        cursor pointer
                    }

                    .author-position {
                        display flex
                        align-items center
                        line-height 14px

                        i {
                            margin-right 5px
                        }
                    }
                }
            }

            // 以下是author-detail的动画
            .author-detail-rise-enter {
                opacity 0
                // 不知道默认是根据什么定位的，改成-450px暂时没有问题
                transform translateY(-450px)
            }
            .author-detail-rise-enter-to {

            }
        }
    }

    .cover-mask {
        position absolute
        top 80px
        left 0
        width 100%
        height 450px
        background-color rgba(0 ,0, 0, 0.4)
        z-index 0
    }

    .cover-mask-show-enter {
        opacity 0
    }

}
</style>