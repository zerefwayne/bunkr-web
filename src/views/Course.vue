<template>
  <div class="app-course">
    <div class="header">
      <h1>{{ course ? course.name : ''}}</h1>
      <h3 class="text-secondary" style="text-transform: uppercase;">{{ course ? course.code : '' }}</h3>
    </div>
      <div class="course-nav">
        <ul class="nav">
          <li class="nav-item">
            <router-link
              class="nav-link"
              active-class="active"
              :to="`/course/${courseSlug}/resources`"
            >Resources</router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              active-class="active"
              :to="`/course/${courseSlug}/discuss`"
            >Discussion</router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              active-class="active"
              :to="`/course/${courseSlug}/about`"
            >About</router-link>
          </li>
        </ul>
      </div>
      <div class="content">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      courseSlug: null
    };
  },
  computed: {
    ...mapState({
      courses: "courses",
      course: "activeCourse",
      isLoaded: "isCourseLoaded"
    })
  },
  watch: {
    "$route.params.slug": function(slug) {
      if (slug !== this.courseSlug) {
        this.courseSlug = slug;
        this.loadCourse();
      }
    }
  },
  methods: {
    ...mapActions({
      fetchCourse: "FETCH_COURSE"
    }),

    loadCourse() {
      let course = this.courses.find(course => {
        return course.slug === this.courseSlug;
      });

      this.fetchCourse(course.code);
    }
  },
  beforeMount() {
    this.courseSlug = this.$route.params.slug;
  },
  mounted() {
    console.log(this.courses, this.activeCourse);
    this.loadCourse();
  }
};
</script>

<style lang="scss">
.app-course {
  .header {
    background-color: #222222;
    padding: 3rem;
    color: white;
  }

  .course-nav {
    background-color: #eeeeee;
    padding: 0.5rem 3rem;
  }

  display: flex;
  flex-direction: column;
}
</style>