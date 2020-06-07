import Vue from "vue";
import Vuex from "vuex";

import auth from "./auth/auth.module";
import course from "./course/course.module";
import resource from "./resource/resource.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    course,
    resource
  },
});
