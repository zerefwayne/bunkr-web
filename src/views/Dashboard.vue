<template>
  <div>
    <div class="page-header">
      <div class="content">
        <h1>{{ user ? `${user.name.split(' ')[0]}'s Bunker` : `Welcome!`}}</h1>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  methods: {},
  computed: {
    ...mapGetters(["user"])
  }
};
</script>

<style lang="scss">
</style>