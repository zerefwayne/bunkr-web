import jwtService from "@/shared/jwt.service";

import { LOGIN, LOGOUT, SIGNUP, VALIDATE } from "./actions.type";

import { SET_AUTH, PURGE_AUTH, SET_ERROR } from "./mutations.type";

import axios from "axios";
import { FETCH_COURSES} from "../course/actions.type";
import store from "@/store";
import { RESET_COURSE_STATE } from "../course/mutations.type";

const state = {
  user: {},
  error: {},
  isAuthenticated: !!jwtService.getToken(),
};

const actions = {
  [LOGIN](context, credentials) {
    let payload = JSON.stringify(credentials);

    return new Promise((resolve, reject) => {
      axios
        .post("/auth/login", payload)
        .then(({ data }) => {
          context.commit(SET_AUTH, { user: data.user, token: data.token });

          axios.defaults.headers["Authorization"] = `${jwtService.getToken()}`;

          Promise.all([store.dispatch(FETCH_COURSES)])
            .then(() => resolve(data))
            .catch((err) => {
              reject(err);
            });
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response.data);
          reject(response.data);
        });
    });
  },
  [LOGOUT](context) {
    context.commit(PURGE_AUTH);
    context.commit(RESET_COURSE_STATE);
  },
  [SIGNUP](context, credentials) {
    let payload = JSON.stringify(credentials);

    return new Promise((resolve, reject) => {
      axios
        .post("/auth/signup", payload)
        .then(({ data }) => {
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response.data.errors);
          reject(response);
        });
    });
  },
  [VALIDATE](context) {
    if (jwtService.getToken()) {
      axios.defaults.headers["Authorization"] = `${jwtService.getToken()}`;
      return new Promise((resolve, reject) => {
        axios
          .get("auth/validate/")
          .then(({ data }) => {
            context.commit(SET_AUTH, data);
            resolve(data);
          })
          .catch(({ response }) => {
            context.commit(PURGE_AUTH);
            reject(response);
          });
      });
    } else {
      context.commit(PURGE_AUTH);
      context.commit(RESET_COURSE_STATE);
    }
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
      jwtService.saveToken(`Bearer ${token}`);
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
  user(state) {
    return state.user;
  },
  isAuthenticated(state) {
    return state.isAuthenticated;
  },
  subscribedCourses(state) {
    return state.user.subscribedCourses;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
