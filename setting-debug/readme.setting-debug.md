# NuxtJSのプロジェクトをVSCODEでデバッグする

## vscodeに拡張機能をインストール

Debugger for Chrome

<https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome>

## Source Map有効化

nuxt.config.js

```js
  export default {
    :
    build: {
      extend(config, ctx) {
        // Run ESLint on save
        if (ctx.isDev && ctx.isClient) {
+         config.devtool = 'source-map'
          config.module.rules.push({
```

## npm script追加

package.json

```json
  {
    "scripts": {
      :
+     "debug": "node --inspect-brk=9229 node_modules/nuxt/bin/nuxt"
    }
    :
  }
```

## vscodeデバッグ設定ファイル作成

.vscode/launch.json

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}",
      "breakOnLoad": true,
      "sourceMapPathOverrides": {
        "webpack:///*.vue": "${workspaceFolder}/*.vue"
      }
    },
    {
      "type": "node",
      "request": "launch",
      "name": "Launch via NPM",
      "runtimeExecutable": "npm",
      "runtimeArgs": [
        "run-script",
        "debug"
      ],
      "port": 9229,
      "sourceMaps": true
    }
  ],
  "compounds": [
    {
      "name": "Compound",
      "configurations": ["Launch via NPM", "Launch Chrome"]
    }
  ]
}
```

## 起動方法

vscodeのデバッグメニューで「Compound」を選択しデバッグ開始

新たにchromeが起動され、その中でnuxtのプロジェクトが起動する

エディタ上でブレークポイントを張っているとエディタ上でブレークしてくれる

ソースコード上にdebuggerと記載しても可
