<template>
  <div class="app-verify">verify {{$route.query.code}}!</div>
</template>

<script>
import axios from "axios";
import { VALIDATE } from "../store/auth/actions.type";
export default {
  mounted() {
    let code = this.$route.query.code;

    if (code) {
      axios
        .get("/user/verify", { params: { code } })
        .then(() => {
          this.$toasted.success("Success!");
          this.$store.dispatch(VALIDATE).then(() => {
            this.$router.push("/");
          });
        })
        .catch(({ response }) => {
          this.$toasted.error(JSON.stringify(response));
        });

      console.log("Verifying code", code);
    } else {
      this.$toasted.error("Invalid code");
    }
  }
};
</script>

<style lang="scss">
.app-verify {
  height: 100%;
  width: 100%;
  background-color: #111;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
}
</style>