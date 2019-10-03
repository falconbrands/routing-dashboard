<template>
  <div class="orders-list">
    <orders-list-item :order="order" v-for="order in orders" :key="order.OrderNumber" />
    <orders-list-empty />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import OrdersListItem from './OrdersListItem.vue'
import OrdersListEmpty from './OrdersListEmpty.vue'
import orders from '@/store/orders'

@Component({
  components: {
    OrdersListItem,
    OrdersListEmpty,
  }
})
export default class OrdersList extends Vue {
  
  get orders () {
    return orders.orders
  }

}
</script>

<style scoped lang="scss">
.orders-list {
  padding-bottom: 25px;
}
</style>
