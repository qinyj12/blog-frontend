import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        BodyScrollStatus: 'auto',
        HomeBuffer: 0, // 这个是home => content时的缓冲时间，接收到信号后给动画留HomeBuffer的时间
        IfSinkCover: false, // 这个是home => content的过程中，用来隐藏cover组件的，给cover组件一个transition动画
        IfSinkArticleCard: false, // 这是用来隐藏article-card组件的，给card组件一个transition动画
        IfDisableClickAuthor: false // 这是用来判断card组件内的用户头像能不能被点击的，已经进入author路由后，这个头像就不能再被点击
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
        }
    },
    actions: {},
    modules: {}
})