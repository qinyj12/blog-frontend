import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // 这是用来cover组件里copied img元素的style，初始值要设置成object类型，因为后续commit来的值也是object类型，并且前后两个值的结构要一样
        CopiedFeaturedImgDom: {"CopiedDom":'{"TargetBgImg": "", "TargetBgSize": "", "CopiedDom": "", "TargetDomHeight": "", "TargetDomTop": "", "TargetDomLeft": ""}'},

        // 这是判断cover组件里要不要显示copied img的状态
        IfShowCopiedImg: false,

        // 这是用来判断cover组件的头图应该显示什么图片的值，默认是'../assets/cover.png'，开发环境要用require
        HomepageCover: require('../assets/cover.png'),

        // 这是用来控制cover组件中要不要隐藏homepage cover
        HideHomepageCover: false,

        // 下面两个值是用来告诉组件路由是从 home => content 还是 content => home
        HomeToContent: 'forward'

    },
    mutations: {
        // 由article card组件调用，把点击的那张卡片的w、h、l、t还有background-image拿过来
        GetFeaturedImgDom(state, CopiedDom) {
            state.CopiedFeaturedImgDom = CopiedDom
        },

        // 由article card组件调用，点击卡片后修改值，让cover组件接收，接收后在cover组件内生成一个copied img元素。这个元素复制了被点击的那张卡片的属性。
        IfShowCopiedImg(state) {
            state.IfShowCopiedImg = true
        },
        HideCopiedImg(state) {
            state.IfShowCopiedImg = false
        },

        // 用来修改cover组件的头图，因为是外部组件调用此方法时是直接拿到dom，就是url("xxxx")这种形式，所以用正则表达式拿到xxxx
        ChangeHomepageCover(state, TargetArticleCover) {
            let RegexURL = TargetArticleCover.TargetArticleCover.replace('url("', '')
            let RegexURL2 = RegexURL.replace('")', '')
            state.HomepageCover = RegexURL2
            // console.log(RegexURL2)
        },

        // 调用此方法，隐藏cover组件里的homepage cover。其实就是加一个额外的class，添加opacity: 0
        HideHomepageCover(state) {
            state.HideHomepageCover = true
        },
        ShowHomepageCover(state) {
            state.HideHomepageCover = false
        },

        // 调用此方法，告诉组件路由是从 home => content
        HomeToContent(state) {
            state.HomeToContent = 'forward'
        },
        ContentToHome(state) {
            state.HomeToContent = 'reverse'
        }
    },
    actions: {},
    modules: {}
})