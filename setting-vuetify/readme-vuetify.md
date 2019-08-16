# 概要

2019/8/16 時点ではcreate-nuxt-appで作成したvuetifyは1.5が入る
※最新は2.0

2.0で追加された要素を使用するためには手動でmigrateする必要がある

# 手順

## 公式

https://github.com/nuxt-community/vuetify-module/blob/master/MIGRATION_GUIDE.md

## 手順

```
# ライブラリ削除
npm uninstall --save @nuxtjs/vuetify vuetify vuetify-loader node-sass sass-loader

# 最新版インストール
npm install --save-dev @nuxtjs/vuetify
```

### nuxt.config.js

* 以下をコメントアウト

// css: ['~/assets/style/app.styl'],

// plugins: ['@/plugins/vuetify']

* build内のtranspile、plugins、loadersをコメントアウト

  build: {
    // transpile: ['vuetify/lib'],
    // plugins: [new VuetifyLoaderPlugin()],
    // loaders: {
    //   stylus: {
    //     import: ['~assets/style/variables.styl']
    //   }
    // },

* 以下を追加

  devModules: ['@nuxtjs/vuetify'],
  vuetify: {
    theme: {
      dark: false
    }
  }

不要ファイル削除

```
rm assets/style/app.styl
rm assets/style/variables.styl
rm plugins/vuetify.js
```