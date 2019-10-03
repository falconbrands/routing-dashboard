<template>
  <div class="orders-list-item" @click="add">
    <div class="details">
      <order-detail :order="order" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Order } from '@/services/salesforce'
import orders from '@/store/orders'
import route from '@/store/route'
import OrderDetail from '@/components/route-creation/orders-section/OrderDetail.vue'

@Component({
  components: {
    OrderDetail
  }
})
export default class OrdersListItem extends Vue {
  @Prop(Object) order!: Order
  
  public add () {
    route.addOrder(this.order)
    orders.remove(this.order)
  }

}
</script>

<style scoped lang="scss">
.orders-list-item {
  position: relative;
  display: flex;
  align-items: center;
  // border: 1px solid transparent;
  padding: 15px 20px;
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: 1px;
  background :#fff;
  transition: all 0.2s;
  overflow: hidden;

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: #00d1b2;
    transition: all 0.3s;
    transform: translate3d(-5px, 0, 0);
    content: "";
  }

  &:hover {
    &::before {
      transform: translate3d(0, 0, 0);
    }

    .details {
      transform: translate3d(5px, 0, 0);
    }
  }
}

.details {
  width: 100%;
  transition: all 0.3s;
}
</style>
