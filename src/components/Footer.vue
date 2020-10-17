// 底栏哦
<template>
    <div id="site-footer">
        <div id="footer-top">
            <div class="footer-top-son footer-top-recommend">
                <div class="footer-top-recommend-wrap">
                    <h3 class="recommend-wrap-title">热门</h3>
                    <span class="recommend-wrap-arrow">
                        <i class="far fa-arrow-alt-circle-left" 
                            :class="{'gray-icon': RecommendedTurnGray == 'first' || RecommendedTurnGray == 'all'}" 
                            @click="SwitchRecommended('pre')"
                        ></i>
                        <i class="far fa-arrow-alt-circle-right" 
                            :class="{'gray-icon': RecommendedTurnGray == 'last' || RecommendedTurnGray == 'all'}" 
                            @click="SwitchRecommended('next')"
                        ></i>
                    </span>
                </div>

                <ul>
                    <swiper ref="mySwiper" :options="swiperOptions" @slideChange="onSlideChange">
                        <li class="hot-article swiper-slide" v-for="(item, index) in HotArticles" :key="index">
                            <swiper-slide>
                                <div class="hot-article-mask">
                                    <div class="hot-article-introduction">
                                        <h4>{{item.title}}</h4>
                                        <div class="hot-article-introduction-bottom">
                                            <span>{{item.time}}</span>
                                            <i class="far fa-comment"></i>
                                            <span>{{item.comments}}</span>
                                            <i class="far fa-eye"></i>
                                            <span>{{item.pageviews}}</span>
                                        </div>
                                    </div>
                                </div>
                            </swiper-slide>
                        </li>
                    </swiper>
                </ul>

            </div>

            <div class="tags-about-wrap">
                <div class="footer-top-son footer-top-tags">
                    <h3>标签</h3>
                    <ul>
                        <li v-for="(item, index) in tags" :key="index"># {{item}}</li>
                    </ul>
                </div>
                
                <div class="footer-top-son footer-top-about">
                    <h3>关于</h3>
                    <p>记录我们的生活，记录我们的生活，记录我们的生活，记录我们的生活，记录我们的生活，记录我们的生活，记录我们的生活，记录我们的生活</p>
                </div>
            </div>

        </div>

        <div id="footer-bottom">

            <div class="footer-bottom-wrap">
                <div class="footer-bottom-left">
                    <div class="footer-title"><img src="../assets/site-title.png" alt="LOGO"></div>
                </div>
                <div class="footer-bottom-right">
                    <i class="fab fa-weibo"></i>
                    <i class="fab fa-weixin"></i>
                    <i class="fab fa-github"></i>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            tags: ['案例', '生活', '旅游', '技术', '读书笔记', '玩乐', '美食', '见闻', '读书', '照片', '相册集'],
            HotArticles: [
                {title:'第一篇', time:'2020年10月11日', comments:'3', pageviews: '50'}, 
                {title:'第二篇', time:'2020年10月10日', comments:'1', pageviews: '100'}, 
                {title:'第三篇', time:'2020年10月12日', comments:'2', pageviews: '70'}, 
            ],

            swiperOptions: {
            },

            // 这个参数是用来判断哪个arrow icon变成灰色的
            RecommendedTurnGray: ''
        }
    },
    computed: {
        swiper() {
            return this.$refs.mySwiper.$swiper
        }
    },
    methods: {
        SwitchRecommended(key) {
            // 点击后退icon
            if (key == 'pre') {
                // 触发swiper的后退
                this.swiper.slidePrev();

            // 点击前进icon
            } else if (key == 'next') {
                // 触发swiper的前进
                this.swiper.slideNext();

            } else {
                alert('错误')
            }
        },
        // 判断热门文章是否只有一篇
        IfSingleRecommended() {
            // 如果只有一篇的话，前进后退两个icon都设置为灰色
            if (this.HotArticles.length <= 1) {
                this.RecommendedTurnGray = 'all'
            // 如果超过一篇，后退icon设置为灰色
            } else {
                this.RecommendedTurnGray = 'first'
            }
        },
        // 当热门文章滚动时
        onSlideChange() {
            // 当热门文章只有1篇时
            if (this.HotArticles.length <= 1) {
                // 啥也不干，用mounted的RecommendedTurnGray默认值就好
            } else {
                // 当前是第一篇时，动态改变后退icon为灰色
                if (this.swiper.progress == 0) {
                    this.RecommendedTurnGray = 'first'
                // 当前是最后一篇时，动态改变前景icon为灰色
                } else if (this.swiper.progress == 1) {
                    this.RecommendedTurnGray = 'last'
                // 否则，两个icon都不是灰色
                } else {
                    this.RecommendedTurnGray = 'none'
                }
            }
        }
    },
    mounted() {
        this.IfSingleRecommended();
    },
}
</script>

