// 默认导出，可以随意命名
import request from '@/utils/http.js'

// 用户的专栏列表
export function Repos(usid) {
    return request({
        methods: 'get',
        // 这里一定要用proxy转发，如果直接http://xxx这样就会被浏览器同源策略ban掉
        url: '/api/v2/users/' + usid + '/repos', 
    })
}

// 指定用户信息
export function UserInfo(usid) {
    return request({
        methods: 'get',
        url: '/api/v2/users/' + usid
    })
}

// 指定repo的所有文档信息（根据repo的namespace）