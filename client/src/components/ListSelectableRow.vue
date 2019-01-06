<template>
  <div class="selectablerow">
    <div class="selectablerow-body">
        {{rowItem[displayedName]}}
    </div>
    <button
      v-bind:key="button.id"
      v-for="button in buttons"
      @click="buttonClicked(button[buttonName], button[buttonValue])">
        {{button[buttonName]}}, {{button[buttonValue]}}
    </button>
  </div>
</template>

<script>
export default {
  name: 'ListSelectableRow',
  props: {
    rowItem: {
      default: function () {
        return { name: 'sanyi', value: 's', id: 2 }
      },
      type: Object
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
  }
}
</script>
