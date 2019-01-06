 <template>
  <main id="root">
    <section class="select-wrapper">
      <div class="flight-select-wrapper">
        <Selector
          v-model="currentDepart"
          :items="stations"
          placeholder="Select departure"
          displayedName="shortName"
          itemValue=""
          title="Flight from"/>
        <Selector
          v-model="currentArrive"
          :items="connectingStations"
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
      title="Departing flights"/>
    <List
      :items="returnListItems"
      displayedName="departure"
      @row-selected="rowSelected('returnTicket', ...arguments)"
      buttons="fares"
      buttonNames="bundle"
      buttonValues="price"
      title="Return flights"/>
    <Summary
      :data="summaryData"
      :textFormatter="textFormatter"/>
  </main>
</template>

<script>
import Selector from './components/Selector'
import List from './components/List'
import Summary from './components/Summary'
import { getStations, getFlights } from './services/apiCalls'
import { getConnectedStations, summaryTextFormatter } from './services/dataManipulation'
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
      summaryData: {
        departTicket: {},
        returnTicket: {}
      },
      textFormatter: summaryTextFormatter
    }
  },
  created () {
    let vm = this
    getStations().then(data => {
      vm.stations = data
    })
  },
  methods: {
    departChanged: function (value) {
      this.connectingStations = getConnectedStations(value, this.stations)
      this.currentDepart = value
    },
    arriveChanged: function (value) {
      this.currentArrive = value
      console.log(this.currentDepart)
      console.log(this.currentArrive)
    },
    searchFlights: function () {
      let vm = this
      if (this.departDate) {
        getFlights(vm.currentDepart, vm.currentArrive, vm.departDate)
          .then(data => { vm.departListItems = data })
      } else {
        vm.departListItems = []
      }
      if (this.returnDate) {
        getFlights(vm.currentArrive, vm.currentDepart, vm.returnDate)
          .then(data => { vm.returnListItems = data })
      } else {
        vm.returnListItems = []
      }
    },
    rowSelected: function (direction, fare, bundle, price) {
      this.summaryData[direction] = {
        fare: fare,
        bundle: bundle,
        price: price
      }
      console.log(this.summaryData)
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
      if (this.currentDepart && this.currentArrive && this.depart) {
        return true
      } else {
        return false
      }
    }
  },
  watch: {
    currentDepart: function (value) {
      this.connectingStations = getConnectedStations(value, this.stations)
    },
    connectingStations: function (value) {
      if (!value.map(elem => { return elem.iata }).includes(this.currentArrive.iata)) {
        this.currentArrive = ''
      }
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
  background-color: transparent;
  outline: none;
  border-radius: 4px;
}
.select-wrapper{
  display: flex;
  flex-direction: column;
  align-items: space-between;
  justify-content: space-evenly;
  align-items: center;
  border: 1px solid #2ECEDA;
  padding: 15px;
}
.flight-select-wrapper{
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1.2rem;
  justify-content: space-between;
  width: 100%;
}
.datetime{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}
.active {
  display: block;
}
.mx-datepicker{
  width: 160px;
}
.mx-datepicker-button{
  margin: 0 20px;
}
input.mx-input{
  background-color: #f1f1f1;
  width: 160px;
}
.mx-calendar-content .cell.actived{
  background-color: #2ECEDA;
}
</style>
