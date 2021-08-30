// 首页的文章卡片区域
<template>
    <div id="article-card-area">
        <!-- 这是骨架屏 -->
        <ul class="loading-card-box" v-show="!LoadFinshed">
            <li class="loading-single-card-li" v-for="(item, index) in Array(3)" :key="index">
                <div class="loading-single-card">
                    <div class="loading-featured-image"></div>
                    <div class="loading-content-wrap">
                        <div class="loading-entry-header">
                            <span class="loading-category"></span>
                            <h3 class="loading-title">
                                <div class="loading-title-text"></div>
                            </h3>
                        </div>
                        <div class="loading-entry-footer">
                            <div class="loading-author">
                                <div class="loading-avatar"></div>
                                <span class="loading-name"></span>
                            </div>
                            <div class="loading-published-date"></div>
                        </div>
                    </div>
                </div>
            </li>

        </ul>

        <!-- 这里要记住article-card组件的滚动条位置，所以要keep-alive -->
        <keep-alive>
            <transition name="cards-sink">
                <!-- 这是所有的卡片列表 -->
                <ul v-show="!SinkAllCards && LoadFinshed" class="loaded-card-box">
                    <li v-for="(item, index) in counts" :key="item.index" class="loaded-single-card-li">
                        <!-- 加一层路由 -->
                        <router-link :to="'/content/' + item.slug">
                            <div class="single-card " @click="ClickCard(index)">
                                <!-- 这是卡片的头图 -->
                                <div class="featured-image" ref="FeaturedImages">
                                    <img 
                                        class="cover-img"
                                        :class="{
                                            'cover-unclicked': !item.HideFeaturedImg,
                                            'cover-clicked': item.HideFeaturedImg
                                        }"
                                        :src="item.cover ? item.cover : require('../assets/featured-image.png')"
                                    >
                                </div>
                                <!-- 这是头图下方的文字部分 -->
                                <div class="content-wrap">
                                    <div class="entry-header">
                                        <span class="category">{{item.tags !== undefined ? item.tags : '未分类'}}</span>
                                        <h3 class="title">{{item.title}}</h3>
                                    </div>
                                    <div class="entry-footer">
                                        <!-- stop阻止click冒泡，prevent阻止router-link -->
                                        <div 
                                            class="author" 
                                            @click.stop.prevent="GoToAuthor(index)"
                                        >
                                            <div class="avatar" ref="avatar">
                                                <img 
                                                    :src="item.last_editor.avatar_url" 
                                                    alt="头像" 
                                                    class="avatar-img"
                                                    :class="{
                                                        'avatar-unclicked': !item.HideAvatar, 
                                                        'avatar-clicked': item.HideAvatar
                                                    }"
                                                    ref="avatarImg"
                                                >
                                            </div>

                                            <span class="name">{{item.last_editor.name}}</span>
                                        </div>
                                        <!-- 格式为2021-07-08T15:23:00.000Z，截取从第0个开始后10位的字符串 -->
                                        <div class="published-date">{{item.created_at.substr(0,10)}}</div>
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

    </div>
</template>

