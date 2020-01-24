import base from './rollup.config.base'
const outputFile = '{{ name }}'
const config = Object.assign({}, base, {
  output: {
    exports: 'named',
    name: outputFile,
	file: 'dist/' + outputFile + '.umd.js',
    format: 'umd',
  },
})

export default config
