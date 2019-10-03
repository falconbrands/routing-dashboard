<template>
  <div id="app"> 
    <main class="content">
      <component :is="view" />
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import RouteCreationView from "@/components/route-creation/RouteCreationView.vue"
import application from '@/store/application'

@Component
export default class App extends Vue {

  get view () {
    return RouteCreationView
  }

  mounted () {
    application.initialize()
  }

}
</script>

<style lang="scss">
$body-size: 13px;
$body-line-height: 1.4;

@import "./styles/icons";
@import "./styles/animations";
@import '~vue-select/dist/vue-select.css';
@import '~vue-datetime/dist/vue-datetime.css';
@import '~bulma/sass/utilities/_all.sass';
@import '~bulma/sass/base/_all.sass';
@import "~bulma/sass/grid/_all.sass";
@import "~bulma/sass/elements/button.sass";
@import "~bulma/sass/elements/container.sass";

body, html {
  font-size: $body-size !important;
}

.button {
  background-image: none;
  font-family: $family-sans-serif;
  font-weight: 400;
  
  &:hover {
    text-decoration: none;
  }
}

.input {
  border-radius: 3px;
  outline: 0;
  border: 0;
  background: $white-ter;
  padding: 9px 10px 9px 10px;
  font-family: $family-sans-serif;
  width: 100%;
}

.editable {
  position: relative;
  display: inline-block;
  border-bottom: 1px dashed #ccc;
  cursor: pointer !important;

  &:hover {
    background: #fafafa;
  }
}


.label {
  font-size: 0.7em;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.vs__dropdown-toggle {
  border: 0;
  border-radius: 0;
}

.v-select {
  width: 100%;
}

.vs__actions {
  display: none;
}

.vs__dropdown-option {
  margin-left: 0;
}

.vs__selected {
  margin-left: 0;
  padding-left: 0;
}

.vs__selected-options {
  padding: 0;
}

.vs__search {
  padding-left: 0 !important;
}

.vs__dropdown-menu {
  border: 0;
}
</style>

<style lang="scss" scoped>
#app {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;

}

.header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
}

.content {
  position: relative;
  width: 100%;
  min-height: 100vh;
  // min-height: calc(100vh - 50px);
  // margin-top: 50px;
}
</style>
