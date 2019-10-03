<template>
  <div class="route-filters">
    <div class="filter">
      <departure-time-picker />
    </div>

    <div class="filter">
      <route-origin-selector />
    </div>

    <div class="filter">
      <route-destination-selector />
    </div>
    <!-- <div class="filter">
      <div class="filter-icon">
        FROM
      </div>
      <div class="filter-content">
        <vue-select taggable :value="startLocation" :options="centers"  @input="updateStartLocation" label="Address__c"/>
      </div>
    </div>
    <div class="filter">
      <div class="filter-icon">
        TO
      </div>
      <div class="filter-content">
        <vue-select taggable :value="endLocation" :options="centers"  @input="updateEndLocation" label="Address__c"/>
      </div>
    </div>
    <div class="filter">
      <div class="filter-icon">
        ON
      </div>
      <div class="filter-content">
        <datetime v-model="datetime" type="datetime" input-class="datetime" :use12-hour="true"></datetime>
      </div>
    </div> -->


    <!-- <vue-select taggable :value="startLocation" :options="centers"  @input="updateStartLocation" label="Address__c"/>
    <vue-select taggable :value="endLocation" :options="centers"  @input="updateEndLocation" label="Address__c"/>
    <datetime v-model="datetime" type="datetime" input-class="datetime" :use12-hour="true"></datetime> -->
    <!-- <div class="columns">
      <div class="column">
        
      </div>
      <div class="column">
        
      </div>

    </div> -->
    <!-- <div class="columns">
      <div class="column">
        <label class="label">Start location</label>
        
      </div>
      <div class="column">
        <label class="label">End location</label>
        <vue-select :options="['Canada', 'United States']" />
      </div>
    </div> -->
   
    
    <!-- <label class="label">Departure time</label>
    <vue-select :options="['Canada', 'United States']" /> -->
    <!-- Route will depart from
    <vue-select taggable :options="centers" label="Address__c"/>
    to
    <vue-select :options="centers" label="Address__c"/>
    and leave at <strong class="editable"><departure-time-picker /></strong> -->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import RouteOriginSelector from './RouteOriginSelector.vue'
import RouteDestinationSelector from './RouteDestinationSelector.vue'
import DepartureTimePicker from './DepartureTimePicker.vue'
import VueSelect from 'vue-select'
import distribution from '@/store/distribution'
import route from '@/store/route'
import { DistributionCenter } from '@/services/salesforce'
import { DateTime } from 'luxon'

@Component({
  components: {
    RouteOriginSelector,
    RouteDestinationSelector,
    DepartureTimePicker,
    VueSelect,
  }
})
export default class RouteFilters extends Vue {

  // get centers () {
  //   return distribution.state.centers
  // }

  // get startLocation () {
  //   return route.state.route.StartLocationAddress__c || ''
  // }

  // public updateStartLocation (value: DistributionCenter) {
  //   route.updateStartLocationAddress(distribution.getAddressFromCenter(value))
  // }

  // get endLocation () {
  //   return route.state.route.EndLocationAddress__c || ''
  // }

  // public updateEndLocation (value: DistributionCenter) {
  //   route.updateEndLocationAddress(distribution.getAddressFromCenter(value))
  // }

  // get datetime () {
  //   return DateTime.fromMillis(route.state.route.ScheduledStartTime__c).toISO()
  // }

  // set datetime (value: string) {
  //   route.updateScheduledStartTime(DateTime.fromISO(value).toMillis())
  // }

}
</script>

<style scoped lang="scss">
.route-filters {
  width: 100%;
}

.label {
  display: inline-block;
  margin-bottom: 5px;
}

// .v-select {
//   display: inline-block;
//   min-width: 250px;
//   margin: 0 5px;
// }

.filter {
  // display: flex;
  // border-bottom: 1px solid #eee;
  // height: 50px;
}

.filter-icon {
  flex: 0 0 50px;
  min-width: 50px;
  border-right: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75em;
  text-transform: uppercase;
  color: #ccc;
}

.filter-content {
  display: flex;
  align-items: center;
  flex: 1;
}
</style>
