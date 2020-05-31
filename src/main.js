import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import axios from "axios";
import VueAxios from "vue-axios";

import "bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/global.scss";

import { VALIDATE } from "./store/auth/actions.type";

Vue.config.productionTip = false;

Vue.use(VueAxios, axios);

axios.defaults.baseURL = "http://localhost:5000/api";

axios.defaults.headers = {
  "Content-Type": "application/json;charset=UTF-8",
};

router.beforeEach((to, from, next) =>
  Promise.all([store.dispatch(VALIDATE)])
    .then(() => {
      next();
    })
    .catch(() => {
      next("/login");
    })
);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
