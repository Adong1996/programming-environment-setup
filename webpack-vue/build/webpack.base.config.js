/* 
webpack基础配置
*/
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyrightWebpackPlugin = require('../plugins/copyright-webpack-plugin')
const {
  resolve
} = require('./utils')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const isProd = process.env.NODE_ENV === 'production' // 是否生产环境
/*const threadLoader = require('thread-loader')
threadLoader.warmup({
  // pool options, like passed to loader options
  // must match loader options to boot the correct pool
}, [
  'babel-loader',
  'vue-loader',
]); */
var HappyPack = require('happypack');
var happyThreadPool = HappyPack.ThreadPool({
  size: 5
});

module.exports = {

  // 指定打包的基础目录的绝对路径(默认是执行命令的目录)
  context: resolve(''),

  // 入口
  entry: {
    app: resolve('src/main.js')
  },

  // 出口
  output: {
    path: resolve('dist'),
    publicPath: '/', // 生成的引用路径的左边都有一个/
    // publicPath: 'https://www.bootcdn.cn/', // 存放了打包资源的一个在线基础url
  },

  resolveLoader: { // 指定loader查找范围
    modules: ['node_modules', 'loaders']
  },

  // 模块加载器
  module: {
    rules: [

      {
        test: /\.css$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'vue-style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'vue-style-loader',
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      },

      {
        test: /\.styl(us)$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'vue-style-loader',
          'css-loader',
          'postcss-loader',
          'stylus-loader'
        ]
      },

      // 处理vue文件
      {
        test: /\.vue$/,
        use: 'vue-loader' // loader内部都有一个处理函数
      },

      {
        test: /\.js$/,
        include: [resolve('src')],
        use: [{
            // loader: resolve('loaders/replaceLoaderAsync.js'),
            loader: 'replaceLoaderAsync.js',
            options: {
              name: 'xhr'
            }
          },
          {
            // loader: resolve('loaders/replaceLoader.js')
            loader: 'replaceLoader.js'
          }
        ]
      },
      {
        enforce: "pre", // 前置loader, 最先执行
        test: /\.js$/,
        // exclude: /node_modules/,
        include: resolve('src'),
        loader: "eslint-loader",
        options: {
          formatter: require("eslint-friendly-formatter")
        }
      },

      {
        test: /\.js$/,
        use: ['happypack/loader?id=babel'],
        include: [resolve('src')]
      },

      {
        test: /\.png|jpe?g|svg|gif$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 1024 * 3,
            name: 'img/[name].[hash].[ext]' // 此处hash等同于cotnenthash
          }
        }],
      }
    ]
  },

  // 插件
  plugins: [
    new CopyrightWebpackPlugin({}),
    // 提示打包进度
    new webpack.ProgressPlugin(),
    // 自动加载模块，而不必到处 import 或 require
    new webpack.ProvidePlugin({
      axios: 'axios'
    }),
    // 拷贝静态资源到打包文件夹
    new CopyWebpackPlugin([{
      from: resolve('public'),
      to: resolve('dist'),
      ignore: ['index.html', 'dll_static']
    }]),

    new VueLoaderPlugin(),

    new HappyPack({
      id: 'babel',
      threadPool: happyThreadPool,
      loaders: ['babel-loader']
    }),
  ],

  // 模块引入解析
  resolve: {
    /* 
    1. 简化模块路径的编写
    2. 加快打包速度
    */
    alias: { // 模块路径别名
      '@': resolve('src'),
      '@components': resolve('src/components'),
    },
    extensions: ['.js', '.vue'], // 指定哪些后缀的模块可以省略后缀
  },
}