<template>
    <div class="page">
      <v-navigation-drawer
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
    </v-navigation-drawer>
      <div class="toolbar">
        <v-toolbar fixed app :clipped-left="clipped" color="purple darken-3">
          <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
          <v-toolbar-title v-text="title"></v-toolbar-title>
        </v-toolbar>
      </div>
      <div class="mes-container">
      <br>
      <div v-for="(texts, id) in messages" :key="id" class="message-holder">
        <v-card raised>
          <message-template :messageText="texts.messageText" :imageUrl="texts.imageMessage" :reacts="texts.reacts" :timeStamp="texts.timeStamp" :documentID="texts.id"></message-template>
        </v-card>
      </div>
      <br>
      <br>
      <br>
      <br>
      <br>
      </div>
      <div class="message-container">
        <v-card raised hover class="message-enter">
          <messenger></messenger>
        </v-card>
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
      title: 'Clatterer',
      clipped: true,
      drawer: true
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
  z-index: 2;
  padding-left: 3%;
  padding-right: 3%;
  padding-bottom: 1%;
}
.message-container {
  z-index: 1;
  position: relative;
  bottom: 0px;
  display: flex;
  justify-content: center;
}
.mes-container {
  transform: translateY(7vh);
  height: 94vh;
  overflow-y: scroll;
}
.message-enter {
  z-index: -1;
  width: 96%;
  bottom: 4vh;
}
</style>
