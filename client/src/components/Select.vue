
<template>
  <div class="select-group">
    <h3>Flights</h3>
    <!-- <v-select :station="stations" label="shortName">
      <template slot="station" slot-scope="station">
        <span :class="station.shortName"></span>
        {{ station.shortName }}
      </template>
    </v-select> -->
    <select class="depart" v-model="departureStation">
      <option :key='station' v-for="station in stations" :value="station">{{ station.shortName }}</option>
    </select>

     <select class="arrive" v-model="arrivalStation">
      <option :key='station' v-for="station in stations" :value="station">{{ station.shortName }}</option>
    </select>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'Select',
  data () {
    return {
      stations: [],
      options: [
        'foo',
        'bar',
        'baz'
      ]
    }
  },
  created () {
    let vm = this
    axios.get('https://mock-air.herokuapp.com/asset/stations')
      .then(function (response) {
        vm.stations = response.data
      })
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
