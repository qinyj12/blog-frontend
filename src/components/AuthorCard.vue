// 关于作者的卡片，放在content里面
<template>
    <div id="author-card">
        <div class="author-card">
            <img :src="avatar" alt="avatar" class="author-avatar">
            <div class="author-introduction">
                <h4 class="author-name">{{name}}</h4>
                
                <v-clamp :max-lines="2" max-height="calc(100% - 44px)" autoresize class="author-self-introduction">
                    {{description}}
                </v-clamp>
                
                <ul>
                    <li v-for="(value, name) in contacts" :key="value">
                        <!-- 动态添加微博、微信、github等icon -->
                        <i :class="'fab fa-' + name">
                            <!-- 这是element的弹出框 -->
                            <el-popover
                                placement="top"
                                width="200"
                                trigger="click"
                            >
                                <!-- 这是社交网站的二维码 -->
                                <el-image class="icon-code" :src="value">
                                    <!-- 图片加载失败后显示的 -->
                                    <div slot="error" class="image-slot">
                                        <i class="far fa-hand-point-down"></i>
                                    </div>
                                </el-image>
                                <!-- 这是社交网站的url网址 -->
                                <el-input placeholder="请输入内容" :value="value" class="input-with-select">
                                    <el-button slot="append" icon="fas fa-search" @click="VisitUrl(value)"></el-button>
                                </el-input>
                                <!-- 必须要有button元素，否则popover弹出层不生效 -->
                                <el-button slot="reference"></el-button>
                            </el-popover>
                        </i>
                    </li>
                </ul>
            </div>
        </div>
        <div>{{contacts}}</div>

    </div>
</template>
<script>
export default {
    props: {
        avatar: {
            default: function(val) {
                return require('@/assets/avatar.png')
            }
        },
        name: String,
        description: String,
        contacts: Object
    },
    methods: {
        VisitUrl(url) {
            window.open(url);
        }
    },
    data() {
        // https://sm.ms/image/eOK5sgICNl3qRi1 图床，微信二维码cdn
        // https://i.loli.net/2021/08/22/eOK5sgICNl3qRi1.png
        return {
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
                    position relative
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
<style lang="stylus">
// 引入element的弹出框，必须要做一个button才能生效
button.el-popover__reference {
    padding 0
    width 18px
    height 18px
    position absolute
    left 0
    opacity 0
}
// 点击icon后，展示的社交网站二维码
.el-popover {
    display flex
    flex-direction column
    justify-content center
    .el-image {
        max-width 100%
        margin-bottom 12px

        .image-slot {
            width 200px
            height 200px
            display flex
            justify-content center
            align-items center
            background-color #f5f7fa
            i {
                font-size 50px
            }
        }
    }
}
// 弹出窗的el-input组件的按钮
.el-input-group__append {
    padding 0 10px
}
</style>