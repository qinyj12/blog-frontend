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
                        <li class="hot-article swiper-slide" v-for="(item, index) in HotArticles" :key="index"  @click="ClickHotArticle()">
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
                    <!-- 加载所有标签的过渡动画 -->
                    <div class="tags-loading-box" v-show="!ShowTags && !TagsFailed">
                        <span class="tags-loading-son tags-loading-1"></span>
                        <span class="tags-loading-son tags-loading-2"></span>
                        <span class="tags-loading-son tags-loading-3"></span>
                        <span class="tags-loading-son tags-loading-4"></span>
                        <span class="tags-loading-son tags-loading-5"></span>
                    </div>
                    <!-- 所有标签 -->
                    <ul v-show="ShowTags && !TagsFailed">
                        <li 
                            v-for="(item, index) in tags" 
                            :key="index" 
                            @click="ClickTag(item)"
                        >
                            # {{item}}
                        </li>
                    </ul>
                    <!-- 加载失败后显示 -->
                    <div v-show="TagsFailed" class="tags-failed-box">
                        <span>失败了o(╥﹏╥)o</span>
                        <span>点击<a @click="GetAllTags('qinyujie-067rz')">重试</a></span>
                    </div>

                    <div class="tags-tip">标签API更新频率：24小时一次</div>
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
import { AllTags } from '@/api/api.js';
export default {
    data() {
        return {
            tags: [],
            ShowTags: false,
            TagsFailed: false,
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
        },
        // 点击tag标签
        ClickTag(TargetTag) {
            let CurrentTag = this.$route.path.split('/')[this.$route.path.split('/').length - 1];
            // 如果/tag/生活 => /tag/生活
            if (CurrentTag == TargetTag) {
                this.ScrollToTop();
            // 如果/tag/生活 => /tag/旅游
            } else {
                // footer => tag时，延迟0.5秒再进入路由，给动画缓冲时间
                this.$store.commit('ChangeHomeBuffer', 500);
                // footer => tag时，触发cover和card组件的sink动画
                this.$store.commit('SinkCoverAndArticle', true);
                // 点击tag，进入到tag页面
                this.$router.push('/tag/' + TargetTag)
            }
        },
        // 滚动到顶部
        ScrollToTop() {
            let top = document.documentElement.scrollTop || document.body.scrollTop;
            // 实现滚动效果 
            const timeTop = setInterval(() => {
                document.body.scrollTop = document.documentElement.scrollTop = top -= 50;
                if (top <= 0) {
                clearInterval(timeTop);
                }
            }, 10);
        },

        // 点击hot article，从/content/1 => /content/2
        ClickHotArticle() {
            this.$router.push('/content/13')
        },
        // 修改vuex中的一个值，隐藏掉content组件中所有的子组件
        HideAllThing() {
            this.$store.commit('SinkSomething', true)
        },
        // 从后端获取所有docs的标签
        async GetAllTags(login) {
            this.ShowTags = false;
            this.TagsFailed = false;
            return AllTags(login).then(resp => {
                if (resp.code == 200) {
                    this.tags = resp.result;
                    this.ShowTags = true;
                    this.TagsFailed = false
                } else {
                    console.log(resp.message)
                    this.ShowTags = false;
                    this.TagsFailed = true
                }
                
            })
        }
    },
    async mounted() {
        // 判断热门文章是否只有一篇
        this.IfSingleRecommended();
        // 从后端获取所有docs的标签
        await this.GetAllTags('qinyujie-067rz');

        
    },
    destroyed() {
        this.$store.commit('ChangeHomeBuffer', 0);
        this.$store.commit('SinkCoverAndArticle', false);
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
                position relative

                .tags-loading-box {
                    display flex
                    justify-content space-between
                    flex-wrap wrap
                    padding 0 10px

                    .tags-loading-son {
                        display inline-block
                        height 15px
                        // border 1px solid
                        margin 5px 0
                        // background: #eee;
                        // background-size 100% 100%
                        background linear-gradient(110deg, #ececec 8%, #ececec 33%)
                        animation 2s shine linear infinite
                    }
                    @keyframes shine {
                        0% {
                            opacity 0.5
                        } 50% {
                            opacity 1
                        } 100% {
                            opacity 0.5
                        }
                    }

                    .tags-loading-1 {
                        width 50%
                    }
                    .tags-loading-2 {
                        width 47%
                    }
                    .tags-loading-3 {
                        width 20%
                    }
                    .tags-loading-4 {
                        width 40%
                    }
                    .tags-loading-5 {
                        width 34%
                    }
                }

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
                        height 25px
                        line-height 25px
                    }

                    li:hover {
                        background-color #19DDC4
                        color white
                        border 1px solid #19DDC4
                        cursor pointer
                    }
                }

                .tags-failed-box {
                    width 100%
                    box-sizing border-box
                    display flex
                    align-items center
                    justify-content center
                    flex-direction column
                    padding 0px 10px
                    
                    span {
                        margin 0px 0px 5px

                        a {
                            text-decoration underline
                            color CadetBlue
                        }
                        a:hover {
                            cursor pointer
                        }
                    }
                }

                .tags-tip {
                    display flex
                    font-size small
                    font-style italic
                    color gray
                    justify-content flex-end
                    padding 10px 10px
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