<template>
    <div class="author">
        <Cover v-bind="{CoverImg: require('../assets/featured-image.png'), CoverShowDetail: false, CoverShowAvatar: true}"/>

        <!-- <div class="author-avatar"></div> -->

        <p>author</p>
    </div>
</template>
<script>
import Cover from '@/components/Cover.vue';
export default {
    components: {
        Cover,
    },
}
</script>
<style lang="stylus" scoped>
.author {

    .author-avatar {
        width 96px
        height 96px
        background-image url('../assets/avatar.png')
        background-size cover
        border-radius 50%
        border 4px solid black
        box-sizing border-box
        position absolute
        top 80px
        left calc(50% - 48px)
    }
}
</style>