<template>
  <div class="app-navbar">
    <div class="brand">CollegePortal</div>
    <div class="content">
      <div class="courses">
        <div class="section-header">My Courses</div>
        <ul class="list-group">
          <router-link
            tag="li"
            class="list-group-item"
            v-for="course in courses"
            :key="course.code"
            :to="`/course/${course.slug}`"
          >{{ course.name }}</router-link>
        </ul>
      </div>
      <div>
        <router-link
          :to="{name: 'resource-new'}"
          tag="button"
          class="btn btn-outline-secondary mt-3"
        >Add Resource</router-link>
      </div>
    </div>
    <div class="profile">
      <div class="details">{{ user ? '@'+user.username : ''}}</div>
      <div class="icons">
        <button class="btn btn-sm btn-light" @click="handleManageProfile">Manage</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { mockCourses } from "@/mock-data";
export default {
  data() {
    return {
      courses: mockCourses
    };
  },
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
    display: flex;
    flex-direction: column;

    .section-header {
      padding: 1rem;
      font-size: 1.2rem;
    }

    .courses {
      .list-group-item {
        background: none;

        cursor: pointer;

        &:hover {
          background-color: lighten($color: $darkblue, $amount: 2%);
        }
      }
    }
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