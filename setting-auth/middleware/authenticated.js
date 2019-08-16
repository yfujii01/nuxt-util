export default function({ store, redirect }) {
  // tokenを持っていない場合、ログイン画面に飛ばす
  if (!store.state.auth.token) {
    return redirect('/login')
  }
  // tokenの有効期限が切れている場合、tokenを削除してログイン画面に飛ばす
  const exp = store.getters['auth/exp']

  // tokenの有効期限と1970年1月1日00:00:00(UTC)から現在時刻までの経過時間をミリ秒で表した数値を比較
  if (exp < new Date().getTime()) {
    // 有効期限切れ

    // tokenをクリア
    store.commit('auth/setToken', null)

    // ログイン画面にリダイレクト
    return redirect('/login')
  }
}
