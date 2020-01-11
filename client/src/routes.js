import Vue from 'vue'
import Router from 'vue-router'
import Menu from "./components/Menu.vue";
import Login from "./components/Login.vue";

Vue.use(Router)

const routes = [
    { path: '/', component: Menu, name: "menu" },
    { path: '/login', component: Login, name: "login" },
];

export default routes;