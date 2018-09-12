<template>
  <v-app dark>
    <div class="toolbar">
      <v-toolbar app:clipped-left="clipped" color="purple darken-3">
        <v-toolbar-title v-text="title"></v-toolbar-title>
      </v-toolbar>
    </div>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [{
        icon: 'bubble_chart',
        title: 'Inspire'
      }],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'AYY LMAO'
    }
  },
  name: 'App'
}
</script>
<style scoped>
.toolbar {
  padding-bottom: 2%;
}
</style>
