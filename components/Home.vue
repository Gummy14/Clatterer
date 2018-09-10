<template>
    <div>
      <div v-for="(texts, id) in messages" :key="id">
        <message-template :messageText="texts.messageText" :imageUrl="texts.imageMessage"></message-template>
      </div>
        <messenger></messenger>
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
.message-enter {
  position: absolute;
  bottom: 0px;
  width: 100%;
  display: flex;
  padding-left: 2.5%;
  padding-right: 2%;
}
</style>
