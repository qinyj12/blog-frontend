// 头图，放在首页和文章详情页
<template>
    <div id="cover">
        <div class="homepage-cover" :style="{backgroundImage: 'url(' + CoverImg + ')'}">

            <transition name="cover-detail-rise">
                <div v-show="ShowDetail">
                    <div><span class="cover-category">案例</span></div>
                    <h1 class="cover-title">这是文章详情页</h1>
                    <div class="cover-author-time">
                        <span>测试用户</span>
                        <span>2020.10.23</span>
                    </div>
                </div>
            </transition>

        </div>
    </div>
</template>
<script>
export default {
    props: ['CoverImg', 'CoverShowDetail'],
    data() {
        return {
            // 这个字段是用来触发transition动画的
            ShowDetail: false
        }
    },
    methods: {
        ShowDetailAndtransition() {
            // DOM加载完成后
            this.$nextTick(
                () => {
                    // 如果接收到的值CoverShowDetail==true，说明要显示title、author、time等字段
                    if (this.CoverShowDetail) {
                        // 那就动态修改v-show
                        this.ShowDetail = true
                    // 否则的话
                    } else {
                        // 啥也不干
                    }
                }
            )
        }
    },
    mounted() {
        // 监听父组件的传值，然后判断要不要显示detail，如果要显示的话，在DOM渲染完成后显示transition动画
        this.ShowDetailAndtransition()
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

        .cover-category {
            height 24px
            position relative
        }

        .cover-category:before, .cover-category:after {
            content ""
            width 16px
            height 1px
            background white
            position absolute
            top 50%
        }
        .cover-category:before {
            left -24px
        }
        .cover-category:after {
            right -24px
        }

        .cover-title {
            margin 32px 0
        }

        .cover-author-time {
            span:not(:last-child):after {
                content ''
                margin 0 10px
                border-right 1px solid 
            }
        }
        .cover-detail-rise-enter-active {
            transition: all 0.2s
        }
        .cover-detail-rise-enter {
            transform translateY(100px)
            opacity 0
        }
    }


}
</style>