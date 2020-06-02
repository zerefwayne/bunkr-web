<template>
  <div class="app-settings">
    <div class="page-header">
      <h1>Settings</h1>
    </div>
    <div class="page-nav">
      <ul class="nav">
        <li class="nav-item">
          <router-link
            :to="{name: 'profile'}"
            class="nav-link"
            exact-active-class="link-active"
            href="#"
          >Profile</router-link>
        </li>
        <li class="nav-item">
          <router-link
            :to="{name: 'courses'}"
            class="nav-link"
            active-class="link-active"
            href="#"
          >Courses</router-link>
        </li>
      </ul>
    </div>
    <div class="router-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {};
  },

  computed: {
    ...mapGetters({
      user: "user",
      isAuthenticated: "isAuthenticated"
    })
  },
  methods: {}
};
</script>

<style lang="scss">
.page-header {
  padding: 2rem;
  color: white;
}

.app-settings {
  background-color: #111;
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  .router-container {
    padding: 2rem;
  }

  .page-nav {
    color: white;
    padding: 0 2rem;

    .nav {
      .nav-item {
        padding: 0;
        margin: 0;
        .nav-link {
          color: #888888;
          text-decoration: none;
          font-size: 2rem;
          padding: 0;
          margin-right: 1rem;
          transition: all 300ms ease-in-out;
        }

        .link-active {
          color: white;
          transition: all 300ms ease-in-out;
        }
      }
    }
  }
}
</style>