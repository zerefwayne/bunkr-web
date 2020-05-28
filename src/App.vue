<template>
  <div id="app">
    <form style="width: 400px;" autocomplete="off" @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email">Email address:</label>
        <input
          type="text"
          class="form-control"
          placeholder="Enter email"
          id="email"
          v-model="loginForm.username"
        />
      </div>
      <div class="form-group">
        <label for="pwd">Password:</label>
        <input
          type="password"
          class="form-control"
          placeholder="Enter password"
          id="pwd"
          v-model="loginForm.password"
        />
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: null,
        password: null
      }
    };
  },
  methods: {
    handleLogin() {
      if (this.loginForm.username && this.loginForm.password) {

        let body = {
          username: this.loginForm.username,
          password: this.loginForm.password
        };

        this.axios
          .post(
            "/auth/login",
            JSON.stringify(body)
          )
          .then(({data}) => {
            console.log(data);
          })
          .catch(err => {
            console.error(err);
          });
      }
    }
  },
  mounted() {
    this.axios
      .get("/user/test")
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.error(err);
      });
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
