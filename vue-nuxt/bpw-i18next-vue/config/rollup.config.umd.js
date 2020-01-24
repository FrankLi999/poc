import base from './rollup.config.base'

const config = Object.assign({}, base, {
  output: {
    exports: 'named',
    name: 'bpw-i18next-vue',
    file: 'dist/bpw-i18next-vue.umd.js',
    format: 'umd',
  },
})

export default config
