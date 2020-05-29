import Vue from "vue";
import VueRouter from "vue-router";

import Login from "@/views/Login.vue";
import Signup from "@/views/Signup.vue";
import Dashboard from "@/views/Dashboard.vue";
import Profile from "@/views/Profile.vue";
import Course from "@/views/Course.vue";
import Resources from "@/views/Resources.vue";
import Discuss from "@/views/Discuss.vue";

import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    name: "login",
    path: "/login",
    component: Login,
    meta: {
      guest: true,
      unauthorized: true,
    },
  },
  {
    name: "signup",
    path: "/signup",
    component: Signup,
    meta: {
      guest: true,
      unauthorized: true,
    },
  },
  {
    name: "dashboard",
    path: "/",
    component: Dashboard,
    meta: {
      authorized: true,
    },
  },
  {
    name: "profile",
    path: "/profile",
    component: Profile,
    meta: {
      authorized: true,
    },
  },
  {
    name: "course",
    path: "/course/:slug",
    component: Course,
    meta: {
      authorized: true,
    },
    children: [
      {
        path: "",
        redirect: "resources",
      },
      {
        path: "resources",
        component: Resources,
      },
      {
        path: "discuss",
        component: Discuss,
      },
      {
        path: "**",
        redirect: "resources",
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.guest)) {
    if (to.matched.some((record) => record.meta.unauthorized)) {
      if (store.state.loggedIn) {
        next(false);
      } else {
        next();
      }
      return;
    }
    next();
  } else if (to.matched.some((record) => record.meta.authorized)) {
    if (store.state.loggedIn) {
      next();
    } else {
      next("/login");
    }
  }
});

export default router;
