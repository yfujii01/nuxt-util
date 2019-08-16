<template>
  <div>
    <HeaderComponent />
    <nuxt />
  </div>
</template>
<script>
import HeaderComponent from '~/components/Header.vue'

export default {
  components: {
    HeaderComponent
  }
}
</script>
