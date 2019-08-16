# 手動で行う作業

1. レイアウトにミドルウェア追加
layouts/default.vue
  middleware: 'authenticated',
  を追加する

2. 依存関係追加
npm install --save vuex-persistedstate

3. 設定ファイル修正
nuxt.config.jsに以下の設定を追加

,env: { API_URL: process.env.API_URL || 'http://localhost:8080' }

4. このファイルを削除する
rm readme-setting-auth.md