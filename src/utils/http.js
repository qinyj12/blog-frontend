import axios from 'axios'
// 因为是外部js，不能继承vue实例，所以要单独引入element-ui
import 'element-ui/lib/theme-chalk/index.css'
import { Message } from "element-ui"
import qs from 'qs'

/*
以下为语雀的axios实例
*/

// 创建一个独立的axios实例
const yuque_service = axios.create({ 
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
yuque_service.interceptors.request.use(    
    config => {
        // console.log(config)
        // config.headers['cookie'] = '_yuque_session=egAQrSZkE_KQYCtR4BwHZMMknIUHCkxFVfgxzsV-JV0EkZVypXESNosATwExhyt9qgBw8Y-e13_WTFOIkioKpw'
        return config;    
    },
    error => {        
        return Promise.error(error);    
});

// 返回拦截
yuque_service.interceptors.response.use((response)=>{
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

/*
以下为自定义后端的实例
*/

const backend = axios.create({ 
    // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL
    baseURL: 'http://127.0.0.1:5000/',
    // 配置请求超时时间
    timeout: 20000, 
});

// 请求拦截器
backend.interceptors.request.use(    
    config => {
        return config;    
    },
    error => {        
        return Promise.error(error);    
});

// 返回拦截
backend.interceptors.response.use((response)=>{
    // 获取接口返回结果
    const res = response.data;
    if(res.code === 200) {
        console.log('backend返回200')
        return res;
    } else {
        console.log('backend返回不是200')
        return res;
    }
},(error)=>{
    console.log('backend返回拦截器catch error')
    console.log(error)
    return {
        'code': 500,
        'message': 'error'
    }
});

export {yuque_service, backend}