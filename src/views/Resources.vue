<template>
  <div>
    <h3>Resources</h3>
    <template v-if="isCourseLoaded">
      <ul class="list-group">
        <li class="list-group-item" v-for="resource in activeCourse.resources" :key="resource.id">
          {{ resource.content }}
        </li>
      </ul>
    </template>
  </div>
</template>

<script>
import {mapState} from "vuex";
export default {
  methods: {

  },
  computed: {
    ...mapState(["activeCourse", "isCourseLoaded"])
  },
  mounted() {
    
  },
};
</script>

<style lang="scss">
</style>