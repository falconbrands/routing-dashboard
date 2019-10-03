<template>
  <input-field label="Departure Time">
    <datetime v-model="datetime" type="datetime" input-class="datetime" :use12-hour="true"></datetime>
  </input-field>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import route from '@/store/route'
import InputField from '@/components/shared/InputField.vue'
import VueSelect from 'vue-select'
import { DistributionCenter } from '@/services/salesforce'
import { DateTime } from 'luxon'

@Component({
  components: {
    InputField,
    VueSelect,
  }
})
export default class RouteDestinationSelector extends Vue {
 
  get datetime () {
    return DateTime.fromMillis(route.state.route.ScheduledStartTime__c).toISO()
  }

  set datetime (value: string) {
    route.updateScheduledStartTime(DateTime.fromISO(value).toMillis())
  }

}
</script>

<style scoped lang="scss">

</style>
