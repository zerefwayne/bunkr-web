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
];

export default routes;
