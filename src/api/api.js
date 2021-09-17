import { yuque_service, backend } from '@/utils/http.js' // 默认导出，可以随意命名
import demo from '@/utils/demohttp.js'

// 用户的专栏列表
export function Repos(usid) {
    return yuque_service({
        methods: 'get',
        // 这里一定要用proxy转发，如果直接http://xxx这样就会被浏览器同源策略ban掉
        url: '/api/v2/users/' + usid + '/repos', 
    })
}

// 获取指定用户的信息
export function UserInfo(usid) {
    return yuque_service({
        methods: 'get',
        url: '/api/v2/users/' + usid
    })
}

// 指定repo的所有文档信息（根据repo的namespace）
export function RepoDocs(bookid) {
    return yuque_service({
        methods: 'get',
        url: '/api/books/' + bookid + '/docs'
    })
}

// 获取某篇文档的信息（根据namespace/"docs"/slug）
export function DocInfo(namespace, slug) {
    return yuque_service({
        methods: 'get',
        url: '/api/v2/repos/' + namespace + '/docs/' + slug
    })
}

// 使用V1 版的api，获取更全的信息，可以拿到推荐文章
export function FullDocInfo(slug, book_id = '20285594') {
    return yuque_service({
        methods: 'get',
        url: '/api/docs/' + slug,
        params: {
            book_id, 
            include_contributors: 'true', 
            include_hits: 'true', 
            include_like: 'true', 
            include_pager: 'true',
            include_suggests: 'true',
            merge_dynamic_data: 'false'
        }
    })
}

// 获取指定文档的标签（根据doc的id）
export function DocTags(docId) {
    return yuque_service({
        methods: 'get',
        url: '/api/tags',
        params: { docId }
    })
}

// 获取指定标签的文档（https://www.yuque.com/api/tags/docs?tags=标签名&userId=xxx）
export function TagDocs(tags, userId = '22012465') {
    return yuque_service({
        methods: 'get',
        url: '/api/tags/docs',
        params: {tags, userId}
    })
}

// python定制后端，用无头浏览器模拟点击登录，获取所有文章的标签
export function AllTags(login) {
    return backend({
        methods: 'get',
        url: '/yuque/tags',
        params: { login }
    })
}

// 测试axios.all的接口
export function Demo(arg) {
    return demo({
        methods: 'get',
        url: 'https://jsonplaceholder.typicode.com/posts/' + arg,
    })
}