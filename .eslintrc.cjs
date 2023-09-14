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
