<template>
  <div class="container">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>ログアウトしました</v-toolbar-title>
              </v-toolbar>
              <v-card-actions class="justify-center">
                <v-btn color="primary" to="/login">ログイン画面へ</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </div>
</template>

<script>
export default {
  layout: 'simple',
  created() {
    this.$store.commit('auth/setToken', null)
  }
}
</script>
