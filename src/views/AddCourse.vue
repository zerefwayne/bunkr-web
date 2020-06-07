<template>
  <div class="app-add-course">
    <div class="app-course-form dark-form">
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
            placeholder="Slug will be automatically generated"
            :value="courseForm.slug"
            disabled
          />
        </div>
        <button type="submit" class="btn btn-primary mt-2">Create</button>
      </form>
    </div>
  </div>
</template>

<script>
import { CREATE_COURSE, FETCH_ALL_COURSES } from "../store/course/actions.type";
import slugify from 'slugify';
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
  watch: {
    "courseForm.name": function(val) {
      this.courseForm.slug = slugify(val).toLowerCase();
    }
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
  // background-color: #eeeeee;
  color: white;
  border-radius: 5px;

  input.form-control {
    background-color: #222;
  }

}
</style>