import base from './rollup.config.base'

const config = Object.assign({}, base, {
  output: {
    exports: 'named',
    name: 'bpw-bootstrap-vue',
    file: 'dist/bpw-bootstrap-vue.umd.js',
    format: 'umd',
  },
})

export default config
