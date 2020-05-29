<template>
  <div class="app-navbar">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="#">CollegePortal</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse navbar-style" id="navbarSupportedContent">
        <ul class="navbar-nav left-nav">
          <li class="nav-item active">
            <a class="nav-link" href="#">
              Home
              <span class="sr-only">(current)</span>
            </a>
          </li>
        </ul>
        <ul class="navbar-nav right-nav">
          <li class="nav-item mr-2">{{user ? user.name : ''}}</li>
          <li class="nav-item mr-2">{{user ? user.username : ''}}</li>
          <li class="nav-item">
            <button class="nav-link btn btn-outline-danger" @click="handleLogout">Logout</button>
          </li>
        </ul>
      </div>
    </nav>
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
    ...mapMutations({ handleLogout: "AUTH_LOGOUT" })
  }
};
</script>

<style lang="scss">
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
}
</style>