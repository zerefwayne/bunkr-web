import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import axios from "axios";
import VueAxios from "vue-axios";

import { getItem } from "./utils";

import "bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/global.scss";

Vue.config.productionTip = false;

Vue.use(VueAxios, axios);

axios.defaults.baseURL = "http://localhost:5000/api";

axios.defaults.headers = {
  "Content-Type": "application/json;charset=UTF-8",
};

let accessToken = getItem("AUTH_TOKEN");

if (accessToken) {
  axios.defaults.headers["Authorization"] = accessToken;
  store.dispatch("INIT_APP");
}

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
