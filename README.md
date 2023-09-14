# Rollup-ts-template

## 注意

该模板只支持纯`javascript` 和 `typescript` 编码的库，不支持编写 `vue` 组件库

需要 `node` 版本 16.0 +

## 功能

- [x] **babel**： `es6` 转 `es5`
- [x] **eslint**：校验 `javascript` 和 `typescript`
- [x] **prettier**：自动格式化代码
- [x] **开发服务器**：带有热更新的开发服务器
- [x] **typescript**：支持 `typescript` 和 `javascript`  混编

## 使用方式

执行 `npm run dev`，点击输出在控制台的链接，即可在浏览器预览。（无代码压缩）

执行 `npm run build`，即可打包。（有代码压缩）

目录中有两个打包配置文件：

`rollup.build.js`：生产配置

`rollup.dev.js`：开发配置

请根据自己的情况更改入口和出口配置，插件一般无需变动

开发环境配置文件如下：

```js
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
```

