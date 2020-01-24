import base from './rollup.config.base'

const config = Object.assign({}, base, {
  output: {
    exports: 'named',
    name: 'bpw-validate-vue',
    file: 'dist/bpw-validate-vue.umd.js',
    format: 'umd',
  },
})

export default config
