<template>
  <div class="page-container"></div>
</template>

<script>
//import UserServices from "../UserService";

export default {
  name: "Room",
  props: {
    msg: String
  },
  data: function() {
    return {
      email: "",
      password: ""
    };
  },
  created: function() {
    var socket = io("http://localhost:3000");
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.page-container {
  display: flex;
  flex-flow: column;
}
</style>
