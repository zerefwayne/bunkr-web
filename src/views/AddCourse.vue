<template>
  <div class="app-add-course">
    <div class="app-course-form">
      <form autocomplete="off" @submit.prevent="handleAddCourse">
        <div class="form-group">
          <label for="exampleInputEmail1">Name</label>
          <input
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter name"
            v-model="courseForm.name"
            required
          />
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Code</label>
          <input
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter Code"
            v-model="courseForm.code"
            required
          />
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Slug</label>
          <input
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter slug"
            v-model="courseForm.slug"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary">Create</button>
      </form>
    </div>
  </div>
</template>

<script>
import { CREATE_COURSE, FETCH_ALL_COURSES } from "../store/course/actions.type";
export default {
  data() {
    return {
      courseForm: {
        slug: null,
        name: null,
        code: null
      }
    };
  },
  methods: {
    handleAddCourse() {
      let body = {
        slug: this.courseForm.slug,
        name: this.courseForm.name,
        code: this.courseForm.code
      };
      console.log(body);
      this.$store
        .dispatch(CREATE_COURSE, body)
        .then(() => {
          this.$store.dispatch(FETCH_ALL_COURSES);
          this.$router.push("/");
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
};
</script>

<style lang="scss">

.app-add-course {
}

.app-course-form {
  width: 30%;
  padding: 2rem;
  background-color: #eeeeee;
  border-radius: 5px;
}
</style>