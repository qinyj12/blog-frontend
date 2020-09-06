<template>
    <div id="app">
        <Nav />
        <Cover />
        <router-view />
    </div>
</template>
<script>
import Nav from '@/components/Nav.vue';
import Cover from '@/components/Cover.vue';
export default {
    data() {
        return {
            WaveConfig: {duration: 300, delay: 0}
        }
    },
    components: {
        Nav,
        // eslint-disable-next-line vue/no-unused-components
        Cover
    },
    mounted() {
        // 使用waves.js，给.waves添加水波效果。waves.js已挂载到vue原型链上，waves.css已在main.js里引入
        this.$Waves.attach('.waves', null);
        this.$Waves.init(this.WaveConfig);
    },
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