<template>
    <div>
        <v-text-field label="username"></v-text-field>
        <v-text-field label="password" type="password"></v-text-field>
        <v-btn @click="logIn">Log In</v-btn>
    </div>
</template>
<script>
export default {
  name: 'login',
  methods: {
    logIn () {
      this.$router.push('/home')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
