<template>
    <div>
      <div v-if="!isMobile" class="page">
        <h1 class="title">C L A T T E R E R</h1>
        <v-card raised hover class="login">
          <v-text-field v-model="email" placeholder=" " label="Email"></v-text-field>
          <v-text-field @keypress.native.enter="logIn" v-model="pass" placeholder=" " label="Password" type="password"></v-text-field>
          <v-btn @click="logIn">Log In</v-btn>
          <v-btn @click="createAccount" class="createAccount">Create An Account</v-btn>
          <v-alert :value ="didLogIn" :type="LogInResult" transition="scale-transition">{{ LogInMessage }}</v-alert>
        </v-card>
      </div>
      <div v-else class="page-mobile">
        <h1 class="title">C L A T T E R E R</h1>
        <v-card raised hover class="login">
          <v-text-field v-model="email" placeholder=" " label="Email"></v-text-field>
          <v-text-field @keypress.native.enter="logIn" v-model="pass" placeholder=" " label="Password" type="password"></v-text-field>
          <v-btn @click="logIn">Log In</v-btn>
          <v-btn @click="createAccount" class="createAccount">Create An Account</v-btn>
          <v-alert :value ="didLogIn" :type="LogInResult" transition="scale-transition">{{ LogInMessage }}</v-alert>
        </v-card>
      </div>
    </div>
</template>
<script>
import firebase from 'firebase'
import CreateAccount from './CreateAccount.vue'
export default {
  name: 'login',
  components: {
    CreateAccount
  },
  methods: {
    logIn () {
      if (this.email !== null && this.pass !== null) {
        firebase.auth().signInWithEmailAndPassword(this.email, this.pass)
        .then(() => {
          this.didLogIn = true
          this.LogInResult = 'success'
          this.LogInMessage = 'Log In Successful!'
          this.$store.commit('setUser', {
            Username: firebase.auth().currentUser.displayName,
            Email: firebase.auth().currentUser.email
          })
          this.$router.push('/home')
        })
        .catch(() => {
          this.didLogIn = true
          this.LogInResult = 'error'
          this.LogInMessage = 'Log In Failed'
        })
      } else {
        this.didLogIn = true
        this.LogInResult = 'error'
        this.LogInMessage = 'Log In Failed'
      }
    },
    createAccount () {
      this.$router.push('/createAccount')
    }
  },
  data () {
    return {
      isMobile: false,
      email: null,
      pass: null,
      didLogIn: false,
      LogInResult: null,
      LogInMessage: null
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
