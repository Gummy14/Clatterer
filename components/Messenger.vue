<template>
    <div>
      <v-dialog v-model="imageSelected" class="image-dialog" max-width="50vh">
        <v-card>
          <img class="image-prev" :src="imageUrl">
          <span class="messenger-dialog">
            <v-text-field counter="250" maxlength="250" @keypress.native.enter="enterPress(messageTextDialog)" v-model="messageTextDialog"></v-text-field>
            <v-btn v-on:click="sendMessage(messageTextDialog, reacts)">Send</v-btn>
          </span>
        </v-card>
      </v-dialog>
      <span class="messenger">
        <input id="fileUploader" accept="image/jpg, image/jpeg, image/png" type="file" ref="fileInput" @change="getFile">
        <v-btn v-on:click="openFileDialogue()" flat icon><font-awesome-icon icon="plus-square"/></v-btn>
        <v-text-field counter="250" maxlength="250" @keypress.native.enter="enterPress(messageText)" v-model="messageText"></v-text-field>
        <v-btn v-on:click="sendMessage(messageText, reacts)">Send</v-btn>
      </span>
    </div>
</template>
<script>
import { db, storage } from '../main'
export default {
  name: 'messenger',
  data () {
    return {
      message: [],
      messageText: '',
      messageTextDialog: '',
      imageUrl: '',
      image: null,
      reacts: [],
      imageSelected: false
    }
  },
  methods: {
    enterPress (message) {
      this.sendMessage(message, this.reacts)
    },
    sendMessage (messageText, reacts) {
      if (this.messageText !== '') {
        this.imageSelected = false
        this.messageText = ''
        this.messageTextDialog = ''
        var user = this.user
        var timeStamp = new Date()
        let imageMessage = this.imageUrl
        if (this.image != null) {
          storage.child('uploadedImages/' + timeStamp.toString()).put(this.image)
          this.image = null
          this.imageUrl = ''
        }
        db.collection('chats').doc('chat 1').collection('messageData').add({ user, messageText, imageMessage, timeStamp, reacts })
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
  computed: {
    user () {
      return this.$store.getters.currentUsername
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
.image-prev {
  max-width: 50vh;
  max-height: 50vh;
  display: block;
  margin: auto;
  padding: 2%;
}
.image-dialog {
  max-width: 50%;
}
.messenger-dialog {
  display: flex;
  padding-left: 2.5%;
  padding-bottom: 2%;
}
</style>
