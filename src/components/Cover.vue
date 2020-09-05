<template>
    <div id="cover">
        <div class="homepage-cover"></div>
        <transition name="move-copied-img">
            <div v-show="ShowCopiedImg" class="featured-image-cover" :style="CopyStyle"></div>
        </transition>
    </div>
</template>
<script>
export default {
    computed: {
        // 这个值是从vuex里接收到的，点击article card组件的某张卡片后，拿到那张卡片的w、h、l、t和background-image等
        CopyStyle: function() {
            // 拿到被点击卡片的各种dom值。vuex的值是个object格式，不需要再转json，直接取值就好
            let CopiedDom = this.$store.state.CopiedFeaturedImgDom.CopiedDom;
            let TargetBgImg = CopiedDom.TargetBgImg;
            let TargetBgSize = CopiedDom.TargetBgSize;
            let TargetDomWidth = CopiedDom.TargetDomWidth;
            let TargetDomHeight = CopiedDom.TargetDomHeight;
            let TargetDomTop = CopiedDom.TargetDomTop;
            let TargetDomLeft = CopiedDom.TargetDomLeft;
            // 生成一个字符串xxx，这个字符串以<div :style="xxx">的形式动态赋值给某个元素。
            return 'position:fixed;width:'+TargetDomWidth+';height:'+TargetDomHeight+';top:'+TargetDomTop+';left:'+TargetDomLeft+';background-image:'+TargetBgImg+';background-size:'+TargetBgSize
        },

        // 这个值是用来控制<div :style="xxx">这个元素要不要显示出来的
        ShowCopiedImg: function() {
            return this.$store.state.IfShowCopiedImg
        },
        
        // 释放一个信号，判断要不要移动被复制的图层
        MoveCopiedImg: function() {
            // 如果这个图层show了出来，释放true的信号
            if (this.ShowCopiedImg) {
                return 'width:100%'
            // 如果这个图层没有show出来，释放false的信号
            } else {
                return ''
            }
        }
    },
}
</script>
<style lang="stylus" scoped>
* {
    box-sizing border-box
}
#cover {
    .homepage-cover {
        width 100%
        height 450px
        background url('../assets/cover.png') no-repeat
        background-size cover
        background-position 50% 50%
    }

    .move-copied-img-enter-active, .move-copied-img-leave-active {
        transition: all 0.2s
    }
    .move-copied-img-enter-to, .move-copied-img-leave /* .fade-leave-active, 2.1.8 版本以下 */ {
        transform translateX(-260px)
    }

}
</style>