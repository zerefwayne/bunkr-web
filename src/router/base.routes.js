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
    name: "accountVerify",
    path: "/auth/verify",
    component: () =>
      import(/* webpackChunkName: "init" */ "../views/Verify.vue"),
    beforeEnter: (to, from, next) => {
      console.log(to);
      next();
    },
    meta: {
      guest: true
    }
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
      import(/* webpackChunkName: "admin" */ "../views/resource/AddResource.vue"),
    meta: {
      authorized: true,
    },
  },
  {
    name: "resource",
    path: "/resource/:id",
    component: () =>
      import(/* webpackChunkName: "resource" */ "../views/resource/Resource.vue"),
    meta: {
      guest: true,
    },
  },
  {
    name: "resource-edit",
    path: "/resource/:id/edit",
    component: () =>
      import(/* webpackChunkName: "admin" */ "../views/resource/AddResource.vue"),
    meta: {
      authorized: true,
    },
  },
];

export default routes;
