## Rollup & Webpack

`Rollup` 是一个纯粹的 `Js` 打包工具（虽然能通过插件支持其他功能）





## 初始化工程

保证 `node` 的版本在 `16.0` 以上

先初始化 `package.json`

```
npm init -y
```

安装 `rollup`

```
npm install rollup -D
```

新增 `rollup.build.js` 作为生产配置文件

新增 `rollup.dev.js` 作为开发配置文件

配置 `package.json`

```json
"scripts": {
    "build": "rollup --config rollup.build.js",
    "dev": "rollup --config rollup.dev.js -w"
},
```

安装 `node` 的类型库：`@types/node`

```
npm install @types/node
```

在`tsconfig`中添加配置

```
{
	"compilerOptions": {
  	"types": [
    	"node"
  	]
	},
}
```





## 安装必要插件

官方插件：https://github.com/rollup/plugins/tree/master/packages

**node-resolve**

```
npm install @rollup/plugin-node-resolve -D
```

官方文档：https://github.com/rollup/plugins/tree/master/packages/node-resolve

将 `node_modules` 的 `esm` 模块打包

此插件会打包 `node_modules` 模块导出的东西，尽管自己只导入了库的某个模块，但最后产物里仍然包含整个库

使用方法：

```
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: 'src/index.js',
  output: {
    dir: 'output',
    format: 'cjs'
  },
  plugins: [nodeResolve()]
};
```

**commonjs**

官方文档：https://github.com/rollup/plugins/tree/master/packages/commonjs

 将 `node_modules` 的 `cjs` 模块转换为 `esm` 模块，便于`node-resolve`打包

```
npm install @rollup/plugin-commonjs -D
```

使用方法：

```
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/index.js',
  output: {
    dir: 'output',
    format: 'cjs'
  },
  plugins: [commonjs()]
};
```

**terser**

官方文档：https://github.com/rollup/plugins/tree/master/packages/terser

```
npm install rollup-plugin-terser -D
```

此插件用于压缩代码

使用方法：

```
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/index.js',
  output: {
    dir: 'output',
    format: 'cjs'
  },
  plugins: [terser()]
};
```





## 配置路径别名

官方文档：

安装路径别名插件：`alias`，此插件在导入js模块时，可以使用路径别名

```
npm install @rollup/plugin-alias -D
```

使用方法：

```
import alias from '@rollup/plugin-alias';

export default {
  input: 'src/index.js',
  output: {
    dir: 'output',
    format: 'cjs'
  },
  plugins: [
    alias({
      entries: [
        { find: 'utils', replacement: '../../../utils' },
        { find: 'batman-1.0.0', replacement: './joker-1.5.0' }
      ]
    })
  ]
};
```

配置 `tsconfig`，此方法在导入TS模块时，可以使用路径别名

```json
{
    "compilerOptions": {
        "baseUrl": "./",
        "paths": {
          "@/*": [
            "./src/*"
          ],
        }, 
    },
}
```





## Babel

官方文档：https://github.com/rollup/plugins/tree/master/packages/babel

为了正确解析我们的模块并使其与旧版浏览器兼容，我们应该包括babel来编译输出

安装插件：

```
npm install rollup-plugin-babel -D
```

安装 `@babel/core 和 @babel/preset-env`

>@babel/core是babel的核心，@babel/preset-env是babel的预设配置

```
npm install @babel/core @babel/preset-env -D
```

配置 `.babelrc`

```json
{
    "presets": [
        [
            "@babel/env",
            {
                // 设置 "modules": false
                // 否则 Babel 会在 Rollup 做处理之前将模块转成CJS
                "modules": false
            }
        ]
    ]
}
```

使用方法：

```
// rollup.config.js
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts',
  output: {
    dir: 'output',
    format: 'cjs'
  },
  plugins: [typescript()]
};
```





## TypeScript

官方文档：https://github.com/rollup/plugins/tree/master/packages/typescript

安装 `tsLib、Typescript`

```
npm install tslib typescript -D
```

安装插件：

```
npm install @rollup/plugin-typescript -D
```

配置 `tsconfig.json`

```json
{
    "compilerOptions": {
        "lib": [
            "ES6"
        ],
        "module": "ESNext",
        "allowJs": true,
        "types": [
            "node"
        ],
        "baseUrl": "./",
        "paths": {
          "@/*": [
            "./src/*"
          ],
        }, 
    },
    "exclude": [
        "node_modules/**"
    ],
    "include": [
        "src/**/*"
    ]
}
```

使用方法：

```
// rollup.config.js
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts',
  output: {
    dir: 'output',
    format: 'cjs'
  },
  plugins: [typescript()]
};
```



## 本地服务器

开发服务器：https://www.npmjs.com/package/rollup-plugin-dev

热更新：https://www.npmjs.com/package/rollup-plugin-livereload

HTML： https://github.com/rollup/plugins/tree/master/packages/html

安装插件：

```
npm install rollup-plugin-dev rollup-plugin-livereload @rollup/plugin-html  -D
```





## 代码校验 & 格式化

typescript-eslint：https://typescript-eslint.io/packages/eslint-plugin

先配置VSCode

禁用`Prettier`，防止格式化冲突，有关冲突原因，可以自行百度

最终冲突的解决方案就是，要么只用`ESlint`格式化代码（本方案），要么只用`Prettier`

```
{
  // 关闭保存自动格式化以禁用Prettier
  "editor.formatOnSave": false,
  // 输入一行后是否自动格式化
  "editor.formatOnType": true,
  "eslint.codeAction.showDocumentation": {
    "enable": true
  },
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "html",
    "vue"
  ],
}
```

