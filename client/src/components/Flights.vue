
<template>
    <main>
    <h4>The following one-way flights are going on the selected dates: </h4>
     <section>
      <ul>
        <li :key="flight.flightNumber.id" v-for="flight in flights">
        {{ flight.flightNumber }} <button id="select-flight" class="mx-datepicker-btn mx-datepicker-btn-confirm" type="button"> Select </button>
        </li>
       </ul>
    </section>
    </main>
</template>
<script>
// import Select from '@/components/Select'
export default {
  data () {
    return {
      flights: []
    }
  },
  name: 'Flights',
  methods: {
  }
}
</script>
<style scoped>
li{
    list-style: none;
}
#select-flight{
    color: steelblue;
}
h4{
font-size: 1.26;
}
</style>
