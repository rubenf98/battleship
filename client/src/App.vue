<template>
  <div id="app">
    <router-view v-if="logged != null" :logged="logged" />
  </div>
</template>

<script>
import axios from "axios";
const { url } = require("./helper");

export default {
  name: "app",
  data() {
    return {
      logged: null
    };
  },
  mounted() {
    if (localStorage.token) {
      axios
        .get(url + "/api/logged", {
          headers: {
            "x-access-token": localStorage.token
          }
        })
        .then(res => {
          this.logged = res.data;
          console.log(res.data);
        });
    } else this.logged = false;
  }
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>
