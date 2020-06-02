<template>
  <div class="app-settings-profile">
    <div class="profile-details">
      <form>
        <div class="form-group">
          <h4>Personal Details</h4>
        </div>
        <div class="form-group row">
          <label for="inputEmail3" class="col-sm-2 col-form-label">Name</label>
          <div class="col-sm-10">
            <input
              type="text"
              class="form-control"
              id="inputEmail3"
              placeholder="Name"
              :value="user.name"
              disabled
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="inputEmail3" class="col-sm-2 col-form-label">Username</label>
          <div class="col-sm-10">
            <input
              type="text"
              class="form-control"
              id="inputEmail3"
              placeholder="Username"
              :value="user.username"
              disabled
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
          <div class="col-sm-10">
            <input
              type="email"
              class="form-control"
              id="inputEmail3"
              placeholder="Email"
              :value="user.email"
              disabled
            />
          </div>
        </div>
      </form>
    </div>
    <button class="btn btn-outline-danger mt-4" @click="handleLogout">Logout</button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { LOGOUT } from "@/store/auth/actions.type";
export default {
  methods: {
    handleLogout() {
      this.$store.dispatch(LOGOUT).then(() => {
        this.$router.push("/welcome");
      });
    }
  },
  computed: {
    ...mapGetters(["user"])
  }
};
</script>

<style lang="scss">
.app-settings-profile {
  .profile-details {
    width: 50%;
    color: white;

    .form-group {
      display: flex;
      align-items: center;

      label {
        font-size: 1.2rem;
      }

      input.form-control {
        background-color: #222;
        border: none;
        color: #cccccc;
      }

    }
  }
}
</style>