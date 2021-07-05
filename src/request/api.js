// 默认导出，可以随意命名
import request from './http.js'

export function demo() {
    return request({
        methods: 'get',
        url: '/api/v2/users/qinyujie-067rz/repos', // 这里一定要用proxy转发，如果直接http://xxx这样就会被浏览器同源策略ban掉
    })
}