const { getOptions } = require('loader-utils')
/* 
异步Loader
*/
module.exports = function(source) {
  // console.log('replceLoaderAsync()...')
  const options = getOptions(this)
  
  /*
  const callback = this.async()
  callback(
    err: Error | null,
    content: string | Buffer,
    sourceMap?: SourceMap,
    meta?: any
  )
  */
  const callback = this.async()
  // 异步处理
  setTimeout(() => {
    const result = source.replace('loader', options.name)
    callback(null, result)
  }, 1000)
}