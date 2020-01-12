import Vue from "vue";
import Router from "vue-router";
import Menu from "./components/Menu.vue";
import Login from "./components/Login.vue";
import Ranks from "./components/Ranks.vue";
import Rank from "./components/Rank.vue";
import Room from "./components/Room.vue";

Vue.use(Router);

const routes = [
  { path: "/", component: Menu, name: "menu" },
  { path: "/login", component: Login, name: "login" },
  { path: "/room", component: Room, name: "room" }
    { path: '/ranks', component: Ranks, name: "ranks" },
    { path: '/ranks/:rank', component: Rank, name: "rank" },
];

export default routes;  