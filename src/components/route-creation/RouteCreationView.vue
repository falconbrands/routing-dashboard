<template>
  <div class="route-creation-view">
    <section class="section">
      <orders-section />
    </section>
    <section class="section">
      <route-section />
    </section>
    <section class="section">
      <map-section />
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import OrdersSection from '@/components/route-creation/orders-section/OrdersSection.vue'
import RouteSection from "@/components/route-creation/route-section/RouteSection.vue"
import MapSection from "@/components/route-creation/map-section/MapSection.vue"

@Component({
  components: {
    OrdersSection,
    RouteSection,
    MapSection,
  }
})
export default class RouteCreationView extends Vue {

 
}
</script>

<style scoped lang="scss">
.route-creation-view {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  bottom: 0;
  display: flex;
}

.section {
  position: relative;
  width: 33.33333%;
}

</style>
