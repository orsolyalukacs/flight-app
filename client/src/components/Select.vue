
<template>
  <main class="select-group">
    <div class="select-wrapper" v-bind:class="{ active: isActive}">
      <!--Select -->
      <section class="flight-select">
        <h1>Flights</h1>
        <h2>Flight from</h2>
        <select id="depart" v-model="depart" @change="update($event)">
          <option placeholder="departure" :key='station.shortName.id' v-for="station in stations" :value="station.shortName">{{ station.shortName }}</option>
        </select>
        <h2>Flight to</h2>
        <select id="arrive" v-model="arrive">
          <option :key='connection.shortName.id' v-for="connection in connections" :value="connection.shortName">{{ connection.shortName }}</option>
        </select>
        <p v-if="notFound" class="invalid">
          Sorry, there were no flights found from this station.
        </p>
        <div class="datetime">
          <date-picker @change="departDateSelect($event)" lang="en" v-model="departDate" confirm :not-before="new Date()" :not-after="selectedArriveDate"></date-picker>
          <date-picker @change="arriveDateSelect($event)" lang="en" v-model="arriveDate" confirm :not-before="selectedDepartDate"></date-picker>
        </div>
      </section>
      <section class="selected-message" v-bind:class="{ active: isActive}">
        <!-- Search Single Flights -->
      <div class="single-flight" v-if="depart && arrive && departDate">
        <!-- You selected a one-way flight from: <h3>{{ depart }} </h3> to <h3>{{ arrive }}</h3> on <time> {{ departDate | moment }} </time> -->
        <button type="button" id="confirm-single-btn" class="mx-datepicker-btn mx-datepicker-btn-confirm" @click="confirmSingle($event)">Search one-way flight</button>
      </div>
        <!-- Search Return Flights -->
      <div class="return-flight" v-if="depart && arrive && departDate && arriveDate">
          <!-- You selected a return flight from: <h3> {{ depart }} </h3> to <h3> {{ arrive }} </h3> on <time> {{ departDate | moment }} </time> and returning on the <time> {{ arriveDate | moment }} </time> -->
          <button type="button" id="confirm-return-btn" class="mx-datepicker-btn mx-datepicker-btn-confirm" @click="confirmReturn($event)">Search return flights</button>
      </div>
      </section>
    </div>
    <!-- Show Single Flights -->
     <section class="show-flights" v-if="showSingleFlights && SearchResults && !isSelected">
      <p>The following one-way flights are going on the selected dates: </p>
      <div><p><strong class="stations">{{ depart }}<span class="arrow">→</span>{{ arrive }}</strong></p></div>
      <ul>
        <li class="show-single-flight" :key="flight.flightNumber.id" v-for="flight in flights">
          <time class="day">{{ flight.departure | day }}</time>
           <strong>{{ flight.departure | minuteTime }} →
          <time>{{ flight.arrival | minuteTime }}</time></strong>
          <button v-if="flight.remainingTickets > 0" id="select-flight" @click="SelectFlight($event)" class="mx-datepicker-btn mx-datepicker-btn" type="button"> Select </button>
        </li>
       </ul>
    </section>
    <!-- Show Return Flights -->
    <section class="show-flights" v-if="showReturnFlights && SearchResults && !isSelected">
      <p>The following return flights are going on the selected dates: </p>
      <div><p><strong class="stations">{{ depart }}<span class="arrow">→</span>{{ arrive }}</strong></p></div>
      <ul>
        <li class="show-single-flight" :key="flight.flightNumber.id" v-for="flight in flights">
          <time class="day">{{ flight.departure | day }}</time>
            <strong>{{ flight.departure | minuteTime }} →
          <time>{{ flight.arrival | minuteTime }}</time></strong>
          <button v-if="flight.remainingTickets > 0" id="select-flight" @click="SelectFlight($event)" class="mx-datepicker-btn mx-datepicker-btn" type="button"> Select </button>
        </li>
      </ul>
      <p><strong class="stations">{{ arrive }}<span class="arrow">→</span>{{ depart }}</strong></p>
      <ul>
        <li class="show-return-flight" :key="flight.flightNumber.id" v-for="flight in returnFlights">
          <time class="day">{{ flight.arrival | day }}</time>
          <strong>  {{ flight.departure | minuteTime }} →
          <time>{{ flight.arrival | minuteTime }}</time></strong>
          <button v-if="flight.remainingTickets > 0" id="select-flight" @click="SelectFlight($event)" class="mx-datepicker-btn mx-datepicker-btn" type="button"> Select </button>
        </li>
      </ul>
    </section>
    <!-- No flights found -->
    <section v-if="!SearchResults && isSelected">
      <p class="invalid">There are no remaining tickets on the selected dates.</p>
    </section>
     <section v-if="SearchResults && !ReturnSearchResults && isSelected">
      <p class="invalid">There are no return flights available on this date.</p>
    </section>
    <!-- Categories -->
    <section class="show-categories" v-if="isSelected">
      <h4>Available flights:</h4>
      <ul>
        <li class="show-selected-flights">
          <span>category</span>
          <span>price</span>
        </li>
        <li class="show-selected-flights" :key="fare.id" v-for="fare in fares">
          <!-- <button> -->
            <span>{{ fare.bundle }}
            </span>
            <span>{{ fare.price }} €</span>
          <!-- </button> -->
        </li>
       </ul>
    </section>
  </main>
