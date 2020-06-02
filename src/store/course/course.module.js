import {
  FETCH_COURSES,
  FETCH_COURSE,
  FETCH_ALL_COURSES,
  CREATE_COURSE,
  SUBSCRIBE_COURSE,
} from "./actions.type";

import {
  SET_COURSES,
  SET_ACTIVE_COURSE,
  SET_SUBSCRIBED_COURSES,
  RESET_COURSE_STATE,
} from "./mutations.type";

import axios from "axios";

const state = {
  course: null,
  courses: [],
  subscribedCourses: [],
};
const mutations = {
  [SET_COURSES](state, { courses }) {
    state.courses = courses;
  },
  [SET_SUBSCRIBED_COURSES](state, { courses }) {
    state.subscribedCourses = courses;
  },
  [SET_ACTIVE_COURSE](state, { course }) {
    state.course = course;
  },
  [RESET_COURSE_STATE](state) {
    state.course = null;
    state.courses = [];
    state.subscribedCourses = [];
  },
};
const actions = {
  [FETCH_COURSES](context) {
    return new Promise((resolve, reject) => {
      axios
        .get("/user/course/all")
        .then(({ data }) => {
          console.log("fetched courses", data);
          if (data.courses) {
            context.commit(SET_SUBSCRIBED_COURSES, data);
          }
          resolve(data);
        })
        .catch(({ response }) => {
          reject(response);
        });
    });
  },
  [SUBSCRIBE_COURSE](context, selectedCourse) {
    return new Promise((resolve, reject) => {
      axios
        .get("/user/course/add", {
          params: { courseCode: selectedCourse },
        })
        .then(() => {
          context
            .dispatch(FETCH_COURSES)
            .then((data2) => {
              console.log("refreshed subscribed courses", data2);
              resolve(data2);
            })
            .catch((err2) => {
              reject(err2);
            });
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },
  [FETCH_ALL_COURSES](context) {
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
  [FETCH_COURSE](context, slug) {
    return new Promise((resolve, reject) => {
      axios
        .get("/course/", { params: { slug } })
        .then(({ data }) => {
          context.commit(SET_ACTIVE_COURSE, data);
          resolve(data);
        })
        .catch(({ response }) => {
          reject(response);
        });
    });
  },
  [CREATE_COURSE](context, details) {
    let payload = JSON.stringify(details);

    return new Promise((resolve, reject) => {
      axios
        .post("/course/new", payload)
        .then(({ data }) => {
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
  },
  getSubscribedCourses(state) {
    return state.subscribedCourses;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
