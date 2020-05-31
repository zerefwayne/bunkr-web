<template>
  <div id="app">
    <div class="view">
      <router-view></router-view>
    </div>
    <template v-if="isAuthenticated">
      <div class="side-nav">
        <Navbar />
      </div>
    </template>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    Navbar
  },
  computed: {
    ...mapGetters(["isAuthenticated"])
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  min-height: 100vh;

  display: flex;
  align-content: stretch;

  .side-nav {
    flex: 0 0 22%;
  }

  .view {
    flex: 1;
  }
}
</style>
