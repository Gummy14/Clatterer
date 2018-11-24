<template>
  <v-card>
    <v-card-title class="headline">Add a User to this Chat</v-card-title>
    <v-list>
    <v-list-tile class="new-chat">
      <v-combobox :items="userEmails" @change="selection = $event" @keypress.native.enter="addUser"></v-combobox>
      <v-btn @click="addUser">Add</v-btn>
    </v-list-tile>
    </v-list>
  </v-card>
</template>
<script>
import { db } from '../main'
export default {
  name: 'add-new-user',
  data () {
    return {
      allUsers: [],
      selection: ''
    }
  },
  firestore () {
    return {
      allUsers: db.collection('userInfo')
    }
  },
  computed: {
    userEmails () {
      var userList = []
      for (var i = 0; i < this.allUsers.length; i++) {
        userList[i] = this.allUsers[i].id
      }
      return userList
    }
  },
  methods: {
    addUser () {
      if (this.selection != null) {
        var self = this
        var userSelection = this.selection
        var docChatAvatar
        var docCreatedOn
        var docUsers
        var userChats
        db.collection('chats').doc(self.$store.getters.currentActiveChat).get().then((doc) => {
          docChatAvatar = doc.data().chatAvatar
          docCreatedOn = doc.data().createdOn
          docUsers = doc.data().users
          docUsers.push(userSelection)
          db.collection('chats').doc(self.$store.getters.currentActiveChat).update({
            users: docUsers
          }).then(() => {
            db.collection('userInfo').doc(userSelection).get()
            .then((doc) => {
              userChats = doc.data().chats
              userChats.push({id: self.$store.getters.currentActiveChat, chatAvatar: docChatAvatar, createdOn: docCreatedOn})
              db.collection('userInfo').doc(userSelection).update({
                chats: userChats
              }).then(() => {
                this.$emit('newUserAdded')
              })
            })
          })
        })
      }
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
