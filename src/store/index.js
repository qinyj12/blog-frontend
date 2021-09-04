import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        BodyScrollStatus: 'auto',
        HomeBuffer: 0, // 这个是home => content时的缓冲时间，接收到信号后给动画留HomeBuffer的时间
        IfSinkCover: false, // 这个是home => content的过程中，用来隐藏cover组件的，给cover组件一个transition动画
        IfSinkArticleCard: false, // 这是用来隐藏article-card组件的，给card组件一个transition动画
        IfDisableClickAuthor: false, // 这是用来判断card组件内的用户头像能不能被点击的，已经进入author路由后，这个头像就不能再被点击
        IfSinkSomething: false, // 用来隐藏一些组件
        IfHideCopiedImg: false, // 用于判断recommended组件内的copied-img是否要隐藏
        CoverImg: undefined, // 这是文章页的cover的默认背景图。进入cover组件时，先调用本默认值。
        AuthorCoverImg: undefined, // 这是AuthorCover（用户页的cover）的默认背景图。如没有特殊设置，进入用户页后，默认展示此背景图
        AvatarImg: undefined, // 这是存到vuex里的头像缓存，用来home=>author页面时，由author页面读取。
        AvatarDom: undefined, // 因为home=>author时，avatar重新加载导致动画撕裂，所以创建一个全局avatar覆盖层，来覆盖在动画之上，形成连贯效果。这是用来获取avatar的dom的
    },
    mutations: {
        ChangeBodyScrollStatus(state, status) {
            state.BodyScrollStatus = status
        },
        ChangeHomeBuffer(state, time) {
            state.HomeBuffer = time
        },
        SinkCoverAndArticle(state, bool) {
            state.IfSinkArticleCard = state.IfSinkCover = bool
        },
        DisableClickAuthor(state, bool) {
            state.IfDisableClickAuthor = bool
        },
        SinkSomething(state, bool) {
            state.IfSinkSomething = bool
        },
        HideCopiedImg(state, bool) {
            state.IfHideCopiedImg = bool
        },
        ChangeCoverImg(state, img) {
            state.CoverImg = img
        },
        ChangeAuthorCoverImg(state, img) {
            state.AuthorCoverImg = img
        },
        ChangeAvatarImg(state, avatar) {
            state.AvatarImg = avatar
        },
        ChangeAvatarDom(state, dom) {
            state.AvatarDom = dom
        }
    },
    actions: {},
    modules: {}
})