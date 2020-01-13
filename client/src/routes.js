import Vue from "vue";
import Router from "vue-router";
import Menu from "./components/Menu.vue";
import Login from "./components/Login.vue";
import Ranks from "./components/Ranks.vue";
import Rank from "./components/Rank.vue";
import Room from "./components/Room.vue";
import LoadingRoom from "./components/LoadingRoom.vue";
import Continue from "./components/Continue.vue";
import History from "./components/History.vue";
import RoomSelection from "./components/RoomSelection.vue";

Vue.use(Router);

const routes = [
  { path: "/", component: Menu, name: "menu", props: true },
  { path: "/login", component: Login, name: "login" },
  { path: "/room", component: RoomSelection, name: "selection" },
  { path: '/room/search', component: LoadingRoom, name: "loadingroom" },
  { path: '/room/join/:room', component: LoadingRoom, name: "loadingroom" },
  { path: '/room/continue', component: Continue, name: "continue" },
  { path: '/room/history', component: History, name: "history" },
  { path: "/room/:room", component: Room, name: "room" },
  { path: '/ranks', component: Ranks, name: "ranks" },
  { path: '/ranks/:rank', component: Rank, name: "rank" },
];

export default routes;
