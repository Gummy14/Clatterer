<template>
  <v-app dark class="body-page">
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  mounted () {
    if (!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
      document.documentElement.style.overflow = 'hidden'
    }
  }
}
</script>
<style scoped>
.body-page {
  overflow: hidden;
}
</style>
