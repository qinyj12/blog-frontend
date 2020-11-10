// 文章推荐组件，放在文章详情页的底部
<template>
    <div id="articles-recommended">
        <h2>推荐阅读</h2>
        <ul class="articles-recommended">
            <li v-for="(item, index) in RecommendArticles" :key="item.title" class="single-article-recommended">

                <!-- 封面图 -->
                <img 
                    :src='item.cover'
                    alt="cover" 
                    class="article-recommended-cover"
                    @click="ClickCover(index)"
                >

                <div class="article-recommended-introduction">
                    <div class="article-recommended-tag-wrap">
                        <div class="article-recommended-tag">{{item.tag}}</div>
                    </div>
                    <!-- 文字溢出添加省略号 -->
                    <v-clamp 
                        max-height="calc(100% - 84px)" 
                        autoresize
                        class="article-recommended-title"
                    >
                        {{item.title}}
                    </v-clamp>

                    <div class="recommended-avatar-views">
                        <div class="recommended-avatar"></div>

                        <v-clamp 
                            :max-lines="1" 
                            autoresize class="recommended-author"
                        >
                            {{item.author}}
                        </v-clamp>

                        <i class="far fa-eye"></i>
                        <div>{{item.views}}</div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data() {
        return {
            RecommendArticles:[
                {title: '第一篇第一篇第一篇第一篇第一篇第一篇第一篇第一篇第一篇第一篇第一篇第一篇', tag: '案例', author: '测试用户', views: '50', cover: require('../assets/featured-image.png')},
                {title: '第二篇', tag: '生活end', author: '第二个测试用户hahaha', views: '150', cover: require('../assets/featured-image.png')}
            ]
        }
    },
    methods: {
        async ClickCover(index) {
            // 改变vuex仓库，当router:from.name==home 时，给500ms的缓冲时间，就是500ms之后才会触发路由
            // this.$store.commit('ChangeHomeBuffer', 500)

            // 找到被点击的那一张卡片，设卡片头图为白底
            this.CardClickedToBlank(index);

            // 拿到点击的那张卡片的头图，以及宽、高、位置
            // let TargetImgDom = this.GetClickedImgDom(this.$refs.FeaturedImages[index]);

            // 把上面拿到的宽、高、位置赋值给 #copied-img，copied-img显示出来
            // await this.CopyClickedImg(TargetImgDom, this.$refs.CopiedImg, require('../assets/featured-image.png'));

            // 卡片区域整体下沉，cover消失
            // await this.MoveArticleCardArea();

            // 移动copied-featured
            // await this.MoveCopiedFeatured();

            // body的滚动条常显，防止cover高度太小，滚动条不显示，然后在进入content后动画会撕裂
            // this.$store.commit('ChangeBodyScrollStatus', 'scroll');
        },

        // 找到被点击的那一张卡片，设为白底
        CardClickedToBlank(index) {
            let TargetItem = this.RecommendArticles[index];
            TargetItem.cover = ''
        },
    },
}
</script>
<style lang="stylus" scoped>
#articles-recommended {

    h2 {
        text-align left
    }

    h2:before {
        content ''
        border-left 8px solid #19DDC4
        margin-right 10px
    }

    ul.articles-recommended {
        list-style none
        padding 0

        li.single-article-recommended {
            height 200px
            width 100%
            display flex
            border-radius 4px
            overflow hidden
            box-shadow 0px 1px 4px 0px rgba(0, 0, 0, 0.15)
            position relative
            margin-bottom 32px

            img.article-recommended-cover {
                width 50%
                height 100%
                object-fit cover
                box-sizing border-box
            }

            .article-recommended-introduction {
                height 100%
                width 50%
                box-sizing border-box
                text-align left 
                padding 30px

                display flex
                flex-direction column

                .article-recommended-tag-wrap {
                    tag-height = 24px
                    height tag-height
                    margin-bottom 10px

                    .article-recommended-tag {
                        display inline-block
                        line-height tag-height // 达到居中的效果
                        border-radius 12px
                        padding 0 15px
                        background-color #009CFF
                        color white
                    }
                }

                .article-recommended-title {
                    font-weight bold
                    font-size large
                    flex 1
                }

                .recommended-avatar-views {
                    display flex
                    align-items center
                    height 40px

                    margin-top 10px

                    * {
                        margin-right 5px
                    }

                    .recommended-avatar {
                        width 32px
                        height 32px
                        border-radius 50%
                        background-image url('../assets/avatar.png')
                        background-size cover
                    }

                    .recommended-author {
                        margin-right 15px
                        max-width 50%
                    }
                }
            }
        }

        @media screen and (max-width 768px) {
            li.single-article-recommended {

                img.article-recommended-cover {
                    width 100%
                    height 100%
                    position absolute
                }

                .article-recommended-introduction {
                    width 100%
                    z-index 1
                    color white
                    background-color rgba(0, 0, 0, 0.5)
                }
            }


        }
    }
}
</style>