<template>
  <div class="order-detail">
    <div class="title">{{ formattedAddress }}</div>
    <div class="columns">
      <div class="column">
        <div class="description">
          <div class="description-label">Order #</div>
          <div class="description-text">{{ order.OrderNumber }}</div>
          <div class="description-text" v-for="orderId in additionalOrderIds" :key="orderId">{{ orderId  }}</div>
        </div>
      </div>
      <div class="column">
        <div class="description">
          <div class="description-label">Account</div>
          <div class="description-text">{{ order.Account.DBA__c }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Order } from '@/services/salesforce'

@Component
export default class OrderDetail extends Vue {
  @Prop(Object) order!: Order
  @Prop(String) additionalIds!: String

  get formattedAddress () {
    return this.order.ShippingStreet + ' ' + this.order.ShippingCity
  }

  get additionalOrderIds () {
    if (!this.additionalIds) {
      return []
    }

    return this.additionalIds.split(',')
  }

}
</script>

<style scoped lang="scss">
.order-detail {
  width: 100%;
}

.order-id {
  color: #aaa;
  font-size: 0.9em;
}

.title {
  font-weight: 700;
}

.description {
  padding-top: 10px;
}

.description-label {
  color: #aaa;
  font-size: 0.8em;
}

.description-text {
  font-size: 0.9em;
}
</style>
