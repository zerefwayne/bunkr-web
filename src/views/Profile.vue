<template>
  <div>
    <h3>Profile</h3>
    <button class="btn btn-sm btn-danger" @click="handleLogout">Logout</button>
    <template v-if="loaded">
      <div class="profile-courses">
        <h4>Add Course</h4>
        <form @submit.prevent="handleAddCourse">
          <div class="form-group">
            <label for="exampleFormControlSelect1">Course</label>
            <select class="form-control" id="exampleFormControlSelect1" v-model="selectedCourse">
              <option
                v-for="course in unsubscribedCourses"
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
          <li class="list-group-item" v-for="course in subscribedCourses" :key="course.code">
            {{ course.code }}
            <button
              class="btn btn-sm btn-danger"
              @click="() => {handleRemoveCourse(course.code)}"
            >Unsubscribe</button>
          </li>
        </ul>
      </div>
    </template>
    <template v-else>Loading</template>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { LOGOUT } from "../store/auth/actions.type";
import {
  FETCH_ALL_COURSES,
  SUBSCRIBE_COURSE,
  UNSUBSCRIBE_COURSE,
  FETCH_COURSES
} from "../store/course/actions.type";
export default {
  data() {
    return {
      selectedCourse: null,
      unsubscribedCourses: [],
      loaded: false
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
    Promise.all([
      store.dispatch(FETCH_ALL_COURSES),
      store.dispatch(FETCH_COURSES)
    ])
      .then(data => {
        this.loaded = true;
        this.selectedCourse = this.courses[0].code;
        this.setUnsubscribedCourses();
        console.log(this.subscribedCourses, this.courses);
        console.log("le aaye samaan", data);
      })
      .catch(err => {
        this.loaded = false;
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
          this.setUnsubscribedCourses();
        })
        .catch(err => {
          console.error(err);
        });
    },
    handleRemoveCourse(courseCode) {
      console.log("Removing", courseCode);
      this.$store
        .dispatch(UNSUBSCRIBE_COURSE, courseCode)
        .then(data => {
          console.log(data);
          this.setUnsubscribedCourses();
        })
        .catch(err => {
          console.error(err);
        });
    },
    setUnsubscribedCourses() {
      this.unsubscribedCourses = this.courses.filter(course => {
        if (this.subscribedCourses) {
          let found = this.subscribedCourses.find(sub => {
            return sub.code === course.code;
          });
          if (found) {
            return false;
          } else {
            return true;
          }
        } else {
          return false;
        }
      });

      if (this.unsubscribedCourses.length > 0) {
        this.selectedCourse = this.unsubscribedCourses[0].code;
      }

      console.log(
        this.courses,
        this.unsubscribedCourses,
        this.subscribedCourses
      );
    }
  }
};
</script>

<style lang="scss">
</style>