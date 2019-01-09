<template>
  <section class="list">
    <div class="list-title">{{title}}</div>
    <ListSelectableRow
      v-bind:key="item[itemKey]"
      v-for="item in items"
      @buttonClicked="rowSelected(item, ...arguments)"
      :rowItem="item"
      :buttons="item[buttons]"
      :buttonName="buttonNames"
      :buttonValue="buttonValues"
      :buttonKey="buttonKeys"
      :displayedName="displayedName"
      :itemFormatter="itemFormatter"/>
  </section>
</template>

<script>
import ListSelectableRow from './ListSelectableRow'

export default {
  name: 'List',
  components: {
    ListSelectableRow
  },
  props: {
    // the default items prop shows how buttons are nested
    items: {
      default: function () {
        return [
          {
            name: 'jozsi',
            value: 'j',
            id: 0,
            buttons: [
              { name: 'high',
                value: 10,
                id: 0
              },
              { name: 'low',
                value: 5,
                id: 1
              }
            ]
          },
          {
            name: 'feri',
            value: 'f',
            id: 1,
            buttons: [
              { name: 'high', value: 10, id: 0 },
              { name: 'low', value: 5, id: 1 }
            ]
          }
        ]
      },
      type: Array
    },
    displayedName: {
      default: 'name',
      type: String
    },
    itemKey: {
      default: 'key',
      type: String
    },
    title: {
      default: 'list title',
      type: String
    },
    buttons: {
      default: 'buttons',
      type: String
    },
    buttonNames: {
      default: 'name',
      type: String
    },
    buttonValues: {
      default: 'value',
      type: String
    },
    buttonKeys: {
      default: 'id',
      type: String
    },
    itemFormatter: {
      default: function (item) {
        return JSON.stringify(item)
      },
      type: Function
    }
  },
  methods: {
    rowSelected (item, buttonName, buttonValue) {
      this.$emit('row-selected', item, buttonName, buttonValue)
    }
  }
}
</script>
<style scoped>
.list{
  margin: 10px 0;
  background-color: #f1f1f1;
  padding: 10px;
  border: 1px solid #2ECEDA;
}
.list-title{
  text-align: left;
  padding-left: 10px;
}
</style>
