const babel = require('rollup-plugin-babel')
const resolve = require('rollup-plugin-node-resolve')
const eslint = require('rollup-plugin-eslint')
const replace = require('rollup-plugin-replace')
const uglify = require('rollup-plugin-uglify')
// const vue = require('rollup-plugin-vue')
const commonjs = require('rollup-plugin-commonjs')

const builtins = require('rollup-plugin-node-builtins')
const globals = require('rollup-plugin-node-globals')
// import css from 'rollup-plugin-css-only';
// import vue from 'rollup-plugin-vue';
// import image from 'rollup-plugin-img';
// import url from 'rollup-plugin-url';

var banner = 
  '/*!\n' +
  ' * fetch2.js v' + 1.0 + '\n' +
  ' * (c) 2017-' + new Date().getFullYear() + ' lanyue\n' +
  ' */'

var debug = process.env.NODE_ENV !== 'production'
export default {
  input: 'src/index.js',
  // 外部依赖
  external: [],
  output: {
    file: debug ? 'dist/fetch2.js' : 'dist/fetch2.min.js',
    name: 'Fetch2',
    format: 'umd',//iife(web) , cjs(node) , umd(web&node)
    sourcemap: true,
    banner: banner,
    // 指定第三方模块在浏览器中的全局变量名
    globals: {
      // vue: 'Vue'
    }
  },
  watch: {
    include: 'src/**'
  },
  plugins: [
    eslint({
      exclude: ['node_modules/**']
    }),
    resolve(),
    globals(),
    builtins(),
    commonjs({
      // non-CommonJS modules will be ignored, but you can also
      // specifically include/exclude files
      include: 'node_modules/**',  // Default: undefined
      // exclude: [ 'node_modules/foo/**', 'node_modules/bar/**' ],  // Default: undefined
      // these values can also be regular expressions
      // include: /node_modules/

      // search for files other than .js files (must already
      // be transpiled by a previous plugin!)
      extensions: [ '.js', '.coffee' ],  // Default: [ '.js' ]

      // if true then uses of `global` won't be dealt with by this plugin
      ignoreGlobal: false,  // Default: false

      // if false then skip sourceMap generation for CommonJS modules
      sourceMap: false,  // Default: true

      // explicitly specify unresolvable named exports
      // (see below for more details)
      // namedExports: { './module.js': ['foo', 'bar' ] },  // Default: undefined

      // sometimes you have to leave require statements
      // unconverted. Pass an array containing the IDs
      // or a `id => boolean` function. Only use this
      // option if you know what you're doing!
      ignore: [ 'conditional-runtime-dependency' ]
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    replace({ ENV: JSON.stringify(process.env.NODE_ENV || 'development')}),
    (!debug && uglify())
  ]
}