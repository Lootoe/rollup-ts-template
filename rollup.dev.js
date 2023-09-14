import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import babel from 'rollup-plugin-babel'
import dev from 'rollup-plugin-dev'
import livereload from 'rollup-plugin-livereload'
import html from '@rollup/plugin-html'
import alias from '@rollup/plugin-alias'

export default {
  input: './src/main.ts',
  output: {
    file: './dist/bundle.esm.js',
    format: 'esm',
  },
  plugins: [
    resolve(),
    commonjs(),
    typescript(),
    babel({ exclude: 'node_modules/**' }),
    livereload(),
    html({
      fileName: 'index.html',
    }),
    dev({
      port: 8989,
      dirs: ['dist'],
    }),
    alias({
      entries: [{ find: '@', replacement: './src' }],
    }),
  ],
}
