import {
  FETCH_USER_RESOURCES,
  FETCH_PENDING_RESOURCES,
  FETCH_RESOURSE,
  APPROVE_RESOURCE,
  UPDATE_RESOURCE,
  DELETE_RESOURCE
} from "./actions.type";

import {
  SET_USER_RESOURCES,
  SET_ACTIVE_RESOURCE,
  SET_PENDING_RESOURCES,
} from "./mutations.type";

import axios from "axios";

const state = {
  userResources: [],
  resource: null,
  pendingResources: [],
};

const getters = {
  userResources(state) {
    return state.userResources;
  },
  activeResource(state) {
    return state.resource;
  },
  pendingResources(state) {
    return state.pendingResources;
  },
};

const mutations = {
  [SET_ACTIVE_RESOURCE](state, { resource, user }) {
    state.resource = resource;
    state.resource.created_by = user;
  },
  [SET_PENDING_RESOURCES](state, { resources }) {
    if (resources !== null) {
      state.pendingResources = resources;
    } else {
      state.pendingResources = [];
    }
  },
  [SET_USER_RESOURCES](state, { resources }) {
    if (resources) {
      state.userResources = resources;
    } else {
      state.userResources = [];
    }
  },
};
const actions = {
  [FETCH_USER_RESOURCES](context) {
    return new Promise((resolve, reject) => {
      axios
        .get("/resource/user")
        .then(({ data }) => {
          // console.log("Fetched user resources");
          context.commit(SET_USER_RESOURCES, data);
          resolve(data);
        })
        .catch(({ response }) => {
          reject(response);
        });
    });
  },
  [SET_USER_RESOURCES](state, { resources }) {
    if (resources) {
      state.userResources = resources;
    } else {
      state.userResources = [];
    }
  },
  [APPROVE_RESOURCE](context, resource) {
    let payload = JSON.stringify(resource);

    return new Promise((resolve, reject) => {
      axios
        .post("/resource/approve", payload)
        .then(({ data }) => {
          context.dispatch(FETCH_PENDING_RESOURCES);
          resolve(data);
        })
        .catch(({ response }) => {
          reject(response);
        });
    });
  },
  [FETCH_PENDING_RESOURCES](context) {
    return new Promise((resolve, reject) => {
      axios
        .get("/resource/pending")
        .then(({ data }) => {
          context.commit(SET_PENDING_RESOURCES, data);
          resolve(data);
        })
        .catch((err) => {
          console.error(err.response);
          reject(err);
        });
    });
  },
  [FETCH_RESOURSE](context, id) {
    return new Promise((resolve, reject) => {
      axios
        .get("/resource/", { params: { id } })
        .then(({ data }) => {
          context.commit(SET_ACTIVE_RESOURCE, data);
          resolve(data);
        })
        .catch(({ response }) => {
          reject(response);
        });
    });
  },
  [UPDATE_RESOURCE](context, resource) {
    let payload = JSON.stringify(resource);

    return new Promise((resolve, reject) => {
      axios
        .post("/resource/update", payload)
        .then(({data}) => {
          console.log("resource update", data);
          resolve(data);
          context.dispatch(FETCH_RESOURSE, resource.id);
        })
        .catch((err) => {
          console.error(err.response);
          reject(err.response);
        });
    });
  },
  [DELETE_RESOURCE](context, resource) {
    let payload = JSON.stringify(resource);

    return new Promise((resolve, reject) => {
      axios
        .post("/resource/delete", payload)
        .then(({data}) => {
          console.log("resource deleted", data);
          resolve(data);
        })
        .catch((err) => {
          console.error(err.response);
          reject(err.response);
        });
    });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
