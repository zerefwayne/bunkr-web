<template>
  <div>
    <h3>Signup</h3>
    <div class="login-form">
      <form autocomplete="off" @submit.prevent="handleLogin">
        <div class="form-group">
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
        <div class="form-group">
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
        <div class="form-group">
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

        <div class="form-group">
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
        <div class="form-group">
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
        <button type="submit" class="btn btn-primary">Signup</button>
      </form>
    </div>
    <router-link
      :to="{name:'login'}"
      tag="button"
      class="btn btn-outline-success mt-3 ml-3"
    >Login Instead</router-link>
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
        this.$store.dispatch(SIGNUP, body).then(data => {
          console.log("Signed up successfully!", data);
          this.$router.push("/login");
        });
      } else {
        alert("Password confirmation failed.");
      }
    }
  }
};
</script>

<style lang="scss">
.login-form {
  margin-top: 2rem;
  width: 30%;
  padding: 2rem;
  background-color: #eeeeee;
  border-radius: 5px;
}
</style>