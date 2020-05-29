<template>
  <div id="app">
    <div class="view">
      <router-view></router-view>
    </div>
    <div class="side-nav">
      <Navbar />
    </div>
    
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
export default {
  components: {
    Navbar
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
    flex: 0 0 78%;
  }

}
</style>
