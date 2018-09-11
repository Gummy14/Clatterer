<template>
    <div>
        <h5>Alex Helm</h5>
        <h1>{{ messageText }}</h1>
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
  ]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.image-container {
  max-height:100%;
  max-width: 100%;
}
.image-style {
  max-height: 300px;
  height: 70%;
  width: auto;
}
</style>
