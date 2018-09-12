<template>
    <div>
      <div v-for="(texts, id) in messages" :key="id" class="message-holder">
        <v-card raised>
          <message-template :messageText="texts.messageText" :imageUrl="texts.imageMessage"></message-template>
        </v-card>
      </div>
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
      messages: []
    }
  },
  firestore () {
    return {
      messages: db.collection('chats').orderBy('timeStamp')
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
</style>
