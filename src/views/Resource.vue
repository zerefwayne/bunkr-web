<template>
  <div class="app-resource-display">
    <template v-if="loaded">
      <div class="mb-2">
        <div class="go-back" @click="handleBack">
          <img src="@/assets/icons/left.svg"> Back
        </div>
      </div>
      <h3>{{ resource.title }}</h3>
      <p>Contributor: {{ `@${resource.created_by.username ? resource.created_by.username : ''}` }}, {{ resource.created_at | moment("MMMM Do YYYY") }}</p>
      <p class="mb-5">
        <span class="badge badge-primary mr-1" v-for="tag in resource.tags" :key="tag">{{tag}}</span>
      </p>

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
import { FETCH_RESOURSE } from "@/store/resource/actions.type";
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
    // console.log("Ghusne se pehle hi dekh lo", to.params.id);

    if (to.params.id) {
      let resourceID = to.params.id;
      store
        .dispatch(FETCH_RESOURSE, resourceID)
        .then(() => {
          next();
        })
        .catch(err => {
          console.error(err);
          next("/");
        });
    } else {
      next(false);
    }
  }
};
</script>

<style lang="scss">
.app-resource-display {
  color: white;
  padding: 2rem;
}

.go-back {
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  cursor: pointer;
  margin-bottom: 2rem;
  color: #bbbbbb;
}

</style>