<template>
  <div class="app-navbar">
    <div class="brand">
      <img src="@/assets/branding/logo-white-full.png" />
    </div>
    <template v-if="isAuthenticated">
      <div class="content">
        <div class="courses">
          <div class="section-header">My Courses</div>
          <ul class="list-group">
            <router-link
              tag="li"
              class="list-group-item"
              v-for="course in courses"
              active-class="active"
              :key="course.code"
              :to="`/course/${course.slug}`"
            >{{ course.name }}</router-link>
          </ul>
        </div>
        <div>
          <router-link
            :to="{name: 'resource-new'}"
            tag="button"
            class="btn btn-outline-secondary mt-3"
          >Add Resource</router-link>
        </div>
        <div>
          <router-link
            :to="{name: 'course-new'}"
            tag="button"
            class="btn btn-outline-success mt-3"
          >Add Course</router-link>
        </div>
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
        <signup-navbar @success="handleSignupSuccess"/>
      </template>
    </template>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import LoginNavbar from "./LoginNavbar.vue";
import SignupNavbar from "./SignUpNavbar.vue";
export default {
  data() {
    return {
      mode: "login"
    };
  },
  components: {
    LoginNavbar,
    SignupNavbar
  },
  computed: {
    ...mapGetters(["isAuthenticated", "user"]),
    ...mapGetters({ courses: "getSubscribedCourses" })
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
      this.mode = 'login';
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

    .section-header {
      padding: 1rem;
      font-size: 1.2rem;
    }

    .courses {
      .list-group-item {
        background: none;

        cursor: pointer;

        &:hover {
          background-color: lighten($color: $darkblue, $amount: 2%);
        }
      }
    }
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