<template>
    <div id="app">
        <Nav />
        <div>
            <router-link to="/">Home</router-link>|
            <router-link to="/about">About</router-link>
        </div>
        <router-view />
    </div>
</template>
<script>
import Nav from '@/components/Nav.vue';
export default {
    components: {
        Nav
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