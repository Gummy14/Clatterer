<template>
  <v-card>
    <v-card-title class="headline">Edit Your Profile</v-card-title>
    <v-list-tile class="new-chat">
      <v-list-tile-avatar v-if="imageUrl" class="avatar-prev">
        <img :src="imageUrl">
      </v-list-tile-avatar>
        <v-text-field class="chat-name" label="Username" placeholder=" " v-model="userName" @keypress.native.enter="saveChanges"></v-text-field>
    </v-list-tile>
      <input id="fileUploader" accept="image/*" type="file" ref="fileInput" @change="getFile">
      <v-btn :disabled="loading" class="select-avatar" v-on:click="openFileDialogue()">Choose an Avatar</v-btn>
      <v-btn :disabled="loading" class="create-new-chat" @click="saveChanges"><v-progress-circular indeterminate v-if="loading"></v-progress-circular>Save Changes</v-btn>
  </v-card>
</template>
<script>
import firebase from 'firebase'
import { db, storage } from '../main'
import { mapState } from 'vuex'
export default {
  name: 'edit-profile',
  data () {
    return {
      image: null,
      imageChanged: false,
      loading: false,
      userName: this.$store.getters.currentUsername,
      imageUrl: this.$store.getters.currentProfilePicture
    }
  },
  methods: {
    saveChanges () {
      if (this.userName !== '' && this.imageUrl !== '') {
        this.loading = true
        var timeStamp = firebase.firestore.FieldValue.serverTimestamp()
        var self = this
        firebase.auth().currentUser.updateProfile({displayName: this.userName}).then(() => {
          if (self.imageChanged) {
            storage.child('profilePics/' + timeStamp.toString()).put(this.image).then(fileData => {
              storage.child('profilePics/' + timeStamp.toString()).getDownloadURL().then(function (url) {
                firebase.auth().currentUser.updateProfile({photoURL: url}).then((data) => {
                  self.$store.commit('setUserPicture', {
                    UserPicture: url
                  })
                  self.$store.commit('setUserName', {
                    Username: self.userName
                  })
                  db.collection('userInfo').doc(self.$store.getters.currentEmail).update({
                    username: self.userName
                  })
                })
              })
            }).then(() => {
              this.image = null
              this.loading = false
              this.$emit('updatedProfile')
            })
          } else {
            self.$store.commit('setUserName', {
              Username: self.userName
            })
            db.collection('userInfo').doc(self.$store.getters.currentEmail).update({
              username: self.userName
            })
            this.loading = false
            this.$emit('updatedProfile')
          }
        })
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
      this.imageChanged = true
    }
  },
  computed: {
    ...mapState({isEditProfileOpen: 'isEditProfileOpen'})
  },
  watch: {
    isEditProfileOpen (val) {
      this.userName = this.$store.getters.currentUsername
      this.imageUrl = this.$store.getters.currentProfilePicture
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
