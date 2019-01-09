<template>
  <section class="list">
    <div class="spinner-wrapper">
      <div class="list-title">{{title}}</div>
      <div class="spinner" v-show="isLoading">
        <svg width="55px"  height="55px"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="lds-ellipsis" style="background: none;"><!--circle(cx="16",cy="50",r="10")--><circle cx="84" cy="50" r="0" fill="#3b4368"><animate attributeName="r" values="8;0;0;0;0" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="1.8s" repeatCount="indefinite" begin="0s"></animate><animate attributeName="cx" values="84;84;84;84;84" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="1.8s" repeatCount="indefinite" begin="0s"></animate></circle><circle cx="84" cy="50" r="0.568927" fill="#5e6fa3"><animate attributeName="r" values="0;8;8;8;0" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="1.8s" repeatCount="indefinite" begin="-0.9s"></animate><animate attributeName="cx" values="16;16;50;84;84" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="1.8s" repeatCount="indefinite" begin="-0.9s"></animate></circle><circle cx="81.5821" cy="50" r="8" fill="#689cc5"><animate attributeName="r" values="0;8;8;8;0" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="1.8s" repeatCount="indefinite" begin="-0.45s"></animate><animate attributeName="cx" values="16;16;50;84;84" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="1.8s" repeatCount="indefinite" begin="-0.45s"></animate></circle><circle cx="47.5821" cy="50" r="8" fill="#93dbe9"><animate attributeName="r" values="0;8;8;8;0" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="1.8s" repeatCount="indefinite" begin="0s"></animate><animate attributeName="cx" values="16;16;50;84;84" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="1.8s" repeatCount="indefinite" begin="0s"></animate></circle><circle cx="16" cy="50" r="7.43107" fill="#3b4368"><animate attributeName="r" values="0;0;8;8;8" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="1.8s" repeatCount="indefinite" begin="0s"></animate><animate attributeName="cx" values="16;16;16;50;84" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="1.8s" repeatCount="indefinite" begin="0s"></animate></circle></svg>
      </div>
    </div>
    <ListSelectableRow
      v-bind:key="item[itemKey]"
      v-for="item in items"
      @buttonClicked="rowSelected(item, ...arguments)"
      :rowItem="item"
      :itemKey="itemKey"
      :activeRow="activeRow"
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
  data () {
    return {
      activeRow: 'row'
    }
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
    },
    isLoading: {
      default: false,
      tpye: Boolean
    }
  },
  methods: {
    rowSelected (item, buttonName, buttonValue) {
      this.$emit('row-selected', item, buttonName, buttonValue)
      this.activeRow = item[this.itemKey]
    }
  }
}
</script>
<style scoped>
.list{
  margin: 10px 0 0 0;
  background-color: rgba(255,255,255,0.6);
  padding: 10px;
}
.list-title{
  text-align: left;
  padding-left: 10px;
  display: flex;
  align-items: center;
  height: 55px;
}
.spinner-wrapper{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.spinner{
  justify-content: flex-end;
}
</style>
