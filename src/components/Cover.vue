// 头图，放在首页和文章详情页
<template>
    <div class="cover-component">
        <div class="cover">

            <!-- 以下是点击进入到文章详情页时展示的部分，包括标题、文章分类、作者、时间等 -->
            <transition name="article-detail-rise">
                <div v-show="IfShowArticleDetail">
                    <div><span class="article-category">{{Category}}</span></div>
                    <h1 class="article-title">{{Title}}</h1>
                    <div class="article-author-time">
                        <span>{{Author}}</span>
                        <span>{{PublishDate}}</span>
                    </div>
                </div>
            </transition>

            <!-- 以下是点击进入到作者页时展示的部分，包括头像、名字等 -->
            <div class="author-avatar-detail" v-show="CoverShowAuthorDetail">
                <transition-group name="author-detail-rise">
                    <div class="author-avatar" key="author-avatar">
                        <!-- 此处为demo临时变量，需在路由守卫里/或者author页面里设置，把头像存放在localstorage里 -->
                        <el-image :src="demo">
                            <!-- 头像加载过程中的占位内容 -->
                            <!-- <div slot="placeholder" class="image-slot">
                                <img :src="AuthorAvatarPlaceholder">
                            </div> -->
                        </el-image>
                    </div>
                    <!-- 这个元素的动画默认会从上方飘下来，不知道是根据什么定位的-->
                    <div class="author-detail" key="author-detail" v-show="IfShowAuthorDetail">
                        <h1>{{AuthorDetailName}}</h1>
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

            <!-- 这是模糊化后的背景图 -->
            <div class="cover-background" :style="{backgroundImage: 'url(' + CoverImg + ')', '--CoverBlur': CoverBlur}"></div>
        </div>

        <!-- 给cover组件加一层遮罩，当显示article-detail和author-detail时显示 -->
        <transition name="cover-mask-show">
            <div class="cover-mask" v-show="IfShowArticleDetail || IfShowAuthorDetail"></div>
        </transition>
        
    </div>
</template>
<script>
export default {
    // props: ['CoverImg', 'CoverShowArticleDetail', 'CoverShowAuthorDetail'],
    props: {
        CoverShowArticleDetail: Boolean,
        CoverShowAuthorDetail: Boolean,
        CoverImg: {
            default: function(val) {
                // 默认值要从vuex仓库里拿，不能在本组件中设置，
                // 因为本组件加载时会先调用default默认值，然后再引入父组件的传值，导致动画撕裂
                // 如果先从父组件传值到vuex，然后进入到cover组件，这样cover组件就可以先从vuex里拿值，再从父组件拿值，动画就不会撕裂
                return this.$store.state.CoverImg
            }
        },
        Category: {
            default: function(val) {
                return 'loading'
            }
        },
        Title: String,
        Author: String,
        PublishDate: String,
        CoverBlur: {
            default: function(val) {
                return '0px'
            }
        },
        AuthorDetailName: String,
        AuthorDetailAvatar: String,
        AuthorAvatarPlaceholder: String || Object,
        AuthorDetailIntroduction: String,
    },
    data() {
        return {
            // 这个字段是用来判断要不要显示article detail的，默认不显示
            IfShowArticleDetail: false,
            // 这个字段用来判断要不要显示author detail的，默认不显示
            IfShowAuthorDetail: false,
            AuthorContact: ['weibo', 'qq', 'weixin', 'github'],
            demo: localStorage.getItem('demo')
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
                        this.IfShowArticleDetail = true;
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
        .cover-background {
            width 100%
            height 100%
            position absolute
            z-index 0
            // background-repeat no-repeat
            background-size cover
            background-position 50% 50%
        }
        // 解决模糊后白边问题
        .cover-background:after {
            content ""
            width 100%
            height 100%
            top 0
            left 0
            position absolute
            background inherit // 继承background
            filter blur(var(--CoverBlur))
            // -webkit-filter: blur(5px);
            // -moz-filter: blur(5px);
            // -o-filter: blur(5px);
            // -ms-filter: blur(5px);
            // filter: blur(5px);
        }

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
            position relative

            .author-avatar {
                width 96px
                height 96px
                border-radius 50%
                border 4px solid white
                box-sizing border-box
                margin 0 auto
                transition all 0.2s
                overflow hidden
            }

            .author-detail {
                width 100%
                word-break break-all
                transition 0s
                display block
                font-size 14px
                position relative

                h1 {
                    height 36px
                }

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

            // // 以下是author-detail的动画
            // .author-detail-rise-enter {
            //     opacity 0
            //     // 不知道默认是根据什么定位的，改成-450px暂时没有问题
            //     transform translateY(-450px)
            // }
            // .author-detail-rise-enter-to {

            // }
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