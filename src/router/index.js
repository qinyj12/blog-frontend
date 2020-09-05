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
    //   {
    //     path: '/about',
    //     name: 'About',
    //     // route level code-splitting
    //     // this generates a separate chunk (about.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: function () {
    //       return import(/* webpackChunkName: "about" */ '../views/About.vue')
    //     },
    //     meta: {title: '关于'}
    //   }
]

const router = new VueRouter({
    routes,
    // 此处可以修改滚动条的位置
    scrollBehavior (to, from, savedPosition) {
        console.log(savedPosition);
        if (savedPosition) {
            return savedPosition;
        } else {
            return { x: 0, y: 0 }
        }
      }
});

// 路由守卫
router.beforeEach((to, from, next) => {
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
            router.app.$Store.commit('HomeToContent')
            // 加一个0.3s的延时，给article card组件完成动画的时间
            setTimeout(() => {
                // 滚动到顶部，这样动画才能流畅
                // document.documentElement.scrollTop = 0;
                next()
            }, 300);
        }

        // 从 content => 首页时
        // if (from.name == 'Content' && to.name == 'Home') {
        //     // cover组件中的homepage cover元素回复到默认值
        //     router.app.$Store.commit('ChangeHomepageCover', {TargetArticleCover: require('../assets/cover.png')});
        //     // vuex中的HideHomepageCover回复到默认值，默认是不隐藏homepage cover
        //     router.app.$Store.commit('ShowHomepageCover');
        //     // vuex中的IfShowCopiedImg回复到默认值，默认是false，即不显示cover组件中的copied img元素
        //     router.app.$Store.commit('HideCopiedImg');
        //     // 从 content => 首页时，vuex中的HomeToContent值改为'reverse'
        //     router.app.$Store.commit('ContentToHome');
        //     next()
        // }
    }
});

export default router