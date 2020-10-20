<template>
    <div class="comments-component">
        <h2>评论</h2>
        <div class="comments-area">

            <div class="comments-nav">
                <div class="comments-sum">3条评论</div>
                <div class="comments-login">
                    <span>未登录</span>
                    <i class="fas fa-angle-down"></i>
                </div>
            </div>

            <div class="comments-edit">
                <div class="comments-edit-avatar"></div>
                <div class="comments-edit-function">
                    <textarea ref="TextArea" v-model="CommentInputted"></textarea>
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
            CommentInputted: ''
        }
    },
    mounted() {
        // ///////////wach这里，动态改变textarea的高度
        this.$watch(
            () => {
                return this.$refs.TextArea.scrollHeight
            },
            (val) => {
                console.log(val)
            }
        )
    },
    watch: {
        CommentInputted: function() {
            console.log(this.$refs.TextArea.scrollHeight)
        }
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
        }

        .comments-edit {
            padding 20px 0
            display flex

            .comments-edit-avatar {
                width 48px
                height 48px
                border 1px solid
                border-radius 50%
                margin-right 20px
            }

            .comments-edit-function {
                flex 1
                border 1px solid

                textarea {
                    resize none
                }
            }
        }
    }
}
</style>