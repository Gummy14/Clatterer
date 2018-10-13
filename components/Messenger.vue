<template>
    <span class="messenger">
      <input id="fileUploader" type="file" ref="fileInput" @change="getFile">
      <v-btn v-on:click="openFileDialogue()" flat icon><font-awesome-icon icon="plus-square"/></v-btn>
      <v-text-field v-model="messageText"></v-text-field>
      <v-btn v-on:click="sendMessage(messageText, reacts)">Send</v-btn>
    </span>
</template>
<script>
import { db, storage } from '../main'
export default {
  name: 'messenger',
  data () {
    return {
      message: [],
      messageText: '',
      imageUrl: '',
      image: null,
      reacts: []
    }
  },
  methods: {
    sendMessage (messageText, reacts) {
      var user = this.user
      var timeStamp = new Date()
      var imageMessage = this.imageUrl
      if (this.image != null) {
        storage.child('uploadedImages/' + timeStamp.toString()).put(this.image)
        this.image = null
        this.imageUrl = ''
      }
      db.collection('chats').doc('chat 1').collection('messageData').add({ user, messageText, imageMessage, timeStamp, reacts })
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
    }
  },
  computed: {
    user () {
      return this.$store.getters.currentUser
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#fileUploader {
  display: none;
}
.messenger {
  display: flex;
}
</style>
