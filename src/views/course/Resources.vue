<template>
  <div class="app-resources">
    <template v-if="course">
      <div class="table-view">
        <table class="table table-dark table-striped">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Type</th>
              <th scope="col">Last Updated On</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="resource in course.resources" :key="resource.id">
              <router-link
                tag="td"
                style="text-decoration: underline; cursor: pointer;"
                :to="{name: 'resource', params: {id: resource.id}}"
              >{{ resource.title }}</router-link>
              <td style="text-transform: capitalize;">{{ resource.type }}</td>
              <td
                style="text-transform: capitalize;"
              >{{ resource.created_at | moment("ddd, Do MMMM YYYY") }}</td>
              <td style="display: flex; align-items: center;">
                <router-link
                  tag="button"
                  :to="{name: 'resource', params: {id: resource.id}}"
                  class="btn btn-icon mr-2"
                >
                  <img src="@/assets/icons/preview.svg" />
                </router-link>
                <button
                  v-if="hasUpvoted(resource.upvotes)"
                  class="btn-icon"
                  @click="() => {downvoteResource(resource.id)}"
                >
                  <img src="@/assets/icons/downvote.svg" />
                </button>
                <button class="btn-icon" v-else @click="() => {upvoteResource(resource.id)}">
                  <img src="@/assets/icons/upvote.svg" />
                </button>
                <span class="ml-1" style="color: white; font-weight: bold;">{{ resource.upvotes.length }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  UPVOTE_RESOURCE,
  DOWNVOTE_RESOURCE
} from "../../store/resource/actions.type";
import { FETCH_COURSE } from '../../store/course/actions.type';
export default {
  computed: {
    ...mapGetters({ user: "user", course: "activeCourse" })
  },
  methods: {
    hasUpvoted(upvotes) {
      return upvotes.includes(this.user.id);
    },
    upvoteResource(resourceID) {
      this.$store
        .dispatch(UPVOTE_RESOURCE, resourceID)
        .then(() => {
          this.$toasted.success("Successfully upvoted!");
          this.$store.dispatch(FETCH_COURSE, this.course.slug);
        })
        .catch(err => {
          this.$toasted.error(
            `Error upvoting resource: ${JSON.stringify(err)}`
          );
        });
    },
    downvoteResource(resourceID) {
      this.$store
        .dispatch(DOWNVOTE_RESOURCE, resourceID)
        .then(() => {
          this.$toasted.success("Successfully downvoted!");
          this.$store.dispatch(FETCH_COURSE, this.course.slug);
        })
        .catch(err => {
          this.$toasted.error(
            `Error downvoting resource: ${JSON.stringify(err)}`
          );
        });
    }
  }
};
</script>

<style lang="scss">
.table-view {
  table.table {
    tbody {
      td {
        padding: 0.6rem;

        .btn-icon {
          padding: 0;
        }
      }
    }
  }
}

.app-resources {
  padding: 2rem;
}
</style>