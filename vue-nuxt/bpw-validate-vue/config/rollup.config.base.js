import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import vue from 'rollup-plugin-vue'
import cjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'
import eslint from 'rollup-plugin-eslint'
import requireContext from 'rollup-plugin-require-context'
import string from 'rollup-plugin-string'
import fs from 'fs'
import CleanCSS from 'clean-css'
import autoprefixer from 'autoprefixer'
import focusVisible from 'postcss-focus-visible'
import css from 'rollup-plugin-css-porter'
const config = require('../package.json')
export default {
  input: 'src/index.js',
  external: Object.keys(config.dependencies),
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    // cjs(),
    eslint(),
    requireContext(),
    string({
      include: '**/*.svg',
    }),
    css({ dest: 'dist/bpw-validate-vue.css'}),
    /*
    vue({
      css (style) {
        fs.writeFileSync('dist/bpw-bootstrap-vue.css', new CleanCSS().minify(style).styles)
      },
      postcss: [autoprefixer, focusVisible],
    }),
    */
    babel({
      exclude: 'node_modules/**',
      plugins: ['external-helpers'],
      runtimeHelpers: true
    }),
    replace({
      VERSION: JSON.stringify(config.version),
    }),
  ],
  watch: {
    include: 'src/**',
  },
}
