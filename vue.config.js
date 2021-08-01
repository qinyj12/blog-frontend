module.exports = {
    publicPath: './',
    filenameHashing: false,
    transpileDependencies: ['vue-clamp', 'resize-detector'],
    devServer: {
        port: 8090,
        // 跨域转发
        proxy: {
            '/api': {
                target: 'https://www.yuque.com',
                changeOrigin: true,
                pathRewrite:{  // 路径重写，把/aaa/bbb转为/bbb
                    '^/api': ''  
                }
            },
            '/demo': {
                target: 'http://127.0.0.1:5000',
                changeOrigin: true,
                pathRewrite: {
                    '^/demo': ''  
                }
            }
        }
    },
}