</template>
<script>
import axios from 'axios'
import DatePicker from 'vue2-datepicker'
import moment from 'moment'
import Flights from '@/components/Flights'

export default {
  components: { DatePicker, Flights },
  name: 'Select',
  data () {
    return {
      stations: [],
      departList: [],
      connections: [],
      flights: [],
      fares: [],
      depart: [],
      arrive: [],
      departDate: '',
      arriveDate: '',
      selectedDepartDate: new Date(),
      selectedArriveDate: '',
      cityName: {},
      shortNameLUT: {},
      iataLUT: {},
      notFound: '',
      isActive: false,
      showSingleFlights: false,
      showReturnFlights: false,
      SearchResults: '',
      remainingTickets: '',
      isSelected: '',
      chosenType: false,
      returnFlights: [],
      ReturnSearchResults: false
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
        // console.log(response.data)
        Object.keys(vm.stations).map(function (key, index) {
          vm.cityName[vm.stations[index].iata] = vm.stations[index].shortName
          vm.shortNameLUT[vm.stations[index].shortName] = index
          vm.iataLUT[vm.stations[index].iata] = index
        })
      })
  },
  methods: {
    update (event) {
      localStorage.clear()
      let vm = this
      var temp = this.stations[this.shortNameLUT[this.depart]].connections
      temp = temp.map((elem) => elem.iata)
      temp = temp.map((elem) => vm.stations[vm.iataLUT[elem]])
      if (temp[0] !== undefined) {
        this.connections = temp
        let invalidMessage = document.querySelector('.invalid')
        if (invalidMessage) {
          invalidMessage.style.display = 'none'
        }
      } else {
        this.connections = []
        this.notFound = true
      }
    },
    departDateSelect (event) {
      this.selectedDepartDate = this.departDate
      this.isDepartSelected = true
    },
    arriveDateSelect (event) {
      this.selectedArriveDate = this.arriveDate
      this.isArriveSelected = true
      let singleFlight = document.querySelector('.single-flight')
      singleFlight.style.display = 'none'
    },
    search () {
      console.log('searching')
      let vm = this
      let indexOfDepart = this.shortNameLUT[this.depart]
      let iataDepart = this.stations[indexOfDepart].iata
      let indexOfArrive = this.shortNameLUT[this.arrive]
      let iataArrive = this.stations[indexOfArrive].iata
      let FlightDepartDate = moment(this.departDate).format('YYYY-MM-DD')
      // let FlightArrivalDate = moment(this.arriveDate).format('YYYY-MM-DD')

      let SingleUrl = 'https://mock-air.herokuapp.com/search?departureStation=' + iataDepart + '&arrivalStation=' + iataArrive + '&date=' + FlightDepartDate
      axios.get(SingleUrl)
        .then(response => {
          vm.flights = response.data
          console.log(vm.flights)
          // console.log(vm.flights[0].remainingTickets)
        })
      this.SearchResults = true
    },
    searchReturn () {
      console.log('searching return')
      let vm = this
      let indexOfArrive = this.shortNameLUT[this.arrive]
      let iataArrive = this.stations[indexOfArrive].iata
      let indexOfDepart = this.shortNameLUT[this.depart]
      let iataDepart = this.stations[indexOfDepart].iata
      let FlightArriveDate = moment(this.arriveDate).format('YYYY-MM-DD')
      // let FlightArrivalDate = moment(this.arriveDate).format('YYYY-MM-DD')

      let returnUrl = 'https://mock-air.herokuapp.com/search?departureStation=' + iataArrive + '&arrivalStation=' + iataDepart + '&date=' + FlightArriveDate
      axios.get(returnUrl)
        .then(response => {
          vm.returnFlights = response.data
          console.log(vm.returnFlights)
          // console.log(vm.flights[0].remainingTickets)
        })
      this.ReturnSearchResults = true
    },
    confirmSingle (event) {
      console.log('single confirmed')
      this.showSingleFlights = true
      this.isActive = true
      this.search()
    },
    confirmReturn (event) {
      console.log('return confirmed')
      this.showSingleFlights = false
      this.showReturnFlights = true
      this.isActive = true
      this.search()
      this.searchReturn()
    },
    moment: function () {
      return moment()
    },
    SelectFlight (event) {
      console.log('selected')
      console.log(this.flights)
      this.fares = this.flights[0].fares
      console.log(this.fares)
      this.isSelected = true
    }
  },
  filters: {
    moment: function (arriveDate) {
      return moment(arriveDate).format('YYYY-MM-DD')
    },
    day: function (arriveDate) {
      return moment(arriveDate).format('ddd, MMM Do YYYY')
    },
    minuteTime: function (departDate) {
      return moment(departDate).format('HH:mm')
    }
  }
}
</script>
<style scoped>
  @media screen and (max-width: 767px) {
    .select-group{
      flex-direction: column;
    }
  }
  .select-group{
    width: 75%;
    margin: 0 auto;
  }
  .select-wrapper{
    display: flex;
    flex-direction: row;
    align-items: space-between;
    justify-content: space-evenly;
    align-items: center;
    border: 1px solid #79f7af;
    border-radius: 8px;
    padding: 15px;
  }
  .active{
    transform: scale(0.9);
    transition: all .4s ease-in-out;
  }
  h1{
    font-size: 1.6rem;
  }
  h2{
    display: inline-block;
    font-weight: bold;
    color: #737f8a;
    font-size: .8rem;
  }
  h3{
    font-size: 1.4rem;
  }
  h4{
    font-size: 1.26;
    max-width: 300px;
  }
  .flight-select{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-items: center;
  }
  .datetime{
    display: flex;
    flex-direction: column;
  }
  .selected-message{
    display: flex;
    flex-direction: row;
    justify-items: center;
    align-items: flex-start;
    text-align: left;
    transform: scale(0.9);
  }
  .return-flight{
    max-width: 280px;
  }
  select{
    max-width: 350px;
    border-radius: 4px;
    border: 1px solid #ccc;
    color: #555;
  }
  option{
    background-color: white;
  }
  .message{
    display: block;
    margin: 0 auto;
  }
  input{
    width: 50%;
    display: block;
  }
  .invalid{
    color: rgb(248, 114, 114);
  }
  .mx-input-wrapper{
    margin: 15px 0;
  }
  button {
    margin-top: 15px;
    display: block;
    color: rgb(70, 206, 129);
    font-weight: bold;
    font-size: 18px;
  }
  button:hover{
    border: 1px solid #49e78d;
    background-color: #49e78d;
    color: white;
  }
  time{
    font-weight: 600;
  }
  #select-flight{
    display: inline;
  }
  li{
    list-style: none;
    border: 1px solid #ccc;
    border-radius: 4px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  li:nth-child(odd){
    background-color: #efefef;
  }
  li strong{
    font-family:'Lucida Sans', 'Lucida Sans Regular', Verdana, sans-serif;
  }
  button#select-flight{
    margin-top: 0;
    color: #2c3e50;
    background-color: white;
    font-weight: 600;
    font-size: 14px;
  }
  button#select-flight:hover{
    border: 1px solid #49e78d;
    background-color: #49e78d;
    color: white;
  }
  .show-flights p{
    font-family:'Lucida Sans', 'Lucida Sans Regular', Verdana, sans-serif;
  }
  .show-selected-flights{
    display: flex;
    justify-content: space-between;
    padding: 2px 50px;
  }
  .show-single-flight, .show-return-flight{
    font-size: 14px;
  }
  li:first-child.show-selected-flights{
    background-color: #94f1bd;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-weight: 600;
    border: none;
  }
  .stations{
    justify-content: center;
    align-items: center;
    display: flex;
    font-size: 20px;
    letter-spacing: 1px;
    font-family: Helvetica Neue,Helvetica,Roboto,Arial,sans-serif;
  }
  .arrow{
    color: #49e78d;
    font-size: 28px;
    padding: 0 10px;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', Verdana, sans-serif;
  }
</style>
