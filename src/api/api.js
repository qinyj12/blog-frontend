// 默认导出，可以随意命名
import request from '@/utils/http.js'
import qs from 'qs'

// 用户的专栏列表
export function Repos(usid) {
    return request({
        methods: 'get',
        // 这里一定要用proxy转发，如果直接http://xxx这样就会被浏览器同源策略ban掉
        url: '/api/v2/users/' + usid + '/repos', 
    })
}

// 获取指定用户的信息
export function UserInfo(usid) {
    return request({
        methods: 'get',
        url: '/api/v2/users/' + usid
    })
}

// 指定repo的所有文档信息（根据repo的namespace）
export function RepoDocs(namespace) {
    return request({
        methods: 'get',
        url: '/api/v2/repos/' + namespace + '/docs'
    })
}

// 获取指定文档的标签（根据doc的id）
export function DocTags(docId) {
    return request({
        methods: 'get',
        url: '/api/tags',
        // 以下cookie的传输方法是错误的
        headers: {cookie: '_yuque_session=egAQrSZkE_KQYCtR4BwHZMMknIUHCkxFVfgxzsV-JV0EkZVypXESNosATwExhyt9qgBw8Y-e13_WTFOIkioKpw'},
        params: { docId }
    })
}