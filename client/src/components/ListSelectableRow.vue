<template>
  <section class="selectable-row">
    <div class="row-wrapper">
        <time class="selectable-body">
            {{itemFormatter(rowItem)}}
        </time>
        <button class="fares"
        v-bind:key="button.id"
        v-for="button in buttons"
        v-if="rowItem.remainingTickets > 0"
        @click="buttonClicked(button[buttonName], button[buttonValue])">
            {{button[buttonName]}} - {{button[buttonValue]}} €
        </button>
    </div>
  </section>
</template>

<script>
import moment from 'moment'
export default {
  name: 'ListSelectableRow',
  props: {
    rowItem: {
      default: function () {
        return { name: 'itemname', value: 'i', id: 2 }
      },
      type: Object
    },
    itemFormatter: {
      default: function (rowItem) {
        return JSON.stringify(rowItem)
      },
      type: Function
    },
    buttons: {
      default: function () {
        return [
          { name: 'low', value: '100', id: 0 },
          { name: 'high', value: '200', id: 1 }
        ]
      },
      type: Array
    },
    displayedName: {
      default: 'name',
      type: String
    },
    buttonName: {
      default: 'name',
      type: String
    },
    buttonValue: {
      default: 'value',
      type: String
    },
    buttonKey: {
      default: 'id',
      type: String
    }
  },
  methods: {
    buttonClicked (buttonName, buttonValue) {
      this.$emit('buttonClicked', buttonName, buttonValue)
    }
  },
  filters: {
    minuteTime: function (departTime) {
      return moment(departTime).format('HH:mm')
    }
  }
}
</script>
<style scoped>
  button.fares{
    font-weight: 600;
    font-size: 14px;
  }
  button.fares:nth-of-type(1){
    border: 1px solid rgba(0,0,0,0.2);
  }
  button.fares:nth-of-type(2){
    border: 1px solid rgba(237, 117, 241, 0.904);
  }
  button.fares:nth-of-type(3){
    border: 1px solid rgba(144, 137, 245, 0.904);
  }
  button.fares:hover{
    color: #30C6DC;
    background-color: #f1f1f1;
    border: 1px solid #30C6DC;
  }
  time {
    font-weight: 600;
  }
  .row-wrapper{
    margin: 1rem auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .selectble-row{
      line-height: 2;
  }
  .toggled{
    background-color: #30C6DC;
    color: white;
  }
</style>
