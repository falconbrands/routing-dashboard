<template>
  <div class="map-section"></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import map from '@/services/map'

@Component
export default class MapSection extends Vue {

  mounted () {
    map.initialize(this.$el)
  }

}
</script>

<style scoped lang="scss">
.map-section {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #f3f2ef;
}
</style>
