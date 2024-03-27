import Vue from "vue";
import App from "./App.vue";
import "./index.css";

import store from "./store";

Vue.config.productionTip = false;

store.dispatch("fetchProducts");

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
