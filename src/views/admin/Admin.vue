<template>
  <div class="app-course">
    <div class="page-header">
      <div class="content">
        <h1>Admin Dashboard</h1>
      </div>
    </div>
    <div class="page-nav">
      <ul class="nav">
        <li class="nav-item">
          <router-link
            class="nav-link"
            active-class="link-active"
            :to="{name: 'new-course'}"
          >Add Course</router-link>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link"
            active-class="link-active"
            :to="{name: 'pending-resources'}"
          >Pending Resources {{ pendingResources.length > 0 ? `(${pendingResources.length})` : '' }}</router-link>
        </li>
      </ul>
    </div>

    <div class="router-container">
      <transition name="fade" mode="out-in">
        <router-view :key="$route.fullPath"></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { FETCH_PENDING_RESOURCES } from "../../store/resource/actions.type";

export default {
  methods: {},
  computed: {
    ...mapGetters(["pendingResources"])
  },
  mounted() {
    this.$store.dispatch(FETCH_PENDING_RESOURCES);
  }
};
</script>

<style lang="scss">
.app-admin-home {
  color: white;

  .router-container {
    padding: 2rem;
  }
}
</style>