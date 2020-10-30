// 首页的文章卡片区域
<template>
    <div id="article-card-area">
        <!-- 引入cover组件，随卡片区域一起消失 -->
        <transition name="cover-sink">
            <Cover v-show="!SinkAllCards" v-bind="{CoverImg: CoverImg, CoverShowDetail: false}"/>
        </transition>

        <!-- 这里要记住article-card组件的滚动条位置，所以要keep-alive -->
        <keep-alive>
            <transition name="cards-sink">
                <!-- 这是所有的卡片列表 -->
                <ul v-show="!SinkAllCards">
                    <li v-for="(item, index) in counts" :key="item.index">
                        <!-- 加一层路由 -->
                        <router-link :to="'/content/' + item.index">
                            <div class="single-card " @click="ClickCard(index)">
                                <!-- 这是卡片的头图 -->
                                <div class="featured-image" 
                                    :class="{'featured-image-unclicked': !item.HideFeaturedImg, 'featured-image-clicked': item.HideFeaturedImg}" 
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
                                        <router-link to="/author/测试用户">
                                        <!-- stop阻止click冒泡，prevent阻止router-link -->
                                        <div class="author" @click.stop="ClickAuthor(index)">
                                            <div 
                                                class="avatar"
                                                :class="{
                                                    'avatar-unclicked': !item.HideAvatar, 
                                                    'avatar-clicked': item.HideAvatar
                                                }"
                                                ref="avatar"
                                            >
                                            </div>

                                            <span class="name">测试用户</span>
                                        </div>
                                        </router-link>
                                        <div class="published-date">August 31, 2020</div>
                                    </div>
                                </div>
                            </div>
                        </router-link>
                    </li>
                </ul>
            </transition>
        </keep-alive>

        <!-- 这是点击卡片后复制的头图 -->
        <div class="copied-img" ref="CopiedImg" 
            :class="{
                'copied-featured-default': true,
                'copied-img-start': ShowCopiedImg, 
                'copied-featured-move': CopiedFeaturedMoved, 
                'copied-img-end': CopiedImgEnd
            }"
        >
        </div>

        <!-- 这是点击头像后复制的头像 -->
        <div class="copied-img" ref="CopiedAvatar" 
            :class="{
                'copied-avatar-default': true,
                'copied-img-start': ShowCopiedImg, 
                'copied-avatar-move': CopiedAvatarMoved, 
                'copied-img-end': CopiedImgEnd
            }"
        >
        </div>

        <!-- 隐藏在avatar下方，点击avatar后展开 -->
        <div class="copied-img" ref="AvatarBack"
            :class="{
                'avatar-back-default': true,
                'copied-img-start': ShowCopiedImg,
                'avatar-back-move': CopiedAvatarMoved,
                'avatar-back-end': CopiedImgEnd
            }"
        >
        </div>

        <!-- 这是footer栏以及动画 -->
        <transition name="footer-sink">
            <Footer v-show="!SinkAllCards" />
        </transition>

    </div>
</template>

