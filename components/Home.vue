<template>
    <div class="page">
      <v-navigation-drawer
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
      <v-list class="pt-0">
        <h2 class="username">{{ user }}</h2>
        <v-divider></v-divider>
          <v-list two-line>

            <v-subheader>Your Chats</v-subheader>
            <template>
              <div v-for="(chat, index) in allChatDocs" :key="index">
                <v-list-tile :key="chat.id" avatar @click="openChat(chat.id)">
                  <v-list-tile-avatar>
                    <img :src="chat.chatAvatar">
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title v-html="chat.id"></v-list-tile-title>
                    <v-list-tile-sub-title v-html="chat.subtitle"></v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
              </div>
              <v-btn flat @click="createNewChat = true"><font-awesome-icon icon="comments" class="paint-icon"/>Create New Chat</v-btn>
            </template>
 
          </v-list>
        <v-divider></v-divider>
        <v-btn flat @click="paintDialog = true"><font-awesome-icon icon="paint-brush" class="paint-icon"/>Select Toolbar Color</v-btn>
        <v-btn flat @click="logOut"><font-awesome-icon icon="sign-out-alt" class="logout-icon"/>Log Out</v-btn>
      </v-list>
    </v-navigation-drawer>
      <div class="toolbar">
        <v-toolbar fixed app :clipped-left="clipped" :color="color">
          <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
          <v-toolbar-title>{{ activeChat }}</v-toolbar-title>
        </v-toolbar>
      </div>
 
      <div>
        <div id="container" class="mes-container">
          <div v-for="(texts, id) in messages" :key="id" class="message-holder">
            <v-card raised>
              <message-template v-on:newMessage="scrollToBottom()" :user="texts.user" :messageText="texts.messageText" :imageUrl="texts.imageMessage" :reacts="texts.reacts" :timeStamp="texts.timeStamp" :documentID="texts.id"></message-template>
            </v-card>
          </div>
        </div>
        <div class="message-container">
          <v-card raised hover class="message-enter">
            <messenger></messenger>
          </v-card>
        </div>
      </div>
      <v-dialog v-model="paintDialog" max-width="290">
        <color-selection v-on:colorPicked="setColor($event)"></color-selection>
      </v-dialog>
      <v-dialog v-model="createNewChat" width="45vh">
        <chat-creator v-on:newChat="openNewChat($event)"></chat-creator>
      </v-dialog>
    </div>
</template>
<script>
import { firebase } from 'firebase'
import Messenger from './Messenger.vue'
import MessageTemplate from './MessageTemplate.vue'
import ColorSelection from './ColorSelection.vue'
import ChatCreator from './ChatCreator.vue'
import { db } from '../main'
export default {
  name: 'home',
  components: {
    Messenger,
    MessageTemplate,
    ColorSelection,
    ChatCreator
  },
  data () {
    return {
      messages: [],
      allChatDocs: '',
      clipped: true,
      drawer: false,
      isMobile: false,
      color: 'red darken-3',
      paintDialog: false,
      activeChat: 'No Chats Open',
      createNewChat: false,
      isNewChat: false
    }
  },
  firestore () {
    return {
      allChatDocs: db.collection('chats')
    }
  },
  mounted () {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      this.isMobile = true
    }
  },
  methods: {
    scrollToBottom () {
      if (this.isMobile) {
        window.scrollTo(0, document.body.scrollHeight)
      } else {
        var objDiv = document.getElementById('container')
        objDiv.scrollTop = objDiv.scrollHeight
      }
    },
    logOut () {
      this.$store.commit('setUser', {
        Username: '',
        Email: ''
      })
      firebase.auth().signOut().then(() => {
        this.$router.push('/')
      })
    },
    setColor ($event) {
      this.color = $event
      this.paintDialog = false
    },
    openChat (chatID) {
      this.createNewChat = false
      this.$store.commit('setActiveChat', {
        ActiveChat: chatID
      })
      this.activeChat = chatID
      this.$bind('messagesData', db.collection('chats').doc(this.activeChat).collection('messageData').orderBy('timeStamp'))
      .then((collection) => {
        this.messages = collection
        if (this.isNewChat) {
          db.collection('chats').doc(chatID).collection('messageData').doc('init').delete()
          this.isNewChat = false
        }
      })
      .catch((error) => {
        alert('Error:' + error + ', could not load data for ' + this.activeChat)
      })
    },
    openNewChat (chatID) {
      this.isNewChat = true
      db.collection('chats').doc(chatID).collection('messageData').doc('init').set({
        timeStamp: 'Sun Jul 14 1996 00:00:00 GMT-0400 (Eastern Daylight Time)'
      })
      this.openChat(chatID)
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
.mes-container {
  position: absolute;
  top: 0px;
  overflow-y: scroll;
  bottom: 95px;
  width: 100%;
}
.message-container {
  position: absolute;
  display: flex;
  justify-content: left;
  min-height: 95px;
  width: 100%;
  bottom: 0px;
}
.message-enter {
  width: 100vw;
  padding-top: 1.25vh;
}
.logout-icon {
  margin: 5%;
}
.paint-icon {
  margin: 2%;
}
.username {
  margin: 2%;
}
</style>
