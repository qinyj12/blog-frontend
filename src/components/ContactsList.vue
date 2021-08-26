<template>
    <div id="contacts-list">
        <ul>
            <!-- 直接从祖组件拿值，所以用$attrs -->
            <li v-for="(value, name) in $attrs.contacts" :key="value">
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
</template>
<script>
export default {
    props: {
        // contacts: Object
    },
    methods: {
        VisitUrl(url) {
            window.open(url);
        }
    },
}
</script>
<style lang="stylus" scoped>
#contacts-list {
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