import Vue from "vue";
import VueRouter from "vue-router";

import Welcome from "@/views/Welcome.vue";
import Dashboard from "@/views/Dashboard.vue";
import Settings from "@/views/settings/Settings.vue";
import Courses from "@/views/settings/Courses.vue";
import Profile from "@/views/settings/Profile.vue";
import Course from "@/views/course/Course.vue";
import Resources from "@/views/course/Resources.vue";
import AddResource from "@/views/AddResource.vue";
import AddCourse from "@/views/AddCourse.vue";
import Discuss from "@/views/course/Discuss.vue";
import About from "@/views/course/About.vue";

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
    path: "/settings",
    component: Settings,
    meta: {
      authorized: true,
    },
    children: [
      {
        path: "",
        redirect: {name: "profile"}
      },
      {
        name: "profile",
        path: "profile",
        component: Profile,
      },
      {
        name: "courses",
        path: "courses",
        component: Courses,
      },
    ],
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
