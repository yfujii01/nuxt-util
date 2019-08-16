export const getters = {
  token: state => state.token,
  /** 有効期限 */
  exp: state => {
    // tokenがnullの場合、nullを返却
    if (state.token == null) return null

    // tokenの要素を取得
    const base64Url = state.token.split('.')[1]

    // tokenをデコード
    const decodedValue = JSON.parse(window.atob(base64Url))

    // ミリ秒に直して返却
    // 利用箇所では1970年1月1日00:00:00(UTC)から現在時刻までの経過時間をミリ秒で表した数値と比較すること
    // (例) if (exp < new Date().getTime()) { // 有効期限切れ }
    return decodedValue.exp * 1000
  }
}
export const state = () => {
  return {
    token: null
  }
}
export const mutations = {
  setToken(state, token) {
    state.token = token
  }
}
