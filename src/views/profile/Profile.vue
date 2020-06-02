<template>
  <div class="app-profile">
    <div class="page-header">
      <h1>Settings</h1>
    </div>
    <div class="page-nav">
      <ul class="nav">
        <li class="nav-item">
          <router-link :to="{name: 'profile'}" class="nav-link" href="#">Profile</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{name: 'courses'}" class="nav-link" href="#">Courses</router-link>
        </li>
      </ul>
    </div>
    
    <template>
      <router-view></router-view>
    </template>
  </div>
</template>

<script>
import { mapGetters } from "vuex";


export default {
  data() {
    return {
    };
  },

  computed: {
    ...mapGetters({
      user: "user",
      isAuthenticated: "isAuthenticated"
    })
  },
  methods: {

  }
};
</script>

<style lang="scss">
.page-header {
  padding: 2rem;
  color: white;
}

.app-profile {
  background-color: #111;
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  .page-nav {
    color: white;
    padding: 0 2rem;
  }
}
</style>