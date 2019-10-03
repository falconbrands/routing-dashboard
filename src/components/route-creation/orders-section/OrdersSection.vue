<template>
  <div class="orders-section">
    <div class="is-size-4 has-text-weight-bold">
      Orders ({{ count }})
    </div>
    <div class="filters">
      <order-filters />
    </div>
    <orders-list />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import OrderFilters from '@/components/route-creation/orders-section/OrderFilters.vue'
import OrdersList from '@/components/route-creation/orders-section/OrdersList.vue'
import orders from '@/store/orders'

@Component({
  components: {
    OrdersList,
    OrderFilters,
  }
})
export default class OrdersSection extends Vue {
 
  get count () {
    return orders.orders.length
  }

}
</script>

<style lang="scss" scoped>
.orders-section {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background: #fafafa;
  padding: 20px;
}

.filters {
  padding: 10px 0;
}
</style>
