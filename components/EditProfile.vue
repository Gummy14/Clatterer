<template>
  <v-card>
    <v-card-title class="headline">Edit Your Profile</v-card-title>
    <v-list-tile class="new-chat">
      <v-list-tile-avatar v-if="imageUrl" class="avatar-prev">
        <img :src="imageUrl">
      </v-list-tile-avatar>
        <v-text-field class="chat-name" label="Username" placeholder=" " v-model="userName" @keypress.native.enter="createNewRoom"></v-text-field>
    </v-list-tile>
      <input id="fileUploader" accept="image/*" type="file" ref="fileInput" @change="getFile">
      <v-btn :disabled="loading" class="select-avatar" v-on:click="openFileDialogue()">Choose an Avatar</v-btn>
      <v-btn :disabled="loading" class="create-new-chat" @click="saveChanges"><v-progress-circular indeterminate v-if="loading"></v-progress-circular>Save Changes</v-btn>
  </v-card>
</template>
<script>
import firebase from 'firebase'
import { storage } from '../main'
export default {
  name: 'edit-profile',
  data () {
    return {
      chatName: '',
      imageUrl: '',
      image: null,
      userName: '',
      loading: false
    }
  },
  methods: {
    saveChanges () {
      this.loading = true
      var timeStamp = new Date()
      var self = this
      firebase.auth().currentUser.updateProfile({displayName: this.userName}).then(() => {
        storage.child('profilePics/' + timeStamp.toString()).put(this.image).then(fileData => {
          storage.child('profilePics/' + timeStamp.toString()).getDownloadURL().then(function (url) {
            firebase.auth().currentUser.updateProfile({photoURL: url}).then((data) => {
              self.$store.commit('setUserPicture', {
                UserPicture: url
              })
              self.$store.commit('setUserName', {
                Username: self.userName
              })
            })
          })
        }).then(() => {
          this.image = null
          this.imageUrl = ''
          this.userName = ''
          this.loading = true
          this.$emit('updatedProfile')
        })
      })
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
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#fileUploader {
  display: none;
}
</style>
