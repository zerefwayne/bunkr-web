<template>
  <div>
    <ul class="list-group" v-if="course">
      <li class="list-group-item" v-for="resource in course.resources" :key="resource.id">
        <template v-if="resource.type === 'link'">
          <LinkPreview :url="resource.content" />
        </template>
        <template v-else-if="resource.type === 'article'">
          <div v-html="marked(resource.content)"></div>
        </template>
        <template v-else>{{ resource.content }}</template>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import LinkPreview from "@/components/LinkPreview.vue";
import marked from "marked";
export default {
  components: {
    LinkPreview
  },
  computed: {
    ...mapGetters({ course: "activeCourse" })
  },
  methods: {
    marked: function(content) {
      return marked(content);
    }
  },
  mounted() {
    console.log(this.course);
  },
  filters: {
    marked
  }
};
</script>

<style lang="scss">
</style>