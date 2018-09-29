<template>
    <div>
      <span class="name-and-react">
        <h3 class="user">Alex Helm
          <v-btn @click="dialogue = true" class="react-button" flat icon><font-awesome-icon class="react-button" icon="plus-circle"/></v-btn>
        </h3>
      </span>
        <h1 class="message">{{ messageText }}</h1>
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
    'messageText',
    'imageUrl',
    'timeStamp',
    'reacts',
    'documentID'
  ],
  mounted () {
    window.scrollTo(0, document.body.scrollHeight)
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
  max-width: 90%;
  padding-left: 1%;
  padding-bottom: 1%;
  display: flex;
  justify-content: center;
}
.user {
  padding-top: .25%;
  padding-left: .5%;
}
.message {
  padding-left: .5%;
}
.react-button {
  float: right;
}
.reaction {
    width: 32px;
    height: 32px;
    padding-top: .25%;
    padding-bottom: .25%;
    padding-left: .5%;
    margin-right: .25%;
}
</style>
