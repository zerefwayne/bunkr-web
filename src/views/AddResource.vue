<template>
  <div>
    <h3>Add Resource</h3>
    <div class="form-container">
      <form autocomplete="off" @submit.prevent="handleSubmit">
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
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      resourceForm: {
        content: null
      }
    };
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
  }
};
</script>

<style lang="scss">
.form-container {
  width: 700px;
  padding: 2rem;
}
</style>