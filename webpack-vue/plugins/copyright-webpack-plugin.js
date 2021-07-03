class CopyrightWebpackPlugin {
  constructor(options) {
    console.log('plugin对象创建了', options)
  }
  
  apply(compiler) {
    console.log('plugin apply()')
    // 同步
    compiler.hooks.compile.tap('CopyrightWebpackPlugin', (compilation) => {
			console.log('compiler');
		})
    // 异步
		compiler.hooks.emit.tapAsync('CopyrightWebpackPlugin', (compilation, cb) => {
			compilation.assets['copyright.txt']= {
				source: function() {
					return 'copyright by xfzhang'
				},
				size: function() {
					return 20
				}
			}
			cb()
		})
  }
}

module.exports = CopyrightWebpackPlugin
