import base from './rollup.config.base'

const config = Object.assign({}, base, {
  output: {
    name: 'bpw-dynamic-ui-vue',
    file: 'dist/bpw-dynamic-ui-vue.esm.js',
    format: 'es',
  },
})

export default config
