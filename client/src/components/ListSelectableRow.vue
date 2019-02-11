<script>
export default {
  name: 'ListSelectableRow',
  data: () => ({
    activeKey: null,
  }),
  props: {
    rowItem: {
      default: () => ({ name: 'itemname', value: 'i', id: 2 }),
      type: Object,
    },
    itemKey: {
      default: 'key',
      type: String,
    },
    itemFormatter: {
      default: rowItem => JSON.stringify(rowItem),
      type: Function,
    },
    buttons: {
      default: () => [
        { name: 'low', value: '100', id: 0 },
        { name: 'high', value: '200', id: 1 },
      ],
      type: Array,
    },
    displayedName: {
      default: 'name',
      type: String,
    },
    buttonName: {
      default: 'name',
      type: String,
    },
    buttonValue: {
      default: 'value',
      type: String,
    },
    buttonKey: {
      default: 'id',
      type: String,
    },
    activeRow: {
      default: 'row',
      type: String,
    },
  },
  methods: {
    buttonClicked(buttonName, buttonValue, buttonKey) {
      this.$emit('buttonClicked', buttonName, buttonValue);
      this.activeKey = buttonKey;
    },
  },
  computed: {
    remainingTickets() {
      if (this.rowItem.remainingTickets > 0) {
        return true;
      }
      return false;
    },
  },
};
</script>

<template>
  <section class="selectable-row">
    <div class="row-wrapper">
      <time class="selectable-body"> {{ itemFormatter(rowItem) }} </time>
      <ul v-if="remainingTickets">
        <button
            class="fares"
            :key="button[buttonKey]"
            v-for="button in buttons"
            :class="{ toggled: button[buttonKey] === activeKey && rowItem[itemKey] === activeRow }"
            @click="buttonClicked(button[buttonName], button[buttonValue], button[buttonKey])"
        >
          <span class="ticket-type"
          ><em>{{ button[buttonName] }}</em></span
          >
          <span class="ticket-price">{{ button[buttonValue] }} €</span>
        </button>
      </ul>
    </div>
  </section>
</template>

<style scoped lang="scss">
@import '../styles/main.scss';

button.fares {
  font-size: 12px;
  margin: 0 2px;
  width: 105px;
  height: 40px;
  padding: 5px 10px;
  flex-grow: 1;
  @include tablet() {
    width: 60px;
    padding: 5px;
  }
  @include phone() {
    width: 45px;
    padding: 5px;
    font-size: 10px;
  }
}
time {
  font-weight: 600;
  font-size: 14px;
  padding: 10px;
  display: inline;
}
.row-wrapper {
  margin: 15px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @include tablet() {
    justify-content: space-evenly;
  }
}
.selectable-row {
  line-height: 2;
}
.toggled {
  background-color: white;
  color: black;
}
span {
  display: block;
}
.ticket-type {
  font-size: 10px;
  margin-bottom: 5px;
}
.ticket-price {
  font-size: 14px;
  @include phone() {
    font-size: 12px;
  }
}
ul {
  margin-block-end: 0;
  margin-block-start: 0;
  padding-inline-start: 0;
  width: 75%;
  display: flex;
  justify-content: space-between;
}
</style>
