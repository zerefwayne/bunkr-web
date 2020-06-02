<template>
  <div>
    <h3>Resources</h3>
    <ul class="list-group" v-if="course">
        <li
          class="list-group-item"
          v-for="resource in course.resources"
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
    ...mapGetters({course: "activeCourse"})
  },
  mounted() {
    console.log(this.course);
  }
};
</script>

<style lang="scss">
</style>