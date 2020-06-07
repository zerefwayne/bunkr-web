const routes = [
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
      {
        name: "contributions",
        path: "contributions",
        component: () =>
          import(
            /* webpackChunkName: "settings-contibutions" */ "../views/settings/Contributions.vue"
          ),
      },
    ],
  },
];

export default routes;
