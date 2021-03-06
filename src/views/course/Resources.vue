<template>
  <div class="app-resources">
    <template v-if="course">
      <div class="table-view">
        <table class="table table-borderless">
          <caption>Fetched {{ course.resources.length }} resources</caption>
          <thead>
            <tr>
              <th scope="col" style="width:65%;" @click="() => {updateSort(constants.TITLE)}">
                <div class="title">
                  <span class="mr-1">Title</span>
                  <template v-if="sortBy === constants.TITLE">
                    <i class="material-icons" v-if="sortAsc">arrow_upward</i>
                    <i class="material-icons" v-else>arrow_downward</i>
                  </template>
                </div>
              </th>
              <th scope="col" style="width:15%" @click="() => {updateSort(constants.UPDATED_ON)}">
                <div class="title">
                  <span class="mr-1">Updated On</span>
                  <template v-if="sortBy === constants.UPDATED_ON">
                    <i class="material-icons" v-if="sortAsc">arrow_upward</i>
                    <i class="material-icons" v-else>arrow_downward</i>
                  </template>
                </div>
              </th>
              <th scope="col" style="width:10%" @click="() => {updateSort(constants.LIKES)}">
                <div class="title">
                  <span class="mr-1">Likes</span>
                  <template v-if="sortBy === constants.LIKES">
                    <i class="material-icons" v-if="sortAsc">arrow_upward</i>
                    <i class="material-icons" v-else>arrow_downward</i>
                  </template>
                </div>
              </th>
              <th scope="col" style="width:10%" @click="() => {updateSort(constants.SAVED)}">
                <div class="title">
                  <span class="mr-1">Save</span>
                  <template v-if="sortBy === constants.SAVED">
                    <i class="material-icons" v-if="sortAsc">arrow_upward</i>
                    <i class="material-icons" v-else>arrow_downward</i>
                  </template>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr scope="row" v-for="resource in resources" :key="resource.id">
              <router-link
                tag="td"
                style="cursor: pointer; display: flex; align-items: center"
                :to="{name: 'resource', params: {id: resource.id}}"
              >
                <i
                  class="material-icons mr-3"
                  v-if="resource.type === 'link'"
                  style="color: #00B8D9;"
                >insert_link</i>

                <i
                  class="material-icons mr-3"
                  v-if="resource.type === 'article'"
                  style="color: #FFAB00;"
                >notes</i>
                {{ resource.title }}
              </router-link>
              <td
                scope="row"
                style="text-transform: capitalize;"
              >{{ resource.created_at | moment("Do MMMM YYYY") }}</td>
              <td scope="row" style="display: flex; align-items: center;">
                <button
                  v-if="hasUpvoted(resource.upvotes)"
                  class="btn-icon"
                  @click="() => {downvoteResource(resource.id)}"
                >
                  <i class="material-icons">thumb_up</i>
                </button>
                <button class="btn-icon" v-else @click="() => {upvoteResource(resource.id)}">
                  <i class="material-icons" style="color: #555;">thumb_up</i>
                </button>
                <span
                  class="ml-2"
                  style="color: white; font-weight: bold;"
                >{{ resource.upvotes.length }}</span>
              </td>
              <td>
                <button
                  v-if="hasBookmarked(bookmarks, resource.id)"
                  class="btn-icon"
                  @click="() => {removeBookmark(resource.id)}"
                >
                  <i class="material-icons">turned_in</i>
                </button>
                <button class="btn-icon" v-else @click="() => {addBookmark(resource.id)}">
                  <i class="material-icons" style="color: #555;">turned_in</i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </div>
</template>

<script>
import moment from "moment";
import { mapGetters } from "vuex";
import {
  UPVOTE_RESOURCE,
  DOWNVOTE_RESOURCE
} from "../../store/resource/actions.type";
import { FETCH_COURSE } from "../../store/course/actions.type";
import {
  ADD_BOOKMARK,
  REMOVE_BOOKMARK
} from "../../store/bookmarks/actions.type";

