<template>
  <v-card>
    <v-card-title class="headline">Add a User to this Chat</v-card-title>
    <v-list>
    <v-list-tile class="new-chat">
      <v-combobox 
      @keypress.native.enter="addUser" 
      v-model="userSelection" 
      :items="userList"
      item-text="username"
      item-value="id"
      @change="setSelection($event)"
      >
      </v-combobox>
      <v-btn @click="addUser" :disabled="loading || this.$store.getters.currentUserToAddToChat === ''"><v-progress-circular indeterminate v-if="loading"></v-progress-circular>Add</v-btn>
    </v-list-tile>
    </v-list>
  </v-card>
</template>
<script>
import { db } from '../main'
import { mapState } from 'vuex'
export default {
  name: 'add-new-user',
  data () {
    return {
      allUsers: [],
      loading: false,
      userSelection: null,
      selectedUserEmail: '',
      selectedUserName: ''
    }
  },
  firestore () {
    return {
      allUsers: db.collection('userInfo')
    }
  },
  computed: {
    ...mapState({isAddNewUserOpen: 'isAddNewUserOpen'}),
    userList () {
      var userList = []
      for (var i = 0; i < this.allUsers.length; i++) {
        userList[i] = this.allUsers[i]
      }
      return userList
    }
  },
  watch: {
    isAddNewUserOpen (val) {
      this.userSelection = null
    }
  },
  methods: {
    setSelection (selection) {
      selection !== null ? this.selectedUserEmail = selection.id : this.selectedUserEmail = ''
      selection !== null ? this.selectedUserName = selection.username : this.selectedUserName = ''
      this.$store.commit('setUserToAddToChat', {
        UserToAddToChat: selection
      })
    },
    addUser () {
      if (this.$store.getters.currentUserToAddToChat !== '') {
        this.loading = true
        var self = this
        var userSelectionEmail = this.selectedUserEmail
        var userSelectionName = this.selectedUserName
        var docChatAvatar
        var docUsers
        var userChats
        db.collection('chats').doc(self.$store.getters.currentActiveChat).get().then((doc) => {
          docChatAvatar = doc.data().chatAvatar
          docUsers = doc.data().users
          docUsers.push(userSelectionName)
          db.collection('chats').doc(self.$store.getters.currentActiveChat).update({
            users: docUsers
          }).then(() => {
            db.collection('userInfo').doc(userSelectionEmail).get()
            .then((doc) => {
              userChats = doc.data().chats
              userChats.push({id: self.$store.getters.currentActiveChat, chatAvatar: docChatAvatar})
              db.collection('userInfo').doc(userSelectionEmail).update({
                chats: userChats
              }).then(() => {
                this.loading = false
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
