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
              <option value="file">File</option>
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
            <link-prevue :url="resourceForm.content">
              <template slot-scope="props">
                <div class="link-preview-card">
                  <div class="thumbnail-container">
                    <img class="thumbnail" :src="props.img" :alt="props.title" />
                  </div>
                  <div class="content-container">
                    <div class="link-title">{{props.title.substring(0, 50)}}...</div>
                    <div class="link-description">{{props.description.substring(0, 100)}}...</div>
                    <div class="link-actions">
                      <a :href="props.url" target="_blank">
                        <img src="@/assets/icons/preview.svg" />
                      </a>
                    </div>
                  </div>
                </div>
              </template>
              <template slot="loading">
                <div class="link-loading">Loading Preview</div>
              </template>
            </link-prevue>
          </template>
          <template v-else>
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
import LinkPrevue from "link-prevue";

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
    LinkPrevue
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
.link-loading {
  height: 10rem;
  width: 100%;
  display: flex;
  justify-content: center;
  background: #222;
  align-items: center;
  color: #cccccc;
}

.link-preview-card {
  display: flex;
  height: 10rem;
  border-radius: 5px;
  overflow: hidden;
  padding: 5px;
  background: #222;
  border: 1px solid #222;

  .thumbnail-container {
    flex: 0 0 30%;
    border-radius: 5px;
    overflow: hidden;

    img {
      height: 100%;
    }
  }

  .content-container {
    padding: 0 5px;
    margin-left: 5px;

    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    .link-title {
      font-size: 1.2rem;
    }

    .link-description {
      color: #bbbbbb;
    }
  }
}

.form-container {
  width: 700px;
  padding: 2rem;
  color: white;
}
</style>