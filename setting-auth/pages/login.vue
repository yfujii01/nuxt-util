<template>
  <div class="container">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 :class="{ shake: isShake }">
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title></v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form
                  ref="form"
                  v-model="valid"
                  lazy-validation
                  @keyup.native.enter="postLogin($event)"
                >
                  <v-text-field
                    v-model="user.username"
                    prepend-icon="person"
                    label="ID"
                    type="text"
                    :rules="[rules.required]"
                    autofocus
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    v-model="user.password"
                    prepend-icon="lock"
                    label="Password"
                    type="password"
                    :rules="[rules.required]"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  :loading="loadingLoginBtn"
                  :disabled="loadingLoginBtn"
                  color="primary"
                  @click="postLogin"
                  >Login</v-btn
                >
              </v-card-actions>
              <v-alert :value="errorMessage" type="error"
                >ユーザー名かパスワードが誤っています</v-alert
              >
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </div>
</template>

<script>
const API_URL = process.env.API_URL
export default {
  layout: 'simple',
  data() {
    return {
      isShake: false,
      valid: false,
      user: { username: 'root', password: 'password' },
      errorMessage: null,
      rules: {
        required: value => !!value || '必須です.'
      },
      loaderAct: null,
      loadingLoginBtn: false
    }
  },
  watch: {
    loaderAct() {
      const l = this.loaderAct
      this[l] = !this[l]
      this.loaderAct = null
    }
  },
  methods: {
    postLogin() {
      // バリデーションチェック
      if (!this.$refs.form.validate()) {
        this.shakeForm()
        return
      }
      // ローディング開始(ボタンの見た目変更)
      this.loaderAct = 'loadingLoginBtn'
      this.$axios
        .post(API_URL + '/login', this.user, {
          'Content-Type': 'application/json'
        })
        .then(response => {
          this.$store.commit('auth/setToken', response.headers.authorization)
          this.$router.push('/')
        })
        .catch(error => {
          this.errorMessage = error
          this.shakeForm()
          // ローディング終了(ボタンの見た目変更)
          this.loaderAct = 'loadingLoginBtn'
        })
    },
    shakeForm() {
      this.isShake = true
      setTimeout(() => {
        this.isShake = false
      }, 500)
    }
  }
}
</script>

<style scoped>
/* ログイン失敗時の振動↓ */
.shake {
  animation: kf_shake 0.4s 1 linear;
}
@keyframes kf_shake {
  0% {
    -webkit-transform: translate(30px);
  }
  20% {
    -webkit-transform: translate(-30px);
  }
  40% {
    -webkit-transform: translate(15px);
  }
  60% {
    -webkit-transform: translate(-15px);
  }
  80% {
    -webkit-transform: translate(8px);
  }
  100% {
    -webkit-transform: translate(0px);
  }
}
/* ログイン失敗時の振動↑ */
/* ローディング時のボタン↓ */
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
/* ローディング時のボタン↑ */
</style>
