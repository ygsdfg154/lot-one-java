const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// 联调后端地址。H5 下浏览器直连会跨域，这里用 devServer 代理把 /v1 转过去，
// 后端不必为开发环境开 CORS。改地址只改这一行（或设 DEVICE_APP_API 环境变量）。
// 已迁移到 Java Spring Cloud 网关：网关去掉 /device 前缀后转发到 device-service
const API_TARGET = process.env.DEVICE_APP_API || 'http://localhost:8080/device';

module.exports = {
  // 反编译产物里保留了大量压缩后的短变量名，关掉体积告警
  configureWebpack: {
    performance: { hints: false },
    plugins: [
      new CopyWebpackPlugin([
        {
          from: path.join(__dirname, 'src/static/app-plus'),
          to: 'static/app-plus',
        },
      ]),
    ],
  },
  devServer: {
    // 8080 常被别的服务占着，固定用 8090 免得每次启动端口漂移
    port: Number(process.env.PORT || 8090),
    proxy: {
      '/v1': {
        target: API_TARGET,
        changeOrigin: true,
        // 后端路径本身带 /v1，不需要 rewrite
      },
    },
  },
};
