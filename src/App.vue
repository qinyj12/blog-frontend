<template>
    <div id="app">
        <Nav />
        <keep-alive>
            <router-view :key="$route.fullPath" />
        </keep-alive>
        
    </div>
</template>
<script>
import Nav from '@/components/Nav.vue';
import { AllTags } from '@/api/api.js';
import axios from 'axios'
// import Footer from '@/components/Footer.vue';
export default {
    data() {
        return {
            WaveConfig: {duration: 300, delay: 0},
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

        document.cookie = '_yuque_session=W37o80DxDFYtgeJlvnGCRIAIruIf4G7abHm6D6oS6fnsHDAZlwqhFmLzsF0Lyz_k7qjC4sDeobNzAa3KfIwshg=='
        // 赋值一个AuthorcoverImg的默认值，如果用户没有设置authorcover，就调用这个默认值
        this.$store.commit('ChangeAuthorCoverImg', require('@/assets/featured-image.png'))

        // AllTags('qinyujie-067rz').then(resp => console.log(resp))
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