<template>
  <div class="app-markdown-preview">
    <template v-if="$props.content">
      <div class="article-container" v-html="marked($props.content)"></div>
    </template>
    <template v-else>Content ille</template>
  </div>
</template>

<script>
import marked from "marked";

export default {
  props: ["content"],
  methods: {
    marked(content) {
      return marked(content);
    }
  }
};
</script>

<style lang="scss">
@import "~simplemde/dist/simplemde.min.css";

.app-markdown-preview {
  color: white;
}
</style>