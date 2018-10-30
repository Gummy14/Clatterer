<template>
  <div>
    <v-list-tile class="name-and-react">
      <v-list-tile-avatar class="profile-pic">
        <img src="https://scontent-ort2-1.xx.fbcdn.net/v/t1.0-9/18222629_1355229234556850_5220608942535705447_n.jpg?_nc_cat=108&_nc_ht=scontent-ort2-1.xx&oh=dc05c79449f0d9580412031bed446484&oe=5C7B6AF8">
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title bold class="user"><h3>{{ user }}</h3></v-list-tile-title>
      </v-list-tile-content>
       <v-btn @click="dialogue = true" class="react-button" flat icon><font-awesome-icon class="react-button" icon="plus-circle"/></v-btn>
    </v-list-tile>
    <div class="message-area">
      <p class="message">{{ messageText }}</p>
      <div class="image-container">
        <img class="image-style" :src="imageUrl">
      </div>
      <span v-for="(reactIcons, id) in reacts" :key="id">
        <img class="reaction" :src="reactIcons">
      </span>
      <v-dialog v-model="dialogue" max-width="290">
        <v-card>
          <v-card-title class="headline">React Select</v-card-title>
          <react-selection v-on:closeDialogueBox="closeDialogueBox()" :timeStamp="this.timeStamp" :documentID="this.documentID" :reacts="this.reacts"></react-selection>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>
<script>
import ReactSelection from './ReactSelection.vue'
export default {
  name: 'message-template',
  components: {
    ReactSelection
  },
  data () {
    return {
      dialogue: false,
      messageTimeStamp: null
    }
  },
  props: [
    'user',
    'messageText',
    'imageUrl',
    'timeStamp',
    'reacts',
    'documentID'
  ],
  mounted () {
    this.$emit('newMessage')
    this.messageTimeStamp = this.timeStamp
  },
  methods: {
    closeDialogueBox () {
      this.dialogue = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.image-container {
  max-height: 100%;
  max-width: 100%;
}
.image-style {
  max-width: 50%;
  padding-left: .1%;
  padding-bottom: 1%;
  display: flex;
  justify-content: center;
}
.react-button {
  float: right;
}
.reaction {
  margin-top: -12px;
  max-height: 32px;
  margin-right: 1%;
}
.profile-pic {
  margin-left: -10px;
}
.name-and-react {

}
.message-area {
  margin-left: 63px;
  margin-top: -12px;
}
</style>
