<template>
  <div>
    <Auth :logged="logged" />

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

          <a class="menu-item" href="#">
            <span class="item">find game</span>
          </a>
          <a class="menu-item" href="#">
            <span class="item">game history</span>
          </a>
          <router-link class="menu-item" to="/ranks">
            <span class="item">world rank</span>
          </router-link>
        </div>
        <div v-if="!logged" class="menu">
          <router-link class="menu-item" to="/login">
            <span class="item">new game</span>
          </router-link>

          <a class="menu-item" to="/login">
            <span class="item">find game</span>
          </a>
          <a class="menu-item" to="/login">
            <span class="item">game history</span>
          </a>
          <router-link class="menu-item" to="/ranks">
            <span class="item">world rank</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Auth from "./layout/Auth.vue";

export default {
  name: "menu",
  props: ["logged"],
  components: {
    Auth
  }
};
</script>

<style scoped>
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
</style>