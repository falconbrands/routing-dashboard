<template>
  <div class="order-items-empty" v-if="orders.length === 0">
    <span>No orders to view.</span>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import orders from '@/store/orders'

@Component
export default class OrdersListEmpty extends Vue {
  
  get orders () {
    return orders.orders
  }

}
</script>

<style scoped lang="scss">
.order-items-empty {
  padding: 30px;
  text-align: center;
}
</style>
