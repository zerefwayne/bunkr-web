<template>
  <div class="app-approve-pending">
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
              <div style="display:flex; align-items: center;">
                <router-link
                  tag="button"
                  :to="{name: 'resource', params: {id: resource.id}}"
                  class="btn-icon mr-2"
                >
                  <i class="material-icons large" style="color: white;">visibility</i>
                </router-link>
                <button class="btn-icon" @click="() => handleApproveResource(resource.id)">
                  <i class="material-icons large" style="color: white;">done</i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { APPROVE_RESOURCE } from "../../store/resource/actions.type";

export default {
  data() {
    return {};
  },
  methods: {
    handleApproveResource(id) {
      let body = {
        id
      };

      this.$store
        .dispatch(APPROVE_RESOURCE, body)
        .then(() => {
          console.log("Approved", id);
        })
        .catch(err => {
          console.log("Approve failed", err);
        });
    }
  },
  computed: {
    ...mapGetters({ resources: "pendingResources" })
  }
};
</script>

<style lang="scss">
.app-approve-pending {
  color: white;
  padding: 2rem;
}
</style>