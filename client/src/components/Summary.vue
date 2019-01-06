<template>
  <div class="summary">
    <div class="summary-text" @click="click">{{textFormatter(data)}}</div>
  </div>
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
    },
    textFormatter: {
      default: function (data) {
        return data
      },
      type: Function
    }
  },
  methods: {
    click: function () {
      console.log(this)
      console.log(this.textFormatter(this.data))
    }
  }
}
</script>
