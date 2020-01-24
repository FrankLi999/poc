import base from './rollup.config.base'

const config = Object.assign({}, base, {
  output: {
    name: 'bpw-validate-vue',
    file: 'dist/bpw-validate-vue.esm.js',
    format: 'es',
  },
})

export default config
