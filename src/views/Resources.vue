<template>
  <div>
    <h3>Resources</h3>
    <ul class="list-group" v-if="activeCourse">
        <li
          class="list-group-item"
          v-for="resource in activeCourse.resources"
          :key="resource.id"
        >{{ resource.content }}</li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  methods: {},
  computed: {
    ...mapGetters(["activeCourse"])
  },
};
</script>

<style lang="scss">
</style>