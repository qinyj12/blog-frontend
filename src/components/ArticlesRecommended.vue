// 文章推荐组件，放在文章详情页的底部
<template>
    <div id="articles-recommended">
        <transition name="components-sink">
            <div class="wrap" v-show="!IfSink">
                <h2>推荐阅读</h2>
                <ul class="articles-recommended">
                    <li 
                        v-for="(item, index) in RecommendArticlesV2" 
                        :key="item.title" 
                        class="single-article-recommended"
                        @click="ClickRecommended(index)"
                    >

                        <!-- 封面图 -->
                        <div class="article-recommended-cover">
                            <img 
                                class="recommended-cover-img"
                                ref="RecommendedCover"
                                :src="item.cover"
                            >
                        </div>

                        <!-- 文字部分 -->
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
                                <div class="avatar">
                                    <el-avatar :size="32" :src="item.avatar_url">
                                        <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
                                    </el-avatar>
                                </div>

                                <v-clamp 
                                    :max-lines="1" 
                                    autoresize class="recommended-author"
                                >
                                    {{item.author}}
                                </v-clamp>

                                <i class="far fa-eye"></i>
                                <div>{{item.hits}}</div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </transition>

        <!-- 这是点击卡片后复制的cover图 -->
        <div 
            class="copied-img" 
            ref="CopiedImg" 
            :class="{
                'copied-img-default': true,
                'copied-img-start': CopiedImgStart, 
                'copied-img-move': CopiedImgMoved, 
                'copied-img-end': CopiedImgEnd
            }"
            v-show="!IfHideCopiedImg"
        >
        </div>
    </div>
