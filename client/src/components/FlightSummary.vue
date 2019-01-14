<template>
  <section class="summary">
    <div class="summary-text">
      <div class="depart-ticket" v-if="data.departTicket">
        You selected:<br> a <em>{{ data.departTicket.bundle }}</em> ticket for {{ data.departTicket.price }} €
      </div>
      <p>
        from <strong>{{$vnode.context.currentDepart.shortName}}</strong>
        to <strong>{{$vnode.context.currentArrive.shortName}}</strong><br>
        on {{$vnode.context.departDate.toISOString().split('T')[0]}} <br>
      </p>
      <p class="return-ticket" v-if="data.returnTicket.price">
        and a <br>
        <em>{{ data.returnTicket.bundle }}</em> return ticket for {{ data.returnTicket.price }} € <br>
        coming back to <strong>{{$vnode.context.currentArrive.shortName}}</strong> on <br>
        <span v-if="data.returnTicket.price">{{$vnode.context.returnDate.toISOString().split('T')[0]}}. </span>
      </p>
    </div>
    <div class="totalsum">
        <h4>Total price:
            <span v-if="data.departTicket.price && !data.returnTicket.price">
                {{data.departTicket.price}} €
            </span>
            <span v-else-if="data.departTicket.price && data.returnTicket.price">
                {{data.returnTicket.price + data.departTicket.price }} €
            </span>
        </h4>
    </div>
  </section>
</template>

<script>
export default {
  name: 'FlightSummary',
  props: {
    data: {
      default: function () {
        return {}
      },
      type: Object
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
    padding: 40px 10px 0;
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
