<template>
  <div id="app">
    <h1 class="display-1">College</h1>
  </div>
</template>

<script>
export default {
  
  mounted() {
    this.axios.get("/user/test").then(data => {
      console.log(data);
    }).catch(err => {
      console.error(err);
    })
  }

}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

</style>
