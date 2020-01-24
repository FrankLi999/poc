import base from './rollup.config.base'

const config = Object.assign({}, base, {
  output: {
    name: 'bpw-i18next-vue',
    file: 'dist/bpw-i18next-vue.esm.js',
    format: 'es',
  },
})

export default config
