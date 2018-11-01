<template>
    <div>
      <div v-if="!isMobile" class="page">
        <h1 class="title">C L A T T E R E R</h1>
        <v-card raised hover class="login">
          <v-list-tile-avatar v-if="imageUrl" class="profile-pic">
            <img :src="imageUrl">
          </v-list-tile-avatar>
          <v-text-field v-model="email" placeholder=" " label="Enter An Email"></v-text-field>
          <v-text-field v-model="user" placeholder=" " label="Enter A Username"></v-text-field>
          <v-text-field v-model="pass" placeholder=" " label="Enter A Password" type="password"></v-text-field>
          <v-text-field v-model="passConfirm" placeholder=" " label="Confirm Your Password" type="password"></v-text-field>
          <v-btn @click="createAccountInfo(email, pass, passConfirm)">Confirm</v-btn>
          <input id="fileUploader" accept="image/*" type="file" ref="fileInput" @change="getFile">
          <v-btn v-on:click="openFileDialogue()">Select A Profile Picture</v-btn>
          <v-alert :value ="arePasswordsDifferent" type="error" transition="scale-transition">Passwords do not match</v-alert>
        </v-card>
      </div>
      <div v-else class="page-mobile">
        <h1 class="title">C L A T T E R E R</h1>
        <v-card raised hover class="login">
          <v-list-tile-avatar v-if="imageUrl" class="profile-pic">
            <img :src="imageUrl">
          </v-list-tile-avatar>
          <v-text-field v-model="email" placeholder=" " label="Enter An Email"></v-text-field>
          <v-text-field v-model="user" placeholder=" " label="Enter A Username"></v-text-field>
          <v-text-field v-model="pass" placeholder=" " label="Enter A Password" type="password"></v-text-field>
          <v-text-field v-model="passConfirm" placeholder=" " label="Confirm Your Password" type="password"></v-text-field>
          <v-btn @click="createAccountInfo(email, pass, passConfirm)">Confirm</v-btn>
          <input id="fileUploader" accept="image/*" type="file" ref="fileInput" @change="getFile">
          <v-btn v-on:click="openFileDialogue()">Select A Profile Picture</v-btn>
          <v-alert :value ="arePasswordsDifferent" type="error" transition="scale-transition">Passwords do not match</v-alert>
        </v-card>
      </div>
    </div>
</template>
<script>
import firebase from 'firebase'
import { storage } from '../main'
export default {
  name: 'create-account',
  data () {
    return {
      isMobile: false,
      email: null,
      user: null,
      pass: null,
      passConfirm: null,
      arePasswordsDifferent: false,
      imageUrl: '',
      image: null
    }
  },
  methods: {
    createAccountInfo (email, pass, passConfirm) {
      if (pass === passConfirm) {
        var timeStamp = new Date()
        var self = this
        firebase.auth().createUserWithEmailAndPassword(email, pass).then(() => {
          firebase.auth().currentUser.updateProfile({displayName: this.user}).then(() => {
            this.$store.commit('setUser', {
              Username: this.user,
              Email: this.email
            })
            storage.child('profilePics/' + timeStamp.toString()).put(this.image).then(fileData => {
              storage.child('profilePics/' + timeStamp.toString()).getDownloadURL().then(function (url) {
                firebase.auth().currentUser.updateProfile({photoURL: url}).then((data) => {
                  self.$store.commit('setUserPicture', {
                    UserPicture: url
                  })
                })
              })
            }).then(() => {
              this.image = null
              this.imageUrl = ''
            })
            alert('Account has been created!')
            this.$router.push('/home')
          })
        })
      } else {
        this.arePasswordsDifferent = true
      }
    },
    openFileDialogue () {
      this.$refs.fileInput.click()
    },
    getFile (event) {
      const file = event.target.files
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result
      })
      fileReader.readAsDataURL(file[0])
      this.image = file[0]
      this.imageSelected = true
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
#fileUploader {
  display: none;
}
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
.profile-pic {
  display: flex;
  justify-content: center;
}
</style>
