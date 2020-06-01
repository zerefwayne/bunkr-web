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
        <router-view :key="$route.fullPath"></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { FETCH_COURSE } from "../store/course/actions.type";

export default {
  data() {
    return {
      courseSlug: null,
      isLoaded: false
    };
  },
  computed: {
    ...mapGetters({ courses: "courses", course: "activeCourse" })
  },
  watch: {
    "$route.params.slug": function(slug) {
      if (slug !== this.courseSlug) {
        this.courseSlug = slug;
        this.loadCourse();
      }
    },
    courses: function() {
      this.loadCourse();
    }
  },
  methods: {
    loadCourse() {
      if (this.courses) {
        let course = this.courses.find(course => {
          return course.slug === this.courseSlug;
        });

        this.isLoaded = false;

        if (course) {
          this.$store
            .dispatch(FETCH_COURSE, course.code)
            .then(()=> {
              this.isLoaded = true;
            })
            .catch(err => {
              console.error(err);
              this.isLoaded = false;
            });
        }
      }
    }
  },
  mounted() {
    this.courseSlug = this.$route.params.slug;
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