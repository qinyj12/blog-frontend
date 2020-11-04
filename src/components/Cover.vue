// 头图，放在首页和文章详情页
<template>
    <div id="cover">
        <div class="homepage-cover" :style="{backgroundImage: 'url(' + CoverImg + ')'}">

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
                    <!-- 因为这个元素无论如何都会从上方飘下来，很难定位，所以干错做成一个空的占位元素 -->
                    <div class="blank-author-detail" key="author-detail" v-show="IfShowAuthorDetail"></div>
                    <!-- <span class="author-detail" key="author-detail" v-show="IfShowAuthorDetail">测试</span> -->
                </transition-group>
            </div>

            <!-- 真正的元素在这里 -->
            <transition name="true-author-detail-move">
                <div class="true-author-detail" v-show="IfShowAuthorDetailSon">测试</div>
            </transition>

            <button @click="demo()" style="position:fixed">测试</button>

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
            IfShowAuthorDetail: false,
            // 在transition-group内部嵌套了一个transition，来达到平滑动画的目的
            IfShowAuthorDetailSon: false
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
        // 
        demo() {
            this.IfShowAuthorDetailSon = !this.IfShowAuthorDetailSon
        }
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

        .author-avatar-detail {
            // position relative

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

            .blank-author-detail {
                border 1px solid
                height 150px
                // width 80vw
                // word-break break-all
                transition all 0.2s
            }

        }

        // 这才是真正的author-detail，用absolute定位
        .true-author-detail {
            position absolute
            top 0
            left 0
            border 1px solid green
        }

    }

}
</style>