<script>
import { RepoDocs, DocTags } from '@/api/api.js';
import axios from 'axios';
import domtoimage from 'dom-to-image';
export default {
    data() {
        return {
            // 为防止console报错才定义一个初始值
            counts: [{title: '', last_editor: {avatar_url: ''}, created_at: ''}],
            LoadFinshed: false, // 用于在api加载完成前展示过渡动画的
            ShowCopiedImg: false,
            CopiedFeaturedMoved: false,
            CopiedAvatarMoved: false,
            CopiedImgEnd: false,
            DomFinished: false, // 代表所有dom都加载完了
        }
    },
    computed: {
        SinkAllCards() {
            return this.$store.state.IfSinkArticleCard
        }
    },
    destroyed() {
        // 离开card组件时，把vuex恢复原状，重新显示card和cover组件
        this.$store.commit('SinkCoverAndArticle', false);
        // 离开card组件时，恢复滚动条为默认
        this.$store.commit('ChangeBodyScrollStatus', 'auto');
    },
    methods: {
        async GoToAuthor(index) {
            // await domtoimage.toBlob(this.$refs.avatarImg[0]).then(blob => {
            //     this.$store.commit('ChangeAvatarStored', blob)
            // })
            // 先判断头像可不可点击，如果已在author组件内则头像不再可点击（点击后滚动到top）
            if(this.$store.state.IfDisableClickAuthor) {
                this.ScrollToTop()
            } else {
                this.ClickAuthor(index)
            }
            // setTimeout(() => {
            //     this.$router.push('/author/' + this.counts[index].user_id)
            // }, 200);
            this.$router.push('/author/' + this.counts[index].user_id)
            
        },
        // 点击卡片后的一系列动画
        async ClickCard(index) {
            // 改变vuex仓库，当router:from.name==home 时，给500ms的缓冲时间，就是500ms之后才会触发路由
            this.$store.commit('ChangeHomeBuffer', 500)

            // 找到被点击的那一张卡片，设卡片头图为白底
            this.CardClickedToBlank(index);

            // 拿到点击的那张卡片头图的宽、高、位置
            let TargetImgDom = this.GetClickedImgDom(this.$refs.FeaturedImages[index]);

            // 拿到这张头图的src属性
            let TargetImgSrc = this.$refs.FeaturedImages[index].getElementsByClassName('cover-img')[0].src

            // 把上面拿到的宽、高、位置赋值给 #copied-img，copied-img显示出来
            await this.CopyClickedImg(TargetImgDom, this.$refs.CopiedImg, TargetImgSrc);

            // 卡片区域整体下沉，cover消失
            await this.MoveArticleCardArea();

            // 移动copied-featured
            await this.MoveCopiedFeatured();

            // body的滚动条常显，防止cover高度太小，滚动条不显示，然后在进入content后动画会撕裂
            this.$store.commit('ChangeBodyScrollStatus', 'scroll');

            // 接下来会进入详情页，需要更新cover的背景图
            this.$store.commit('ChangeCoverImg', TargetImgSrc)
        },

        // 点击用户名字和头像后的一系列动画
        async ClickAuthor(index) {
            // 改变vuex仓库，当router:from.name==home 时，给500ms的缓冲时间，就是500ms之后才会触发路由
            this.$store.commit('ChangeHomeBuffer', 500)

            // 找到被点击的那一张卡片，设用户头像为白底
            this.AvatarClickedToBlank(index);

            // 拿到点击的那张卡片头像的宽、高、位置
            let TargetImgDom = this.GetClickedImgDom(this.$refs.avatar[index]);

            // 拿到头像的src属性
            let TargetAvatarSrc = this.$refs.avatar[index].getElementsByClassName('avatar-img')[0].src
            // 把上面拿到的宽、高、位置赋值给 copied-avatar，copied-avatar显示出来
            await this.CopyClickedImg(TargetImgDom, this.$refs.CopiedAvatar, TargetAvatarSrc);

            // 拿到对应cover的src属性
            let TargetCoverSrc = this.$refs.FeaturedImages[index].getElementsByClassName('cover-img')[0].src
            // 把上面拿到的宽、高、位置赋值给 avatar-back，avatar-back显示出来
            await this.CopyClickedImg(TargetImgDom, this.$refs.AvatarBack, TargetCoverSrc);

            // 卡片区域整体下沉，cover消失
            await this.MoveArticleCardArea();

            // 移动copied-avatar
            await this.MoveCopiedAvatar();

            // 显示滚动条
            this.$store.commit('ChangeBodyScrollStatus', 'scroll');

        },

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
                    this.$store.commit('SinkCoverAndArticle', true)
                )
            })
        },

        // res是通过api获取的docs返回值，把返回值传入以下函数，拿出docs的各个参数
        async GetRepoDocs(res) {
            // 用这个拿到docs的所有信息，此时还拿不到tag信息
            let DocsInfo = res.data
            // 先获取所有docs的id
            let DocsIds = []
            // 把id组成一个[]，用多线程接口获取tags
            for (let i of DocsInfo) {
                DocsIds.push(i.id)
            }
            this.getTags(DocsIds).then(res => {
                for (let i in res) {
                    // 如果能获取到tag数据
                    if (res[i].data[0]) {
                        // 因为DocsInfo也是一个[]，所以也要挨个赋值tag值
                        DocsInfo[i].tags = res[i].data[0].title
                    // 如果获取不到tag数据，res[i].data[0]就是空值
                    } else {
                        DocsInfo[i].tags = undefined
                    }
                }
                this.counts = DocsInfo
                console.log(this.counts)
                // 看看能不能从语雀api拿到哪怕一篇文档，如果可以
                // 这里有bug，似乎是顺序问题
                if (this.counts[0].id) {
                    // 给0.5秒钟展示loading动画
                    // setTimeout(() => {
                    this.LoadFinshed = true
                    // this.DomFinished = true // 给一个信号，代表所有dom都加载完了
                    // }, 500);
                } else {
                    this.LoadFinshed = false
                }
            })
        },

        // 根据doc的id，获取tag
        getTags(docsId){
            // 存储所有http请求
            let reqList = []
            // 拿到所有docs的id
            for(let i of docsId) {
                let req = DocTags(i)
                reqList.push(req)
            }
            // 省略号是解构用法
            return axios.all(reqList).then(axios.spread((...resList) => {
                return resList // 拿到所有posts数据
            }))
        }

    },
    async mounted() {
        let DocsRes = await RepoDocs('qinyujie-067rz/rkckig');
        await this.GetRepoDocs(DocsRes);
    },
    watch: {
        // DomFinished() {
        //     let AvatarStored = []
        //     this.$nextTick(() => {
        //         for (let i = 0; i < this.$refs.avatarImg.length; ++i) {
        //             domtoimage.toBlob(this.$refs.avatarImg[i]).then(blob => {
        //                 AvatarStored.push(blob)
        //             })
        //         }
        //         this.$store.commit('ChangeAvatarStored', AvatarStored)
        //     })            
            
            
        // }
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
// loading-card的闪动效果
shine-duration = 2s

a {
    color #999999
}

// 这是loading卡片的动画效果
@keyframes shine {
    0% {
        opacity 0.5
    } 50% {
        opacity 1
    } 100% {
        opacity 0.5
    }
}

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
        border 4px solid white
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

    // 卡片区域
    ul.loaded-card-box, ul.loading-card-box {
        list-style none
        padding 0
        display flex
        flex-direction row
        flex-wrap wrap
        max-width 1240px
        box-sizing border-box

        li.loaded-single-card-li, li.loading-single-card-li {
            box-sizing border-box
            margin-bottom 60px
            width 345px

            .single-card, .loading-single-card {
                width 100%
                height 429px
                box-shadow 0px 1px 4px 0px rgba(0, 0, 0, 0.15)
                border-radius 4px
                overflow hidden

                .loading-featured-image {
                    background linear-gradient(110deg, #ececec 8%, #ececec 33%)
                    animation shine-duration shine linear infinite
                }

                .featured-image, .loading-featured-image {
                    width 100%
                    height 224px
                    // background-image url('../assets/featured-image.png')
                    background-repeat no-repeat
                    background-size cover
                    background-position 50% 50%
                    overflow hidden

                    .cover-img {
                        width 100%
                        height 100%
                        object-fit cover // 必须有宽高，才能生效
                        transition 0s
                    }

                    .cover-unclicked {
                        opacity 1
                    }

                    .cover-clicked {
                        opacity 0
                    }
                }

                .content-wrap, .loading-content-wrap {
                    box-sizing border-box
                    width 100%
                    height 205px

                    .entry-header, .loading-entry-header {
                        box-sizing border-box
                        width 95%
                        height 92px
                        margin 24px auto

                        .category, .loading-category {
                            color #999999
                            height 24px
                            position relative
                            // 不知道为啥，用了relative后这个元素就在侧边栏及其蒙版的上方了，只能手动z-index来弥补
                            z-index -1
                        }
                        .loading-category {
                            display inline-block
                            width 30%
                            background linear-gradient(110deg, #ececec 8%, #ececec 33%)
                            animation shine-duration shine linear infinite
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

                        .title, .loading-title {
                            height 56px
                            line-height 56px
                        }

                        .loading-title {
                            display flex
                            justify-content center
                            align-items center
                            
                            .loading-title-text {
                                width 70%
                                height 30px
                                background linear-gradient(110deg, #ececec 8%, #ececec 33%)
                                animation shine-duration shine linear infinite
                            }
                        }
                    }

                    .entry-footer, .loading-entry-footer {
                        box-sizing border-box
                        width 95%
                        height 65px
                        margin 0 auto
                        border-top 1px solid rgba(204, 204, 204, 0.3)
                        display flex
                        justify-content space-between
                        align-items center
                        color #999999
                        font-size 12px

                        .author, .loading-author {
                            flex 1
                            height 32px
                            display flex

                            .loading-avatar {
                                background linear-gradient(110deg, #ececec 8%, #ececec 33%)
                                animation shine-duration shine linear infinite
                            }

                            .avatar, .loading-avatar {
                                width 32px
                                height 32px
                                background-size cover
                                border-radius 50%
                                overflow hidden
                                // background-color white

                                .avatar-img {
                                    width 100%
                                    height 100%
                                    transition 0s
                                }
                                .avatar-unclicked {
                                    opacity 1
                                }

                                .avatar-clicked {
                                    opacity 0
                                }
                            }

                            .loading-name {
                                width 40%
                                background linear-gradient(110deg, #ececec 8%, #ececec 33%)
                                animation shine-duration shine linear infinite
                            }

                            .name, .loading-name {
                                height 32px
                                line-height 32px
                                margin-left 10px
                            }
                        }
                        // 鼠标悬停author时
                        .author:hover {
                            .name {
                                color black
                                font-weight bold
                            }
                        }

                        .published-date, .loading-published-date {
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
    .cards-sink-leave-to {
        transform translateY(100px)
        opacity 0
    }
    // 用于卡片出现时的动画
    // .cards-sink-enter {
    //     opacity 0
    //     transform translateY(100px)
    // }
    // .cards-sink-enter-active {
    //     transition all sink-time
    // }
    // .cards-sink-enter-to {
    // }

}

// 这一部分是处理自适应的
// 当屏幕宽度>992时，卡片变成三列
@media screen and (min-width 992px) {
    #article-card-area {
        ul.loaded-card-box, ul.loading-card-box {
            width 100%
            margin 0 auto
            // 屏幕越宽，卡片区域两边的留白越大
            padding 64px 4%

            li.loaded-single-card-li, li.loading-single-card-li {
                // 屏幕越宽，卡片越宽
                width 31%
            }
            // 父元素用了flex，为了在子元素间距相等的同时，保证最后一行的元素居左，就不能使用space-between，而是要让手动设置margin
            li.loaded-single-card-li:not(:nth-child(3n)), li.loading-single-card-li:not(:nth-child(3n)) {
                margin-right calc((100% - (31% * 3))/2)
            }
        }
    }
}

// 当屏幕宽度<992时，卡片变成双列
@media screen and (max-width 992px) {
    #article-card-area {
        ul.loaded-card-box, ul.loading-card-box {
            // 设置双列以后，父元素width恒定为720px，卡片大小不变，只是两边留白自适应
            width 720px
            margin 0 auto
            padding 64px 0

            // 父元素用了flex，为了在子元素间距相等的同时，保证最后一行的元素居左，就不能使用space-between，而是要让手动设置margin
            li.loaded-single-card-li:not(:nth-child(2n)), li.loading-single-card-li:not(:nth-child(2n)) {
                margin-right calc((100% - (345 * 2) * 1px)/1)
            }
        }
    }
}

// 当屏幕宽度<768时，卡片变成单列，并且卡片width=100%。此处只需要把父元素li改成100%
@media screen and (max-width 768px) {
    #article-card-area {
        ul.loaded-card-box, ul.loading-card-box {
            // 因为父元素已经有15px的padding，所以子元素直接100%接到头就好
            width 100%
            // 因为变成了单列，所以纵向陈列
            flex-direction column
            // 即便变成了单列，两边仍然要留出15px空白
            padding 32px 15px

            li.loaded-single-card-li, li.loading-single-card-li {
                // 因为是单列，所以直接100%
                width 100%
            }
        }
    }
}

</style>