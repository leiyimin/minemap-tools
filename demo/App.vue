<template>
  <div id="app">
    <MapView v-bind="mapConfig" @completed="mapLoad"></MapView>
  </div>
</template>

<script>

  export default {
    name: "App",
    data() {
      return {}
    },
    computed: {
      mapConfig() {
        return window.mapConfig;
      }
    },
    methods: {
      mapLoad() {
      }
    }
  }
</script>

<style scoped>
  html, body {
    margin: 0;
    padding: 0;
  }

  #app {
    display: flex;
    top: 0;
    height: 100vh;
  }

</style>