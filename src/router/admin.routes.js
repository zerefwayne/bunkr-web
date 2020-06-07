const routes = [
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
          import(/* webpackChunkName: "admin" */ "../views/AddCourse.vue"),
      },
      {
        path: "requests",
        name: "pending-resources",
        component: () =>
          import(
            /* webpackChunkName: "admin-pending" */ "../views/admin/Pending.vue"
          ),
      },
      {
        path: "preview/:id",
        name: "preview",
        component: () =>
          import(
            /* webpackChunkName: "course-resource" */ "../views/course/Resource.vue"
          ),
      },
    ],
  },
];

export default routes;