<style lang="stylus" scoped>
#site-footer {
    width 100%
    border-top 1px solid #dddddd
    box-sizing border-box

    #footer-top {
        display flex
        justify-content space-between
        padding 32px 4%
        max-width 1240px
        margin 0 auto
        box-sizing border-box

        .footer-top-son {
            // width 31%
            overflow hidden
        }

        .footer-top-recommend {
            width 31%
            
            .footer-top-recommend-wrap {
                width 100%
                display flex
                align-items center

                .recommend-wrap-title {
                    flex 1
                    overflow hidden
                }

                .recommend-wrap-arrow {
                    margin-left 15px

                    i {
                        font-size 25px
                        margin-left 5px
                        color #222222
                    }

                    i:hover {
                        cursor pointer
                    }

                    .gray-icon {
                        color #dddddd
                    }

                }
            }

            ul {
                list-style none
                padding 0
                margin 0
                border-radius 10px
                overflow hidden

                .swiper-container {

                    .swiper-wrapper {

                        li.hot-article {
                            box-sizing border-box
                            width 100%
                            padding-bottom 65%
                            background-image url('../assets/featured-image.png')
                            background-size cover
                            // position relative

                            .swiper-slide{
                                position absolute

                                .hot-article-mask {
                                    // border 1px solid red
                                    width 100%
                                    height 100%
                                    position absolute
                                    background-image linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4))
                                    display flex
                                    align-items flex-end
                                    padding 10px
                                    box-sizing border-box
                                    color white

                                    .hot-article-introduction {
                                        margin 0 0 5% 5%

                                        h4 {
                                            margin 0 0 10px
                                        }

                                        .hot-article-introduction-bottom {
                                            display flex
                                            align-items center
                                            height 20px

                                            * {
                                                margin-right 8px
                                            }

                                            span {
                                                display flex
                                                align-items center
                                                height 20px
                                            }

                                            span:not(:last-child):after {
                                                display inline-block
                                                content ''
                                                border-right 1px solid
                                                height 50%
                                                margin-left 10px
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        .tags-about-wrap {
            display flex
            justify-content space-between
            width 65.5%

            .footer-top-tags {
                width calc((31 / 65.5) * 100%)

                ul {
                    list-style none
                    padding 0
                    display flex
                    flex-wrap wrap

                    li {
                        display inline-block
                        color #999999
                        border 1px solid
                        border-radius 3px
                        margin 0 8px 8px 0
                        padding 0 13px
                        transition all 0.1s
                    }

                    li:hover {
                        background-color #19DDC4
                        color white
                        border 1px solid #19DDC4
                        cursor pointer
                    }
                }
            }

            .footer-top-about {
                color #999999
                width calc((31 / 65.5) * 100%)
            }
        }


        * {
            text-align left 

            h3 {
                position relative
                color #222222
            }

            // 这只是一条分割线
            h3:after {
                display inline-block
                position absolute
                margin-left 30px
                top 50%
                content ''
                width 100%
                height 1px
                background-color #222222
            }
        }
    }

    #footer-bottom {
        border-top 1px solid #dddddd
        // 和卡片区域的样式保持一致
        width 100%
        padding 32px 4%
        box-sizing border-box


        .footer-bottom-wrap {
            max-width 1140px
            margin 0 auto
            display flex
            justify-content space-between

            .footer-bottom-left {
                .footer-title {
                    height 60px

                    img {
                        height 100%
                    }
                }
            }

            .footer-bottom-right {
                display flex
                align-items center
                justify-content center

                // 给所有icon加一个渐变，hover时渐变颜色
                * {
                    transition all 0.1s
                    margin-left 20px
                    color gray
                }

                .fa-weibo:hover {
                    color rgb(230, 22, 45)
                    cursor pointer
                }
                .fa-weixin:hover {
                    color rgb(26, 173, 25)
                    cursor pointer
                }
                .fa-github:hover {
                    color black
                    cursor pointer
                }
            }
        }


    }

    // 当article card卡片排成2列时
    @media screen and (max-width 992px) {
        #footer-top {
            width 720px
            padding 32px 0
            display flex

            // 此时一张卡片的宽度是固定345px，这里也固定宽度
            .footer-top-recommend {
                width 345px
            }

            // tags和about的父元素也固定宽度345px，和recommend一起排成2列
            .tags-about-wrap {
                width 345px
                display block

                // tags也是固定345px，就是100%
                .footer-top-tags {
                    width 100%
                }
                // about也是固定345px，就是100%
                .footer-top-about {
                    width 100%
                }
            }
        }

        #footer-bottom {
            // 实际上效果也就是固定宽度720px
            padding 32px calc(50% - 360px)
        }
    }

    // 当article card卡片排成1列时
    @media screen and (max-width 768px) {
        #footer-top {
            width 100%
            padding 32px 15px
            display block

            // 此时一张卡片的宽度是固定345px，这里也固定宽度
            .footer-top-recommend {
                width 100%
            }

            // tags和about的父元素也固定宽度345px，和recommend一起排成2列
            .tags-about-wrap {
                width 100%
                display block

                // tags也是固定345px，就是100%
                .footer-top-tags {
                    width 100%
                }

                // about也是固定345px，就是100%
                .footer-top-about {
                    width 100%
                }
            }
        }

        #footer-bottom {
            .footer-bottom-wrap {
                display block

                .footer-bottom-right {
                    margin-top 20px
                }
            }

        }
    }
}

</style>