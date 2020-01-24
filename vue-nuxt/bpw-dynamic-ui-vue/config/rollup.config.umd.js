import base from './rollup.config.base'

const config = Object.assign({}, base, {
  output: {
    exports: 'named',
    name: 'bpw-dynamic-ui-vue',
    file: 'dist/bpw-dynamic-ui-vue.umd.js',
    format: 'umd',
  },
})

export default config
