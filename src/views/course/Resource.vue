<template>
  <div class="app-resource-display">
    <template v-if="loaded">
      <button class="btn btn-outline-secondary" @click="handleBack">Go Back</button>
      <h3>{{ resource.title }}</h3>
      <p>{{ resource.created_by }}, {{ resource.created_at }}, {{ resource.type }}</p>
      <p>{{ resource.tags }}</p>

      <template v-if="resource.type === 'article'">
        <MarkdownPreview :content="resource.content" />
      </template>
      <template v-else>
        <LinkPreview :url="resource.content" />
      </template>

    </template>
    <template v-else>Loading</template>
  </div>
</template>

<script>
import { FETCH_RESOURSE } from "../../store/course/actions.type";
import { mapGetters } from "vuex";
import LinkPreview from "@/components/LinkPreview.vue";
import MarkdownPreview from "@/components/MarkdownPreview.vue";
import store from "@/store";
export default {
  components: {
    LinkPreview,
    MarkdownPreview
  },
  data() {
    return {
      loaded: true
    };
  },
  computed: {
    ...mapGetters({ resource: "activeResource" })
  },
  // TODO: Add a watcher to check route change
  methods: {
    handleBack() {
      this.$router.go(-1);
    }
  },
  beforeRouteEnter(to, from, next) {
    console.log("Ghusne se pehle hi dekh lo", to.params.id);

    if (to.params.id) {
      let resourceID = to.params.id;

      console.log("Han sab sahi hai manga raha ruko");

      store
        .dispatch(FETCH_RESOURSE, resourceID)
        .then(data => {
          console.log("Fetched resource", data);
          next();
        })
        .catch(err => {
          console.error(err);
          next("/");
        });
    } else {
      next("/");
    }
  }
};
</script>

<style lang="scss">
.app-resource-display {
  color: white;
}
</style>