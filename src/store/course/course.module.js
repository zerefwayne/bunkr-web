import { FETCH_COURSES, FETCH_COURSE } from "./actions.type";

import { SET_COURSES, SET_ACTIVE_COURSE } from "./mutations.type";

import axios from "axios";

const state = {
  course: null,
  courses: [],
};
const mutations = {
  [SET_COURSES](state, { courses }) {
    state.courses = courses;
  },
  [SET_ACTIVE_COURSE](state, {course}) {
    state.course = course;
  }
};
const actions = {
  [FETCH_COURSES](context) {
    return new Promise((resolve, reject) => {
      axios
        .get("/course/all")
        .then(({ data }) => {
          context.commit(SET_COURSES, data);
          resolve(data);
        })
        .catch(({ response }) => {
          reject(response);
        });
    });
  },
  [FETCH_COURSE](context, code) {
    
    return new Promise((resolve, reject) => {
      axios
        .get("/course/", { params: { code } })
        .then(({ data }) => {
          context.commit(SET_ACTIVE_COURSE, data);
          resolve(data);
        })
        .catch(({ response }) => {
          reject(response);
        });
    });
  },
};
const getters = {
  courses(state) {
    return state.courses;
  },
  activeCourse(state) {
    return state.course;
  }
};

export default {
  state,
  mutations,
  actions,
  getters,
};
