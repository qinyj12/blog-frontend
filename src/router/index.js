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
        component: () => import( '../views/Content.vue'),
        meta: {title: '详情'}
    },
    {
        path: '/test',
        name: 'Test',
        component: () => import('../views/Test.vue'),
        meta: {title: 'test'}
    },
    {
        path: '/author/:author',
        name: 'Author',
        component: () => import('../views/Author.vue'),
        meta: {title: 'author'}
    },
    {
        path: '/tag/:tag',
        name: 'Tag',
        component: () => import('../views/Tag.vue'),
        meta: {title: 'tag'}
    },
    {
        path: '/admin',
        name: 'Admin',
        component: () => import('../views/Admin.vue'),
        meta: {title: 'admin'}
    }
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

// 隐藏路由重复时的报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => {err; console.log('路由重复了')})
};

// 路由守卫
router.beforeEach((to, from, next) => {
    // console.log(from.name, '=>', to.name)

    // 动态修改网页title
    document.title = to.meta.title;

    // 如果home/author =>
    if (from.name == 'Home' || from.name == 'Author') {
        // 把首页的滚动条位置记录下来，以后返回首页时仍然可以定位到这个位置。documentElement和body需要做一个兼容方案
        from.meta.savedPosition = document.documentElement.scrollTop || document.body.scrollTop;

        // 如果home/author => content，给0.5秒动画时间
        // 本来可以在home页用settimeout router.push 来达到目的，但不能兼顾keep-alive，所以只能在路由守卫里来使用settimeout
        if (to.name == 'Content' || to.name == 'Author' || to.name == 'Tag') {
            setTimeout(() => {
                next()
            // 从vuex仓库里取值，看看需要在home=>content时留多少时间用于动画效果
            }, store.state.HomeBuffer);
        } else {
            next()
        }
    } else {
        next()
    }
});

export default router