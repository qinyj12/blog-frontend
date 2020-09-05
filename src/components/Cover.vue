<template>
    <div id="cover">
        <div class="homepage-cover" :class="{'hide-homepage-cover':HideHomepageCover}" ref="HomepageCover"></div>
        <transition name="move-copied-img">
            <div v-show="ShowCopiedImg" class="copied-image-final" ref="ImgCopied"></div>
        </transition>
    </div>
</template>
<script>
export default {
    data() {
        return {
        }
    },
    computed: {
        // 这个值是用来控制copied image这个元素要不要显示出来的
        ShowCopiedImg: function() {
            return this.$store.state.IfShowCopiedImg
        },
        // 这个值是用来控制homepage cover要不要隐藏的
        HideHomepageCover: function() {
            return this.$store.state.HideHomepageCover
        }
    },
    watch: {
        // 监测vuex的CopiedFeaturedImgDom值是否变化，点击卡片 => vuex变化 => cover组件监测到 => 动态改变copied img元素的外联样式
        '$store.state.CopiedFeaturedImgDom.CopiedDom': function() {
            let ImgCopiedStyle = this.$refs.ImgCopied.style;
            let CopiedDom = this.$store.state.CopiedFeaturedImgDom.CopiedDom;
            ImgCopiedStyle.setProperty('--CopiedImgWidth', CopiedDom.TargetDomWidth);
            ImgCopiedStyle.setProperty('--CopiedImgHeight', CopiedDom.TargetDomHeight);
            ImgCopiedStyle.setProperty('--CopiedImgTop', CopiedDom.TargetDomTop);
            ImgCopiedStyle.setProperty('--CopiedImgLeft', CopiedDom.TargetDomLeft);
            ImgCopiedStyle.setProperty('--CopiedImgBgImg', CopiedDom.TargetBgImg);
            ImgCopiedStyle.setProperty('--CopiedImgBgSize', CopiedDom.TargetBgSize);

            // 触发对hide-homepage-cover的隐藏
            this.$store.commit('HideHomepageCover')

        },

        // 监测vuex的HomepageCover是否变化，点击卡片 => 传输卡片图片给vuex => 本组件监测到 => 动态改变homepageCove元素的外联样式
        '$store.state.HomepageCover': function() {
            // home => content时需要在首页展示动画，所以留0.5s
            if (this.$store.state.HomeToContent == 'forward') {
                setTimeout(() => {
                    // 这里就是根据vuex里的值，动态修改homepage cover
                    this.$refs.HomepageCover.style.setProperty('--CoverBgImg', 'url("'+this.$store.state.HomepageCover+'")');
                }, 300);
            } else {
                this.$refs.HomepageCover.style.setProperty('--CoverBgImg', 'url("'+this.$store.state.HomepageCover+'")')
            }
        },

        // 监测到ShowCopiedImg值变化，即copied img元素出现0.5秒后，把copied img元素隐藏掉
        ShowCopiedImg: function() {
            setTimeout(() => {
                this.$refs.ImgCopied.style.display = 'none';
                // 隐藏copied img之后，显示homepage cover元素，即把这个元素的hide-homepage-cover的外联样式删除
                this.$store.commit('ShowHomepageCover')
            // copied img多存在0.1s，防止和homepage cover中间有一个空白时间差
            }, 400);
        }
    },
}
</script>
<style lang="stylus" scoped>
* {
    box-sizing border-box
    // 这个值是用来动态改变homepage cover的background-image样式的
    --CoverBgImg url('../assets/cover.png')
}
#cover {
    .homepage-cover {
        width 100%
        height 450px
        // homepage cover的背景图需要根据js自动修改
        background-image var(--CoverBgImg)
        background-repeat no-repeat
        background-size cover
        background-position 50% 50%
    }

    // 这是用来隐藏homepage-cover的样式
    .hide-homepage-cover {
        opacity 0
        transition all 0.3s
    }

    // 这是从article card组件中复制过来的样式，这里用js动态控制外联样式。这是这个元素的初始状态，后面还会移动
    .copied-image-initial {
        position fixed
        width var(--CopiedImgWidth)
        height var(--CopiedImgHeight)
        top var(--CopiedImgTop)
        left var(--CopiedImgLeft)
        background-image var(--CopiedImgBgImg)
        background-size var(--CopiedImgBgSize)
        background-position 50% 50%
    }

    // 这是copied-img的最终状态，只需要继承background-image和background-size就好了，w、h、t、l都是固定的
    .copied-image-final {
        position fixed
        width 100%
        height 450px
        top 80px
        left 0
        background-image var(--CopiedImgBgImg)
        background-size var(--CopiedImgBgSize)
        background-position 50% 50%
    }

    .move-copied-img-enter-active, .move-copied-img-leave-active {
        transition: all 0.3s
    }
    // 这是copied-img的初始状态，要继承bgimg、bgsize、w、h、t、l
    .move-copied-img-enter, .move-copied-img-leave-to {
        position fixed
        width var(--CopiedImgWidth)
        height var(--CopiedImgHeight)
        top var(--CopiedImgTop)
        left var(--CopiedImgLeft)
        background-image var(--CopiedImgBgImg)
        background-size var(--CopiedImgBgSize)
        background-position 50% 50%
    }
}
</style>