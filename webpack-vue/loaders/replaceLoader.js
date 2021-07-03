const { getOptions } = require('loader-utils')
/* 
同步loader
*/
module.exports = function(source) {
  // console.log('replceLoader()...')
  const options = getOptions(this)
  
  /* 
  this.callback(
    err: Error | null,
    content: string | Buffer,
    sourceMap?: SourceMap,
    meta?: any
  )
  */
  // 同步处理
  const result = source.replace('world', 'loader')
  // return result
  this.callback(null, result)

}