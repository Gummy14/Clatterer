<template>
  <v-card>
    <v-card-title class="headline">Color Select</v-card-title>
    <v-btn color="red darken-3" v-on:click="selectColor('red darken-3')">Red</v-btn>
    <v-btn color="pink darken-3" v-on:click="selectColor('pink darken-3')">Pink</v-btn>
    <v-btn color="purple darken-3" v-on:click="selectColor('purple darken-3')">Purple</v-btn>
    <v-btn color="deep-purple darken-3" v-on:click="selectColor('deep-purple darken-3')">Deep Purple</v-btn>
    <v-btn color="indigo darken-3" v-on:click="selectColor('indigo darken-3')">Indigo</v-btn>
    <v-btn color="blue darken-3" v-on:click="selectColor('blue darken-3')">Blue</v-btn>
    <v-btn color="light-blue darken-3" v-on:click="selectColor('light-blue darken-3')">Light Blue</v-btn>
    <v-btn color="cyan darken-3" v-on:click="selectColor('cyan darken-3')">Cyan</v-btn>
    <v-btn color="teal darken-3" v-on:click="selectColor('teal darken-3')">Teal</v-btn>
    <v-btn color="green darken-3" v-on:click="selectColor('green darken-3')">Green</v-btn>
    <v-btn color="light-green darken-3" v-on:click="selectColor('light-green darken-3')">Light Green</v-btn>
    <v-btn color="lime darken-3" v-on:click="selectColor('lime darken-3')">Lime</v-btn>
    <v-btn color="yellow darken-3" v-on:click="selectColor('yellow darken-3')">Yellow</v-btn>
    <v-btn color="amber darken-3" v-on:click="selectColor('amber darken-3')">Amber</v-btn>
    <v-btn color="orange darken-3" v-on:click="selectColor('orange darken-3')">Orange</v-btn>
    <v-btn color="deep-orange darken-3" v-on:click="selectColor('deep-orange darken-3')">Deep Orange</v-btn>
    <v-btn color="brown darken-3" v-on:click="selectColor('brown darken-3')">Brown</v-btn>
    <v-btn color="blue-grey darken-3" v-on:click="selectColor('blue-grey darken-3')">Blue Gray</v-btn>
    <v-btn color="grey darken-3" v-on:click="selectColor('grey darken-3')">Gray</v-btn>
  </v-card>
</template>
<script>
export default {
  name: 'color-selection',
  data () {
    return {
      selectedColor: false
    }
  },
  methods: {
    selectColor (color) {
      this.$emit('colorPicked', color)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
