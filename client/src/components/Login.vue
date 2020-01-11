<template>
  <div class="page-container">
    <div class="login-container">
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" />
      <br />
      <label for="password">Password</label>
      <input type="password" id="password" v-model="password" />
      <br />
      <button v-on:click="login">LOGIN</button>
    </div>
    <div class="register-container"></div>
  </div>
</template>

<script>
import UserServices from "../UserService";

export default {
  name: "Login",
  props: {
    msg: String
  },
  data: function() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    async login() {
      await UserServices.login(this.email, this.password);
      this.email = "";
      this.password = "";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.page-container {
  display: flex;
}
.login-container {
  text-align: left;
}
</style>
