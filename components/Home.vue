<template>
    <div>
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
      <div v-for="(texts, id) in messages" :key="id" class="message-holder">
        <v-card raised>
          <message-template :messageText="texts.messageText" :imageUrl="texts.imageMessage" :reacts="texts.reacts" :timeStamp="texts.timeStamp" :documentID="texts.id"></message-template>
        </v-card>
      </div>
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
  padding-left: 3%;
  padding-right: 3%;
  padding-bottom: 1%;
}
.message-container {
  background-image:rgba(0, 0, 0, 0.5);
  opacity: 0%;
  position: relative;
  bottom: 0px;
  display: flex;
  justify-content: center;
}
.mes-container {
  height: 106ex;
  overflow-y: scroll;
}
.toolbar {
  padding-bottom: 2%;
}
.message-enter {
  margin-bottom: 1.25%;
  width: 96%;
}
</style>
