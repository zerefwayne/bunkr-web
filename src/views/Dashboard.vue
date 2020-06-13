<template>
  <div>
    <div class="page-header">
      <div class="content">
        <h1>{{ user ? `${user.name ? user.name.split(' ')[0] : ''}'s Bunker` : `Welcome!`}}</h1>
      </div>
    </div>
    <div style="padding: 2rem;">
      <template v-if="!isVerified">
        <div class="alert alert-warning" role="alert">Account not verified!</div>
      </template>
      <template v-else>
        <div class="alert alert-success" role="alert">Account successfully verified!</div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  methods: {},
  computed: {
    ...mapGetters(["user", "isVerified"])
  }
};
</script>

<style lang="scss">
</style>