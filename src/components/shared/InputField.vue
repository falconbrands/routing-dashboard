<template>
  <div class="input-field">
    <div class="input-field-label" :style="labelStyles">
      {{ label }}
    </div>
    <div class="input-field-content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"

@Component
export default class InputField extends Vue {
  @Prop(String) label!: string
  @Prop(String) labelBackgroundColor!: string

  get labelStyles () {
    if (this.labelBackgroundColor) {
      return {
        backgroundColor: this.labelBackgroundColor
      }
    }
  }

}
</script>

<style scoped lang="scss">

.input-field {
  position: relative;
  width: 100%;
  position: relative;
  padding: 7px 15px;
  margin: 20px 0;
  border: 1px dashed #ddd;
}

.input-field-label {
  position: absolute;
  font-size: 0.75em;
  text-transform: uppercase;
  letter-spacing: 0.7px;
  font-weight: 600;
  top: -10px;
  left: 10px;
  background: #fff;
  padding: 2px 5px;
  text-transform: uppercase;
  font-size: 0.75em;
  letter-spacing: 0.6px;
  font-weight: 700;
  color: #ccc;
}

.input-field-content {
  width: 100%;
  font-size: 14px !important;
}

/deep/ .vdatetime-input {
  background: none;
  border: 0;
  padding: 6px 0;
  font-size: 13px;
}
</style>
