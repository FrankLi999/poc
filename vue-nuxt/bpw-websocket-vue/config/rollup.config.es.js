import base from './rollup.config.base'

const config = Object.assign({}, base, {
  output: {
    name: 'bpw-websocket-vue',
    file: 'dist/bpw-websocket-vue.esm.js',
    format: 'es',
  },
})

export default config
