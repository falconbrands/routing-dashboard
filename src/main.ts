import Vue from "vue";
import App from "./App.vue";
import DateTime from 'vue-datetime'

Vue.use(DateTime)

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount("#app");
