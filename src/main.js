import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import jwtService from "./shared/jwt.service";

import axios from "axios";
import VueAxios from "vue-axios";
import Toasted from "vue-toasted";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/global.scss";

import { FETCH_COURSES } from "./store/course/actions.type";
import { VALIDATE } from "./store/auth/actions.type";

Vue.config.productionTip = false;

Vue.use(VueAxios, axios);
Vue.use(require("vue-moment"));
Vue.use(Toasted, {
  position: "bottom-center",
  duration: 3000,
  keepOnHover: true,
  theme: "bubble",
});

axios.defaults.baseURL = "http://localhost:5000/api";

axios.defaults.headers["Content-Type"] = "application/json;charset=UTF-8";

axios.interceptors.request.use((x) => {
  // to avoid overwriting if another interceptor
  // already defined the same object (meta)
  x.meta = x.meta || {};
  x.meta.requestStartedAt = new Date().getTime();
  return x;
});

axios.interceptors.response.use((x) => {
  console.log(
    `Execution time for: ${x.config.url} - ${new Date().getTime() -
      x.config.meta.requestStartedAt} ms`
  );
  return x;
});

if (jwtService.getToken()) {
  axios.defaults.headers["Authorization"] = `${jwtService.getToken()}`;

  Promise.all([store.dispatch(VALIDATE), store.dispatch(FETCH_COURSES)]).catch(
    (err) => {
      console.error(err);
      router.push("/welcome");
    }
  );
} else {
  router.push("/welcome");
}

router.beforeEach((to, from, next) => {
  axios.defaults.headers["Authorization"] = `${jwtService.getToken()}`;
  next();
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
