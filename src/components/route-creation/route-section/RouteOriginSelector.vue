<template>
  <input-field label="Route origin">
    <vue-select taggable :value="startLocation" :options="centers"  @input="updateStartLocation" label="Address__c"/>
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
export default class RouteOriginSelector extends Vue {
 
  get centers () {
    return distribution.state.centers
  }

  get startLocation () {
    return route.state.route.StartLocationAddress__c || ''
  }

  public updateStartLocation (value: DistributionCenter) {
    route.updateStartLocationAddress(distribution.getAddressFromCenter(value))
  }

}
</script>

<style scoped lang="scss">

</style>
