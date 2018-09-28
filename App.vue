<template>
  <v-app dark>
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
</style>
