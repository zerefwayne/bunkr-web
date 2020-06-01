<template>
  <div>
    <h3>Add Resource</h3>
    <template v-if="ready">
      <div class="form-container">
        <form autocomplete="off" @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="exampleFormControlSelect1">Course</label>
            <select class="form-control" id="exampleFormControlSelect1">
              <option v-for="course in courses" :key="course.code">{{ `${course.name} - ${course.code}` }}</option>
            </select>
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Content</label>
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              v-model="resourceForm.content"
              required
            ></textarea>
          </div>
          <button type="submit" class="btn btn-primary">Create</button>
        </form>
      </div>
    </template>
    <template v-else>Loading</template>
  </div>
</template>

<script>
import axios from "axios";
import { FETCH_ALL_COURSES } from "../store/course/actions.type";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      resourceForm: {
        content: null
      },
      ready: false
    };
  },
  computed: {
    ...mapGetters(["courses"])
  },
  methods: {
    handleSubmit() {
      let body = {
        content: this.resourceForm.content
      };

      let payload = JSON.stringify(body);

      axios
        .post("/resource/create", payload)
        .then(() => {
          // console.log(data);
          this.resourceForm.content = null;
        })
        .catch(err => {
          console.error(err.response);
        });
    }
  },
  mounted() {
    let store = this.$store;

    Promise.all([store.dispatch(FETCH_ALL_COURSES)])
      .then(() => {
        this.ready = true;
      })
      .catch(() => {
        this.ready = false;
      });
  }
};
</script>

<style lang="scss">
.form-container {
  width: 700px;
  padding: 2rem;
}
</style>