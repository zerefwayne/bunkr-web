import Vue from "vue";
import VueRouter from "vue-router";

import store from "../store";

import adminRoutes from "./admin.routes";
import courseRoutes from "./course.routes";
import baseRoutes from "./base.routes";
import settingsRoutes from "./settings.routes";

Vue.use(VueRouter);

let routes = [
  ...baseRoutes,
  ...adminRoutes,
  ...courseRoutes,
  ...settingsRoutes,
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.guest)) {
    if (to.matched.some((record) => record.meta.unauthorized)) {
      if (store.state.auth.isAuthenticated) {
        next(false);
      } else {
        next();
      }
      return;
    }
    next();
  } else if (to.matched.some((record) => record.meta.authorized)) {
    if (store.state.auth.isAuthenticated) {
      if (to.matched.some((record) => record.meta.admin)) {
        if (store.getters.isAdmin) {
          next();
          return;
        } else {
          alert("Not allowed!");
          next("/");
        }
      }

      next();
    } else {
      next("/welcome");
    }
  }
});

export default router;
