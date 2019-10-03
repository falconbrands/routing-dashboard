<template>
  <input-field label="Scheduled Delivery Date" label-background-color="#fafafa">
    <datetime v-model="date" type="date"></datetime>
  </input-field>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import OrdersStore from '@/store/orders'
import InputField from '@/components/shared/InputField.vue'
import { DateTime } from 'luxon'

@Component({
  components: {
    InputField,
  }
})
export default class OrdersDateFilter extends Vue {
 
  get date () {
    return OrdersStore.state.dateFilter.toString()
  }

  set date (value: any) {
    OrdersStore.updateDateFilter(DateTime.fromISO(value))
  }

  get dateText () {
    return OrdersStore.state.dateFilter.toLocaleString()
  }

}
</script>

<style scoped lang="scss">

</style>
