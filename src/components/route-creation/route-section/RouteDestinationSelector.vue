<template>
  <input-field label="Route Destination">
    <vue-select taggable :value="endLocation" :options="centers"  @input="updateEndLocation" label="Address__c"/>
  </input-field>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import distribution from '@/store/distribution'
import route from '@/store/route'
import InputField from '@/components/shared/InputField.vue'
import VueSelect from 'vue-select'
import { DistributionCenter } from '@/services/salesforce'

@Component({
  components: {
    InputField,
    VueSelect,
  }
})
export default class RouteDestinationSelector extends Vue {
 
  get centers () {
    return distribution.state.centers
  }

  get endLocation () {
    return route.state.route.EndLocationAddress__c || ''
  }

  public updateEndLocation (value: DistributionCenter) {
    route.updateEndLocationAddress(distribution.getAddressFromCenter(value))
  }

}
</script>

<style scoped lang="scss">

</style>
