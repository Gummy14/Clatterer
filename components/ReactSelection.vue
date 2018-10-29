<template>
    <v-card>
      <div v-for="(reactions, id) in reactDocInFirebaseStorage" :key="id">
        <div v-for="reactIcons in reactions.customReacts" :key="reactIcons" class="react-holder">
          <v-btn flat class="react-button" v-on:click="closeDialogueBox(reactIcons)"><img class="react-icon" :src="reactIcons"></v-btn>
        </div>
      </div>
      <v-spacer></v-spacer>
      <input id="fileUploader" accept="image/*" type="file" ref="fileInput" @change="getFile">
      <v-btn v-on:click="openFileDialogue()">Add React</v-btn>
    </v-card>
</template>
<script>
import { db, storage } from '../main'
export default {
  name: 'react-selection',
  methods: {
    closeDialogueBox (selectedReaction) {
      this.reacts.push(selectedReaction)
      db.collection('chats').doc(this.$store.getters.currentActiveChat).collection('messageData').doc(this.documentID).update({reacts: this.reacts})
      this.$emit('closeDialogueBox')
    },
    openFileDialogue () {
      this.$refs.fileInput.click()
    },
    getFile (event) {
      const file = event.target.files
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.addedReactUrl = fileReader.result
      })
      fileReader.readAsDataURL(file[0])
      this.addedReact = file[0]
      this.addReact()
    },
    addReact () {
      var timeStamp = new Date()
      var reactDoc = this.reactDocInFirebaseStorage
      var updateReactDoc = this.updatedReacts
      var activeChat = this.$store.getters.currentActiveChat
      storage.child('reactIcons/' + timeStamp.toString()).put(this.addedReact).then(fileData => {
        storage.child('reactIcons/' + timeStamp.toString()).getDownloadURL().then(function (url) {
          reactDoc.forEach(CustomReacts => {
            CustomReacts.customReacts.push(url)
            updateReactDoc = CustomReacts.customReacts
          })
          db.collection('chats').doc(activeChat).collection('reactIcons').doc('CustomReacts').set({customReacts: updateReactDoc})
        })
      }).then(() => {
        this.addedReact = null
        this.addedReactUrl = ''
      })
    }
  },
  data () {
    return {
      reactDocInFirebaseStorage: [],
      updatedReacts: [],
      addedReactUrl: '',
      addedReact: null
    }
  },
  props: [
    'timeStamp',
    'documentID',
    'reacts'
  ],
  firestore () {
    return {
      reactDocInFirebaseStorage: db.collection('chats').doc(this.$store.getters.currentActiveChat).collection('reactIcons')
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#fileUploader {
  display: none;
}
.react-icon {
    max-height: 32px;
}
.react-holder {
  max-height: 290px;
  overflow: auto;
}
</style>
