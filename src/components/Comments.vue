<template>
    <div class="comments-component">
        <h2>评论</h2>
        <div class="comments-area">

            <div class="comments-nav">
                <div class="comments-sum">0条评论</div>
                <div class="comments-login" @click="login">
                    <span>未登录</span>
                    <i class="fas fa-angle-down"></i>
                </div>
            </div>

            <!-- 此处加入评论系统 -->
            <div class="comments-edit">
                <div class="comments-edit-avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="comments-edit-function">
                    <p>评论系统还没接入...</p>
                </div>
            </div>

            <div class="comments-list"></div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
        }
    },
    methods: {
        login() {
            alert('尚未接入')
        }
    },
    watch: {
    },

}
</script>
<style lang="stylus" scoped>
.comments-component {
    h2 {
        text-align left
    }

    h2:before {
        content ''
        border-left 8px solid #19DDC4
        margin-right 10px
    }

    .comments-area {
        box-shadow 0px 1px 4px 0px rgba(0, 0, 0, 0.15)
        padding 0 24px

        .comments-nav {
            height 50px
            display flex
            align-items center
            justify-content space-between
            border-bottom 1px dotted gray

            .comments-sum {

            }

            .comments-login {
                span {
                    margin-right 5px
                }
            }

            .comments-login:hover {
                cursor pointer
            }
        }

        .comments-edit {
            padding 20px 0
            display flex

            .comments-edit-avatar {
                width 48px
                height 48px
                border-radius 50%
                margin-right 20px
                background-color gray

                .fa-robot {
                    width 100%
                    height 100%
                    display flex
                    justify-content center
                    align-items center
                    font-size 30px
                    color white
                }
            }

            .comments-edit-function {
                flex 1
                background-color PaleTurquoise
                border-radius 6px
                position relative

                p {
                    color black
                }
            }

            .comments-edit-function:before {
                display block
                width 0
                height 0
                content ''
                border-top 10px solid transparent
                border-right 10px solid PaleTurquoise
                border-bottom 10px solid transparent
                border-left 10px solid transparent
                position absolute
                left -20px
                top calc(50% - 10px)
            }
        }
    }
}
</style>