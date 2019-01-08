<template>
  <section class="summary">
    <div class="summary-text">
      <div class="depart-ticket" v-if="data.departTicket">
        You selected:<br> a {{ data.departTicket.bundle }} ticket for {{ data.departTicket.price }} €
      </div>
      <p>
        from <strong>{{$vnode.context.currentDepart.shortName}}</strong>
        to <strong>{{$vnode.context.currentArrive.shortName}}</strong><br>
        on {{$vnode.context.departDate.toISOString().split('T')[0]}} <br>
      </p>
      <p class="return-ticket" v-if="data.returnTicket.price">
        and a <br>
        {{ data.returnTicket.bundle }} return ticket for {{ data.returnTicket.price }} € <br>
        coming back to <strong>{{$vnode.context.currentArrive.shortName}}</strong> on
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
  name: 'Summary',
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
<style>
  .summary{
    background-color: #f1f1f1;
    padding: 20px 10px;
    border: 1px solid rgba(237, 117, 241, 0.904);
  }
  h4{
    margin: 0.4em auto;
  }
</style>
