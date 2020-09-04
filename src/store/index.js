import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // 这是用来cover组件里copied img元素的style，初始值要设置成object类型，因为后续commit来的值也是object类型，并且前后两个值的结构要一样
        CopiedFeaturedImgDom: {"CopiedDom":'{"TargetBgImg": "", "TargetBgSize": "", "CopiedDom": "", "TargetDomHeight": "", "TargetDomTop": "", "TargetDomLeft": ""}'},

        // 这是判断cover组件里要不要显示copied img的状态
        IfShowCopiedImg: false
    },
    mutations: {
        // 由article card组件调用，把点击的那张卡片的w、h、l、t还有background-image拿过来
        GetFeaturedImgDom(state, CopiedDom) {
            state.CopiedFeaturedImgDom = CopiedDom
        },

        // 由article card组件调用，点击卡片后修改值，让cover组件接收，接收后在cover组件内生成一个div元素。这个元素复制了被点击的那张卡片的属性。
        IfShowCopiedImg(state) {
            state.IfShowCopiedImg = !state.IfShowCopiedImg
        }
    },
    actions: {},
    modules: {}
})