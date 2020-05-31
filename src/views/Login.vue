<template>
  <div>
    <h3>Login</h3>
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
        <button type="submit" class="btn btn-primary">Login</button>
      </form>
    </div>
    <router-link :to="{name:'signup'}" tag="button" class="btn btn-outline-success mt-3 ml-3">SignUp</router-link>
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
      let username = this.loginForm.username;
      let password = this.loginForm.password;

      let body = {
        username,
        password
      };

      if (username && password) {
        this.$store.dispatch(LOGIN, body).then(() => {
          // console.log(data);
          this.$router.push("/");
        });
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