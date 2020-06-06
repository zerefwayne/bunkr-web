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
        <li class="nav-item">
          <router-link
            :to="{name: 'contributions'}"
            class="nav-link"
            active-class="link-active"
            href="#"
          >Contributions</router-link>
        </li>
      </ul>
    </div>
    <div class="router-container">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { FETCH_USER_RESOURCES } from "../../store/auth/actions.type";

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
  methods: {},
  mounted() {
    this.$store
      .dispatch(FETCH_USER_RESOURCES)
      .then(data => {
        console.log("Saare le aaya user ke courses", data);
      })
      .catch(err => {
        this.$toasted.error(JSON.stringify(err));
      });
  }
};
</script>

<style lang="scss">
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
      display: flex;
      align-items: flex-end;
      .nav-item {
        padding: 0;
        margin: 0;
        .nav-link {
          color: #666666;
          text-decoration: none;
          font-size: 2rem;
          padding: 0;
          margin-right: 1rem;
          transition: all 100ms ease-in-out;
        }

        .link-active {
          color: white;
          transition: all 100ms ease-in-out;
        }
      }
    }
  }
}
</style>