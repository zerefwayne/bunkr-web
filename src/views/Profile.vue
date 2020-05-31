<template>
  <div>
    <h3>Profile</h3>
    <button class="btn btn-sm btn-danger" @click="handleLogout">Logout</button>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { LOGOUT } from "../store/auth/actions.type";
export default {
  computed: {
    ...mapState({
      user: state => state.auth.user,
      loggedIn: state => state.auth.isAuthenticated
    })
  },
  mounted() {},
  methods: {
    handleLogout() {
      this.$store.dispatch(LOGOUT).then(() => {
        this.$router.push("/login");
      });
    }
  }
};
</script>

<style lang="scss">
</style>