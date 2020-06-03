<template>
  <div>
    <ul class="list-group" v-if="course">
        <li
          class="list-group-item"
          v-for="resource in course.resources"
          :key="resource.id"
        >
        <template v-if="resource.type === 'link'">
          <LinkPreview :url="resource.content" />
        </template>
        <template v-else>
          {{ resource.content }}
        </template>
        
        </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import LinkPreview from '@/components/LinkPreview.vue';
export default {
  methods: {},
  components: {
    LinkPreview
  },
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