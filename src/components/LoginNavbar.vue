<template>
  <div class="app-login-navbar">
    <div class="login-form">
      <form autocomplete="off" @submit.prevent="handleLogin">
        <div class="form-group dark-form">
          <label for="exampleInputEmail1">Username</label>
          <input
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter username"
            v-model="loginForm.username"
            required
          />
        </div>
        <div class="form-group dark-form">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            v-model="loginForm.password"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary btn-loader">
          <div class="spinner-border spinner-border-sm" v-if="loading.login" role="status" aria-hidden="true"></div>
          Continue
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { LOGIN } from "../store/auth/actions.type";
import { mapState } from "vuex";
export default {
  data() {
    return {
      loginForm: {
        username: null,
        password: null
      },
      loading: {
        login: false
      }
    };
  },
  computed: {
    ...mapState({
      errors: state => state.auth.error
    })
  },
  methods: {
    handleLogin() {

      this.loading.login = true;

      let username = this.loginForm.username;
      let password = this.loginForm.password;

      let body = {
        username,
        password
      };

      if (username && password) {
        this.$store
          .dispatch(LOGIN, body)
          .then(data => {
            // console.log(data);

            this.loading.login = false;

            this.$toasted.success(
              `Successfully signed in as ${data.user.username}`
            );
            this.$router.push("/");
          })
          .catch(err => {

            this.loading.login = false;

            this.$toasted.error(`Error: ${JSON.stringify(err.error)}`);
            console.log(err.error);
          });
      }
    }
  }
};
</script>

<style lang="scss">

.btn-loader {
  display: flex;
  justify-content: center;
  align-items: center;
}

.app-login-navbar {
  padding: 0 2rem;
}

.dark-form {
  input.form-control {
    background-color: #111111;
    color: white;
    border: none;
  }
}
</style>