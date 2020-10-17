// 关于作者的卡片，放在content里面
<template>
    <div id="author-card">
        <div class="author-card">
            <img src="../assets/avatar.png" alt="avatar" class="author-avatar">
            <div class="author-introduction">
                <h4 class="author-name">{{AboutAuthor.name}}</h4>
                
                <v-clamp :max-lines="2" max-height="calc(100% - 44px)" autoresize class="author-self-introduction">
                    {{AboutAuthor.introduction}}
                </v-clamp>
                
                <ul>
                    <li v-for="item in AboutAuthor.contact" :key="item">
                        <!-- 动态添加微博、微信、github等icon -->
                        <i :class="'fab fa-' + item"></i>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            // 关于作者
            AboutAuthor: {
                name: '测试用户', 
                introduction: '这是一段关于文章作者的介绍这是一段关于文章作者的介绍这是一段关于文章作者的介绍这是一段关于文章作者的介绍这是一段关于文章作者的介绍这是一段关于文章作者的介绍这是一段关于文章作者的介绍', 
                contact: ['weibo', 'qq', 'weixin', 'github']
            }
        }
    },
}
</script>
<style lang="stylus" scoped>
#author-card {
    .author-card {
        text-align left
        width 100%
        height 150px
        border-radius 4px
        box-shadow 0px 1px 4px 0px rgba(0, 0, 0, 0.15)
        box-sizing border-box
        padding 24px
        display flex
        align-items center

        .author-avatar {
            width 96px
            height 96px
            object-fit cover
            margin-right 15px
            border-radius 4px
        }

        .author-introduction {
            flex 1
            height 96px
            display flex
            flex-direction column

            .author-name {
                margin 0
                height 24px
            }

            .author-self-introduction {
                box-sizing border-box
                flex 1
                padding 5px 0
            }

            ul {
                list-style none
                margin 0
                padding 0
                display flex
                align-items flex-end
                height 20px

                i {
                    margin-right 16px
                    color gray
                    transition all 0.1s
                }

                i:hover {
                    color #19DDC4
                    cursor pointer
                }
            }
        }
    }
}
</style>