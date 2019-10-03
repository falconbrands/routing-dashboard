<template>
  <div class="route-list">
    <route-list-item :index="0" :start="true">
      <template v-slot:time>{{ startTime }}</template>
      <strong>{{ startAddress }}</strong>
    </route-list-item>
    <draggable v-model="stops">
      <transition-group name="stop-list" tag="div">
        <route-list-order-item v-for="(stop, $index) in stops" :key="stop.Order__c" :index="$index" :stop="stop" />
      </transition-group>
    </draggable>
    <route-list-item :index="stops.length + 1" :end="true">
      <template v-slot:time>{{ endTime }}</template>
      <strong>{{ endAddress }}</strong>
    </route-list-item>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Draggable from 'vuedraggable'
import RouteListItem from './RouteListItem.vue'
import distribution from '@/store/distribution'
import orders from '@/store/orders'
import route, { UnfinishedRouteStop } from '@/store/route'
import RouteListOrderItem from './RouteListOrderItem.vue'
import { Order } from '@/services/salesforce'
import { DateTime } from 'luxon'

@Component({
  components: {
    Draggable,
    RouteListItem,
    RouteListOrderItem,
  }
})
export default class RouteList extends Vue {

  get startAddress () {
    return route.state.route.StartLocationAddress__c
  }

  get startTime () {
    return DateTime.fromMillis(route.state.route.ScheduledStartTime__c).toLocaleString(DateTime.TIME_SIMPLE)
  }

  get endAddress () {
    return route.state.route.EndLocationAddress__c
  }

  get endTime () {
    return route.route.ScheduledEndTime__c ? DateTime.fromMillis(route.route.ScheduledEndTime__c).toLocaleString(DateTime.TIME_SIMPLE) : '-'
  }

  get stops () {
    return route.state.stops
  }

  set stops (value: UnfinishedRouteStop[]) {
    route.updateStops(value)
  }

}
</script>

<style scoped lang="scss">
.route-list {
  position: relative;

  &::before {
    position: absolute;
    top: 40px;
    bottom: 40px;
    width: 1px;
    left: 31px;
    background: #eee;
    content: "";
  }
}
.stop-list-enter-active {
  opacity: 0;
  animation: fade-in 0.5s;
}

.stop-list-leave-active {
  animation: collapse 0.5s;
}

.stop-list-move {
  transition: transform 0.6s;
}
</style>
