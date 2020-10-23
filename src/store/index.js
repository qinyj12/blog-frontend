import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        BodyScrollStatus: 'auto',
        HomeBuffer: 0 // 这个是home => content时的缓冲时间，接收到信号后给动画留500ms的时间
    },
    mutations: {
        ChangeBodyScrollStatus(state, status) {
            state.BodyScrollStatus = status
        },
        ChangeHomeBuffer(state, time) {
            state.HomeBuffer = time
        }
    },
    actions: {},
    modules: {}
})