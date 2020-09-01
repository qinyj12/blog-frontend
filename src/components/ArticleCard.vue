<template>
    <div id="article-card-area">
        <ul>
            <li v-for="index in 5" :key="index">
                <div class="single-card">
                    <div class="featured-image"></div>
                    <div class="content-wrap">
                        <div class="entry-header">
                            <span class="category">案例</span>
                            <h3 class="title">这是{{index}}个案例</h3>
                        </div>
                        <div class="entry-footer">
                            <div class="author">
                                <div class="avatar"></div>
                                <span class="name">测试用户</span>
                            </div>
                            <div class="published-date">August 31, 2020</div>
                        </div>
                    </div>
                </div>
            </li>
        </ul>

    </div>
</template>

<style lang="stylus" scoped>
* {
    // border 1px solid 
    // box-sizing border-box
}
#article-card-area {
    padding 64px 0

    ul {
        list-style none
        padding 0
        display flex
        flex-direction row
        flex-wrap wrap
        justify-content space-between
        width 75%
        min-width 1100px
        margin 0 auto

        li {
            margin-bottom 60px

            .single-card {
                width 345px
                height 429px
                box-shadow 0px 1px 4px 0px rgba(0, 0, 0, 0.15)
                border-radius 4px
                overflow hidden

                .featured-image {
                    width 100%
                    height 224px
                    background url('../assets/featured-image.png') no-repeat
                    background-size cover
                }

                .content-wrap {
                    width 100%
                    height 205px

                    .entry-header {
                        width 313px
                        height 92px
                        margin 24px auto

                        .category {
                            color #999999
                            height 24px
                            position relative
                        }

                        .category:before, .category:after {
                            content ""
                            width 16px
                            height 1px
                            background rgba(153, 153, 153, 0.5)
                            position absolute
                            top 50%
                            margin-top -1px
                        }
                        .category:before {
                            left -24px
                        }
                        .category:after {
                            right -24px
                        }

                        .title {
                            height 56px
                            line-height 56px
                        }
                    }

                    .entry-footer {
                        width 313px
                        height 65px
                        margin 0 auto
                        border-top 1px solid rgba(204, 204, 204, 0.3)
                        display flex
                        align-items center
                        color #999999
                        font-size 12px

                        .author {
                            flex 1
                            height 32px
                            display flex

                            .avatar {
                                width 32px
                                height 32px
                                background url('../assets/avatar.png') no-repeat
                                background-size cover
                                border-radius 50%
                            }
                            .name {
                                height 32px
                                line-height 32px
                                margin-left 10px
                            }
                        }

                        .published-date {
                            height 32px
                            line-height 32px
                        }
                    }
                }
            }
        }

    }

}

</style>