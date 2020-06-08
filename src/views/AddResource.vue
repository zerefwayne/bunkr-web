<template>
  <div class="app-add-resource">
    <div class="page-header">
      <template v-if="isEditMode">
        <h1>Edit Resource</h1>
        <h4>{{ resource.title }}</h4>
      </template>
      <template v-else>
        <h1>Add Resource</h1>
      </template>
    </div>
    <template v-if="ready">
      <div class="form-container">
        <form autocomplete="off">
          <template v-if="!isEditMode">
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
          </template>
          <div class="form-group">
            <label for="exampleFormControlSelect1">Type</label>
            <select class="form-control" id="exampleFormControlSelect1" v-model="resourceForm.type">
              <option value="link">Link</option>
              <option value="article">Article</option>
            </select>
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Title</label>
            <input
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter title"
              v-model="resourceForm.title"
              required
            />
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Tags</label>
            <input
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter tags (seperated by comma)"
              v-model="resourceForm.tags"
              required
            />
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
          <template v-if="!isEditMode">
            <button type="submit" @click.prevent="handleSubmit" class="btn btn-primary mt-3">Create</button>
          </template>
          <template v-else>
            <button type="submit" @click.prevent="handleUpdate" class="btn btn-warning mt-3">Update</button>
          </template>
        </form>
      </div>
    </template>
    <template v-else>Loading</template>
  </div>
</template>

<script>
import axios from "axios";
import store from "@/store";
import { FETCH_ALL_COURSES } from "../store/course/actions.type";
import { mapGetters } from "vuex";
import VueSimplemde from "vue-simplemde";
import LinkPreview from "@/components/LinkPreview.vue";
import {
  FETCH_RESOURSE,
  UPDATE_RESOURCE
} from "../store/resource/actions.type";

export default {
  data() {
    return {
      resourceForm: {
        content: null,
        courseCode: null,
        type: "link",
        title: null,
        tags: null
      },
      isEditMode: false,
      ready: false
    };
  },
  components: {
    LinkPreview,
    VueSimplemde
  },
  watch: {
    "$route.name": function(val) {
      if (val === "resource-new") {
        this.isEditMode = false;
        this.ready = false;

        Promise.all([store.dispatch(FETCH_ALL_COURSES)])
          .then(() => {
            this.ready = true;
          })
          .catch(() => {
            this.ready = false;
          });
      } else if (val === "resource-edit") {
        this.isEditMode = true;
        this.ready = false;

        let resourceID = this.$route.params.id;

        this.$store
          .dispatch(FETCH_RESOURSE, resourceID)
          .then(() => {
            this.ready = true;
          })
          .catch(err => {
            console.error(err);
            this.ready = false;
            this.$router.go(-1);
          });
      }
    }
  },
  computed: {
    ...mapGetters(["courses"]),
    ...mapGetters({ resource: "activeResource" })
  },
  methods: {
    resetForm() {
      this.resourceForm = {
        content: null,
        courseCode: null,
        type: "link",
        title: null,
        tags: null
      };
    },
    handleSubmit() {
      let body = {
        content: this.resourceForm.content,
        courseCode: this.resourceForm.courseCode,
        type: this.resourceForm.type,
        title: this.resourceForm.title,
        tags: this.resourceForm.tags.split(",")
      };

      let payload = JSON.stringify(body);

      console.log(payload);

      axios
        .post("/resource/create", payload)
        .then(data => {
          console.log("resource created", data);
          this.resourceForm.content = null;
          this.$toasted.success(
            `Successfully created resource! Status: Approval pending.`
          );
          this.resetForm();
        })
        .catch(err => {
          this.$toasted.error(`Error: ${JSON.stringify(err)}`);
          console.error(err.response);
        });
    },
    handleUpdate() {
      let body = this.resource;

      body.content = this.resourceForm.content;
      body.type = this.resourceForm.type;
      body.title = this.resourceForm.title;
      body.created_by = this.resource.created_by.id;

      console.log(body, this.resource);

      this.$store
        .dispatch(UPDATE_RESOURCE, body)
        .then(data => {
          this.$toasted.success(`Successfully updated resource!`);
          console.log("success", data);
        })
        .catch(err => {
          console.error(err);
        });
    }
  },
  beforeRouteEnter(to, from, next) {
    if (to.name === "resource-edit") {
      if (to.params.id) {
        let resourceID = to.params.id;
        store
          .dispatch(FETCH_RESOURSE, resourceID)
          .then(() => {
            next();
          })
          .catch(err => {
            console.error(err);
            next("/");
          });
      } else {
        next(false);
      }
    } else {
      next();
    }
  },
  mounted() {
    let store = this.$store;

    if (this.$route.params.isEditMode || this.$route.name === "resource-edit") {
      this.isEditMode = true;
      this.ready = true;
      this.resourceForm.type = this.resource.type;
      this.resourceForm.title = this.resource.title;
      this.resourceForm.tags = this.resource.tags;
      this.resourceForm.content = this.resource.content;
    }

    if (!this.isEditMode) {
      Promise.all([store.dispatch(FETCH_ALL_COURSES)])
        .then(() => {
          this.ready = true;
        })
        .catch(() => {
          this.ready = false;
        });
    }
  }
};
</script>

<style lang="scss">
.app-add-course {
  color: white;
}

.form-container {
  width: 700px;
  padding: 0 2rem;
  color: white;
}
</style>