<script>
import Cover from '@/components/Cover.vue';
import Footer from '@/components/Footer.vue';
export default {
    data() {
        return {
            counts: [{index: '一'}, {index: '二'}, {index: '三'}, {index: '四'}, {index: '五'}, ],
            SinkAllCards: false,
            ShowCopiedImg: false,
            CopiedFeaturedMoved: false,
            CopiedAvatarMoved: false,
            CopiedImgEnd: false,
            // 传值给cover组件
            CoverImg: require('../assets/cover.png')
        }
    },
    components: {
        Cover,
        Footer
    },
    methods: {
        // 点击卡片后的一系列动画
        async ClickCard(index) {
            // 改变vuex仓库，当router:from.name==home 时，给500ms的缓冲时间，就是500ms之后才会触发路由
            this.$store.commit('ChangeHomeBuffer', 500)

            // 找到被点击的那一张卡片，设卡片头图为白底
            this.CardClickedToBlank(index);

            // 拿到点击的那张卡片的头图，以及宽、高、位置
            let TargetImgDom = this.GetClickedImgDom(this.$refs.FeaturedImages[index]);

            // 把上面拿到的宽、高、位置赋值给 #copied-img，copied-img显示出来
            await this.CopyClickedImg(TargetImgDom, this.$refs.CopiedImg, require('../assets/featured-image.png'));

            // 卡片区域整体下沉，cover消失
            await this.MoveArticleCardArea();

            // 移动copied-featured
            await this.MoveCopiedFeatured();

            // body的滚动条常显，防止cover高度太小，滚动条不显示，然后在进入content后动画会撕裂
            this.$store.commit('ChangeBodyScrollStatus', 'scroll');
        },

        // 点击用户名字和头像后的一系列动画
        async ClickAuthor(index) {
            // 改变vuex仓库，当router:from.name==home 时，给500ms的缓冲时间，就是500ms之后才会触发路由
            this.$store.commit('ChangeHomeBuffer', 500)

            // 找到被点击的那一张卡片，设用户头像为白底
            this.AvatarClickedToBlank(index);

            // 拿到点击的那张卡片的头像，以及宽、高、位置
            let TargetImgDom = this.GetClickedImgDom(this.$refs.avatar[index]);

            // 把上面拿到的宽、高、位置赋值给 copied-avatar，copied-avatar显示出来
            await this.CopyClickedImg(TargetImgDom, this.$refs.CopiedAvatar, require('../assets/avatar.png'));

            // 把上面拿到的宽、高、位置赋值给 avatar-back，avatar-back显示出来
            await this.CopyClickedImg(TargetImgDom, this.$refs.AvatarBack, require('../assets/featured-image.png'));

            // 卡片区域整体下沉，cover消失
            await this.MoveArticleCardArea();

            // 移动copied-avatar
            await this.MoveCopiedAvatar();

        },

        // 找到被点击的那一张卡片，设为白底
        CardClickedToBlank(index) {
            let TargetItem = this.counts[index];
            TargetItem.HideFeaturedImg = !TargetItem.HideFeaturedImg;
            this.$set(this.counts, index, TargetItem);
        },

        // 找到被点击的那个头像，设为白底
        AvatarClickedToBlank(index) {
            let TargetItem = this.counts[index];
            TargetItem.HideAvatar = !TargetItem.HideAvatar;
            this.$set(this.counts, index, TargetItem);
        },

        // 获取被点击对象的各种参数
        GetClickedImgDom(target) {
            // 用getBoundingClientRect方法，直接获取目标的大小和相对视口的位置，间接获取目标的宽、高
            // let TargetImgDom = this.$refs.FeaturedImages[index].getBoundingClientRect();
            let TargetImgDom = target.getBoundingClientRect();
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
        // 第二个参数CopiedDom是用来判断复制的是featured-img还是avatar，即点击的是卡片（home=>content）还是头像（home=>author）
        CopyClickedImg(TargetDom, CopiedDom, TargetImg='') {
            return new Promise((reslove) => {
                reslove(
                    CopiedDom.style.setProperty('--CopiedImgBg', 'url("' + TargetImg + '")'),
                    CopiedDom.style.setProperty('--CopiedImgWidth', TargetDom['width']),
                    CopiedDom.style.setProperty('--CopiedImgHeight', TargetDom['height']),
                    CopiedDom.style.setProperty('--CopiedImgLeft', TargetDom['left']),
                    CopiedDom.style.setProperty('--CopiedImgTop', TargetDom['top']),
                    // 显示copied-img
                    this.ShowCopiedImg = true,
                )
            })
        },

        // 移动复制的featured-img，做成promise对象
        MoveCopiedFeatured() {
            return new Promise((resolve) => {
                // 一定要加一个settimeout，不然就不会有动画，而是瞬移
                setTimeout(() => {
                    resolve(
                        this.CopiedFeaturedMoved = true
                    )
                }, 200)
            })
        },

        // 移动复制的avatar-img，做成promise对象
        MoveCopiedAvatar() {
            return new Promise((resolve) => {
                // 一定要加一个settimeout，不然就不会有动画，而是瞬移
                setTimeout(() => {
                    resolve(
                        this.CopiedAvatarMoved = true
                    )
                }, 200)
            })
        },

        // 移动avatar-back，做成promise对象
        MoveAvatarBack() {
            return new Promise((resolve) => {
                // 一定要加一个settimeout，不然就不会有动画，而是瞬移
                setTimeout(() => {
                    resolve(
                        // 兼容CopiedAvatarMoved，不单独做成一个data字段了
                        this.CopiedAvatarMoved = true
                    )
                }, 200)
            })
        },

        // 所有卡片整体下沉，cover组件也下沉
        MoveArticleCardArea() {
            return new Promise((resolve) => {
                resolve(
                    this.SinkAllCards = true
                )
            })
        },

    },
}
</script>
<style lang="stylus">
body {
    overflow-y auto
}
</style>
<style lang="stylus" scoped>
// 卡片和cover下沉的时间
sink-time = 0.2s
// copied-img的动画时间
copied-img-time = 0.3s

#article-card-area {
    width 100%

    // 这是点击卡片后复制的一模一样的图片，默认不显示，并且要针对视口fixed定位
    .copied-img {
        background-repeat no-repeat
        background-size cover
        background-position 50% 50%
        transition all copied-img-time
    }
    // copied-img出现时，默认是以fixed定位
    .copied-featured-default {
        position fixed
        border-radius 4px
    }
    // copied-avatar出现时，默认是fixed定位
    .copied-avatar-default {
        position fixed
        border-radius 50%
        box-sizing border-box
    }

    // 点击卡片或头像后，给copied-img设置初始值，就是完全复制被点击卡片的属性，此时仍是fixed定位
    .copied-img-start {
        background-image var(--CopiedImgBg)
        width var(--CopiedImgWidth)
        height var(--CopiedImgHeight)
        left var(--CopiedImgLeft)
        top var(--CopiedImgTop)
    }
    // 移动卡片头图到指定位置，并缩放大小
    .copied-featured-move {
        left 0
        top 80px
        width 100%
        height 450px
        border-radius 0px
    }
    // 移动作者头像到指定位置，并缩放大小
    .copied-avatar-move {
        left calc(50% - 48px)
        top calc(80px + (450 / 2) * 1px - 48px)
        width 96px
        height 96px
        border 4px solid black
    }
    // avatar动画结束后
    .copied-avatar-end {
        position static
    }

    // avatar-background的默认样式
    .avatar-back-default {
        position fixed
        z-index -1
        border-radius 50%
    }
    // 点击头像后，完全复制头像的初始值
    .avatar-back-start {
        width var(--CopiedImgWidth)
        height var(--CopiedImgHeight)
        left var(--CopiedImgLeft)
        top var(--CopiedImgTop)
    }
    // 移动avatar-background到指定位置，并缩放大小
    .avatar-back-move {
        left 0
        top 80px
        width 100%
        height 450px
        border-radius 0
    }
    // avatar-background动画结束后
    .avatar-back-end {
        position static
    }

    // cover区域的动画
    .cover-sink-leave-active {
        transition all sink-time
    }
    .cover-sink-leave-to /* .fade-leave-active, 2.1.8 版本以下 */ {
        transform translateY(100px)
        opacity 0
    }

    // 卡片区域
    ul {
        list-style none
        padding 0
        display flex
        flex-direction row
        flex-wrap wrap
        max-width 1240px
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
                    background-position 50% 50%
                }
                // 没点击卡片时，正常展示图片
                .featured-image-unclicked {
                    background-image url('../assets/featured-image.png')
                }
                // 点击卡片后，设为白底
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
                                background-size cover
                                border-radius 50%
                            }

                            .avatar-unclicked {
                                background-image url('../assets/avatar.png')
                            }

                            .avatar-clicked {
                                background url('')
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
    .cards-sink-leave-active {
        transition: all sink-time
    }
    .cards-sink-leave-to /* .fade-leave-active, 2.1.8 版本以下 */ {
        transform translateY(100px)
        opacity 0
    }

    // 用于footer下沉的动画
    .footer-sink-leave-active {
        transition: all sink-time
    }
    .footer-sink-leave-to /* .fade-leave-active, 2.1.8 版本以下 */ {
        transform translateY(100px)
        opacity 0
    }
}

