<template>
  <section class="summary">
    <div class="summary-text">
      <div class="depart-ticket" v-if="data.departTicket">
        You selected:<br> a <em>{{ data.departTicket.bundle }}</em> ticket for {{ departPrice }} €
      </div>
      <p>
        from <strong>{{ departName }}</strong>
        to <strong>{{ returnName }}</strong><br>
        on {{ departDateFormatted | day }} <br>
      </p>
      <p class="return-ticket" v-if="data.returnTicket.price">
        and a <br>
        <em>{{ data.returnTicket.bundle }}</em> return ticket for {{ data.returnTicket.price }} € <br>
        coming back to <strong>{{ returnName }}</strong> on <br>
        <span v-if="data.returnTicket.price">{{ returnDateFormatted | day }}. </span>
      </p>
    </div>
    <div class="totalsum">
        <h4>Total price:
            <span v-if="departPrice && !returnPrice">
                {{ departPrice }} €
            </span>
            <span v-else-if="departPrice && returnPrice">
                {{ returnPrice + departPrice }} €
            </span>
        </h4>
    </div>
  </section>
</template>

<script>
import moment from 'moment'
export default {
  name: 'FlightSummary',
  props: {
    data: {
      default: function () {
        return {}
      },
      type: Object
    }
  },
  computed: {
    departName: function () {
      return this.$vnode.context.currentDepart.shortName
    },
    returnName: function () {
      return this.$vnode.context.currentArrive.shortName
    },
    departDateFormatted: function () {
      return this.$vnode.context.departDate
    },
    returnDateFormatted: function () {
      return this.$vnode.context.returnDate
    },
    departPrice: function () {
      return this.data.departTicket.price
    },
    returnPrice: function () {
      return this.data.returnTicket.price
    }
  },
  filters: {
    // moment: function (returnDate) {
    //   return moment(returnDate).format('YYYY-MM-DD')
    // },
    day: function (arriveDate) {
      return moment(arriveDate).format('dddd, MMM Do YYYY')
    },
    minuteTime: function (departDate) {
      return moment(departDate).format('HH:mm')
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../styles/main.scss";
@import "../styles/colors.scss";
.summary{
  background-color:$light-grey;
  padding: 20px 10px 40px;
  margin: 0 0 0 10px;
  text-align: left;
  width: 40%;
  line-height: 2;
  @include max-tablet(){
    margin: 15px 0;
    width: 100%;
    padding: 40px 0 0;
  }
  .summary-text{
    padding: 15px;
  }
  .totalsum{
    color: $dark-blue;
    padding: 15px;
  }
}
</style>
