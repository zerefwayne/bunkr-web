<template>
  <div class="app-signup-navbar">
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
          <label for="exampleInputEmail1">Name</label>
          <input
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter name"
            v-model="loginForm.name"
            required
          />
        </div>
        <div class="form-group dark-form">
          <label for="exampleInputEmail1">Email</label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            v-model="loginForm.email"
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
        <div class="form-group dark-form">
          <label for="exampleInputPassword1">Confirm Password</label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            placeholder="Enter password again"
            v-model="loginForm.passwordConfirmation"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary mt-2">Signup</button>
      </form>
    </div>
  </div>
</template>

<script>
import { SIGNUP } from "../store/auth/actions.type";
export default {
  data() {
    return {
      loginForm: {
        username: null,
        password: null,
        email: null,
        passwordConfirmation: null,
        name: null,
        valid: false
      }
    };
  },
  methods: {
    handleLogin() {
      let username = this.loginForm.username;
      let password = this.loginForm.password;
      let email = this.loginForm.email;
      let name = this.loginForm.name;
      let passwordConfirmation = this.loginForm.passwordConfirmation;

      let body = {
        username,
        password,
        email,
        name
      };

      if (password === passwordConfirmation) {
        this.$store.dispatch(SIGNUP, body).then(() => {
          this.$toasted.success(`Successfully created account. Please login to continue.`);
          this.$emit("success");
        }).catch((err) => {
          this.$toasted.error(`Error: ${JSON.stringify(err.data)}`);
        });
      } else {
        this.$toasted.error(`Passwords don't match.`);
      }
    }
  }
};
</script>

<style lang="scss">
.app-signup-navbar {
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