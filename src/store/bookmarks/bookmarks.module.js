import {
  SET_ADD_BOOKMARK,
  SET_BOOKMARKS,
  SET_REMOVE_BOOKMARK,
} from "./mutations.type";
import {
  ADD_BOOKMARK,
  REMOVE_BOOKMARK,
  UPDATE_BOOKMARKS,
} from "./actions.type";

import axios from "axios";

const state = {
  bookmarks: [],
};

const mutations = {
  [SET_ADD_BOOKMARK](state, resourceID) {
    state.bookmarks = state.bookmarks.concat(resourceID);
  },
  [SET_BOOKMARKS](state, { bookmarks }) {
    state.bookmarks = bookmarks;
  },
  [SET_REMOVE_BOOKMARK](state, resourceID) {
    state.bookmarks = state.bookmarks.filter((id) => {
      return id !== resourceID;
    });
  },
};

const actions = {
  [ADD_BOOKMARK](context, resourceID) {
    context.commit(SET_ADD_BOOKMARK, resourceID);

    return new Promise((resolve, reject) => {
      axios
        .post("/user/bookmarks/add", JSON.stringify({}), {
          params: { resourceID },
        })
        .then(({ data }) => {
          console.log(data);

          resolve(data);
        })
        .catch(({ response }) => {
          console.log(resourceID, response);
          context.commit(SET_REMOVE_BOOKMARK, resourceID);
          reject(response);
        });
    });
  },
  [REMOVE_BOOKMARK](context, resourceID) {
    context.commit(SET_REMOVE_BOOKMARK, resourceID);

    return new Promise((resolve, reject) => {
      axios
        .post("/user/bookmarks/remove", JSON.stringify({}), {
          params: { resourceID },
        })
        .then(({ data }) => {
          console.log(data);
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit(SET_ADD_BOOKMARK, resourceID);
          console.log(resourceID, response);
          reject(response);
        });
    });
  },
  [UPDATE_BOOKMARKS](context) {
    return new Promise((resolve, reject) => {
      axios
        .get("/user/bookmarks/all")
        .then(({ data }) => {
          console.log("aa gaye bookmarks", data);
          context.commit(SET_BOOKMARKS, data);
          resolve(data);
        })
        .catch(({ response }) => {
          reject(response);
        });
    });
  },
};

const getters = {
  bookmarks(state) {
    return state.bookmarks;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
