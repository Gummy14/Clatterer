<template>
    <v-layout>
      <span class="message-enter">
        <input id="fileUploader" type="file" ref="fileInput" @change="getFile">
        <v-btn v-on:click="openFileDialogue()" flat icon><font-awesome-icon icon="plus-square"/></v-btn>
        <v-text-field v-model="messageText"></v-text-field>
        <v-btn v-on:click="sendMessage(messageText)">Send</v-btn>
      </span>
    </v-layout>
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
      image: null
    }
  },
  methods: {
    sendMessage (messageText) {
      var timeStamp = new Date()
      var imageMessage = this.imageUrl
      if (this.image != null) {
        storage.ref(timeStamp.toString()).put(this.image)
        this.image = null
        this.imageUrl = ''
      }
      db.collection('chats').add({ messageText, imageMessage, timeStamp })
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#fileUploader {
  display: none;
}
.message-enter {
  position: absolute;
  bottom: 0px;
  width: 100%;
  display: flex;
  padding-left: 2.5%;
  padding-right: 2%;
}
</style>
