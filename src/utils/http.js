import axios from 'axios'
// 因为是外部js，不能继承vue实例，所以要单独引入element-ui
import 'element-ui/lib/theme-chalk/index.css'
import { Message } from "element-ui"
import qs from 'qs'

// 创建一个独立的axios实例
const service = axios.create({ 
    // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL
    baseURL: '/api',
    // 定义统一的请求头部
    headers: {
       "X-Auth-Token": "IBVJsW3jFQaLbdbMA82Uf9Xg147djGUGFfnsEZZD"
    },
    // 配置请求超时时间
    timeout: 10000, 
    // 如果用的JSONP，可以配置此参数带上cookie凭证，如果是代理和CORS不用设置
    withCredentials: true
});

// 请求拦截器
axios.interceptors.request.use(    
    config => {
        // 这里设置了没用
        // config.headers['demo'] = '123'
        return config;    
    },
    error => {        
        return Promise.error(error);    
});

// 返回拦截
service.interceptors.response.use((response)=>{
    // 获取接口返回结果
    const res = response.data;
    const code = response.status;
    // code为200
    if(code === 200){
        console.log('返回200')
        return res;
    // code不为200
    }else{
        console.log('返回不是200')
        return res;
    }
},(error)=>{
    console.log('返回拦截器catch error')
    console.log(error)
});

export default service