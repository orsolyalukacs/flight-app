<template>
  <section class="flight-select">
    <h2 class="selector-title">{{title}}</h2>
    <select v-model="selected" @change="onChange" class="selector-list">
      <option value="" disabled hidden selected>{{placeholder}}</option>
      <option
        v-bind:key="item[itemKey]"
        v-for="item in items"
        v-bind:value="itemValue=='' ? item : item[itemValue]">
        {{item.shortName}}
      </option>
    </select>
  </section>
</template>

<script>
export default {
  name: 'Selector',
  data () {
    return {
      selected: ''
    }
  },
  props: {
    items: {
      default: function () {
        return [
          { name: 'jozsi', value: 'j', id: 0 },
          { name: 'feri', value: 'f', id: 1 }
        ]
      },
      type: Array
    },
    placeholder: {
      default: 'Select an item...',
      type: String
    },
    initialSelection: {
      default: ''
    },
    value: {
      default: function () {
        return {}
      }
    },
    displayedName: {
      default: 'name',
      type: String
    },
    itemValue: {
      default: 'value',
      type: String
    },
    itemKey: {
      default: 'key',
      type: String
    },
    title: {
      default: 'title',
      type: String
    }
  },
  created () {
    if (this.initialSelection) {
      this.selected = this.initialSelection
    }
  },
  methods: {
    onChange () {
      this.$emit('input', this.selected)
      console.log(this.items)
    }
  },
  watch: {
    value: function () {
      this.selected = this.value
    }
  }
}
</script>
<style>
  h1{
    font-size: 1.6rem;
    color: #1c0e75;
  }
  h2{
    display: inline-block;
    font-weight: bold;
    color: #150773;
    font-size: .8rem;
  }
  button:hover{
    color: #261394;
    background-color: rgba(255,255,255,0.6)
  }
  select{
    width: 100%;
    max-width: 160px;
    background-color:white;
    height: 34px;
    border-radius: 4px;
  }
  option{
    background-color: white;
  }
  input{
    width: 50%;
    display: block;
  }
  .selector-title{
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: flex-start;
  }
  .flight-select{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    min-width: 160px;
    padding-right: 20px;
  }
</style>
