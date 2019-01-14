<template>
  <section class="selectable-row">
    <div class="row-wrapper">
        <time class="selectable-body">
          {{itemFormatter(rowItem)}}
        </time>
        <button class="fares"
        v-bind:key="button[buttonKey]"
        v-for="button in buttons"
        v-bind:class="{toggled: button[buttonKey] === activeKey
        && rowItem[itemKey] === activeRow}"
        v-if="rowItem.remainingTickets > 0"
        @click="buttonClicked(button[buttonName], button[buttonValue],
        button[buttonKey])">
            <span class="ticket-type"><em>{{button[buttonName]}}</em></span>
            <span class="ticket-price">{{button[buttonValue]}} €</span>
        </button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ListSelectableRow',
  data () {
    return {
      activeKey: null
    }
  },
  props: {
    rowItem: {
      default: function () {
        return { name: 'itemname', value: 'i', id: 2 }
      },
      type: Object
    },
    itemKey: {
      default: 'key',
      type: String
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
    },
    activeRow: {
      default: 'row',
      type: String
    }
  },
  methods: {
    buttonClicked (buttonName, buttonValue, buttonKey) {
      this.$emit('buttonClicked', buttonName, buttonValue)
      this.activeKey = buttonKey
    }
  }
}
</script>
<style scoped>
  button.fares{
    font-size: 12px;
    margin: 0 2px;
    width: 105px;
    height: 40px;
    padding: 5px 10px;
  }
  time {
    font-weight: 600;
    font-size: 14px;
    padding: 10px;
    display: inline;
  }
  .row-wrapper{
    margin: 15px auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .selectble-row{
    line-height: 2;
  }
  .toggled{
    background-color: white;
    color: black;
  }
  span{
    display: block;
  }
  .ticket-type{
    font-size: 10px;
    margin-bottom: 5px;
  }
  .ticket-price{
    font-size: 14px;
  }
</style>
