<template>
  <div class="route-controls">
    <div class="button-columns columns is-1 is-variable">
      <div class="column">
        <button class="button is-light is-fullwidth" :class="calculateClasses" @click="optimize">Optimize</button>
      </div>
      <div class="column">
        <button class="button is-dark is-fullwidth" :class="calculateClasses" @click="calculate">Calculate</button>
      </div>
    </div>
    <button class="button is-primary is-fullwidth" @click="save" :class="saveClasses" :disabled="!isSaveEnabled">
      Save
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import directions from '@/store/directions'
import route from '@/store/route'
import orders from '@/store/orders'
import ui from '@/store/ui'

@Component
export default class RouteControls extends Vue {

  get calculateClasses () {
    return {
      'is-loading': directions.state.directionsRequest
    }
  }

  get saveClasses () {
    return {
      'is-loading': route.state.routeSaveRequest
    }
  }

  get isSaveEnabled () {
    return !!directions.route
  }

  public optimize () {
    directions.load(true)
  }

  public calculate () {
    directions.load()
  }

  public save () {
    route.save()
  }

}
</script>

<style scoped lang="scss">
.route-controls {
  width: 100%;
}

.button-columns {
  margin-bottom: 0 !important;
}

</style>
