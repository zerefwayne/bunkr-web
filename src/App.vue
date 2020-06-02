<template>
  <div id="app">
    <div class="view">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
    <div class="side-nav">
      <Navbar />
    </div>
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
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.1s;
  transition-property: opacity;
  transition-timing-function: ease-out;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
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

#app {
  font-family: "IBM Plex Sans", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #111111;

  min-height: 100vh;

  display: flex;
  align-content: stretch;

  .side-nav {
    flex: 0 0 23%;
  }

  .view {
    flex: 1;
    min-height: 100vh;
  }
}
</style>
