import jwtService from "@/shared/jwt.service";

import { LOGIN, LOGOUT, SIGNUP } from "./actions.type";

import { SET_AUTH, PURGE_AUTH, SET_ERROR } from "./mutations.type";

import axios from "axios";

const state = {
  user: {},
  error: {},
  isAuthenticated: !!jwtService.getToken(),
};

const actions = {
  [LOGIN](context, credentials) {
    let payload = JSON.stringify(credentials);

    return new Promise((resolve) => {
      axios
        .post("/auth/login", payload)
        .then(({ data }) => {
          context.commit(SET_AUTH, { user: data.user, token: data.token });
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response.data);
        });
    });
  },
  [LOGOUT](context) {
    context.commit(PURGE_AUTH);
  },
  [SIGNUP](context, credentials) {
    let payload = JSON.stringify(credentials);

    return new Promise((resolve, reject) => {
      axios
        .post("users", payload)
        .then(({ data }) => {
          console.log("Signup sucessful", data);
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response.data.errors);
          reject(response);
        });
    });
  },
};

const mutations = {
  [SET_ERROR](state, error) {
    state.errors = error;
  },
  [SET_AUTH](state, { user, token }) {
    state.isAuthenticated = true;
    state.user = user;
    state.errors = {};
    if (token) {
      jwtService.saveToken(state.user.token);
    }
  },
  [PURGE_AUTH](state) {
    state.isAuthenticated = false;
    state.user = {};
    state.errors = {};
    jwtService.destroyToken();
  },
};

const getters = {
  currentUser(state) {
    return state.user;
  },
  isAuthenticated(state) {
    return state.isAuthenticated;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
