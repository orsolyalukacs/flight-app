 <template>
  <main id="root">
    <section class="select-group">
      <div class="select-wrapper">
        <div class="flight-select-wrapper">
          <flight-selector
            :items="stations"
            v-model="currentDepart"
            placeholder="Select departure"
            displayedName="shortName"
            itemValue=""
            title="Flight from"/>
          <flight-selector
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
            title="depart date"
            @change="clearList"/>
          <date-picker
            lang="en"
            id="return-date"
            v-bind:class="{ active: isActive}"
            confirm
            :not-before="departDate"
            :disabled-days="[departDate]"
            v-model="returnDate"
            title="return date"
            @change="clearReturn"/>
        </time>
      </div>
      <button class="search-button" v-if="formValid" @click="searchFlights" :disabled="!formValid">
        {{searchButtonText}}
      </button>
    </section>
    <p class="invalid" v-if="!formValid && searched">
      Error with the form. Please select both departing and arriving station and
      at least a departing date.</p>
    <section class="list-summary-wrapper">
      <div class="list-wrapper">
        <flights-list
          :items="departListItems"
          displayedName="departure"
          @row-selected="rowSelected('departTicket', ...arguments)"
          buttons="fares"
          buttonNames="bundle"
          buttonValues="price"
          buttonKeys="price"
          itemKey="departure"
          title="Departing flights"
          :isLoading="isLoading"
          :itemFormatter="itemFormatter"
          v-if="searchResults && searched"/>
        <flights-list
          :items="returnListItems"
          displayedName="departure"
          @row-selected="rowSelected('returnTicket', ...arguments)"
          buttons="fares"
          buttonNames="bundle"
          buttonValues="price"
          buttonKeys="price"
          itemKey="departure"
          title="Return flights"
          :isLoading="isReturnLoading"
          :itemFormatter="itemFormatter"
          v-if="returnSearchResults && searched"
          />
        </div>
      <flight-summary
        :data="summaryData"
        v-if="summaryResults"/>
    </section>
    <section class="button-wrapper">
      <button class="choose-return" v-if="searched && formValid && !returnDate &&!returnSearchResults" @click="chooseReturn">
        Choose return flight
      </button>
    </section>
    <!-- <p class="invalid" v-if="!searchResults && searched">
    There are no flights available on the selected date.</p>
    <p class="invalid" v-if="!returnSearchResults && returnDate && searched">
    There are no flights available on the selected date.</p> -->
    <p class="invalid" v-if="returnDate && !returnValid">
    There is an error with the form. Please select a departure and an arrival station
    and at least departing date.</p>
  </main>
</template>

<script>
import FlightSelector from './components/FlightSelector'
import FlightsList from './components/FLightsList'
import FlightSummary from './components/FlightSummary'
import { getStations, getFlights } from './services/apiCalls'
import { getConnectedStations, validateStations, itemTextFormatter } from './services/dataManipulation'
import DatePicker from 'vue2-datepicker'

export default {
  name: 'App',
  components: {
    FlightSelector,
    DatePicker,
    FlightsList,
    FlightSummary
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
      searched: false,
      isActive: false,
      summaryData: {
        departTicket: {},
        returnTicket: {}
      },
      itemFormatter: itemTextFormatter,
      isLoading: false,
      isReturnLoading: false
    }
  },
  mounted () {
    if (localStorage.stations) {
      this.stations = validateStations(JSON.parse(localStorage.stations))
    } else {
      let here = this
      getStations().then(data => {
        here.stations = validateStations(data)
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
    searchFlights: function () {
      let vm = this
      this.searched = true
      if (this.departDate) {
        this.searchResults = true
        vm.isLoading = true
        getFlights(vm.currentDepart, vm.currentArrive, vm.departDate)
          .then(data => { vm.departListItems = data })
          .then(() => {
            vm.isLoading = false
          })
      } else {
        vm.departListItems = []
        this.searchResults = false
      }
      if (this.returnDate) {
        this.returnSearchResults = true
        vm.isReturnLoading = true
        getFlights(vm.currentArrive, vm.currentDepart, vm.returnDate)
          .then(data => { vm.returnListItems = data })
          .then(() => {
            vm.isReturnLoading = false
          })
        this.isActive = false
      } else {
        vm.returnListItems = []
        this.returnSearchResults = false
      }
      this.summaryData.departTicket = {}
      this.summaryData.returnTicket = {}
      this.summaryResults = false
    },
    rowSelected: function (direction, fare, bundle, price) {
      this.summaryData[direction] = {
        fare: fare,
        bundle: bundle,
        price: price
      }
      this.summaryResults = true
    },
    chooseReturn: function () {
      this.isActive = true
    },
    clearSearchResults: function () {
      this.searched = false
    },
    clearList: function () {
      this.summaryResults = false
      this.searchResults = false
      this.isActive = false
      this.searched = false
    },
    clearReturn: function () {
      this.summaryResults = false
      this.returnSearchResults = false
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
    },
    returnValid: function () {
      if (this.formValid && this.returnDate) {
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
<style lang="scss">
@import "./styles/main.scss";
@import "./styles/copy.scss";
@import "./styles/colors.scss";

#root {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $dark-grey;
  width: 80%;
  margin: 60px auto;
}
.select-group{
  padding: 20px 0;
  background-color: $light-grey;
  margin-top: 50px;
  .search-button{
    width: 20%;
    min-width: 120px;
  }
  .select-wrapper{
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: flex-start;
    padding: 15px;
    .flight-select-wrapper{
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-bottom: 1.2rem;
      justify-content: center;
      width: 100%;
      @include phone(){
        flex-direction: column;
      }
    }
    .datetime{
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      justify-content: center;
      width: 100%;
      @include phone(){
        flex-direction: column;
        margin: 15px auto;
        align-items: center;
      }
      .mx-datepicker{
        max-width: 160px;
        width: 100%;
        align-items: flex-start;
        padding-right: 15px;
        @include phone(){
          margin: 7px 0;
        }
      }
      .mx-datepicker-button{
        margin: 0 20px;
      }
      input.mx-input{
        background-color: white;
        color:$dark-blue;
        border: none;
        font-size: 12px;
      }
      .mx-calendar-content .cell.actived{
        background-color: $corn-blue;
      }
    }
  }
}
.list-summary-wrapper{
  display: flex;
  width: 100%;
  margin: 15px 0;
  @include phone(){
    flex-direction: column;
  }
  .list-wrapper{
    width: 60%;
    display: flex;
    flex-direction: column;
    @include phone(){
      width: 100%;
    }
  }
}
.button-wrapper{
  width: 100%;
  display: flex;
  @include phone(){
    justify-content: center;
  }
  .choose-return{
    // margin: 0;
    background-color: $dark-blue;
    color: white;
    width: 20%;
    min-width: 120px;
  }
  .choose-return:hover{
    color: $navy-blue;
    background-color: $light-grey;
  }
  @include phone(){
    margin: 0 auto;
  }
}
</style>
