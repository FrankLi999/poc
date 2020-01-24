import base from './rollup.config.base'
const outputFile = '{{ name }}'

const config = Object.assign({}, base, {
  output: {
    name: outputFile,
    file: 'dist/' + outputFile + '.js',
    format: 'es',
  },
})

export default config
