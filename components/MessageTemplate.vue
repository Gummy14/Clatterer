<template>
    <div>
        <h5 class="user">Alex Helm</h5>
        <h1 class="message">{{ messageText }}</h1>
        <div class="image-container">
          <img class="image-style" :src="imageUrl">
        </div>
    </div>
</template>
<script>
export default {
  name: 'message-template',
  props: [
    'messageText',
    'imageUrl'
  ],
  mounted () {
    window.scrollTo(0, document.body.scrollHeight)
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
  padding-left: .5%;
}
.user {
  padding-top: .25%;
  padding-left: .5%;
}
.message {
  padding-left: .5%;
}
</style>
