<template>
    <v-layout>
      <span class="message-enter">
        <input id="fileUploader" type="file" ref="fileInput">
        <v-btn v-on:click="openFileDialogue()" flat icon><font-awesome-icon icon="plus-square"/></v-btn>
        <v-text-field v-model="messageText"></v-text-field>
        <v-btn v-on:click="sendMessage(messageText)">Send</v-btn>
      </span>
    </v-layout>
</template>
<script>
import { db } from '../main'
export default {
  name: 'messenger',
  data () {
    return {
      message: [],
      messageText: ''
    }
  },
  methods: {
    sendMessage (messageText) {
      var TimeStamp = new Date()
      db.collection('chats').add({ messageText, TimeStamp })
    },
    openFileDialogue () {
      this.$refs.fileInput.click()
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
