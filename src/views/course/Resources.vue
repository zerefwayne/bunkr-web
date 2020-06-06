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
              <td>
                <router-link
                  tag="button"
                  :to="{name: 'resource', params: {id: resource.id}}"
                  class="btn btn-icon"
                >
                  <img src="@/assets/icons/preview.svg" />
                </router-link>
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
export default {
  computed: {
    ...mapGetters({ course: "activeCourse" })
  },
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