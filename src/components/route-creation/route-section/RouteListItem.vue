<template>
  <div class="route-list-item" :class="classes">
    <div class="wrapper">
      <div class="dot">
        <slot name="dot">{{ letter }}</slot>
      </div>
      <div class="content">
        <div class="time">
          <slot name="time">TBD</slot>
        </div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Order, DistributionCenter } from '@/services/salesforce'
import orders from '@/store/orders'
import { getLetterWithIndex } from '@/services/utils'

@Component({
  components: {
  
  }
})
export default class RouteListItem extends Vue {
  @Prop(Number) readonly index!: number
  @Prop(Boolean) start!: boolean
  @Prop(Boolean) end!: boolean

  get letter () {
    return getLetterWithIndex(this.index)
  }

  get classes () {
    return {
      'is-start': this.start,
      'is-end': this.end,
    }
  }

}
</script>

<style scoped lang="scss">
.route-list-item {
  position: relative;
  overflow-y: hidden;
  // border-top: 1px solid #eeee;
  
  // &::before {
  //   position: absolute;
  //   top: 0;
  //   left: 31px;
  //   bottom: 0;
  //   width: 1px;
  //   background: #eee;
  //   // border-left: px dotted #eee;
  //   content: "";
  // }

  // &.is-start::before {
  //   top: 50%;
  // }

  // &.is-end::before {
  //   bottom: 50%;
  // }
}

.wrapper {
  position: relative;
  display: flex;
  padding: 20px;
}

.dot {
  position: relative;
  width: 24px;
  height: 24px;
  border-radius: 100%;
  background: #ea4335;
  font-size: 0.85em;
  font-weight: 900;
  color: #fff;
  box-shadow: 0 0 0 2px #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 7px;
}

.content {
  position: relative;
  padding-left: 15px;
  flex: 1;
}

.time {
  font-size: 0.85em;
  padding-bottom: 1px;
}

.remove {
  margin-left: 5px;
}
</style>
