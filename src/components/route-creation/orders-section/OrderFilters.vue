<template>
  <div class="order-filters">
    <div class="filter">
      <orders-distribution-filter />
    </div>

    <div class="filter">
      <orders-date-filter />
    </div>

    <div class="filter">
      <orders-zone-filter />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import OrdersDateFilter from './OrdersDateFilter.vue'
import OrdersZoneFilter from './OrdersZoneFilter.vue'
import OrdersDistributionFilter from './OrdersDistributionFilter.vue'
import zones from '@/store/zones'
import orders from '@/store/orders'

@Component({
  components: {
    OrdersDateFilter,
    OrdersZoneFilter,
    OrdersDistributionFilter,
  }
})
export default class OrderFilters extends Vue {


}
</script>

<style scoped lang="scss">
.filter {
  margin-bottom: 15px;
}
</style>
