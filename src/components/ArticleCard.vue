<template>
    <div id="article-card-area">
        <!-- 这里要记住article-card组件的滚动条位置，所以要keep-alive -->
        <keep-alive>
            <!-- 套一个动画， -->
            <transition name="cards-sink">
                <!-- 这是所有的卡片列表 -->
                <ul v-show="!SinkAllCards">
                    <li v-for="(item, index) in counts" :key="item.index">
                        <!-- 加一层路由 -->
                        <!-- <router-link :to="'/Content/' + item.index"> -->
                            <div class="single-card waves" @click="ClickCardToContent(index)">
                                <!-- 这是卡片的头图 -->
                                <div class="featured-image" 
                                    :class="{'featured-image-unclicked': !item.active, 'featured-image-clicked': item.active}" 
                                    ref="FeaturedImages"
                                >
                                </div>
                                <!-- 这是头图下方的文字部分 -->
                                <div class="content-wrap">
                                    <div class="entry-header">
                                        <span class="category">案例</span>
                                        <h3 class="title">这是第{{item.index}}个案例</h3>
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
                        <!-- </router-link> -->
                    </li>
                </ul>
            </transition>
        </keep-alive>
        <transition name="move-copied-img">
            <!-- 这是点击卡片后复制的图片 -->
            <div id="copied-img"  ref="CopiedImg" v-show="ShowCopiedImg"></div>
        </transition>


    </div>
