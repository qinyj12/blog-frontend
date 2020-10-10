<template>
    <div id="site-footer">
        <div id="footer-top">
            <div class="footer-top-son footer-top-recommend">
                <h3>热门</h3>
                <div class="hot-article">
                    <div class="hot-article-mask">
                        <h4>第x个案例</h4>
                        <div>123</div>
                    </div>
                </div>
            </div>

            <div class="footer-top-son footer-top-tags">
                <h3>标签</h3>
                <ul>
                    <li v-for="(item, index) in tags" :key="index"># {{item}}</li>
                </ul>
            </div>
            
            <div class="footer-top-son footer-top-about">
                <h3>关于</h3>
                <p>记录我们的生活</p>
            </div>
        </div>

        <div id="footer-bottom">
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
</template>
<script>
export default {
    data() {
        return {
            tags: ['案例', '生活', '旅游', '技术', '玩乐']
        }
    },
}
</script>
<style lang="stylus" scoped>
#site-footer {
    #footer-top {
        border 1px solid
        display flex
        justify-content space-between
        padding 0 4%

        .footer-top-son {
            border 1px solid
            width 31%
            overflow hidden
        }

        .footer-top-recommend {
            .hot-article {
                box-sizing border-box
                border-radius 10px
                width 100%
                padding-bottom 65%
                background-image url('../assets/featured-image.png')
                background-size cover
                position relative

                .hot-article-mask {
                    border 1px solid
                    width 100%
                    height 100%
                    position absolute
                    background-image linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3))
                    display flex
                    align-items flex-end
                    padding 10px
                    box-sizing border-box

                    h4 {
                        margin 0
                        color white
                        border 1px solid
                    }

                    div {
                        color white
                        border 1px solid
                    }
                }
            }

        }

        .footer-top-tags {
            ul {
                list-style none
                padding 0
                display flex
                flex-wrap wrap

                li {
                    display inline-block
                    color gray
                    border 1px solid gray
                    border-radius 3px
                    margin 0 8px 8px 0
                    padding 0 13px
                    transition all 0.1s
                }

                li:hover {
                    background-color #19DDC4
                    color white
                    border 1px solid #19DDC4
                }
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
        // 和卡片区域的样式保持一致
        max-width 1140px
        padding 20px 4%
        box-sizing border-box
        margin 0 auto
        // flex布局
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

    @media screen and (max-width 768px) {
        #footer-bottom {
            display block

            .footer-bottom-right {
                margin-top 20px
            }
        }
    }
}

</style>