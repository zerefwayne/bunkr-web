<template>
  <div class="app-course">
    <div class="page-header">
      <div class="content">
        <h1>{{ course ? course.name : ''}}</h1>
        <h3
          class="text-secondary"
          style="text-transform: uppercase;"
        >{{ course ? course.code : '' }}</h3>
      </div>
    </div>
    <div class="page-nav">
      <ul class="nav">
        <li class="nav-item">
          <router-link
            class="nav-link"
            active-class="link-active"
            :to="`/course/${courseSlug}/resources`"
          ><i class="material-icons">topic</i> Resources</router-link>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link"
            active-class="link-active"
            :to="`/course/${courseSlug}/discuss`"
          ><i class="material-icons">forum</i> Discussion</router-link>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link"
            active-class="link-active"
            :to="`/course/${courseSlug}/about`"
          ><i class="material-icons">info</i> About</router-link>
        </li>
      </ul>
    </div>
    <div class="router-container">
      <transition name="fade" mode="out-in">
        <router-view :key="$route.fullPath"></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { FETCH_COURSE } from "@/store/course/actions.type";

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
        this.isLoaded = false;
        this.$store
          .dispatch(FETCH_COURSE, this.courseSlug)
          .then(data => {
            console.log("Fetched course", data);
            this.isLoaded = true;
          })
          .catch(err => {
            console.error(err);
            this.$router.go(-1);
          });
      }
    }
  },
  methods: {},
  mounted() {
    this.courseSlug = this.$route.params.slug;
    this.$store
      .dispatch(FETCH_COURSE, this.courseSlug)
      .then(data => {
        console.log("Fetched course", data);
        this.isLoaded = true;
      })
      .catch(err => {
        console.error(err);
        this.$router.go(-1);
      });
  }
};
</script>

<style lang="scss" scoped>
.app-course {
  background-color: #111;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>