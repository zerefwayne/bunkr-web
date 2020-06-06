import Vue from "vue";
import VueRouter from "vue-router";

import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    name: "welcome",
    path: "/welcome",
    component: () =>
      import(/* webpackChunkName: "init" */ "../views/Welcome.vue"),
    meta: {
      guest: true,
      unauthorized: true,
    },
  },
  {
    name: "dashboard",
    path: "/",
    component: () =>
      import(/* webpackChunkName: "init" */ "../views/Dashboard.vue"),
    meta: {
      authorized: true,
    },
  },
  {
    name: "resource-new",
    path: "/resource/new",
    component: () =>
      import(/* webpackChunkName: "admin" */ "../views/AddResource.vue"),
    meta: {
      authorized: true,
    },
  },
  {
    path: "/settings",
    component: () =>
      import(/* webpackChunkName: "init" */ "../views/settings/Settings.vue"),
    meta: {
      authorized: true,
    },
    children: [
      {
        path: "",
        redirect: { name: "profile" },
      },
      {
        name: "profile",
        path: "profile",
        component: () =>
          import(
            /* webpackChunkName: "init" */ "../views/settings/Profile.vue"
          ),
      },
      {
        name: "courses",
        path: "courses",
        component: () =>
          import(
            /* webpackChunkName: "settings-courses" */ "../views/settings/Courses.vue"
          ),
      },
    ],
  },
  {
    path: "/admin",
    component: () =>
      import(/* webpackChunkName: "admin" */ "../views/admin/Admin.vue"),
    meta: {
      authorized: true,
    },
    children: [
      {
        path: "",
        name: "admin",
        redirect: { name: "new-course" },
      },
      {
        path: "course/new",
        name: "new-course",
        component: () =>
          import(
            /* webpackChunkName: "admin-course" */ "../views/AddCourse.vue"
          ),
      },
    ],
  },
  {
    path: "/course/:slug",
    component: () =>
      import(/* webpackChunkName: "course" */ "../views/course/Course.vue"),
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
        path: "resource/:id",
        name: "resource",
        component: () =>
          import(
            /* webpackChunkName: "course-resource" */ "../views/course/Resource.vue"
          ),
      },
      {
        path: "resources",
        component: () =>
          import(
            /* webpackChunkName: "course" */ "../views/course/Resources.vue"
          ),
      },
      {
        path: "discuss",
        component: () =>
          import(
            /* webpackChunkName: "course-discuss" */ "../views/course/Discuss.vue"
          ),
      },
      {
        path: "about",
        component: () =>
          import(
            /* webpackChunkName: "course-about" */ "../views/course/About.vue"
          ),
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
