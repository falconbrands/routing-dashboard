<template>
  <input-field label="Delivery Zone" label-background-color="#fafafa">
    <vue-select :value="zone" :options="zones"  @input="updateZoneFilter"/>
  </input-field>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import zones from '@/store/zones'
import orders from '@/store/orders'
import VueSelect from 'vue-select'
import InputField from '@/components/shared/InputField.vue'

@Component({
  components: {
    InputField,
    VueSelect,
  }
})
export default class OrdersZoneFilter extends Vue {
 
  get zones () {
    return orders.zones
  }

  get zone () {
    return orders.state.zoneFilter
  }

  public updateZoneFilter (value: string) {
    orders.updateZoneFilter(value)
  }

}
</script>

<style scoped lang="scss">

</style>
