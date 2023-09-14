import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'
import alias from '@rollup/plugin-alias'
export default {
  input: './src/main.ts',
  output: {
    file: './dist/bundle.esm.min.js',
    format: 'esm',
  },
  plugins: [
    resolve(),
    commonjs(),
    typescript(),
    babel({ exclude: 'node_modules/**' }),
    terser(),
    alias({
      entries: [{ find: '@', replacement: './src' }],
    }),
  ],
}
