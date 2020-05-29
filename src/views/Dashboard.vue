<template>
  <div>
    <h3>Dashboard</h3>
    <button class="btn btn-outline-danger" @click="handleLogout">Logout</button>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  methods: {
    ...mapMutations({
      handleLogout: "AUTH_LOGOUT"
    })
  }
};
</script>

<style lang="scss">
</style>