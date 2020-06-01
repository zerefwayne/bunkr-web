<template>
  <div>
    <h3>Profile</h3>
    <button class="btn btn-sm btn-danger" @click="handleLogout">Logout</button>
    <div class="profile-courses">
      <h4>Add Course</h4>
      <form>
        <div class="form-group">
          <label for="exampleFormControlSelect1">Course</label>
          <select
            class="form-control"
            id="exampleFormControlSelect1"
          >
            <option
              v-for="course in courses"
              :key="course.code"
              :value="course.code"
            >{{ `${course.name} - ${course.code}` }}</option>
          </select>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { LOGOUT } from "../store/auth/actions.type";
import { FETCH_ALL_COURSES } from "../store/course/actions.type";
export default {
  data() {
    return {
      
    }
  },
  computed: {
    ...mapGetters({
      user: "user",
      isAuthenticated: "isAuthenticated",
      courses: "courses"
    })
  },
  mounted() {
    let store = this.$store;
    Promise.all([store.dispatch(FETCH_ALL_COURSES)])
      .then(data => {
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
    }
  }
};
</script>

<style lang="scss">
</style>