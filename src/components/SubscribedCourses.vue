<template>
  <div class="courses" @mouseover="hover = true" @mouseleave="hover = false">
    <div class="section-header">
      <div class="title">My Courses</div>
        <div class="actions" :class="hover ? 'show-actions' : 'hide-actions'">
          <router-link class="btn-icon" tag="button" :to="{name: 'courses'}">
            <i class="material-icons large">edit</i>
          </router-link>
        </div>
    </div>
    <template v-if="courses.length > 0">
      <div class="nav-courses-list">
        <ul class="list-group">
          <router-link
            tag="li"
            class="list-group-item"
            v-for="course in courses"
            active-class="active-link"
            :key="course.code"
            :to="`/course/${course.slug}`"
          >{{ course.name }}</router-link>
        </ul>
      </div>
    </template>
    <template v-else>
      <div class="empty-list">No courses subscribed.</div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      hover: false
    };
  },
  computed: {
    ...mapGetters({ courses: "getSubscribedCourses" })
  },
  methods: {}
};
</script>

<style lang="scss">
.section-header {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  padding: 0 1rem;
  font-weight: 400;
  text-transform: uppercase;

  display: flex;
  justify-content: space-between;
  align-items: center;

  .hide-actions {
    opacity: 0;
    transition: all 200ms ease-in-out;
  }

  .show-actions {
    opacity: 1;
    transition: all 200ms ease-in-out;
  }
}

.courses {
  .nav-courses-list {
    .list-group {
      .list-group-item {
        background: #111111;
        border: none;
        cursor: pointer;
        border-radius: 0;
        transition: all 0.2s ease-in-out;

        &:hover {
          background: lighten($color: #111111, $amount: 2%);
        }

        &.active-link {
          transition: all 0.2s ease-in-out;
          background-color: #0052cc;
        }
      }
    }
  }
}

.empty-list {
  padding: 0.5rem 1rem;
  color: gray;
}
</style>