<template>
    <v-card raised hover class="message-enter">
      <input id="fileUploader" type="file" ref="fileInput" @change="getFile">
      <v-btn v-on:click="openFileDialogue()" flat icon><font-awesome-icon icon="plus-square"/></v-btn>
      <v-text-field v-model="messageText"></v-text-field>
      <v-btn v-on:click="sendMessage(messageText)">Send</v-btn>
    </v-card>
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
  position: fixed;
  bottom: 0px;
  width: 96%;
  display: flex;
  padding-left: 2%;
  padding-right: 2%;
  padding-top: .5%;
  margin-bottom: 1%;
}
</style>