// 这一部分是处理自适应的
// 当屏幕宽度>992时，卡片变成三列
@media screen and (min-width 992px) {
    #article-card-area {
        ul {
            width 100%
            margin 0 auto
            // 屏幕越宽，卡片区域两边的留白越大
            padding 64px 4%

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

// 当屏幕宽度<992时，卡片变成双列
@media screen and (max-width 992px) {
    #article-card-area {
        ul {
            // 设置双列以后，父元素width恒定为720px，卡片大小不变，只是两边留白自适应
            width 720px
            margin 0 auto
            padding 64px 0

            // 父元素用了flex，为了在子元素间距相等的同时，保证最后一行的元素居左，就不能使用space-between，而是要让手动设置margin
            li:not(:nth-child(2n)) {
                margin-right calc((100% - (345 * 2) * 1px)/1)
            }
        }
    }
}

// 当屏幕宽度<768时，卡片变成单列，并且卡片width=100%。此处只需要把父元素li改成100%
@media screen and (max-width 768px) {
    #article-card-area {
        ul {
            // 因为父元素已经有15px的padding，所以子元素直接100%接到头就好
            width 100%
            // 因为变成了单列，所以纵向陈列
            flex-direction column
            // 即便变成了单列，两边仍然要留出15px空白
            padding 32px 15px

            li {
                // 因为是单列，所以直接100%
                width 100%
            }
        }
    }
}

</style>