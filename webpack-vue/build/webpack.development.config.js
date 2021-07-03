/* 
webpack开发环境配置
*/
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseConfig = require('./webpack.base.config')
const {resolve} = require('./utils')

const config = {

  // 模式
  mode: 'development',

  // 出口
  output: {
    filename: '[name].js',
    publicPath: '/'
  },

  // 模块加载器
  module: {
    rules: [
     
    ]
  },

  // 插件
  plugins: [
    // 开启HMR
    new webpack.HotModuleReplacementPlugin(), 
    // 打包HTML(自动引入打包生成的js/css)
    new HtmlWebpackPlugin({
      template: 'public/index.html', // 根据哪个模板页面生成
      filename: 'index.html', // 生成的打包页面
      inject: true, // 自动引入打包文件
    }),
  ],

  // 开发服务器
  devServer: {
    port: 8081, // 端口号
    open: true, // 自动打开浏览器访问
    // quiet: true, // 减少打包日志输出
    hot: true,  // 开启HMR
    // mock数据接口
    before: function(app, server) {
      // 注册路由
      app.get('/api/user/:id', function(req, res) {
        res.json({ code: 0, data: {id: req.params.id, username: 'tom'} });
      });
    },
    // 配置代理, 解决ajax跨域问题
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    // 解决history路由刷新404问题
    historyApiFallback: true
  },

  // source-map调试
  devtool: 'cheap-module-inline-source-map',

  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      /* 
      不建议使用, 导致打包文件变大(包含模板编译代码)
      */
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      '@components': resolve('src/components'),
    }
  },

  // externals:{
  //   'vue': 'Vue',
  //   'vue-router': 'VueRouter',
  //   'vuex':'Vuex',
  // },
}

module.exports = merge(baseConfig, config)