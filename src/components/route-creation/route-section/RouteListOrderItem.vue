<template>
  <route-list-item :index="index + 1">
    <template v-slot:time>
      <span>{{ estimatedArrivalTimeText }} - {{estimatedDepartureTimeText }}</span>
    </template>
    <template>
      <order-detail :order="stop.Order__r"/>

      <div class="order-info"  v-if="stop.AdditionalOrder1__r">
        <order-detail :order="stop.AdditionalOrder1__r"/>
      </div>

      <div class="order-info" v-if="stop.AdditionalOrder2__r">
        <order-detail :order="stop.AdditionalOrder2__r" />
      </div>
      
      <div class="controls">
        <button class="button is-small is-light" @click="remove"><span class="remove"></span>Remove</button>
      </div>

    </template>
  </route-list-item>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Order, DistributionCenter } from '@/services/salesforce'
import RouteListItem from './RouteListItem.vue'
import OrderDetail from '../orders-section/OrderDetail.vue'
import directions from '@/store/directions'
import route, { UnfinishedRouteStop } from '@/store/route'
import orders from '@/store/orders'
import { DateTime } from 'luxon';

@Component({
  components: {
    RouteListItem,
    OrderDetail,
  }
})
export default class RouteListOrderItem extends Vue {
  @Prop(Number) readonly index!: number
  @Prop(Object) readonly stop!: UnfinishedRouteStop

  get estimatedArrivalTime () {
    return route.stops[this.index].EstimatedArrivalTime__c
  }

  get estimatedArrivalTimeText () {
    return this.estimatedArrivalTime ? DateTime.fromMillis(this.estimatedArrivalTime).toLocaleString(DateTime.TIME_SIMPLE) : null
  }

  get estimatedDepartureTime () {
    return route.stops[this.index].EstimatedDepartureTime__c
  }

  get estimatedDepartureTimeText () {
    return this.estimatedDepartureTime ? DateTime.fromMillis(this.estimatedDepartureTime).toLocaleString(DateTime.TIME_SIMPLE) : null
  }

  get addressText () {
    return orders.getAddressFromOrder(this.stop.Order__r)
  }

  public remove () {
    if (this.stop.Order__r) {
      orders.add(this.stop.Order__r)
    }

    if (this.stop.AdditionalOrder1__r) {
      orders.add(this.stop.AdditionalOrder1__r)
    }

    if (this.stop.AdditionalOrder2__r) {
      orders.add(this.stop.AdditionalOrder2__r)
    }

    route.removeStop(this.stop)
  }

}
</script>

<style scoped lang="scss">

.remove {
  position: relative;
  display: inline-block;
  // position: absolute;
  // top: 24px;
  // left: -45px;
  // cursor: pointer;
  width: 10px;
  height: 10px;
  margin-top: 2px;
  // position: absolute;
  // top: 20;
  // right: 30px;
  // background: #eee;

  &::before, &::after {
    position: absolute;
    // top: -9px;
    left: 0;
    width: 1px;
    height: 8px;
    background: #888;
    content: '';
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }
}

.controls {
  margin-top: 15px;
}

.order-info {
  margin-top: 15px;
  padding-top: 10px;
  border-top: 1px dashed #eee;
}
</style>
