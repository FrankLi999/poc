import base from './rollup.config.base'

const config = Object.assign({}, base, {
  output: {
    exports: 'named',
    name: 'bpw-websocket-vue',
    file: 'dist/bpw-websocket-vue.umd.js',
    format: 'umd',
  },
})

export default config
