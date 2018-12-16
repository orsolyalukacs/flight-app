
<template>
  <div class="select-group">
    <h3>Flights</h3>
    <select id="depart" v-model="depart" @change="update($event)">
      <option :key='station.id' v-for="station in stations" :value="station">{{ station.shortName }}</option>
    </select>

     <select id="arrive" v-model="arrive">
      <option :key='connection.id' v-for="connection in connections" :value="connection">{{ connection }}</option>
    </select>
    <p v-if="depart&&arrive">
        You selected a flight departing from {{ depart.shortName }} and going to {{ arrive }}.
    </p>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'Select',
  data () {
    return {
      stations: [],
      connections: [],
      depart: [],
      arrive: []
    }
  },
  created () {
    let vm = this
    axios.get('https://mock-air.herokuapp.com/asset/stations')
      .then(function (response) {
        vm.stations = response.data
        vm.cityName = {}
        Object.keys(vm.stations).map(function (key, index) {
          vm.cityName[vm.stations[index].iata] = vm.stations[index].shortName
        })
        // vm.stations.map(function (elem) {
        //   return {
        //     [elem.iata]: elem.shortName
        //   }
        // })
        console.log(vm.cityName)
        // console.log(vm.stations)
      })
  },
  methods: {
    update (event) {
      let vm = this
      this.connections = this.depart.connections.map(function (elem) {
        return vm.cityName[elem.iata]
      })
    }
  }
}
</script>
<style scoped>
  li{
    display: inline-block;
    margin: 0 10px;
  }
  select{
    width: 50%;
    display: inline-block;
  }
</style>
