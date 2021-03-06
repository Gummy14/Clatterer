<template>
  <div class="page">
    <!-- Left Drawer -->
    <v-navigation-drawer
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
      >
      <v-list class="pt-0">
        <v-list-tile @click="editProfile = true">
          <v-list-tile-avatar class="profile-pic">
            <img :src="userProfilePicture">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>
              <h2 class="username">{{ user }}</h2>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list two-line>
          <v-subheader>Your Chats</v-subheader>
          <template>
            <div v-for="(chat, index) in allChatDocs.chats" :key="index">
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
            <v-btn flat @click="createNewChat = true">
              <font-awesome-icon icon="comments" class="paint-icon"/>
              Create New Chat
            </v-btn>
          </template>
        </v-list>
        <v-divider></v-divider>
        <v-btn flat @click="paintDialog = true">
          <font-awesome-icon icon="paint-brush" class="paint-icon"/>
          Select Toolbar Color
        </v-btn>
        <v-btn flat @click="logOut">
          <font-awesome-icon icon="sign-out-alt" class="logout-icon"/>
          Log Out
        </v-btn>
      </v-list>
    </v-navigation-drawer>

    <!-- Right Drawer -->
    <v-navigation-drawer v-if="this.$store.getters.currentActiveChat !== ''"
      right
      :clipped="clipped"
      v-model="chatOptions"
      enable-resize-watcher
      fixed
      app
      >
      <v-list class="pt-0">
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>
              <h2>Users In This Chatroom</h2>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
      </v-list>
      <div v-for="(user, index) in usersInChat" :key="index">
        <v-list-tile :key="user.id">
          <v-list-tile-content>
            <v-list-tile-title v-html="user"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </div>
      <v-btn flat @click="addNewUser = true">
        <font-awesome-icon icon="user-plus" class="paint-icon"/>
        Add User
      </v-btn>
    </v-navigation-drawer>

    <!-- Toolbar -->
    <v-toolbar class="toolbar" fixed app :clipped-left="clipped" :color="color">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>{{ activeChat }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="this.$store.getters.currentActiveChat !== ''" icon @click="chatOptions = !chatOptions">
        <v-icon>more_vert</v-icon>
      </v-btn>
    </v-toolbar>

    <!-- Chat Content -->
    <div>
      <div v-if="!activeChat" class="empty-page">
        <h1>No Chats Open</h1>
      </div>
      <div v-else id="container" class="mes-container">
        <div v-for="(texts, id) in messages" :key="id" class="message-holder">
          <v-card raised>
            <message-template v-on:newMessage="scrollToBottom()" 
              :user="texts.user" 
              :userProfilePicture="texts.userProfilePicture"
              :messageText="texts.messageText" 
              :imageUrl="texts.imageMessage" 
              :reacts="texts.reacts" 
              :timeStamp="texts.timeStamp" 
              :documentID="texts.id"></message-template>
          </v-card>
        </div>
      </div>
      <div class="message-container" v-if="this.$store.getters.currentActiveChat !== ''">
        <v-card raised hover class="message-enter">
          <messenger></messenger>
        </v-card>
      </div>
    </div>

    <!-- Dialog Boxes -->
    <v-dialog v-model="paintDialog" max-width="290">
      <color-selection v-on:colorPicked="setColor($event)"></color-selection>
    </v-dialog>
    <v-dialog v-model="createNewChat" width="475px">
      <chat-creator v-on:newChat="openNewChat($event)"></chat-creator>
    </v-dialog>
    <v-dialog v-model="editProfile" width="450px">
      <edit-profile v-on:updatedProfile="editProfile = false"></edit-profile>
    </v-dialog>
    <v-dialog v-model="addNewUser" width="450px" height="10vh">
      <add-new-user v-on:newUserAdded="addNewUser = false"></add-new-user>
    </v-dialog>
  </div>
</template>
<script>
import firebase from 'firebase'
import Messenger from './Messenger.vue'
import MessageTemplate from './MessageTemplate.vue'
import ColorSelection from './ColorSelection.vue'
import ChatCreator from './ChatCreator.vue'
import EditProfile from './EditProfile.vue'
import AddNewUser from './AddNewUser.vue'
import { db } from '../main'
export default {
  name: 'home',
  components: {
    Messenger,
    MessageTemplate,
    ColorSelection,
    ChatCreator,
    EditProfile,
    AddNewUser
  },
  data () {
    return {
      messages: [],
      allChatDocs: [],
      clipped: true,
      drawer: false,
      isMobile: false,
      color: 'purple darken-3',
      paintDialog: false,
      activeChat: '',
      createNewChat: false,
      isNewChat: false,
      editProfile: false,
      chatOptions: false,
      usersInChat: [],
      addNewUser: false
    }
  },
  mounted () {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      this.isMobile = true
    }
    this.$store.commit('setUserInfo', {
      Username: firebase.auth().currentUser.displayName,
      Email: firebase.auth().currentUser.email,
      UserPicture: firebase.auth().currentUser.photoURL
    })
    this.$store.commit('setActiveChat', {
      ActiveChat: ''
    })
    // get user chats
    var self = this
    db.collection('userInfo').doc(this.userEmail).onSnapshot(function (doc) {
      self.allChatDocs = doc.data()
      self.color = doc.data().barColor
    })
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
      this.$store.commit('setActiveChat', {
        ActiveChats: ''
      })
      firebase.auth().signOut().then(() => {
        this.$router.push('/')
      })
    },
    setColor ($event) {
      this.color = $event
      this.paintDialog = false
      db.collection('userInfo').doc(this.userEmail).update({barColor: this.color})
    },
    openChat (chatID) {
      this.createNewChat = false
      this.$store.commit('setActiveChat', {
        ActiveChat: chatID
      })
      this.activeChat = chatID
      this.getUsers(chatID)
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
      }).then(() => {
        this.openChat(chatID)
      })
    },
    getUsers (chatID) {
      var self = this
      db.collection('chats').doc(chatID).onSnapshot(function (doc) {
        self.usersInChat = doc.data().users
      })
    }
  },
  watch: {
    createNewChat (val) {
      this.$store.commit('setNoCreateChatProfilePicture', {
        NoChatAvatar: false
      })
      this.$store.commit('setNoCreateChatName', {
        NoChatName: false
      })
      if (val) {
        this.$store.commit('setIsCreateChatOpen', {
          IsCreateChatOpen: true
        })
      } else {
        this.$store.commit('setIsCreateChatOpen', {
          IsCreateChatOpen: false
        })
      }
    },
    addNewUser (val) {
      this.$store.commit('setUserToAddToChat', {
        UserToAddToChat: ''
      })
      if (val) {
        this.$store.commit('setIsAddNewUserOpen', {
          IsAddNewUserOpen: true
        })
      } else {
        this.$store.commit('setIsAddNewUserOpen', {
          IsAddNewUserOpen: false
        })
      }
    },
    editProfile (val) {
      if (val) {
        this.$store.commit('setIsEditProfileOpen', {
          IsEditProfileOpen: true
        })
      } else {
        this.$store.commit('setIsEditProfileOpen', {
          IsEditProfileOpen: false
        })
      }
    }
  },
  computed: {
    user () {
      return this.$store.getters.currentUsername
    },
    userProfilePicture () {
      return this.$store.getters.currentProfilePicture
    },
    userEmail () {
      return this.$store.getters.currentEmail
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
  bottom: 83px;
  width: 100%;
}
.message-container {
  position: absolute;
  display: flex;
  justify-content: left;
  min-height: 83px;
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
  margin: 2.5%;
}
.username {
  margin: -.5%;
}
.empty-page {
  display: flex;
  justify-content: center;
  margin-top: 10%;
}
.toolbar {
  padding-right: 0px !important;
}
</style>
