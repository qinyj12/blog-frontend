<template>
    <div id="article-card-area">
        <transition name="cards-sink">
            <ul v-show="SinkAllCards">
                <li v-for="(item, index) in counts" :key="item.index">

                    <!-- 加一层路由 -->
                    <router-link :to="'/Content/' + item.index">
                        <div class="single-card waves" @click="HideFeaturedImg(index)">
                            <div class="featured-image" 
                                :class="{'featured-image-unclicked': !item.active, 'featured-image-clicked': item.active}" 
                                ref="FeaturedImages"
                            >
                            </div>
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
                    </router-link>

                </li>
            </ul>
        </transition>

        <div v-show="IfShowCopiedImg" ref="FeaturedImgCopied" class="featured-img-copied"></div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            counts: [{index: '一'}, {index: '二'}, {index: '三'}, {index: '四'}, {index: '五'}, ],
            IfShowCopiedImg: false,
            SinkAllCards: true
        }
    },
    methods: {
        // 点击卡片，隐藏FeaturedImage
        HideFeaturedImg(index) {

            // 改变vuex的状态，显示cover组件里的copied img 元素
            this.$store.commit('IfShowCopiedImg')

            // 把点击的卡片的dom发送给vuex
            this.SendFeaturedImgDom(index)

            // 找到被点击的那一张卡片，设为白底
            let TargetItem = this.counts[index];
            TargetItem.active = !TargetItem.active;
            this.$set(this.counts, index, TargetItem);

            // 卡片区域整体下沉
            this.MoveArticleCardArea();

            // 告诉vuex点击的卡片是什么图片
            this.$store.commit('ChangeHomepageCover', {TargetArticleCover: window.getComputedStyle(this.$refs.FeaturedImages[index]).backgroundImage})

        },

        // 在当前卡片的头图位置复制一份一模一样的图片
        CopyFeaturedImg(index) {
            // 先获取background属性，因为是外联样式所以不能用ref
            let TargetStyle = window.getComputedStyle(this.$refs.FeaturedImages[index]);
            let TargetBgImg = TargetStyle.backgroundImage;
            let TargetBgSize = TargetStyle.backgroundSize;

            // 给这个copied图片赋值background-image
            this.$refs.FeaturedImgCopied.style.backgroundImage = TargetBgImg;
            this.$refs.FeaturedImgCopied.style.backgroundSize = TargetBgSize;

            // 给这个copied图片赋值坐标
            let TargetDomRect = this.$refs.FeaturedImages[index].getBoundingClientRect();
            this.$refs.FeaturedImgCopied.style.height = TargetDomRect.height + 'px';
            this.$refs.FeaturedImgCopied.style.width = TargetDomRect.width + 'px';
            this.$refs.FeaturedImgCopied.style.left = TargetDomRect.left + 'px';
            this.$refs.FeaturedImgCopied.style.top = TargetDomRect.top + 'px';

            // 显示copied图片，并且fixed
            this.IfShowCopiedImg = !this.IfShowCopiedImg;
            this.$refs.FeaturedImgCopied.style.position = 'fixed';
        },

        // 把当前featured image的h、w、l、t等信息发送给vuex
        SendFeaturedImgDom(index) {
            // 先获取background属性，因为是外联样式所以不能用ref
            let TargetStyle = window.getComputedStyle(this.$refs.FeaturedImages[index]);
            let TargetBgImg = TargetStyle.backgroundImage;
            let TargetBgSize = TargetStyle.backgroundSize;

            // 再获取这个图片的w、h、t、l值
            let TargetDomRect = this.$refs.FeaturedImages[index].getBoundingClientRect();
            let TargetDomH = TargetDomRect.height + 'px';
            let TargetDomW = TargetDomRect.width + 'px';
            let TargetDomL = TargetDomRect.left + 'px';
            let TargetDomT = TargetDomRect.top + 'px';

            let res = {
                'TargetBgImg': TargetBgImg, 
                'TargetBgSize': TargetBgSize, 
                'TargetDomWidth': TargetDomW, 
                'TargetDomHeight': TargetDomH, 
                'TargetDomTop': TargetDomT, 
                'TargetDomLeft': TargetDomL, 
            }

            // 传值给vuex
           this.$store.commit('GetFeaturedImgDom', {CopiedDom: res})

        },

        // 复制图片后，移动图片
        MovedImgCopied() {
            this.$refs.FeaturedImgCopied.style.width = '100%';
            this.$refs.FeaturedImgCopied.style.height = '450px';
            this.$refs.FeaturedImgCopied.style.left = '0px';
            this.$refs.FeaturedImgCopied.style.top = '0px';
            this.$refs.FeaturedImgCopied.style.backgroundPosition = '50% 50%'
        },

        // 所有卡片整体下沉
        MoveArticleCardArea() {
            this.SinkAllCards = !this.SinkAllCards
        }

    },
}
</script>
<style lang="stylus" scoped>
#article-card-area {
    width 100%

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
    // 用于复制图层的动画
    .featured-img-copied {
        transition all 0.2s ease-out
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