
<template>
  <div class="select-group">
    <h3>Flights</h3>
    <select id="depart" @change="update($event)">
      <option :key='station.shortName.id' v-for="station in stations" :value="station.shortName">{{ station.shortName }}</option>
    </select>

     <select id="arrive">
      <option :key='connection.shortName.id' v-for="connection in connections" :value="connection.shortName">{{ connection.shortName }}</option>
    </select>

    <p v-if="depart&&arrive">
        You selected a flight departing from {{ depart }} and going to {{ arrive }}.
    </p>
    <date-picker @change="departDateSelect($event)" lang="en" v-model="departDate" confirm :not-before="new Date()" :not-after="selectedArriveDate"></date-picker>
    <date-picker @change="arriveDateSelect($event)" lang="en" v-model="arriveDate" confirm :not-before="selectedDepartDate"></date-picker>
  </div>
</template>
<script>
import axios from 'axios'
import DatePicker from 'vue2-datepicker'

export default {
  components: { DatePicker },
  name: 'Select',
  data () {
    return {
      stations: [],
      departList: [],
      connections: [],
      depart: [],
      arrive: [],
      departDate: '',
      arriveDate: '',
      selectedDepartDate: new Date(),
      selectedArriveDate: '',
      cityName: {},
      shortNameLUT: {},
      iataLUT: {}
    }
  },
  mounted () {
    if (localStorage.connections) {
      this.connections = JSON.parse(localStorage.connections)
    }
    if (localStorage.depart) {
      this.depart = localStorage.depart
    }
    if (localStorage.arrive) {
      this.arrive = localStorage.arrive
    }
  },
  watch: {
    depart: function () {
      localStorage.depart = this.depart
    },
    arrive: function () {
      localStorage.arrive = this.arrive
    },
    connections: function () {
      localStorage.connections = JSON.stringify(this.connections)
    }
  },
  created () {
    let vm = this
    axios.get('https://mock-air.herokuapp.com/asset/stations')
      .then(function (response) {
        vm.stations = response.data
        Object.keys(vm.stations).map(function (key, index) {
          vm.cityName[vm.stations[index].iata] = vm.stations[index].shortName
          vm.shortNameLUT[vm.stations[index].shortName] = index
          vm.iataLUT[vm.stations[index].iata] = index
        })
      })
  },
  methods: {
    update (event) {
      let vm = this
      var temp = this.stations[this.shortNameLUT[this.depart]].connections.map((elem) => elem.iata)
      this.connections = temp.map((elem) => vm.stations[vm.iataLUT[elem]])
    },
    departDateSelect (event) {
      console.log(event)
      this.selectedDepartDate = this.departDate
    },
    arriveDateSelect (event) {
      console.log(event)
      this.selectedArriveDate = this.arriveDate
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
