<template>
  <div class="route-section">
    <div class="content">
      <div class="is-size-4 has-text-weight-bold">
        Route
      </div>
      
      <div class="filters">
        <route-filters />
      </div>
      <route-list />
      
    </div>
    <div class="controls">
      <route-controls />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import RouteControls from './RouteControls.vue'
import RouteFilters from './RouteFilters.vue'
import RouteList from './RouteList.vue'

@Component({
  components: {
    RouteControls,
    RouteFilters,
    RouteList,
  }
})
export default class RouteSection extends Vue {
 
}
</script>

<style scoped lang="scss">
.route-section {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.filters {
  // padding: 20px;
  // border-bottom: 1px solid #fafafa;
  width: 100%;
  padding: 10px 0;
  // background: #4285F4;
}

.content {
  position: absolute;
  top: 0;
  bottom: 110px;
  overflow: auto;
  width: 100%;
  padding: 20px;
}

.controls {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 110px;
  display: flex;
  align-items: center;
  padding: 20px;
  background: #fff;
  border-top: 1px solid #fafafa;
}
</style>
