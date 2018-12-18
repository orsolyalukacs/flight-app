<template>
    <date-picker v-model="value1" lang="en" :not-before="new Date()"></date-picker>
</template>
<script>
import DatePicker from 'vue2-datepicker'

export default {
     components: { DatePicker },
  data() {
    return {
      date: '',
      shortcuts: [
        {
          text: 'Today',
          onClick: () => {
            this.date = [ new Date(), new Date() ]
          }
        }
      ]
    }
  }
}
</script>
<style scoped>
</style>