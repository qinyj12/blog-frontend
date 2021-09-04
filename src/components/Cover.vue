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
                    <!-- 此页avatar和上一页的avatar会形成连贯的动画，如果用ajax来获取头像的话，动画就撕裂了。放在css里就没问题，应该是css比js更优先执行的原因 -->
                    <div 
                        class="author-avatar" 
                        key="author-avatar"
                        :style="{backgroundImage: 'url(' + AvatarImg + ')'}"
                    >
                    </div>
                    <!-- 这个元素的动画默认会从上方飘下来，不知道是根据什么定位的-->
                    <div class="author-detail" key="author-detail" v-show="IfShowAuthorDetail">
                        <h1>{{AuthorDetailName}}</h1>
                        <p>{{AuthorDetailIntroduction}}</p>

                        <div class="contacts-list-box">
                            <ContactsList v-bind="$attrs" v-on="$listeners" />
                        </div>
                        
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
import { UserInfo } from '@/api/api.js';
import ContactsList from '@/components/ContactsList.vue';
export default {
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
        AuthorDetailIntroduction: String,
    },
    components: {
        ContactsList
    },
    data() {
        return {
            // 这个字段是用来判断要不要显示article detail的，默认不显示
            IfShowArticleDetail: false,
            // 这个字段用来判断要不要显示author detail的，默认不显示
            IfShowAuthorDetail: false,
            AuthorContact: ['weibo', 'qq', 'weixin', 'github'],
            AvatarImg: undefined
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
        async ShowAuthorDetail() {
            this.$nextTick(
                async () => {
                    if (this.CoverShowAuthorDetail) {
                        // let UserResp = await UserInfo(this.$route.params.author)
                        // console.log(UserResp.data)
                        // this.AvatarSaved = UserResp.data.avatar_url
                        this.IfShowAuthorDetail = true
                        // this.IfShowAuthorDetail = true
                    } else {
                        // 啥也不干
                    }
                }
            )
        },
    },
    // 在mounted之前，就把avatar存在css里
    async beforeMount() {
        // 判断进入的是不是用户详情页，如果是
        if (this.CoverShowAuthorDetail) {
            // 判断vuex里是不是已有值（如果有，代表是home=>author时，由home传入到vuex里的）
            if (this.$store.state.AvatarImg) {
                // 如果有，优先用vuex里的值
                this.AvatarImg = this.$store.state.AvatarImg
            } else {
                // 如果没有，就从语雀api获取值
                let UserResp = await UserInfo(this.$route.params.author)
                this.AvatarImg = UserResp.data.avatar_url
            }
        } else {
            // 啥也不干
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
                background-size cover
                background-position 50% 50%
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

                .contacts-list-box {
                    display flex
                    justify-content center
                    align-items center
                    color white
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
<style lang="stylus">
// 设置awesome font的颜色
#contacts-list {
    i.fab:hover {
        color white
    }
}
</style>