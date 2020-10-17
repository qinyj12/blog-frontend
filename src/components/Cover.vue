// 头图，放在首页和文章详情页
<template>
    <div id="cover">
        <div class="homepage-cover" :style="{backgroundImage: 'url(' + CoverImg + ')'}"></div>
    </div>
</template>
<script>
export default {
    props: ['CoverImg']
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
        background-repeat no-repeat
        background-size cover
        background-position 50% 50%
    }
}
</style>