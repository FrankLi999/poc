<template>
  <div id="app">
    <!--
    <router-view/>
    -->
    <my-contractor/>
  </div>
</template>

<script>
import MyContractor from './components/MyContractorBootstrap'

export default {
  name: 'app',
  components: {
    MyContractor
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
