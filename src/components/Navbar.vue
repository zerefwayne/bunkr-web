<template>
  <div class="app-navbar">
    <div class="brand">CollegePortal</div>
    <div class="content">Content</div>
    <template v-if="loggedIn">
      <div class="profile">
        <div class="details">{{ user ? '@'+user.username : ''}}</div>
        <div class="icons">
          <button class="btn btn-sm btn-light" @click="handleManageProfile">Manage</button>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState(["user", "loggedIn"])
  },
  mounted() {},
  methods: {
    ...mapMutations({ handleLogout: "AUTH_LOGOUT" }),
    handleLogin() {
      this.$router.push("/login");
    },
    handleManageProfile() {
      this.$router.push("/profile");
    }
  }
};
</script>

<style lang="scss">
@import "../styles/colors";

.app-navbar {
  height: 100%;
  background-color: $darkblue;
  display: flex;
  flex-direction: column;
  color: white;

  .brand {
    padding: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid white;
  }

  .content {
    flex: 1;
  }

  .profile {
    border-top: 1px solid white;
    padding: 1rem 2rem;

    display: flex;
    justify-content: space-between;
    align-items: center;

    .details {
      font-weight: bold;
      font-size: 1.1rem;
    }

    .icons {
      display: flex;
    }
  }
}

.navbar-style {
  color: white;
  display: flex;
  justify-content: space-between;

  @media (max-width: 990px) {
    flex-direction: column;
    align-items: flex-start;
  }
}

.right-nav {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
</style>