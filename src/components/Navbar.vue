<template>
  <div class="app-navbar">
    <router-link tag="div" class="brand" to="/" style="cursor: pointer;">
      <img src="@/assets/branding/logo-white-full.png" />
    </router-link>
    <template v-if="isAuthenticated">
      <div class="content">
        <Navcard>
          <subscribed-courses />
        </Navcard>
        <router-link
          :to="{name: 'resource-new'}"
          class="navcard-link"
          active-class="navcard-link-active"
        >
          <Navcard>
            <div class="plain-link">Add resource</div>
          </Navcard>
        </router-link>
        <template v-if="isAdmin">
          <router-link
            :to="{name: 'admin'}"
            class="navcard-link"
            active-class="navcard-link-active"
          >
            <Navcard>
              <div class="plain-link">Admin</div>
            </Navcard>
          </router-link>
        </template>
      </div>
      <div style="margin-bottom: 1rem;">
        <div>
          <Navcard>
            <div class="profile">
              <div class="details">
                {{ user.username ? '@'+user.username : ''}}
                <span
                  class="badge badge-warning ml-1"
                  v-if="isAdmin"
                >Admin</span>
              </div>
              <div class="icons">
                <button class="btn-icon" @click="handleManageProfile">
                  <i class="material-icons">settings</i>
                </button>
              </div>
            </div>
          </Navcard>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="mode-select">
        <button
          :class="mode == 'login' ? `btn btn-primary` : `btn btn-dark`"
          @click="() => {mode = 'login';}"
        >Login</button>
        <button
          :class="mode == 'signup' ? `btn btn-primary` : `btn btn-dark`"
          @click="() => {mode = 'signup';}"
        >Signup</button>
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
      mode: "signup",
      hover: false
    };
  },
  components: {
    LoginNavbar,
    SignupNavbar,
    Navcard,
    SubscribedCourses
  },
  computed: {
    ...mapGetters(["isAuthenticated", "user", "isAdmin"])
  },
  methods: {
    handleLogin() {
      this.$router.push("/login");
    },
    handleManageProfile() {
      this.$router.push("/settings");
    },
    handleSignupSuccess() {
      this.mode = "login";
    }
  }
};
</script>

<style lang="scss">
@import "../styles/colors";

.navcard-link {
  .app-nav-card {
    text-decoration: none;
  }
  &:hover {
    .app-nav-card {
      background-color: #222;
      transition: all 100ms ease-in-out;
    }
  }
}
.navcard-link-active {
  .app-nav-card {
    background-color: #0052cc;
    transition: all 200ms ease-in-out;
  }
  &:hover {
    .app-nav-card {
      background-color: #0052cc;
    }
  }
}

.btn-icon {
  background: none;
  border: none;
  outline: none;
  height: fit-content;

  display: flex;
  align-items: center;

  i {
    color: white;
  }

  &:focus {
    outline: none;
  }
}

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
    display: flex;
    padding: 0 1rem;
    justify-content: space-between;
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