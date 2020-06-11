<template>
  <div class="app-settings">
    <div class="page-header">
      <div class="content">
        <h1>Settings</h1>
      </div>
    </div>
    <div class="page-nav">
      <ul class="nav">
        <li class="nav-item">
          <router-link
            :to="{name: 'profile'}"
            class="nav-link"
            exact-active-class="link-active"
            href="#"
          ><i class="material-icons" style="margin-right: .5rem;">person</i>Profile</router-link>
        </li>
        <li class="nav-item">
          <router-link
            :to="{name: 'courses'}"
            class="nav-link"
            active-class="link-active"
            href="#"
          ><i class="material-icons">widgets</i>Courses</router-link>
        </li>
        <li class="nav-item">
          <router-link
            :to="{name: 'contributions'}"
            class="nav-link"
            active-class="link-active"
            href="#"
          ><i class="material-icons">stars</i>Contributions</router-link>
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
import { FETCH_USER_RESOURCES } from "../../store/resource/actions.type";

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
    this.$store.dispatch(FETCH_USER_RESOURCES).catch(err => {
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
}
</style>