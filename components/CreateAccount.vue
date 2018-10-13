<template>
    <div>
      <div v-if="!isMobile" class="page">
        <h1 class="title">C L A T T E R E R</h1>
        <v-card raised hover class="login">
          <v-text-field v-model="user" placeholder=" " label="Enter An Email"></v-text-field>
          <v-text-field v-model="pass" placeholder=" " label="Enter A Password" type="password"></v-text-field>
          <v-text-field v-model="passConfirm" placeholder=" " label="Confirm Your Password" type="password"></v-text-field>
          <v-btn @click="createAccountInfo(user, pass, passConfirm)">Confirm</v-btn>
          <v-alert :value ="arePasswordsDifferent" :type="error" transition="scale-transition">Passwords do not match</v-alert>
        </v-card>
      </div>
      <div v-else class="page-mobile">
        <h1 class="title">C L A T T E R E R</h1>
        <v-card raised hover class="login">
          <v-text-field v-model="user" placeholder=" " label="Enter An Email"></v-text-field>
          <v-text-field v-model="pass" placeholder=" " label="Enter A Password" type="password"></v-text-field>
          <v-text-field v-model="passConfirm" placeholder=" " label="Confirm Your Password" type="password"></v-text-field>
          <v-btn @click="createAccountInfo(user, pass, passConfirm)">Confirm</v-btn>
          <v-alert :value ="arePasswordsDifferent" :type="error" transition="scale-transition">Passwords do not match</v-alert>
        </v-card>
      </div>
    </div>
</template>
<script>
import firebase from 'firebase'
export default {
  name: 'create-account',
  data () {
    return {
      isMobile: false,
      user: null,
      pass: null,
      passConfirm: false,
      arePasswordsDifferent: false
    }
  },
  methods: {
    createAccountInfo (user, pass, passConfirm) {
      if (pass === passConfirm) {
        firebase.auth().createUserWithEmailAndPassword(user, pass).then(() => {
          alert('Account has been created!')
          this.$router.push('/home')
        })
      } else {
        this.arePasswordsDifferent = true
      }
    }
  },
  mounted () {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      this.isMobile = true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login {
  width: 100%;
  padding: 2%;
}
.createAccount {
  float: right;
}
.title {
  padding-bottom: 2%;
}
.page {
  padding-top: 1%;
  max-width: 500px;
  width: 50%;
  margin: auto;
  justify-content: center;
}
.page-mobile {
  padding-top: 1%;
  min-width: 90%;
  width: 50%;
  margin: auto;
  justify-content: center;
}
</style>
