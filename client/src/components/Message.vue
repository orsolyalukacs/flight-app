
<template>
  <section class="selected-message" v-bind:class="{ active: isActive}">
      <div class="single-flight" v-if="depart&&arrive&&departDate">
        You selected a flight from: <h3>{{ depart }} </h3> to <h3>{{ arrive }}</h3> on <time> {{ departDate | moment }}.</time>
        <button type="button" class="mx-datepicker-btn mx-datepicker-btn-confirm" @click="confirmSingle($event)">OK</button>
      </div>
      <div class="return-flight" v-if="depart&&arrive&&departDate&&arriveDate">
          Your selected flights are the following: from <h3> {{ depart }} </h3> to <h3> {{ arrive }} </h3> on <time> {{ departDate | moment }} </time> and returning on the <time> {{ arriveDate | moment }}. </time>
          <button type="button" class="mx-datepicker-btn mx-datepicker-btn-confirm" @click="confirmReturn($event)">OK</button>
      </div>
    </section>
</template>
<script>
import Select from '@/components/Select'
export default {
  name: 'Message',
  components: {
    Select
  },
  data () {
    return {
      depart: [],
      arrive: [],
      departDate: '',
      arriveDate: '',
      isActive: false
    }
  },
  methods: {
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
    }
  }
}
</script>
<style scoped>
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
.active{
  transform: scale(0.9);
  transition: all .4s ease-in-out;
  }
</style>
