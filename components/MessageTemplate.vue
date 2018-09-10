<template>
    <div>
        <h5>Alex Helm</h5>
        <h1>{{ messageText }}</h1>
        <img :src="imageUrl" alt="nope">
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
</style>
