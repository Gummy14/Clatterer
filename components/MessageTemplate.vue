<template>
    <div>
      <span class="name-and-react">
        <h3 class="user">Alex Helm
          <v-btn @click="dialog = true" class="react-button" flat icon><font-awesome-icon class="react-button" icon="plus-circle"/></v-btn>
        </h3>
      </span>
        <h1 class="message">{{ messageText }}</h1>
        <div class="image-container">
          <img class="image-style" :src="imageUrl">
        </div>
        <v-dialog v-model="dialog" max-width="290">
          <v-card>
            <v-card-title class="headline">React Select</v-card-title>
            <v-card-text>
              Reacts go here...
            </v-card-text>
          </v-card>
      </v-dialog>
    </div>
</template>
<script>
export default {
  name: 'message-template',
  data () {
    return {
      dialog: false
    }
  },
  props: [
    'messageText',
    'imageUrl'
  ],
  mounted () {
    window.scrollTo(0, document.body.scrollHeight)
  },
  methods: {
    chooseReact () {
      window.scrollTo(0, document.body.scrollHeight)
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
  max-height: 300px;
  height: 70%;
  width: auto;
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
</style>
