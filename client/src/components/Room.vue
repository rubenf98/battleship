<template>
  <div class="room-container">
    <script type="application/javascript" src="http://localhost:3000/socket.io/socket.io.js"></script>
    <script></script>
    <div id="room-page-header">
      <h1>Let the Battle Begin!</h1>
    </div>
    <div id="boards">
      <div class="board" id="board1"></div>
      <div class="slip-container">
        <img src="/vs.png" alt />
      </div>
      <div class="board" id="board2"></div>
    </div>
    <div id="button-container">
      <img id="create-board-btn" v-on:click="createBoards" src="/play.png" alt />
    </div>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.room-container {
  background-image: url("/room-wall.jpg");
  background-repeat: no-repeat;
  background-size: 100%;
  height: 100vh;
  display: flex;
  flex-flow: column;
}
.room-container h1 {
  text-align: center;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  font-size: 100px;
}

.room-container #boards {
  width: 100%;
  display: none;
  justify-content: center;
}
.room-container .board {
  display: grid;
  grid-template-columns: repeat(10, 40px);
  grid-template-rows: repeat(10, 40px);
  justify-content: center;
}

.room-container .piece1 {
  background-color: rgba(10, 41, 216, 0.616);
  margin: 0;
  border: 1px solid black;
}

.room-container .piece2 {
  background-color: rgba(250, 0, 0, 0.616);
  margin: 0;
  border: 1px solid black;
}

.room-container .slip-container img {
  width: 300px;
}

.room-container #create-board-btn {
  width: 300px;
}
.room-container #create-board-btn:hover {
  cursor: pointer;
  transform: scale(1.2);
}

.room-container #button-container {
  width: fit-content;
  display: flex;
  justify-content: center;
  width: 100%;
}
</style>

<script>
//import UserServices from "../UserService";
//import VueSocketio from "vue-socket.io";

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
  mounted() {
    let io = document.createElement("script");
    io.setAttribute("src", "http://cdn.socket.io/socket.io-1.4.5.js");
    document.head.appendChild(io);
  },
  methods: {
    createBoards() {
      let board1 = document.getElementById("board1");
      //var board = document.getElementById("board");
      for (let x = 1; x < 101; x++) {
        let element = document.createElement("div");
        element.id = `1-${x}`;
        board1.appendChild(element);
        element.classList.add("piece1");
      }
      var board2 = document.getElementById("board2");
      //var board = document.getElementById("board");
      for (let x = 1; x < 101; x++) {
        let element2 = document.createElement("div");
        element2.id = `2-${x}`;
        board2.appendChild(element2);

        element2.classList.add("piece2");
      }
      let display_boards = document.getElementById("boards");
      display_boards.style.display = "flex";
      let button = document.getElementById("create-board-btn");
      button.style.display = "none";

      var socket = io("http://localhost:3000");
      socket.on("message", data => {
        console.log(data);
      });
    }
  }
};
</script>


