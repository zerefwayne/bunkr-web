<template>
  <div class="app-course">
    <div class="page-header">
      <h1>Admin Dashboard</h1>
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
export default {
  methods: {}
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