/* 
webpack生产环境配置
*/
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

const baseConfig = require('./webpack.base.config')


const config = {

  // 模式
  mode: 'production',
  
  // 出口
  output: {
    filename: 'js/[name].[hash:8].js',
  },

  // 模块加载器
  module: {
    rules: [
      
    ]
  },

  // 插件
  plugins: [
    // 清除打包根目录
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '..')
    }), 
    // 将css从js中拆分出来单独打包
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css'
    }),
    // 压缩单独打包的css
    new OptimizeCssAssetsPlugin({
      cssProcessor: require('cssnano'), // 这里制定了引擎，不指定默认也是 cssnano 
    }),

    new HtmlWebpackPlugin({
      template: 'public/index.html',
      filename: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),

    // 引用动态链接库
    new webpack.DllReferencePlugin({
      // context: path.resolve(__dirname, '..'),
      manifest: require('../public/dll_static/vendor.manifest')
    }),
    // 文件动态添加到html中
    new AddAssetHtmlPlugin([{
      filepath: path.resolve(__dirname,'../public/dll_static/*.js'),
      outputPath: 'dll_static',
      publicPath: '/dll_static',
      includeSourcemap: false
    }]),
  ],

  // source-map调试  
  // devtool: 'cheap-module-source-map', // 测试生产环境使用
  devtool: 'none', // 线上产生环境不需要

  // 优化
  optimization: {
    // 拆分打包文件
    splitChunks: { 
      // chunks: 'async' // 默认值, 只对异步加载的模块单独打包
      chunks: 'all', // 将从node_modules引入的模块和异步加载的模块都拆分单独打包
    },
    // 将webpack的模块引导代码单独打包
    runtimeChunk: { 
      name: 'runtime'
    },
  },
}

// 如果指定了--report配置, 就添加打包文件分析的插件
if (process.env.npm_config_report) {
  config.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = merge(baseConfig, config)
