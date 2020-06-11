<template>
  <div class="app-settings-contribution">
    <h3>Resources</h3>
    <div class="table-view">
      <table class="table table-dark table-striped">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Type</th>
            <th scope="col">Last Updated On</th>
            <th scope="col">Actions</th>
            <th scope="col">Approved</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="resource in resources" :key="resource.id">
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
                class="btn btn-icon mr-2"
              >
                <i class="material-icons large" style="color: white;">visibility</i>
              </router-link>
            </td>
            <td>
              <i class="material-icons large" v-if="resource.is_approved" style="color: #36B37E;">verified</i>
              <i class="material-icons large" v-else style="color:#FFAB00;">timer</i>
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
  methods: {},
  computed: {
    ...mapGetters({ resources: "userResources" })
  }
};
</script>

<style lang="scss">
.app-settings-contribution {
  color: white;
}
</style>