<template>
  <div class="page-container">
    <script src="/socket.io/socket.io.js"></script>
    <script>
  var socket = io.connect("http://localhost");
  socket.on("news", function(data) {
    console.log(data);
    socket.emit("my other event", { my: "data" });
  });
    </script>
  </div>
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