安装插件使其支持 `Typescript`

```
npm install  @typescript-eslint/parser @typescript-eslint/eslint-plugin -D
```

安装 `Eslint + prettier` 相关

```
npm i eslint prettier eslint-plugin-prettier eslint-config-prettier -D
```

在根目录配置`.eslintrc.cjs`，因为项目是 `es` 模块，所以 `cjs` 模块需要以 `.cjs` 后缀

```js
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  // ts解析器
  parser: '@typescript-eslint/parser',
  extends: [
    // eslint 规则建议
    'eslint:recommended',
    // prettier 建议
    'plugin:prettier/recommended',
    // ts 校验建议
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  // 集成prettier, typescript
  plugins: ['prettier', '@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  // 全局变量，防止报错
  globals: {},
  rules: {
    // 采用 eslint 规则配置 prettier
    'prettier/prettier': [
      'error',
      {
        //  每行最大宽度
        printWidth: 120,
        // 缩进长度
        tabWidth: 2,
        // 用制表符而不是空格缩进行。
        useTabs: false,
        // 单引号
        singleQuote: true,
        // 结尾无分号
        semi: false,
        // 行首逗号
        trailingComma: 'es5',
        // 将多行HTML（HTML、JSX、Vue、Angular）元素的>放在最后一行的末尾，而不是单独放在下一行
        bracketSpacing: true,
        // 在唯一的箭头函数参数周围包含括号
        arrowParens: 'avoid',
        endOfLine: 'auto',
      },
    ],
    'no-unused-vars': 'warn',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
}
```





## 直接使用

1.安装插件或者第三方库

```shell
npm init -y
cnpm install rollup -D
cnpm install @types/node
cnpm install @rollup/plugin-node-resolve -D
cnpm install @rollup/plugin-commonjs -D
cnpm install rollup-plugin-terser -D
cnpm install @rollup/plugin-alias -D
cnpm install rollup-plugin-babel -D
cnpm install @babel/core @babel/preset-env -D
cnpm install tslib typescript -D
cnpm install @rollup/plugin-typescript -D
cnpm install rollup-plugin-dev rollup-plugin-livereload @rollup/plugin-html -D
cnpm install @typescript-eslint/parser @typescript-eslint/eslint-plugin -D
cnpm install eslint prettier eslint-plugin-prettier eslint-config-prettier -D
```

2.编写 `packages.json`

```json
 {
  "scripts": {
    "build": "rollup --config rollup.build.js",
    "dev": "rollup --config rollup.dev.js -w",
    "fix": "npx eslint --fix --ext .js,.ts, src/ -c .\\.eslintrc.cjs"
  },
 }
```

3.编写  `tsconfig.json`

```json
{
    "compilerOptions": {
        "lib": [
            "ES6"
        ],
        "module": "ESNext",
        "allowJs": false,
        "types": [
            "node"
        ],
        "baseUrl": "./",
        "paths": {
          "@/*": [
            "./src/*"
          ],
        },
    },
    "exclude": [
        "node_modules/**"
    ],
    "include": [
        "src/**/*"
    ],
}
```

4.编写 `.eslintrc.cjs`

```js
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  // ts解析器
  parser: '@typescript-eslint/parser',
  extends: [
    // eslint 规则建议
    'eslint:recommended',
    // prettier 建议
    'plugin:prettier/recommended',
    // ts 校验建议
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  // 集成prettier, typescript
  plugins: ['prettier', '@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  globals: {
    // 支持uni的全局变量
    uni: 'readonly',
    plus: 'readonly',
  },
  rules: {
    // 采用 eslint 规则配置 prettier
    'prettier/prettier': [
      'error',
      {
        //  每行最大宽度
        printWidth: 120,
        // 缩进长度
        tabWidth: 2,
        // 用制表符而不是空格缩进行。
        useTabs: false,
        // 单引号
        singleQuote: true,
        // 结尾无分号
        semi: false,
        // 行首逗号
        trailingComma: 'es5',
        // 将多行HTML（HTML、JSX、Vue、Angular）元素的>放在最后一行的末尾，而不是单独放在下一行
        bracketSpacing: true,
        // 在唯一的箭头函数参数周围包含括号
        arrowParens: 'avoid',
        endOfLine: 'auto',
      },
    ],
    'no-unused-vars': 'warn',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
}
```

5.编写 `.babelrc`

```json
{
    "presets": [
        [
            "@babel/env",
            {
                // 设置 "modules": false
                // 否则 Babel 会在 Rollup 做处理之前将模块转成CJS
                "modules": false
            }
        ]
    ]
}
```

6.编写 `rollup.build.js`

```js
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
```

7.编写 `rollup.dev.js`

```js
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import babel from 'rollup-plugin-babel'
import dev from 'rollup-plugin-dev'
import livereload from 'rollup-plugin-livereload'
import html from '@rollup/plugin-html'
import alias from '@rollup/plugin-alias'
import path from 'path'

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
      entries: [{ find: '@', replacement: path.resolve(__dirname, './src') }],
    }),
  ],
}
```

8.vscode配置

```
{
  // 关闭保存自动格式化以禁用Prettier
  "editor.formatOnSave": false,
  // 输入一行后是否自动格式化
  "editor.formatOnType": true,
  "eslint.codeAction.showDocumentation": {
    "enable": true
  },
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "html",
    "vue"
  ],
}
```

