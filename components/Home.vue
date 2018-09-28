<template>
    <div>
      <div class="toolbar">
        <v-toolbar fixed app:clipped-left="clipped" color="purple darken-3">
          <v-toolbar-title v-text="title"></v-toolbar-title>
        </v-toolbar>
    </div>
      <v-container class="mes-container">
      <br>
      <br>
      <div v-for="(texts, id) in messages" :key="id" class="message-holder">
        <v-card raised>
          <message-template :messageText="texts.messageText" :imageUrl="texts.imageMessage" :reacts="texts.reacts" :timeStamp="texts.timeStamp" :documentID="texts.id"></message-template>
        </v-card>
      </div>
      <br>
      <br>
      <br>
      </v-container>
      <div class="message-container">
        <messenger></messenger>
      </div>
    </div>
</template>
<script>
import Messenger from './Messenger.vue'
import MessageTemplate from './MessageTemplate.vue'
import { db } from '../main'
export default {
  name: 'home',
  components: {
    Messenger,
    MessageTemplate
  },
  data () {
    return {
      messages: [],
      title: 'Clatterer'
    }
  },
  firestore () {
    return {
      messages: db.collection('chats').doc('chat 1').collection('messageData').orderBy('timeStamp')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.message-holder {
  padding-left: 3%;
  padding-right: 3%;
  padding-bottom: 1%;
}
.message-container {
  display: flex;
  justify-content: center;
}
.toolbar {
  padding-bottom: 2%;
}
</style>
