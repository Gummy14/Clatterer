<template>
  <v-card class="card">
    <v-card-title class="headline">Create a New Chatroom</v-card-title>
    <v-list-tile class="new-chat">
      <v-list-tile-avatar v-if="imageUrl" class="avatar-prev">
        <img :src="imageUrl">
      </v-list-tile-avatar>
      <v-form ref="form" lazy-validation class="chat-name">
        <v-text-field :rules="[rules.required]" required label="Chat Name" placeholder=" " v-model="chatName" @keypress.native.enter="createNewRoom"></v-text-field>
      </v-form>
    </v-list-tile>
    <input id="fileUploader" accept="image/*" type="file" ref="fileInput" @change="getFile">
    <span>
      <v-btn class="select-avatar" v-on:click="openFileDialogue()">Select a Chat Avatar</v-btn>
      <v-btn class="create-new-chat" @click="createNewRoom" :disabled="loading"><v-progress-circular indeterminate v-if="loading"></v-progress-circular>Create New Chatroom</v-btn>
    </span>
    <v-alert class="alert" :value ="$store.getters.currentNoCreateChatProfilePicture" type="error" transition="scale-transition">No Chat Avatar Selected</v-alert>
  </v-card>
</template>
<script>
import { db, storage } from '../main'
import { mapState } from 'vuex'
export default {
  name: 'chat-creator',
  data () {
    return {
      loading: false,
      rules: {
        required: val => !!val || 'Required'
      },
      chatName: '',
      imageUrl: '',
      image: ''
    }
  },
  methods: {
    createNewRoom () {
      if (this.$refs.form.validate() && this.imageUrl !== '') {
        var timeStamp = new Date()
        var chatID = this.chatName
        var self = this
        var avatarUrl = ''
        this.loading = true
        storage.child('chatAvatars/' + timeStamp.toString()).put(this.image).then(fileData => {
          storage.child('chatAvatars/' + timeStamp.toString()).getDownloadURL().then(function (url) {
            avatarUrl = url
            db.collection('chats').doc(chatID).set({
              chatAvatar: url,
              users: [self.userName]
            }).then(() => {
              db.collection('userInfo').doc(self.userEmail).get()
              .then((doc) => {
                var userChats = doc.data().chats
                userChats.push({id: chatID, chatAvatar: avatarUrl})
                db.collection('userInfo').doc(self.userEmail).update({
                  chats: userChats
                })
              })
            })
          })
        }).then(() => {
          this.loading = false
          this.$emit('newChat', chatID)
        })
      } else {
        if (this.imageUrl === '') {
          this.$store.commit('setNoCreateChatProfilePicture', {
            NoChatAvatar: true
          })
        }
        if (this.imageUrl === '') {
          this.$store.commit('setNoCreateChatName', {
            NoChatName: true
          })
        }
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
      this.$store.commit('setNoCreateChatProfilePicture', {
        NoChatAvatar: false
      })
    }
  },
  computed: {
    ...mapState({isCreateChatOpen: 'isCreateChatOpen'}, {noCreateChatProfilePicture: 'noCreateChatProfilePicture'}),
    userEmail () {
      return this.$store.getters.currentEmail
    },
    userName () {
      return this.$store.getters.currentUsername
    },
    noChatName () {
      return this.$store.getters.currentNoCreateChatName
    }
  },
  watch: {
    isCreateChatOpen (val) {
      this.$refs.form.reset()
      this.imageUrl = ''
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#fileUploader {
  display: none;
}
.card {
  height: 100%;
}
.chat-name {
  width: 100%;
}
.select-avatar {
  margin: 2.5%;
  margin-top: 3%;
}
.create-new-chat {
  margin: 2.5%;
  margin-top: 3%;
}
.alert {
  margin: 2.5%;
  margin-top: 2%;
}
</style>
