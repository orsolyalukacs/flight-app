<script>
export default {
  name: 'FlightSelector',
  data() {
    return {
      selected: '',
    };
  },
  props: {
    items: {
      default: () => [{ name: 'jozsi', value: 'j', id: 0 }, { name: 'feri', value: 'f', id: 1 }],
      type: Array,
    },

    placeholder: {
      default: 'Select an item...',
      type: String,
    },

    initialSelection: {
      default: '',
    },

    value: {
      default: () => {},
    },

    displayedName: {
      default: 'name',
      type: String,
    },

    itemValue: {
      default: 'value',
      type: String,
    },

    itemKey: {
      default: 'key',
      type: String,
    },

    title: {
      default: 'title',
      type: String,
    },
  },
  created() {
    if (this.initialSelection) {
      this.selected = this.initialSelection;
    }
  },
  methods: {
    onChange() {
      this.$emit('input', this.selected);
    },
  },
  watch: {
    value: () => {
      this.selected = this.value;
    },
  },
};
</script>

<template>
  <section class="flight-select">
    <h2 class="selector-title">{{ title }}</h2>
    <select v-model="selected" @change="onChange" class="selector-list">
      <option value="" disabled hidden selected>{{ placeholder }}</option>
      <option
          :key="item[itemKey]"
          v-for="item in items"
          :value="itemValue == '' ? item : item[itemValue]"
      >
        {{ item.shortName }}
      </option>
    </select>
  </section>
</template>

<style lang="scss">
.flight-select {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 160px;
  padding-right: 20px;
  .selector-list {
    width: 100%;
    max-width: 160px;
    background-color: white;
    height: 34px;
    border-radius: 4px;
    border: transparent;
  }
  option {
    background-color: white;
  }
  .selector-title {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
