<template>
    <div id="main-content">
        <div class="loading" v-show="!LoadFinished"></div>
        <transition name="article-show">
            <div class="main-article" v-show="LoadFinished">
                <h1>这是文章详情页</h1>
            </div>
        </transition>
    </div>
</template>
<script>
export default {
    data() {
        return {
            LoadFinished: false
        }
    },
    mounted() {
        setTimeout(() => {
            this.LoadFinished = true
        }, 2000);
    },
}
</script>
<style lang="stylus" scoped>
#main-content {
    height 500px
    display flex
    flex-direction column
    align-items center
    
    .loading {
        width 50px
        height 50px
        margin 50px
        background-image url('../assets/loading.png')
        background-size cover
        background-repeat no-repeat
        animation loading 1s linear infinite

        @keyframes loading {
            from {
                transform rotate(0deg)
            }
            to {
                transform rotate(360deg)
            }
        }
    }

    .main-article {
        width 100%
        min-height 100vh
        background-color WhiteSmoke
        padding 50px 0
    }

    .article-show-enter-active, .article-show-leave-active {
        transition: all 0.3s
    }
    .article-show-enter, .article-show-leave-to /* .fade-leave-active, 2.1.8 版本以下 */ {
        transform translateY(100px)
        opacity 0
    }
}
</style>