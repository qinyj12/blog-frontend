module.exports = {
    publicPath: './',
    filenameHashing: false,
    transpileDependencies: ['vue-clamp', 'resize-detector'],
    devServer: {
        port: 8090,
        // 测试跨域，但是失败
        proxy: {
            '/api': {
                target: 'https://www.yuque.com',
                changeOrigin: true,
                pathRewrite:{  // 路径重写，把/aaa/bbb转为/bbb
                    '^/api': ''  
                }
            }
        }
    },
}