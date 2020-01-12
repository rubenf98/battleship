<template>
  <div>
    <Auth :logged="logged" />
    <div id="particle-container">
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
    </div>

    <div class="menu-container">
      <div class="left-container">
        <div class="logo-container">
          <h1 class="title">Total Battleship</h1>
          <img src="/logo.svg" class="logo" />
        </div>

        <div class="spacer"></div>

        <div v-if="logged" class="menu">
          <router-link class="menu-item" to="/room">
            <span class="item">new game</span>
          </router-link>
          <router-link class="menu-item" to="/room/search">
            <span class="item">find game</span>
          </router-link>
          <router-link class="menu-item" to="/room/continue">
            <span class="item">continue</span>
          </router-link>
          <router-link class="menu-item" to="/room/history">
            <span class="item">game history</span>
          </router-link>
          <router-link class="menu-item" to="/ranks">
            <span class="item">world rank</span>
          </router-link>
        </div>
        <div v-if="!logged" class="menu">
          <router-link class="menu-item" to="/login">
            <span class="item">new game</span>
          </router-link>
          <router-link class="menu-item" to="/login">
            <span class="item">find game</span>
          </router-link>
          <router-link class="menu-item" to="/login">
            <span class="item">continue</span>
          </router-link>
          <router-link class="menu-item" to="/login">
            <span class="item">game history</span>
          </router-link>
          <router-link class="menu-item" to="/ranks">
            <span class="item">world rank</span>
          </router-link>
        </div>
      </div>
    </div>

    <div v-if="feedback" class="feedback" id="feedback">
      <h1 class="feedback-message">{{feedback}}</h1>
    </div>
  </div>
</template>

<script>
import JQuery from "jquery";
import Auth from "./layout/Auth.vue";
let $ = JQuery;

export default {
  name: "menu",
  props: ["logged", "feedback"],
  components: {
    Auth
  },
  mounted() {
    setTimeout(function() {
      $("#feedback").fadeOut();
    }, 5000);
  }
};
</script>




<style scoped>
.feedback {
  width: 250px;
  height: 150px;
  background-image: linear-gradient(rgba(0, 117, 160, 0.404) rgb(0, 97, 187));
  color: white;
  position: absolute;
  right: 0;
  bottom: 70px;
  border-radius: 10px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  padding: 15px;
  box-shadow: 0 0 10px rgba(119, 119, 119, 0.342);
  border: none;
  display: table;
  animation: entrance 1s ease-out;
}
.feedback-message {
  font-size: 1.5em;
  text-transform: capitalize;
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}
.menu-container {
  display: block;
  height: 100vh;
  background-image: url("/background.jpg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  display: flex;
  align-items: center;
  font-family: "Candal", sans-serif;
}

.left-container {
  height: 80%;
  display: flex;
  padding-left: 50px;
  flex-direction: column;
  justify-content: flex-start;
  flex-basis: 100%;
  flex: 1;
}
.menu {
  display: block;
  margin-bottom: auto;
}

.logo-container {
  display: flex;
  align-items: center;
}

.spacer {
  flex-grow: 1;
}

.logo {
  width: 100px;
  height: 100px;
  display: inline-block;
}

.title {
  color: white;
  font-weight: bold;
  font-size: 3.5em;
  margin-right: 5px;
  font-family: "Black Ops One", cursive;
}

.menu-item {
  color: gray;
  width: 20%;
  margin: 20px 0px;
  text-decoration: none;
  display: block;
  padding: 5px 10px;
}

.item {
  cursor: pointer;
  text-transform: uppercase;
  font-size: 1.5em;
}

.menu-item:hover {
  background: rgba(97, 97, 97, 0.287);
}

.menu-item:hover .item {
  color: white;
}

@keyframes entrance {
  0% {
    right: -200px;
  }
  100% {
    right: 0px;
  }
}

@media only screen and (max-width: 1000px) {
  .title {
    font-size: 3.5em;
  }
  .menu-item {
    width: 70%;
  }
}

@media only screen and (max-width: 767px) {
  .logo {
    display: none;
  }
  .title {
    font-size: 2.5em;
  }
}

@media only screen and (max-width: 450px) {
  .left-container {
    padding-left: 0;
    margin: auto;
  }
  .title {
    font-size: 2.5em;
    text-align: center;
  }
  .menu-item {
    width: 100%;
    text-align: center;
  }
}
</style>