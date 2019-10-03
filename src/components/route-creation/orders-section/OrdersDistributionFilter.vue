<template>
  <input-field label="Distribution Center" label-background-color="#fafafa">
    <vue-select :value="center" :options="centers"  @input="updateSelectedCenter" label="Name"/>
  </input-field>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import distribution from '@/store/distribution'
import orders from '@/store/orders'
import VueSelect from 'vue-select'
import InputField from '@/components/shared/InputField.vue'
import { DistributionCenter } from '@/services/salesforce'

@Component({
  components: {
    InputField,
    VueSelect,
  }
})
export default class OrdersDistributionFilter extends Vue {
 
  get centers () {
    return distribution.state.centers
  }

  get center () {
    return distribution.state.centerSelected
  }

  public updateSelectedCenter (value: DistributionCenter) {
    distribution.updateSelectedCenter(value)
  }

}
</script>

<style scoped lang="scss">

</style>
