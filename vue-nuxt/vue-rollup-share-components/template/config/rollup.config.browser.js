import base from './rollup.config.base'
import uglify from 'rollup-plugin-uglify'
import { minify } from 'uglify-es'

const outputFile = '{{ name }}'
const config = Object.assign({}, base, {
  output: {
    exports: 'named',
    name: outputFile,
    file: 'dist/' + outputFile + '.min.js',
    format: 'iife',
  },
})

config.plugins.push(uglify({}, minify))

export default config
