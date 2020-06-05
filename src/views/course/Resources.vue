<template>
  <div class="app-resources">
    <div class="table-view">
      <table class="table table-dark">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Type</th>
            <th scope="col">Created At</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="resource in course.resources" :key="resource.id">
            <td>{{ resource.title }}</td>
            <td style="text-transform: capitalize;">{{ resource.type }}</td>
            <td style="text-transform: capitalize;">{{ resource.created_at }}</td>
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
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({ course: "activeCourse" })
  },
  mounted() {
    console.log(this.course);
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
}
</style>