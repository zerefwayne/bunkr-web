<template>
  <div class="courses">
    <div class="section-header">My Courses</div>
    <template v-if="courses.length > 0">
        <ul class="list-group">
          <router-link
            tag="li"
            class="list-group-item"
            v-for="course in courses"
            active-class="active"
            :key="course.code"
            :to="`/course/${course.slug}`"
          >{{ course.name }}</router-link>
        </ul>
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
  text-transform: uppercase;
}

.courses {
  .list-group-item {
    background: none;
    border-radius: 0;
    cursor: pointer;
  }
}

.empty-list {
  padding: 0.5rem 1rem;
  color: gray;
}
</style>