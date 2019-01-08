 <template>
  <main id="root">
    <section class="select-group">
      <div class="select-wrapper">
        <div class="flight-select-wrapper">
          <Selector
            :items="stations"
            v-model="currentDepart"
            placeholder="Select departure"
            displayedName="shortName"
            itemValue=""
            title="Flight from"/>
          <Selector
            :items="connectingStations"
            v-model="currentArrive"
            placeholder="Select arrival"
            displayedName="shortName"
            itemValue=""
            title="Flight to"/>
        </div>
        <time class="datetime">
          <date-picker
            lang="en"
            v-model="departDate"
            confirm :not-before="new Date()"
            :not-after="returnDate"
            title="depart date"/>
          <date-picker
            lang="en"
            confirm
            :not-before="departDate"
            v-model="returnDate"
            title="return date"/>
        </time>
      </div>
      <button @click="searchFlights" :disabled="!formValid">
        {{searchButtonText}}
      </button>
    </section>
    <List
      :items="departListItems"
      displayedName="departure"
      @row-selected="rowSelected('departTicket', ...arguments)"
      buttons="fares"
      buttonNames="bundle"
      buttonValues="price"
      title="Departing flights"
      :itemFormatter="itemFormatter"
      v-if="searchResults"/>
    <List
      :items="returnListItems"
      displayedName="departure"
      @row-selected="rowSelected('returnTicket', ...arguments)"
      buttons="fares"
      buttonNames="bundle"
      buttonValues="price"
      title="Return flights"
      :itemFormatter="itemFormatter"
      v-if="returnSearchResults"/>
    <Summary
      :data="summaryData"
      :textFormatter="textFormatter"
      v-if="summaryResults"/>
  </main>
</template>

<script>
import Selector from './components/Selector'
import List from './components/List'
import Summary from './components/Summary'
import { getStations, getFlights } from './services/apiCalls'
import { getConnectedStations, summaryTextFormatter, itemTextFormatter } from './services/dataManipulation'
import DatePicker from 'vue2-datepicker'

export default {
  name: 'App',
  components: {
    Selector,
    DatePicker,
    List,
    Summary
  },
  data () {
    return {
      stations: [],
      connectingStations: [],
      departListItems: [],
      returnListItems: [],
      currentDepart: '',
      currentArrive: '',
      departDate: '',
      returnDate: '',
      departTicket: {},
      returnTicket: {},
      searchResults: false,
      returnSearchResults: false,
      summaryResults: false,
      summaryData: {
        departTicket: {},
        returnTicket: {}
      },
      textFormatter: summaryTextFormatter,
      itemFormatter: itemTextFormatter
    }
  },
  mounted () {
    if (localStorage.stations) {
      this.stations = JSON.parse(localStorage.stations)
    } else {
      let here = this
      getStations().then(data => {
        here.stations = data
      })
    }
    if (localStorage.currentDepart) {
      this.currentDepart = JSON.parse(localStorage.currentDepart)
    }
    if (localStorage.currentArrive) {
      this.currentArrive = JSON.parse(localStorage.currentArrive)
    }
    if (localStorage.connectingStations) {
      this.connectingStations = JSON.parse(localStorage.connectingStations)
    }
  },
  methods: {
    // departChanged: function (value) {
    //   this.connectingStations = getConnectedStations(value, this.stations)
    //   this.currentDepart = value
    //   // localStorage.clear()
    // },
    // arriveChanged: function (value) {
    //   this.currentArrive = value
    // },
    searchFlights: function () {
      let vm = this
      if (this.departDate) {
        getFlights(vm.currentDepart, vm.currentArrive, vm.departDate)
          .then(data => { vm.departListItems = data })
        this.searchResults = true
      } else {
        vm.departListItems = []
        this.searchResults = false
      }
      if (this.returnDate) {
        getFlights(vm.currentArrive, vm.currentDepart, vm.returnDate)
          .then(data => { vm.returnListItems = data })
        this.returnSearchResults = true
      } else {
        vm.returnListItems = []
        this.returnSearchResults = false
      }
    },
    rowSelected: function (direction, fare, bundle, price) {
      this.summaryData[direction] = {
        fare: fare,
        bundle: bundle,
        price: price
      }
      this.summaryResults = true
    },
    asd: function () {
      this.currentDepart = this.stations[6]
    }
  },
  computed: {
    searchButtonText: function () {
      if (!this.returnDate && !this.departDate) {
        return 'Search flights'
      } else if (this.returnDate) {
        return 'Search two-way flights'
      } else {
        return 'Search one-way flights'
      }
    },
    formValid: function () {
      if (this.currentDepart && this.currentArrive && this.departDate) {
        return true
      } else {
        return false
      }
    }
  },
  watch: {
    stations: function () {
      localStorage.stations = JSON.stringify(this.stations)
    },
    currentDepart: function () {
      this.connectingStations = getConnectedStations(this.currentDepart, this.stations)
      localStorage.currentDepart = JSON.stringify(this.currentDepart)
    },
    currentArrive: function () {
      localStorage.currentArrive = JSON.stringify(this.currentArrive)
    },
    connectingStations: function (value) {
      if (!value.map(elem => { return elem.iata }).includes(this.currentArrive.iata)) {
        this.currentArrive = ''
      }
      localStorage.connectingStations = JSON.stringify(this.connectingStations)
    }
  }
}
</script>
<style>
#root {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  width: 70%;
  margin: 0 auto;
}
button{
  font-size: 12px;
  line-height: 1;
  padding: 7px 15px;
  margin: 0 5px;
  cursor: pointer;
  background-color: white;
  border-color: #2ECEDA;
  outline: none;
  border-radius: 4px;
}
.select-group{
  border: 1px solid #2ECEDA;
  padding: 20px 0;
  background-color: #f1f1f1;
  margin-top: 50px;
}
.select-wrapper{
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  padding: 15px;
}
.flight-select-wrapper{
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1.2rem;
  justify-content: center;
  width: 100%;
}
.datetime{
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
}
.active {
  display: block;
}
.mx-datepicker{
  max-width: 160px;
  width: 100%;
  align-items: flex-start;
  padding-right: 15px;
}
.mx-datepicker-button{
  margin: 0 20px;
}
input.mx-input{
  background-color: white;
}
.mx-calendar-content .cell.actived{
  background-color: #2ECEDA;
}
</style>
