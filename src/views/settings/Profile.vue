<template>
  <div>
    <button class="btn btn-sm btn-danger" @click="handleLogout">Logout</button>
  </div>
</template>

<script>
import { LOGOUT } from "@/store/auth/actions.type";
export default {
  methods: {
    handleLogout() {
      this.$store.dispatch(LOGOUT).then(() => {
        this.$router.push("/welcome");
      });
    }
  }
};
</script>

<style lang="scss">
</style>