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
    document.documentElement.style.overflow = 'hidden'
  }
}
</script>
<style scoped>
.body-page {
  overflow: hidden;
}
</style>
