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
  },
  getters: {
    isLoggedIn(state) {
      return state.loggedIn;
    },
  },
  mutations: {
    AUTH_LOGOUT(state) {
      state.loggedIn = false;
      removeItem("AUTH_TOKEN");
      console.log("successfully logged out!");
      router.push("/login");
    },
    AUTH_LOGIN(state, payload) {
      state.loggedIn = true;
      state.user = payload;
      console.log("successfully logged in", state.user);
      router.push("/");
    },
    SET_LOGGED_IN(state) {
      console.log("Theek hai");
      state.loggedIn = true;
    }
  },
  actions: {
    AUTH_LOGIN({ commit }, payload) {
      let json = JSON.stringify(payload);

      axios
        .post("auth/login", json)
        .then(({ data }) => {
          console.log(data);
          setItem("AUTH_TOKEN", data.token);
          commit("AUTH_LOGIN", data.user);
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    AUTH_SIGNUP(_, payload) {
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
  },
  modules: {},
});
