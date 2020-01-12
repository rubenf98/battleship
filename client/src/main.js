import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import routes from "./routes";
import socketio from "socket.io";
import VueSocketIO from "vue-socket.io";

Vue.config.productionTip = false;

export const SocketInstance = socketio("http://localhost:3000");

Vue.use(VueSocketIO, SocketInstance);

Vue.use(VueRouter);
const router = new VueRouter({ mode: "history", routes });

new Vue({
  router,
  render: (h) => h(App)
}).$mount("#app");
