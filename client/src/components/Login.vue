<template>
  <div>
    <Back />

    <div class="auth-container">
      <div class="login-container card">
        <h1 class="card-title">Login</h1>
        <hr />
        <div>
          <label class="label" for="email">Email</label>
          <input class="form-input" type="email" v-model="login_email" />
        </div>
        <div>
          <label class="label" for="password">Password</label>
          <input class="form-input" type="password" v-model="login_password" />
        </div>

        <div class="button-container">
          <img class="submit-btn" v-on:click="login" src="/login-btn.png" alt />
        </div>
      </div>

      <div class="register-container card">
        <h1 class="card-title">Register</h1>
        <hr />
        <div>
          <label class="label" for="name">Name</label>
          <input class="form-input" type="text" v-model="register_name" />
        </div>
        <div>
          <label class="label" for="email">Email</label>
          <input class="form-input" type="email" v-model="register_email" />
        </div>
        <div>
          <label class="label" for="password">Password</label>
          <input class="form-input" type="password" v-model="register_password" />
        </div>
        <div class="button-container">
          <img class="submit-btn" v-on:click="register" src="/register-btn.png" alt />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Back from "./layout/Back.vue";
const { url } = require("../helper");

export default {
  name: "Login",
  components: {
    Back
  },
  data() {
    return {
      register_name: null,
      register_email: null,
      register_password: null,
      login_password: null,
      login_email: null,
      errors: null,
      response: null
    };
  },
  methods: {
    register() {
      const vm = this;
      axios
        .post(url + "/api/register", {
          name: this.register_name,
          email: this.register_email,
          password: this.register_password
        })
        .then(function(response) {
          vm.$router.push({
            name: "menu",
            params: { feedback: "User created!" }
          });
          console.log(response);
        })
        .catch(function(e) {
          vm.$router.push({
            name: "menu",
            params: { feedback: e.response.data }
          });
        });
    },
    login() {
      const vm = this;
      axios
        .post(url + "/api/login", {
          email: this.login_email,
          password: this.login_password
        })
        .then(function(res) {
          localStorage.token = res.data.token;
          window.location.href = "/";
        })
        .catch(function(e) {
          vm.$router.push({
            name: "menu",
            params: { feedback: e.response.data }
          });
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.auth-container {
  display: block;
  height: 100vh;
  background-image: url("/login-background.jpg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.submit-btn {
  width: 150px;
  transition: 0.3s ease;
}
.submit-btn:hover {
  cursor: pointer;
  transform: scale(1.05);
}

.button-container {
  width: fit-content;
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 10%;
}

.label {
  text-align: center;
  display: block;
  margin: 3% auto;
  margin-top: 7%;
  font-size: 1.5em;
  color: whitesmoke;
}

.login-container {
}

.form-input {
  width: 80%;
  display: block;
  margin: auto;
  border-radius: 5px;
  border: 2px solid rgb(149, 149, 149);
  margin: 1% auto;
  padding: 8px;
}

.register-container {
}
.card-title {
  text-align: center;
}
.card {
  background-color: rgba(0, 0, 0, 0.548);
  border-radius: 10px;
  padding: 3% 3%;
  min-width: 350px;
  color: white;
  margin: auto 5%;
}
</style>
