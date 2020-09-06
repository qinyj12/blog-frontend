import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

Vue.use(VueRouter)
Vue.prototype.$Store = store


const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {title: '我的博客'}
    },
    {
        path: '/content/:title',
        name: 'Content',
        component: function() {return import( '../views/Content.vue')},
        meta: {title: '详情'}
    },
]

const router = new VueRouter({
    routes,
    // 此处可以修改滚动条的位置，
    scrollBehavior (to) {
        if (to.name == 'Home') {
            return {x: 0, y: to.meta.savedPosition}
        } else {
            return {x: 0, y: 0}
        }
      }
});

// 路由守卫
router.beforeResolve((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        document.title = to.meta.title

        // 回到home首页时
        if (to.name == 'Home') {

            // cover组件中的homepage cover元素回复到默认值
            router.app.$Store.commit('ChangeHomepageCover', {TargetArticleCover: require('../assets/cover.png')});
            // vuex中的HideHomepageCover回复到默认值，默认是不隐藏homepage cover
            router.app.$Store.commit('ShowHomepageCover');
            // vuex中的IfShowCopiedImg回复到默认值，默认是false，即不显示cover组件中的copied img元素
            router.app.$Store.commit('HideCopiedImg');
            // 从 content => 首页时，vuex中的HomeToContent值改为'reverse'
            router.app.$Store.commit('ContentToHome');

            next()
        }
        // 从首页 => content时
        else if (from.name == 'Home' && to.name == 'Content') {
            // vuex中的HomeToContent值改为'forward'
            router.app.$Store.commit('HomeToContent');

            // 把首页的滚动条位置记录下来，以后返回首页时仍然可以定位到这个位置
            // documentElement和body需要做一个兼容方案
            from.meta.savedPosition = document.documentElement.scrollTop || document.body.scrollTop;

            // 加一个0.3s的延时，给article card组件完成动画的时间
            setTimeout(() => {
                next()
            }, 300);
        }
    }
});

export default router