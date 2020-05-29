<template>
  <div>
    <h3>Profile</h3>
    <button class="btn btn-sm btn-danger" @click="handleLogout">Logout</button>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState(["user", "loggedIn"])
  },
  mounted() {},
  methods: {
    ...mapMutations({ handleLogout: "AUTH_LOGOUT" }),
  }
};
</script>

<style lang="scss">
</style>