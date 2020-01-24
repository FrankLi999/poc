import base from './rollup.config.base'
import uglify from 'rollup-plugin-uglify'
import { minify } from 'uglify-es'

const config = Object.assign({}, base, {
  output: {
    exports: 'named',
    name: 'bpw-dynamic-ui-vue',
    file: 'dist/bpw-dynamic-ui-vue.min.js',
    format: 'iife',
  },
})

config.plugins.push(uglify({}, minify))

export default config
