<template>
    <div id="site-footer">
        <div id="footer-top"></div>
        <div id="footer-bottom">
            <div class="footer-bottom-left">
                <div class="footer-title"><img src="../assets/site-title.png" alt="LOGO"></div>
            </div>
            <div class="footer-bottom-right">
                <i class="fa fa-weibo"></i>
                <i class="fa fa-weixin"></i>
            </div>
        </div>
    </div>
</template>
<style lang="stylus" scoped>
@import url('https://netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
#site-footer {

    #footer-top {
        height 100px
        border 1px solid
    }

    #footer-bottom {
        border 1px solid
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

            .footer-icon {
                display block
                width 20px
                height 20px
                background-size cover
                margin-left 10px
            }
        }
    }
}
</style>