let CONSTANTS = {
  TITLE: "title",
  UPDATED_ON: "created_at",
  LIKES: "upvotes",
  SAVED: "saved"
};

export default {
  data() {
    return {
      sortBy: CONSTANTS.TITLE,
      sortAsc: true,
      constants: CONSTANTS,
      resources: []
    };
  },
  watch: {
    course: {
      deep: true,
      handler: function(val) {
        this.resources = val.resources;
        console.log(this.resources);
      }
    }
  },
  mounted() {
    if (this.course) {
      this.resources = this.course.resources;
    }
  },
  computed: {
    ...mapGetters({
      user: "user",
      course: "activeCourse",
      bookmarks: "bookmarks"
    })
  },
  methods: {
    hasBookmarked(bookmarks, resourceID) {
      if (bookmarks) {
        return bookmarks.includes(resourceID);
      }
      return false;
    },
    sortResources() {
      this.resources = this.resources.sort((a, b) => {
        if (this.sortBy === CONSTANTS.TITLE) {
          if (this.sortAsc) {
            return a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1;
          } else {
            return a.title.toLowerCase() < b.title.toLowerCase() ? 1 : -1;
          }
        } else if (this.sortBy === CONSTANTS.UPDATED_ON) {
          if (this.sortAsc) {
            return moment(a.created_at) > moment(b.created_at) ? 1 : -1;
          } else {
            return moment(a.created_at) < moment(b.created_at) ? 1 : -1;
          }
        } else if (this.sortBy === CONSTANTS.LIKES) {
          if (this.sortAsc) {
            return a.upvotes.length > b.upvotes.length ? 1 : -1;
          } else {
            return a.upvotes.length < b.upvotes.length ? 1 : -1;
          }
        } else if (this.sortBy === CONSTANTS.SAVED) {
          if (
            this.hasBookmarked(this.bookmarks, a.id) &&
            this.hasBookmarked(this.bookmarks, b.id)
          ) {
            return a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1;
          }
          if (this.sortAsc) {
            return this.hasBookmarked(this.bookmarks, a.id) &&
              !this.hasBookmarked(this.bookmarks, b.id)
              ? 1
              : -1;
          } else {
            return !this.hasBookmarked(this.bookmarks, a.id) &&
              this.hasBookmarked(this.bookmarks, b.id)
              ? 1
              : -1;
          }
        }
      });
    },
    updateSort(by) {
      if (this.sortBy === by) {
        this.sortAsc = !this.sortAsc;
      } else {
        this.sortBy = by;
        this.sortAsc = true;

        if (this.sortBy === CONSTANTS.LIKES) {
          this.sortAsc = false;
        }
      }
      this.sortResources();
    },
    hasUpvoted(upvotes) {
      return upvotes.includes(this.user.id);
    },
    addBookmark(resourceID) {
      this.$store
        .dispatch(ADD_BOOKMARK, resourceID)
        .then(() => {
          this.$toasted.success("Successfully bookmarked!");
        })
        .catch(err => {
          this.$toasted.error(
            `Error bookmarking resource: ${JSON.stringify(err)}`
          );
        });
    },
    removeBookmark(resourceID) {
      this.$store
        .dispatch(REMOVE_BOOKMARK, resourceID)
        .then(() => {
          this.$toasted.success("Successfully unbookmarked!");
        })
        .catch(err => {
          this.$toasted.error(
            `Error unbookmarking resource: ${JSON.stringify(err)}`
          );
        });
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
    color: white;

    thead {
      font-size: 1.2rem;

      th {
        font-weight: normal;

        .title {
          display: flex;
          align-items: center;
        }

        &:hover {
          background-color: lighten($color: #222222, $amount: 1%);
          cursor: pointer;
        }
      }

      tr {
        border-bottom: 1px solid darken($color: #222222, $amount: 10%);
      }
    }

    tbody {
      tr {
        &:hover {
          background-color: lighten($color: #222222, $amount: 1%);
        }
      }

      td {
        padding: 1rem;

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