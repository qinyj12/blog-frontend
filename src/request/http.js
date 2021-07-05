import axios from 'axios'

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
    // withCredentials: true
});

// 请求拦截器
// axios.interceptors.request.use(    
//     config => {        
//         // 每次发送请求之前判断vuex中是否存在token        
//         // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
//         // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断 
//         const token = store.state.token;        
//         token && (config.headers.Authorization = token);        
//         return config;    
//     },    
//     error => {        
//         return Promise.error(error);    
// });

// 返回拦截
// service.interceptors.response.use((response)=>{
//     // 获取接口返回结果
//     const res = response.data;
//     // code为200，直接把结果返回回去，这样前端代码就不用在获取一次data.
//     if(res.code === 200){
//         return res;
//     }else{
//         // 错误显示可在service中控制，因为某些场景我们不想要展示错误
//         // Message.error(res.message);
//         return res;
//     }
// },()=>{
//     console.log('网络请求异常，请稍后重试!');
// });

export default service