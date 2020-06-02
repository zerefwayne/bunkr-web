<template>
  <div class="app-navbar">
    <div class="brand">
      <img src="@/assets/branding/logo-white-full.png" />
    </div>
    <template v-if="isAuthenticated">
      <div class="content">
        <Navcard>
          <subscribed-courses />
        </Navcard>
        <Navcard>
          <router-link :to="{name: 'resource-new'}" class="plain-link">Add resource</router-link>
        </Navcard>

        <Navcard>
          <router-link :to="{name: 'course-new'}" class="plain-link">Add Course</router-link>
        </Navcard>
      </div>
      <div class="profile">
        <div class="details">{{ user.username ? '@'+user.username : ''}}</div>
        <div class="icons">
          <button class="btn btn-sm btn-light" @click="handleManageProfile">Manage</button>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="mode-select">
        <button class="btn btn-primary" @click="() => {mode = 'login';}">Login</button>
        <button class="btn btn-primary" @click="() => {mode = 'signup';}">Signup</button>
      </div>
      <template v-if="mode === 'login'">
        <login-navbar />
      </template>
      <template v-if="mode === 'signup'">
        <signup-navbar @success="handleSignupSuccess" />
      </template>
    </template>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import LoginNavbar from "./LoginNavbar.vue";
import SignupNavbar from "./SignUpNavbar.vue";
import Navcard from "./Navcard.vue";
import SubscribedCourses from "./SubscribedCourses.vue";

export default {
  data() {
    return {
      mode: "login"
    };
  },
  components: {
    LoginNavbar,
    SignupNavbar,
    Navcard,
    SubscribedCourses
  },
  computed: {
    ...mapGetters(["isAuthenticated", "user"])
  },
  methods: {
    handleLogin() {
      this.$router.push("/login");
    },
    handleManageProfile() {
      this.$router.push("/profile");
    },
    handleSignupSuccess() {
      console.log("Kuch toh hua");
      this.mode = "login";
    }
  }
};
</script>

<style lang="scss">
@import "../styles/colors";

.app-navbar {
  height: 100%;
  background-color: #1e1e1e;
  display: flex;
  flex-direction: column;
  color: white;

  .mode-select {
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 2rem;
    button {
      width: 100%;
      margin: 0 2rem;
    }
  }

  .plain-link {
    text-decoration: none;
    color: white;
    padding: 0 1rem;
  }

  .brand {
    padding: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .profile {
    border-top: 1px solid white;
    padding: 1rem 2rem;

    display: flex;
    justify-content: space-between;
    align-items: center;

    .details {
      font-weight: bold;
      font-size: 1.1rem;
    }

    .icons {
      display: flex;
    }
  }
}

.navbar-style {
  color: white;
  display: flex;
  justify-content: space-between;

  @media (max-width: 990px) {
    flex-direction: column;
    align-items: flex-start;
  }
}

.right-nav {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
</style>