const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

function resolve(dir) {
  return path.resolve(__dirname, dir)
}

module.exports = {
  //模式
  // mode: 'production',
  //入口
  //entry: './src/index.js'
  entry: {
    main: resolve('src/index.js')
  },
  //出口
  output: {
    path: resolve('dist'), //所有打包文件的根目录
    filename: 'bundle.js',
    publicPath: '/', // 引入打包文件的路径左侧以 / 开头
  },
  //模块加载器
  module: {
    rules: [
      //es6 => es5
      {
        test: /\.m?js$/,
        // exclude: /(node_modules|bower_components)/,
        include:[resolve('src')],
        use: 'babel-loader'
      },
      //处理 Vue
      {
        test: /\.vue$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'vue-loader'
      },
      //处理CSS
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader'], // 多个loader从右到左处理
      },
      //处理图片
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        //test: /\.(png|jpe?g|gif)$/i,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1024*5, //把小于 5kb 的文件转成 Base64 的格式
            name: 'img/[name].[ext]', // 内变化hash变化
          }
        }
      },
      //打包字体

      //打包音频

      //打包样式

      //代码规范检查
    ]
  },
  //插件
  plugins: [
    //向页面插入引入打包的js/css 的代码
    new HtmlWebpackPlugin({
      template: 'public/index.html' //指定页面模板
    }),
    //清除打包后文件dist
    new CleanWebpackPlugin(['dist']),
    new VueLoaderPlugin()
  ],
  //开发服务器
  devServer: {
    open: true, //自动打开浏览器访问
    // quiet: true, // 不做太多日志输出
    /* 利用webpack-dev-server进行请求代理转发
    webpack-dev-server内部利用http-proxy-middle包对特定请求进行转发操作 */
    proxy: {
      // 处理以/api开头路径的请求
      // '/api': 'http://localhost:4000'   // http://localhost:4000/api/search/users
      '/api': {
        target: 'http://localhost:4000', // 转发的目标地址
        pathRewrite: {
          '^/api' : '' , // 转发请求时去除路径前面的/api
          changeOrigin: true,
        },
      },
      // '/gh': {
      //   target: 'https://api.github.com', // 转发的目标地址
      //   pathRewrite: {
      //     '^/gh' : ''  // 转发请求时去除路径前面的/api
      //   },
      //   changeOrigin: true, // 支持跨域, 如果协议/主机也不相同, 必须加上
      // }
    },
    //解决history模式路由请求404的问题
    historyApiFallback: true, // 任意的 404 响应都被替代为 index.html
  },
  devtool: 'inline-source-map',

  // 引入模块的解析
  resolve: {
    extensions: ['.js', '.vue', '.json'], // 可以省略的后缀名
    alias: { // 路径别名(简写方式)
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),  // 表示精准匹配   带vue编译器
    }
  }
}



