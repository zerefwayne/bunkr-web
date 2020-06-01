<template>
  <div>
    <h3>Profile</h3>
    <button class="btn btn-sm btn-danger" @click="handleLogout">Logout</button>
    <div class="profile-courses">
      <h4>Add Course</h4>
      <form @submit.prevent="handleAddCourse">
        <div class="form-group">
          <label for="exampleFormControlSelect1">Course</label>
          <select class="form-control" id="exampleFormControlSelect1" v-model="selectedCourse">
            <option
              v-for="course in courses"
              :key="course.code"
              :value="course.code"
            >{{ `${course.name} - ${course.code}` }}</option>
          </select>
        </div>
        <div class="form-group">
          <button class="btn btn-success" type="submit">Add Course</button>
        </div>
      </form>
    </div>
    <div>
      <h4>Subscribed Courses</h4>
      <ul class="list-group">
        <li
          class="list-group-item"
          v-for="course in subscribedCourses"
          :key="course.code"
        >{{ course.code }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { LOGOUT } from "../store/auth/actions.type";
import {
  FETCH_ALL_COURSES,
  SUBSCRIBE_COURSE,
} from "../store/course/actions.type";
export default {
  data() {
    return {
      selectedCourse: null
    };
  },
  computed: {
    ...mapGetters({
      user: "user",
      isAuthenticated: "isAuthenticated",
      courses: "courses",
      subscribedCourses: "getSubscribedCourses"
    })
  },
  mounted() {
    let store = this.$store;
    Promise.all([store.dispatch(FETCH_ALL_COURSES)])
      .then(data => {
        this.selectedCourse = this.courses[0].code;
        console.log(data);
      })
      .catch(err => {
        console.error(err);
      });
  },
  methods: {
    handleLogout() {
      this.$store.dispatch(LOGOUT).then(() => {
        this.$router.push("/login");
      });
    },
    handleAddCourse() {
      this.$store
        .dispatch(SUBSCRIBE_COURSE, this.selectedCourse)
        .then(data => {
          console.log(data);
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
};
</script>

<style lang="scss">
</style>