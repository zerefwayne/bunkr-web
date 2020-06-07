<template>
  <div class="courses">
    <div class="section-header">
      <div class="title">My Courses</div>
      <div class="actions">
        <router-link class="btn-icon" tag="button" :to="{name: 'courses'}">
          <img src="@/assets/icons/edit.svg" />
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