// 头图，放在首页和文章详情页
<template>
    <div id="cover">
        <div class="homepage-cover" :style="{backgroundImage: 'url(' + CoverImg + ')'}">

            <!-- 以下是点击进入到文章详情页时展示的部分，包括标题、文章分类、作者、时间等 -->
            <transition name="article-detail-rise">
                <div v-show="_IfShowArticleDetail">
                    <div><span class="article-category">案例</span></div>
                    <h1 class="article-title">这是文章详情页</h1>
                    <div class="article-author-time">
                        <span>测试用户</span>
                        <span>2020.10.23</span>
                    </div>
                </div>
            </transition>

            <!-- 以下是点击进入到作者页时展示的部分，包括头像、名字等 -->
            <transition-group name="author-detail-rise" v-show="CoverShowAuthorDetail">
                    <div class="author-avatar" key="author-avatar"></div>
                    <span class="author-detail" key="author-detail" v-show="IfShowAuthorDetail">author</span>
            </transition-group>


        </div>
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
            IfShowAuthorDetail: false
        }
    },
    methods: {
        // 
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
        // 
        ShowAuthorAndTransition() {
            this.$nextTick(
                () => {
                    if (this.CoverShowAuthorDetail) {
                        this.IfShowAuthorDetail = true
                    } else {
                        // 啥也不干
                    }
                }
            )
        }
    },
    mounted() {
        // 监听父组件的传值，然后判断要不要显示detail，如果要显示的话，在DOM渲染完成后显示transition动画
        this.ShowArticleDetail();
        // 
        this.ShowAuthorAndTransition();

        this.$nextTick(
            () => {
                console.log(this._IfShowArticleDetail)
            }
        )
    },
    // 尝试使用asyncComputed，好像跑不通
    asyncComputed: {
        _IfShowArticleDetail() {
            this.$nextTick(
                () => {
                    if (this.CoverShowArticleDetail) {
                        console.log(1)
                        return true
                    } else {
                        console.log(2)
                        return false
                    }
                }
            )

        }
    },
}
</script>
<style lang="stylus" scoped>
* {
    box-sizing border-box
}
#cover {
    .homepage-cover {
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

        .author-avatar {
            width 96px
            height 96px
            background-image url('../assets/avatar.png')
            background-size cover
            border-radius 50%
            border 4px solid black
            box-sizing border-box
            margin 0 auto
            transition all 0.2s
        }

        .author-detail {
            border 1px solid
            width 80vw
            margin 0 auto
            word-break break-all
            transition all 0.2s
        }
    }

    .author-detail-rise-enter {
        opacity: 0;
        transform: translateY(30px);
    }
    .author-detail-rise-leave-active {
        position: absolute;
    }
}
</style>