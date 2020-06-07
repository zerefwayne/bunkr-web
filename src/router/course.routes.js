const routes = [
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

export default routes;
