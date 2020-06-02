import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import jwtService from "./shared/jwt.service";

import axios from "axios";
import VueAxios from "vue-axios";

import "bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/global.scss";

import { VALIDATE } from "./store/auth/actions.type";
import { FETCH_COURSES } from "./store/course/actions.type";

Vue.config.productionTip = false;

Vue.use(VueAxios, axios);

axios.defaults.baseURL = "http://localhost:5000/api";

axios.defaults.headers["Content-Type"] = "application/json;charset=UTF-8";

if (jwtService.getToken()) {
  axios.defaults.headers["Authorization"] = `${jwtService.getToken()}`;

  Promise.all([store.dispatch(FETCH_COURSES)])
    .catch((err) => {
      console.error(err);
    });
}

router.beforeEach((to, from, next) => {
  axios.defaults.headers["Authorization"] = `${jwtService.getToken()}`;

  Promise.all([store.dispatch(VALIDATE)])
    .then(() => {
      next();
    })
    .catch(() => {
      console.log("Session expired.");
      next("/welcome");
    });
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
