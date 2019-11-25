module.exports = {
  css: {
    loaderOptions: {
      sass: {
        //旧版本的表示方法 前面是data
        prependData: `@import "./src/assets/styles/main.scss";`
      }
    }
  },
  // runtimeCompiler: true,
  // publicPath: "/", // 设置打包文件相对路径
  devServer: {
    // open: process.platform === 'darwin',
    // host: 'localhost',
    port: 8080,
    // open: true, //配置自动启动浏览器
    proxy: {
      "/api": {
        target: "http://localhost:8889", //对应自己的接口
        changeOrigin: true, //是否要改变原域名
        ws: true,
        pathRewrite: {
          "^/api": "/api", //路径重写
          "^/server": "/server"
        }
      }
    }
  }
};
