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

<style lang="scss" scoped>
.app-markdown-preview {
  color: white;

  .article-container {
    padding: 2rem;
    padding-top: 2rem;
    border-radius: 5px;
    border: 1px solid #cccccc;
  }
}
</style>