import {
  FETCH_COURSES,
  FETCH_COURSE,
  FETCH_RESOURSE,
  FETCH_ALL_COURSES,
  FETCH_PENDING_RESOURCES,
  CREATE_COURSE,
  SUBSCRIBE_COURSE,
  UNSUBSCRIBE_COURSE,
  APPROVE_RESOURCE,
} from "./actions.type";

import {
  SET_COURSES,
  SET_ACTIVE_COURSE,
  SET_SUBSCRIBED_COURSES,
  SET_ACTIVE_RESOURCE,
  RESET_COURSE_STATE,
  SET_PENDING_RESOURCES,
} from "./mutations.type";

import axios from "axios";

const state = {
  course: null,
  courses: [],
  subscribedCourses: [],
  resource: null,
  pendingResources: [],
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
  [SET_ACTIVE_RESOURCE](state, { resource, user }) {
    state.resource = resource;
    state.resource.created_by = user;
  },
  [RESET_COURSE_STATE](state) {
    state.course = null;
    state.courses = [];
    state.subscribedCourses = [];
  },
  [SET_PENDING_RESOURCES](state, { resources }) {
    if (resources) {
      state.pendingResources = resources;
    } else {
      state.pendingResources = [];
    }
  },
};
const actions = {
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
          // console.log("fetched pending resources", data);
          context.commit(SET_PENDING_RESOURCES, data);
          resolve(data);
        })
        .catch((err) => {
          console.error(err.response);
          reject(err);
        });
    });
  },
  [FETCH_COURSES](context) {
    return new Promise((resolve, reject) => {
      axios
        .get("/user/course/all")
        .then(({ data }) => {
          // console.log("fetched courses", data);
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
              // console.log("refreshed subscribed courses", data2);
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
  [UNSUBSCRIBE_COURSE](context, selectedCourse) {
    return new Promise((resolve, reject) => {
      axios
        .get("/user/course/remove", {
          params: { courseCode: selectedCourse },
        })
        .then(() => {
          context
            .dispatch(FETCH_COURSES)
            .then((data2) => {
              // console.log("refreshed subscribed courses", data2);
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
  activeResource(state) {
    return state.resource;
  },
  pendingResources(state) {
    return state.pendingResources;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
