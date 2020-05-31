import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import axios from "axios";

import { setItem, removeItem } from "../utils";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loggedIn: false,
    user: null,
    courses: null,
    activeCourse: null,
    isCourseLoaded: false,
  },
  getters: {
    isLoggedIn(state) {
      return state.loggedIn;
    },
  },
  mutations: {
    AUTH_LOGOUT(state) {
      state.loggedIn = false;
      state.user = null;
      state.courses = null;
      removeItem("AUTH_TOKEN");
      axios.defaults.headers["Authorization"] = null;
      console.log("successfully logged out!");
      if (router.currentRoute.name != "login") {
        router.push("/login");
      }
    },
    INIT_APP(state, payload) {
      state.loggedIn = true;
      state.user = payload.user;
      state.courses = payload.courses;

      if (router.currentRoute.name == "login") {
        router.push("/");
      }

      console.log("app initalised");
    },
    SET_ACTIVE_COURSE(state, payload) {
      state.activeCourse = payload.course;
    },
  },
  actions: {
    AUTH_LOGIN({ dispatch }, payload) {
      let json = JSON.stringify(payload);

      axios
        .post("auth/login", json)
        .then(({ data }) => {
          console.log(data);
          setItem("AUTH_TOKEN", data.token);
          axios.defaults.headers["Authorization"] = data.token;
          console.log("Set item token, now dispatching init app");
          dispatch("INIT_APP");
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    AUTH_SIGNUP: async (_, payload) => {
      let json = JSON.stringify(payload);

      axios
        .post("auth/signup", json)
        .then(({ data }) => {
          console.log("successfully signed up", data);
          router.push("/login");
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    INIT_APP: async ({ commit }) => {
      axios
        .get("ui/init")
        .then(({ data }) => {
          console.log("init data", data);
          commit("INIT_APP", data);
        })
        .catch(() => {
          console.error("session expired. please login again.");
          commit("AUTH_LOGOUT");
        });
    },
    FETCH_COURSE: async ({ commit, state }, code) => {
      state.isCourseLoaded = false;

      axios
        .get("/course/", { params: { id: code } })
        .then(({ data }) => {
          console.log("Fetched course", data.course);
          state.isCourseLoaded = true;
          commit("SET_ACTIVE_COURSE", data);
        })
        .catch((err) => {
          state.isCourseLoaded = false;
          console.error(err.response);
          alert("Failed to load course");
          router.push("/");
        });
    },
  },
  modules: {},
});
