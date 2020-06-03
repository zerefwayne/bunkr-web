<template>
  <div>
    <h3>Add Resource</h3>
    <template v-if="ready">
      <div class="form-container">
        <form autocomplete="off" @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="exampleFormControlSelect1">Course</label>
            <select
              class="form-control"
              id="exampleFormControlSelect1"
              v-model="resourceForm.courseCode"
            >
              <option
                v-for="course in courses"
                :key="course.code"
                :value="course.code"
              >{{ `${course.name} - ${course.code}` }}</option>
            </select>
          </div>
          <div class="form-group">
            <label for="exampleFormControlSelect1">Type</label>
            <select class="form-control" id="exampleFormControlSelect1" v-model="resourceForm.type">
              <option value="link">Link</option>
              <option value="article">Article</option>
            </select>
          </div>
          <template v-if="resourceForm.type === 'link'">
            <div class="form-group">
              <label for="exampleInputEmail1">Link</label>
              <input
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter link"
                v-model="resourceForm.content"
                required
              />
            </div>
            <LinkPreview :url="resourceForm.content" />
          </template>
          <template v-else>
            <div style="background-color: white; border-radius: 5px;">
              <vue-simplemde v-model="resourceForm.content" ref="markdownEditor" />
            </div>
          </template>
          <button type="submit" class="btn btn-primary mt-3">Create</button>
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

import LinkPreview from "@/components/LinkPreview.vue";

export default {
  data() {
    return {
      resourceForm: {
        content: null,
        courseCode: null,
        type: "link"
      },
      ready: false
    };
  },
  components: {
    LinkPreview
  },
  computed: {
    ...mapGetters(["courses"])
  },
  methods: {
    handleSubmit() {
      let body = {
        content: this.resourceForm.content,
        courseCode: this.resourceForm.courseCode,
        type: this.resourceForm.type
      };

      let payload = JSON.stringify(body);

      console.log(payload);

      axios
        .post("/resource/create", payload)
        .then(data => {
          console.log("resource created", data);
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
  color: white;
}
</style>