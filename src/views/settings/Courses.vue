<template>
  <div class="app-profile-courses">
    <div class="subscription-form">
      <form @submit.prevent="handleAddCourse">
        <div class="add-course-row">
          <select
            class="form-control"
            id="exampleFormControlSelect1"
            :disabled="unsubscribedCourses.length == 0"
            placeholder="Select Course"
            v-model="selectedCourse"
          >
            <option
              :value="null"
              disabled
            >{{ unsubscribedCourses.length === 0 ? '' : "Select Course"}}</option>
            <option
              v-for="course in unsubscribedCourses"
              :key="course.code"
              :value="course.code"
            >{{ `${course.name} - ${course.code}` }}</option>
          </select>
          <button
            class="btn btn-success ml-3"
            type="submit"
            :disabled="unsubscribedCourses.length == 0 || selectedCourse === null"
          >
            <div
              class="spinner-border spinner-border-sm mr-2"
              v-if="loading.addCourse"
              role="status"
              aria-hidden="true"
            ></div>Add Course
          </button>
        </div>
      </form>
    </div>
    <div class="subscribed-courses">
      <h4 class="mb-3">Subscribed Courses</h4>
      <ul class="list-group">
        <li class="list-group-item" v-for="course in subscribedCourses" :key="course.code">
          <div>{{ course.name }}</div>
          <button class="btn-icon" @click="() => {handleRemoveCourse(course.code)}">
            <i class="material-icons" style="color:#FF5630;">close</i>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { LOGOUT } from "@/store/auth/actions.type";
import {
  FETCH_ALL_COURSES,
  SUBSCRIBE_COURSE,
  UNSUBSCRIBE_COURSE,
  FETCH_COURSES
} from "@/store/course/actions.type";
export default {
  data() {
    return {
      selectedCourse: null,
      unsubscribedCourses: [],
      loaded: false,
      loading: {
        addCourse: false
      }
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
      .then(() => {
        this.loaded = true;
        this.setUnsubscribedCourses();
        console.log(this.subscribedCourses, this.courses);
        // console.log("le aaye samaan", data);
      })
      .catch(err => {
        this.loaded = false;
        console.error(err);
      });
  },
  methods: {
    handleLogout() {
      this.$store.dispatch(LOGOUT).then(() => {
        this.$router.push("/welcome");
      });
    },
    handleAddCourse() {
      this.loading.addCourse = true;
      this.$store
        .dispatch(SUBSCRIBE_COURSE, this.selectedCourse)
        .then(data => {
          this.loading.addCourse = false;
          console.log(data);
          this.$toasted.success(
            `Successfully subscribed to: ${this.selectedCourse}!`
          );
          this.setUnsubscribedCourses();
        })
        .catch(err => {
          this.$toasted.error(`Error: ${JSON.stringify(err)}!`);
          this.loading.addCourse = false;
          console.error(err);
        });
    },
    handleRemoveCourse(courseCode) {
      console.log("Removing", courseCode);
      this.$store
        .dispatch(UNSUBSCRIBE_COURSE, courseCode)
        .then(data => {
          this.$toasted.success(
            `Successfully unsubscribed from: ${courseCode}!`
          );
          console.log(data);
          this.setUnsubscribedCourses();
        })
        .catch(err => {
          this.$toasted.error(`Error: ${JSON.stringify(err)}!`);
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

      this.selectedCourse = null;

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
.app-profile-courses {
  color: white;

  .subscription-form {
    width: 50%;

    .add-course-row {
      display: flex;
      width: 100%;
      margin-bottom: 2rem;

      select.form-control {
        width: 50%;
        background-color: #222;
        outline: none;
        border: none;
        color: white;

        &:focus {
          outline: none;
          border: none;
        }
      }
    }
  }

  .subscribed-courses {
    width: 50%;

    .list-group {
      .list-group-item {
        background: none;
        border: 1px dashed #444;
        width: 75%;

        display: flex;
        justify-content: space-between;
        align-items: center;

        margin-bottom: 0.5rem;
      }
    }
  }
}
</style>