import Vue from "vue";
import VueRouter from "vue-router";

import Welcome from "@/views/Welcome.vue";
import Dashboard from "@/views/Dashboard.vue";
import Profile from "@/views/Profile.vue";
import Course from "@/views/Course.vue";
import Resources from "@/views/Resources.vue";
import AddResource from "@/views/AddResource.vue";
import AddCourse from "@/views/AddCourse.vue";
import Discuss from "@/views/Discuss.vue";
import About from "@/views/About.vue";

import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    name: "welcome",
    path: "/welcome",
    component: Welcome,
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
    name: "resource-new",
    path: "/resource/new",
    component: AddResource,
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
    name: "course-new",
    path: "/course/new",
    exact: true,
    component: AddCourse,
    meta: {
      authorized: true,
    },
  },
  {
    path: "/course/:slug",
    component: Course,
    meta: {
      authorized: true,
    },
    children: [
      {
        path: "",
        name: "course",
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
        path: "about",
        component: About,
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
      next();
    } else {
      next("/welcome");
    }
  }
});

export default router;