</template>
<script>
import { FullDocInfo, DocTags, UserInfo } from '@/api/api.js'
export default {
    props: ['slug'],
    data() {
        return {
            RecommendArticlesV2: [
                {
                    title: 'title',
                    tag: 'tag',
                    author: 'author',
                    // avatar_url: ,
                    hits: 'hits',
                    cover: undefined,
                }
            ],
            CopiedImgStart: false, // recommended-cover的初始状态
            CopiedImgMoved: false, // recommended-cover的移动状态
            CopiedImgEnd: false, // recommended-cover的结束状态
            CoverClicked: '', // 被点击卡片的头图

        }
    },
    computed: {
        // 用来判断recommended组件内部要不要隐藏除copied-recommended-cover之外的其他元素
        IfSink() {
            return this.$store.state.IfSinkSomething
        },
        // 用来判断要不要显示copied-recommended-cover，以及要不要隐藏除recommended之外的其他组件
        IfHideCopiedImg() {
            return this.$store.state.IfHideCopiedImg
        }
    },

    methods: {
        async GetArticlesRecommended(SuggestList) {
            // this.RecommendArticlesV2 = SuggestList
            for (let i of SuggestList) {
                // 赋予标签
                let TempTags = await DocTags(i.id)
                // 如果能获取到标签
                if (TempTags.data[0]) {
                    i.tag = TempTags.data[0].title
                // 如果获取不到标签，即后端没设置标签
                } else {
                    i.tag = '未分类'
                }
                // 如果没有封面图的话，就设置默认封面图
                if (!i.cover) {
                    i.cover = require('@/assets/featured-image.png')
                }
                // 获取点击量
                let TempDocInfo = await FullDocInfo(i.id)
                i.hits = TempDocInfo.data.hits
                // 获取文章slug
                // i.slug = TempDocInfo
                // 获取用户名和头像
                let TempUserInfo = await UserInfo(i.user_id)
                i.author = TempUserInfo.data.name
                i.avatar_url = TempUserInfo.data.avatar_url

            }
            console.log(SuggestList)
            this.RecommendArticlesV2 = SuggestList
        },
        async ClickRecommended(index) {
            // 改变vuex仓库，当router:from.name==home 时，给500ms的缓冲时间，就是500ms之后才会触发路由
            // this.$store.commit('ChangeHomeBuffer', 500)

            // 找到被点击的那一张卡片，设卡片头图为白底
            this.CardClickedToBlank(index);

            // 拿到点击的那张卡片的头图，以及宽、高、位置
            let TargetImgDom = this.GetClickedImgDom(this.$refs.RecommendedCover[index]);
            
            // 把上面拿到的宽、高、位置赋值给 #copied-img，copied-img显示出来
            await this.CopyClickedImg(TargetImgDom, this.$refs.CopiedImg, this.CoverClicked);

            // 其他区域全部消失
            await this.SinkExceptRecommendedCover();

            // 移动copied-featured
            await this.MoveCopiedImg();

            // await this.BlankRecoverToDefault(index);

            // body的滚动条常显，防止cover高度太小，滚动条不显示，然后在进入content后动画会撕裂
            this.$store.commit('ChangeBodyScrollStatus', 'scroll');

            // router.push到相应的content
            this.RecommendedToContent(index, 500);

        },

        // 找到被点击的那一张卡片，设为白底
        async CardClickedToBlank(index) {
            this.CoverClicked = this.$refs.RecommendedCover[index].src;
            let TargetItem = await this.RecommendArticlesV2[index];
            TargetItem.cover = ''
        },

        // 获取被点击对象的各种参数
        GetClickedImgDom(target) {
            // 用getBoundingClientRect方法，直接获取目标的大小和相对视口的位置，间接获取目标的宽、高
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
        CopyClickedImg(TargetDom, CopiedDom, TargetImg='') {
            return new Promise((resolve) => {
                resolve(
                    // copied-recommended-cover显示出来
                    this.$store.commit('HideCopiedImg', false),
                    // 给copied-img赋值一系列参数
                    CopiedDom.style.setProperty('--CopiedImgBg', 'url("' + TargetImg + '")'),
                    CopiedDom.style.setProperty('--CopiedImgWidth', TargetDom['width']),
                    CopiedDom.style.setProperty('--CopiedImgHeight', TargetDom['height']),
                    CopiedDom.style.setProperty('--CopiedImgLeft', TargetDom['left']),
                    CopiedDom.style.setProperty('--CopiedImgTop', TargetDom['top']),
                    // copied-img开始移动，初始状态
                    this.CopiedImgStart = true,
                )
            })
        },

        // 所有卡片整体下沉，除了被复制的recommended-cover（fixed定位）
        SinkExceptRecommendedCover() {
            return new Promise((resolve) => {
                resolve(
                    this.$store.commit('SinkSomething', true)
                )
            })
        },

        // 移动复制的cover，做成promise对象
        MoveCopiedImg() {
            return new Promise((resolve) => {
                // 一定要加一个settimeout，不然就不会有动画，而是瞬移
                setTimeout(() => {
                    resolve(
                        this.CopiedImgMoved = true
                    )
                }, 200)
            })
        },

        // recommended => content时，延时一段时间再触发，给本页面一个完成动画的时间
        RecommendedToContent(index, delay) {
            setTimeout(() => {
                // 此处会导致路由复用问题，无法重新获取内容
                this.$router.push('/content/' + this.RecommendArticlesV2[index].slug)
            }, delay);
        }
    },
    watch: {
        // eslint-disable-next-line no-unused-vars
        '$route'(to, from) {
            this.$store.commit('HideCopiedImg', true);
            // 清除copied-recommended-cover的初始状态
            this.CopiedImgStart = false;
            // 清除copied-recommended-cover的移动状态
            this.CopiedImgMoved = false;
            // 清除copied-recommended-cover的结束状态
            this.CopiedImgEnd = false
        }
    },
    async beforeMount() {
        // 判断进入的是不是用户详情页，如果是
        // if (this.CoverShowAuthorDetail) {
        //     // 判断vuex里是不是已有值（如果有，代表是home=>author时，由home传入到vuex里的）
        //     if (this.$store.state.AvatarImg) {
        //         // 如果有，优先用vuex里的值
        //         this.AvatarImg = this.$store.state.AvatarImg
        //     } else {
        //         // 如果没有，就从语雀api获取值
        //         let UserResp = await UserInfo(this.$route.params.author)
        //         this.AvatarImg = UserResp.data.avatar_url
        //     }
        // } else {
        //     // 啥也不干
        // }
    },
    async mounted() {
        let TempInfo = await FullDocInfo(this.slug);
        await this.GetArticlesRecommended(TempInfo.data.suggests)
        // console.log(this.RecommendArticlesV2)
    },

}
</script>
<style lang="stylus" scoped>
recommended-radius = 4px
sink-time = 0.2
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
            border-radius recommended-radius
            overflow hidden
            box-shadow 0px 1px 4px 0px rgba(0, 0, 0, 0.15)
            position relative
            margin-bottom 32px

            .article-recommended-cover {
                width 50%
                height 100%
                background-size cover
                background-position 50% 50%
                box-sizing border-box
                background-color Gainsboro

                .recommended-cover-img {
                    overflow hidden
                    width 100%
                    height 100%
                    object-fit cover
                }
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

                .article-recommended-cover {
                    width 100%
                    height 100%
                    position absolute
                    background-position 50% 50%
                }

                .article-recommended-introduction {
                    width 100%
                    z-index 1
                    color white
                    background-color rgba(0, 0, 0, 0.5)
                }
            }
        }

        li.single-article-recommended:hover {
            cursor pointer
            box-shadow 3px 4px 7px 3px rgba(0,0,0,0.20)
        }
    }

    // 复制的cover的默认样式
    .copied-img {
        background-repeat no-repeat
        background-size cover
        background-position 50% 50%
        border-radius recommended-radius 0 0 recommended-radius
        transition all 0.3s
    }
    // 复制的cover的默认样式
    .copied-img-default {
        position fixed
    }
    // 复制的cover显示出来后的初始状态
    .copied-img-start {
        background-image var(--CopiedImgBg)
        width var(--CopiedImgWidth)
        height var(--CopiedImgHeight)
        left var(--CopiedImgLeft)
        top var(--CopiedImgTop)
    }
    // 复制的cover移动到什么位置
    .copied-img-move {
        left 0
        top 80px
        width 100%
        height 450px
        border-radius 0px
    }
    // 复制的cover结束移动时的样式
    .copied-img-end {
        position static
    }

    .components-sink-leave-active {
        transition all sink-time
    }
    .components-sink-leave-to {
        transform translateY(100px)
        opacity 0
    }
}
</style>