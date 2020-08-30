<template>
    <div id="app">
        <Nav />
        <!-- <Cover /> -->
        <!-- <router-link to="/">Home</router-link>| -->
        <router-view />
    </div>
</template>
<script>
import Nav from '@/components/Nav.vue';
import Cover from '@/components/Cover.vue';
export default {
    components: {
        Nav,
        // eslint-disable-next-line vue/no-unused-components
        Cover
    }
}
</script>
<style lang="stylus">
body {
    margin 0;
    padding 0;
}
</style>
<style lang="stylus" scoped>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>