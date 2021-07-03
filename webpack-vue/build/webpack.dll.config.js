/* 
链式引用预编译第三方库
*/

const webpack = require("webpack")
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const {resolve} = require('./utils')

console.log(path.resolve(__dirname, '../public/dll_static'))

module.exports = {
  entry: {
      vendor: ['vue', 'vue-router']
  },
  output: {
      path: resolve('public'),
      library: '_dll_[name]_[hash]',
      filename: 'dll_static/_dll_[name]_[hash].js'
  },
  plugins: [
    new CleanWebpackPlugin(['dll_static'], {
      root: resolve('public')
    }),
    new webpack.DllPlugin({
      name: '_dll_[name]_[hash]', //和output.library中一致，值就是输出的manifest.json中的 name值
      path: path.join(__dirname, '../public/dll_static', '[name].manifest.json')
    })
  ]
}