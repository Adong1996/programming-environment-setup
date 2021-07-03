## 依赖包
    webpack 
    webpack-cli
    html-webpack-plugin
    clean-webpack-plugin
    style-loader 
    css-loader
    file-loader@4.3.0
    url-loader@2.3.0
    webpack-dev-server
    babel-loader
    @babel/core
    @babel/preset-env
    @babel/polyfill
    @babel/plugin-transform-runtime
    @babel/runtime
    mini-css-extract-plugin
    optimize-css-assets-webpack-plugin
    postcss-loader
    autoprefixer
    postcss-px2rem
    less
    less-loader
    stylus
    stylus-loader
    node-sass
    sass-loader
    webpack-bundle-analyzer
    copy-webpack-plugin
    axios
    jquery
    lodash-es

    vue 
    vue-loader
    vue-template-compiler
    vue-router
    vuex
    mint-ui
    babel-plugin-component
    


## 相关问题
    1). 区别wepack的2个工具包: webpack与webpack-cli?
    2). 为什么建议不要全局下载webpack工具包?
    3). 如何解决webpack命令不能识别的问题?
    4). 为什么要使用html-webpack-plugin?
    5). 为什么要使用clean-webpack-plugin?
    6). 区别css-loader和style-loader?
    7). 区别url-loader和file-loader?
    
8). webpack-dev-server用来做什么?
9). 说说热模替换(HMR)的理解?
10). 说说代理服务器的理解?
11). 说说history路由404问题?
   
12). @babel/preset-env能干什么? 不能干什么? 如何解决?
13). 直接使用@babel/polyfill有什么问题, 如何解决?
14). 如何实现@babel/polyfill的按需打包

15). 如何对css进行单独打包和压缩
16). postcss是什么?
17). autoprefixer用来做什么的? 为什么要这么做?
18). postcss-pxtorem用来做什么的? 这样做有什么好处?
19). purgecss-webpack-plugin的作用是什么?
20). 你知道打包文件可视化分析吗?


## 优化处理
### 1. js打包优化
    1). 使用include配置减小loader的处理范围, 加快打包速度
    2). 引入全部的@babel/polyfill兼容低版本浏览器
    3). 根据指定的浏览器版本范围, 打包@babel/polyfill的部分
    4). 根据项目中使用的新API, 实现对@babel/polyfill的按需打包
    5). 使用@babel/plugin-transform-runtime进一步优化打包文件(更小)

### 2. css打包优化
    1). 抽取css单独打包
    2). 压缩css
    3). css添加浏览器厂商前缀
    4). 编码使用px, 如何做移动端适配
    5). 3种css预编译器环境(less/stylus/sass)

### 3. webpack开发服务器
    1). 理解webpack开发服务器
    2). 热模替换(HMR)
    3). 代理服务器
    4). 解决history路由404问题


