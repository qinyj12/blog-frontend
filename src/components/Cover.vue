<template>
    <div id="cover">
        <div class="homepage-cover"></div>
        <div class="featured-image-cover"></div>
    </div>
</template>
<script>
export default {
    data() {
        return {
        }
    }
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

}
</style>