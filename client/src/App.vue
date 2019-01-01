<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Select from './components/Select'
import Flights from './components/Flights'

export default {
  name: 'App',
  components: {
    Select,
    Flights
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
