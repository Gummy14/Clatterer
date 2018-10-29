<template>
  <v-card>
    <v-card-title class="headline">Create a New Chatroom</v-card-title>
    <v-list-tile class="new-chat">
      <v-list-tile-avatar v-if="imageUrl" class="avatar-prev">
        <img :src="imageUrl">
      </v-list-tile-avatar>
        <v-text-field class="chat-name" label="Chat Name" placeholder=" " v-model="chatName" @keypress.native.enter="createNewRoom"></v-text-field>
    </v-list-tile>
    <input id="fileUploader" accept="image/*" type="file" ref="fileInput" @change="getFile">
    <span>
      <v-btn class="select-avatar" v-on:click="openFileDialogue()">Select a Chat Avatar</v-btn>
      <v-btn class="create-new-chat" @click="createNewRoom">Create New Chatroom</v-btn>
    </span>
  </v-card>
</template>
<script>
import { db, storage } from '../main'
export default {
  name: 'chat-creator',
  data () {
    return {
      chatName: '',
      imageUrl: '',
      image: null
    }
  },
  methods: {
    createNewRoom () {
      var timeStamp = new Date()
      var chatID = this.chatName
      storage.child('chatAvatars/' + timeStamp.toString()).put(this.image).then(fileData => {
        storage.child('chatAvatars/' + timeStamp.toString()).getDownloadURL().then(function (url) {
          db.collection('chats').doc(chatID).set({
            chatAvatar: url
          })
        })
      }).then(() => {
        this.image = null
        this.imageUrl = ''
        this.chatName = ''
      })
      this.$emit('newChat', this.chatName)
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
.chat-name {
  width: 100%;
}
.select-avatar {
}
.create-new-chat {
  float: right;
}
</style>