</template>
<script>
export default {
    data() {
        return {
            counts: [{index: '一'}, {index: '二'}, {index: '三'}, {index: '四'}, {index: '五'}, ],
            SinkAllCards: false,
            ShowCopiedImg: false
        }
    },
    methods: {
        // 点击卡片后的一系列动画
        async ClickCardToContent(index) {
            // 找到被点击的那一张卡片，设为白底
            this.CardClickedToBlank(index);

            // 拿到点击的那张图片，以及宽、高、位置
            let TargetImgDom = this.GetClickedImgDom(index);

            // 把上面拿到的宽、高、位置赋值给 #copied-img
            await this.CopyClickedImg(TargetImgDom);

            // 移动复制的图片
            // await this.MoveCopiedImg(this.$refs.CopiedImg);

            // 卡片区域整体下沉
            // this.MoveArticleCardArea()

        },

        // 找到被点击的那一张卡片，设为白底
        CardClickedToBlank(index) {
            let TargetItem = this.counts[index];
            TargetItem.active = !TargetItem.active;
            this.$set(this.counts, index, TargetItem);
        },

        // 获取被点击卡片的头图的各种参数
        GetClickedImgDom(index) {
            // 用getBoundingClientRect方法，直接获取目标的大小和相对视口的位置，间接获取目标的宽、高
            let TargetImgDom = this.$refs.FeaturedImages[index].getBoundingClientRect();
            let TargetImgTop = TargetImgDom['top'];
            let TargetImgBottom = TargetImgDom['bottom'];
            let TargetImgLeft = TargetImgDom['left'];
            let TargetImgRight = TargetImgDom['right'];
            // 有些浏览器没有width和top属性，所以用right-left和bottom-top来处理
            let TargetImgWidth = TargetImgDom['width']||TargetImgRight - TargetImgLeft;
            let TargetImgHeight = TargetImgDom['height']||TargetImgBottom - TargetImgTop;
            // 返回这个目标的dom属性，上面拿到的所有属性都是int，要 +"px" 转成str
            return {
                'width': TargetImgWidth +'px', 
                'height': TargetImgHeight +'px', 
                'left': TargetImgLeft +'px', 
                'top': TargetImgTop +'px' 
            }
        },

        // 复制被点击的图片，生成一模一样的图片。做成promise对象
        CopyClickedImg(TargetDom) {
            let CopiedImg = this.$refs.CopiedImg;
            return new Promise((reslove) => {
                reslove(
                    this.ShowCopiedImg = true,
                    CopiedImg.style['display'] ='block',
                    CopiedImg.style['width'] = TargetDom['width'],
                    CopiedImg.style['height'] = TargetDom['height'],
                    CopiedImg.style['left'] = TargetDom['left'],
                    CopiedImg.style['top'] = TargetDom['top'],
                    // 因为是开发环境，都用本地图片就好了
                    CopiedImg.style['background-image'] = 'url("' + require('../assets/featured-image.png') + '")'
                )
            })

        },

        // 移动复制的图片，做成promise对象
        MoveCopiedImg(target) {
            return new Promise((resolve) => {
                resolve(
                    target.style['left'] = '0',
                    target.style['top'] = '0'
                )
            })
        },

        // 所有卡片整体下沉
        MoveArticleCardArea() {
            // 这是用来清除所有卡片的，会有一个下沉的动画
            this.SinkAllCards = true
        },
        // 点击卡片=》生成新图片=》新图片动画=》sleep后卡片下沉=》卡片消失


    },
}
</script>
<style lang="stylus" scoped>
#article-card-area {
    width 100%

    // 这是点击卡片后复制的一模一样的图片，默认不显示，并且要针对视口fixed定位
    #copied-img {
        // display none
        position fixed
        background-repeat no-repeat
        background-size cover
    }
    .move-copied-img-enter-active {
        transition all 1s
    }
    .move-copied-img-enter {
        transform translateX(100px)
        opacity 0
    }

    ul {
        list-style none
        padding 0
        display flex
        flex-direction row
        flex-wrap wrap
        max-width 1140px
        box-sizing border-box

        li {
            margin-bottom 60px
            width 345px

            .single-card {
                width 100%
                height 429px
                box-shadow 0px 1px 4px 0px rgba(0, 0, 0, 0.15)
                border-radius 4px
                overflow hidden

                .featured-image {
                    width 100%
                    height 224px
                    // background-image url('../assets/featured-image.png')
                    background-repeat no-repeat
                    background-size cover
                    // background-position 50% 50%
                }

                .featured-image-unclicked {
                    background-image url('../assets/featured-image.png')
                }
                .featured-image-clicked {
                    background-image url()
                }

                .content-wrap {
                    width 100%
                    height 205px

                    .entry-header {
                        width 95%
                        height 92px
                        margin 24px auto

                        .category {
                            color #999999
                            height 24px
                            position relative
                            // 不知道为啥，用了relative后这个元素就在侧边栏及其蒙版的上方了，只能手动z-index来弥补
                            z-index -1
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
                        width 95%
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

    // 用于卡片下沉的动画
    .cards-sink-enter-active, .cards-sink-leave-active {
        transition: all 0.2s
    }
    .cards-sink-enter, .cards-sink-leave-to /* .fade-leave-active, 2.1.8 版本以下 */ {
        transform translateY(100px)
        opacity 0
    }
}

// 这一部分是处理自适应的
// 当屏幕宽度<992时，卡片变成三列
@media screen and (min-width 992px) {
    #article-card-area {
        // 屏幕越宽，两边的留白越大
        padding 64px 4%
        // 如果父元素不设置border-box，子元素width=100%时不会把父元素的padding考虑在内。
        box-sizing border-box

        ul {
            width 100%
            margin 0 auto

            li {
                // 屏幕越宽，卡片越宽
                width 31%
            }
            // 父元素用了flex，为了在子元素间距相等的同时，保证最后一行的元素居左，就不能使用space-between，而是要让手动设置margin
            li:not(:nth-child(3n)) {
                margin-right calc((100% - (31% * 3))/2)
            }
        }
    }
}

// 当屏幕宽度<1100时，卡片变成双列
@media screen and (max-width 992px) {
    #article-card-area {
        // 因为子元素ul已经设置了固定宽度，所以父元素不设置padding也没关系，两边依然能有留白
        padding 64px 0
        // 如果父元素不设置border-box，子元素width=100%时不会把父元素的padding考虑在内。
        box-sizing border-box

        ul {
            // 设置双列以后，父元素width恒定为720px，卡片大小不变，只是两边留白自适应
            width 720px
            margin 0 auto
            // 父元素用了flex，为了在子元素间距相等的同时，保证最后一行的元素居左，就不能使用space-between，而是要让手动设置margin
            li:not(:nth-child(2n)) {
                margin-right calc((100% - (345 * 2) * 1px)/1)
            }
        }
    }
}

// 当屏幕宽度<(345*2+15*2=720)时，卡片变成单列，并且卡片width=100%。此处只需要把父元素li改成100%
@media screen and (max-width 768px) {
    #article-card-area {
        // 随便变成了单列，两边仍然要留出15px空白
        padding 64px 15px
        // 如果父元素不设置border-box，子元素width=100%时不会把父元素的padding考虑在内。
        box-sizing border-box

        ul {
            // 因为父元素已经有15px的padding，所以子元素直接100%接到头就好
            width 100%
            // 因为变成了单列，所以纵向陈列
            flex-direction column

            li {
                // 因为是单列，所以直接100%
                width 100%
            }
        }
    }
}

</style>