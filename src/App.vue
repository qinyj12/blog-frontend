<template>
    <div id="app">
        <Nav />
        <router-view />
    </div>
</template>
<script>
import Nav from '@/components/Nav.vue';
import { Repos, UserInfo, RepoDocs, DocTags } from '@/api/api.js';
import axios from 'axios'
// import Footer from '@/components/Footer.vue';
export default {
    data() {
        return {
            WaveConfig: {duration: 300, delay: 0}
        }
    },
    components: {
        Nav,
    },
    methods: {
        // 使用waves.js，给.waves添加水波效果。waves.js已挂载到vue原型链上，waves.css已在main.js里引入
        ActivateWaves() {
            this.$Waves.attach('.waves', null);
            this.$Waves.init(this.WaveConfig);
        },
    },
    mounted() {
        this.ActivateWaves();

        document.cookie = '_yuque_session=egAQrSZkE_KQYCtR4BwHZMMknIUHCkxFVfgxzsV-JV0EkZVypXESNosATwExhyt9qgBw8Y-e13_WTFOIkioKpw'
        DocTags('48301761').then(res => console.log(res))
    },
    computed: {
        BodyScrollStatus() {
            return this.$store.state.BodyScrollStatus
        }
    },
    watch: {
        BodyScrollStatus(val) {
            document.body.style.overflowY = val
        }
    },
}
</script>
<style lang="stylus">
@import url('https://cdn.bootcdn.net/ajax/libs/font-awesome/5.9.0/css/all.min.css')

body {
    margin 0;
    padding 0;
}

// 全局动画
* {
    transition 0.3s
}

// 全局取消下划线
a {
    text-decoration none
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