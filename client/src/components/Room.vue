<template>
  <div>
    <Back />

    <div class="room-container">
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
        <img id="create-board-btn" v-on:click="createBoards" src="/play-btn.png" alt />
      </div>
    </div>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.room-container {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-image: url("/room-background.jpg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
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
.room-container .piece1:hover {
  background-color: rgba(10, 41, 216, 0.411);
  border: 1px solid rgba(0, 0, 0, 0.562);
  cursor: pointer;
}

.room-container .piece2 {
  background-color: rgba(250, 0, 0, 0.616);
  margin: 0;
  border: 1px solid black;
}

.room-container .piece2:hover {
  background-color: rgba(250, 0, 0, 0.411);
  border: 1px solid rgba(0, 0, 0, 0.562);
  cursor: pointer;
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
import io from "socket.io-client";
var socket = io("http://localhost:3000");
import Back from "./layout/Back.vue";

export default {
  name: "Room",
  props: {
    msg: String
  },
  components: {
    Back
  },
  data: function() {
    return {
      email: "",
      password: ""
    };
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

      addEventListenerOnBoard();

      socket.on("message", data => {
        console.log(data);
      });
    }
  }
};
function addEventListenerOnBoard() {
  var classPiece1 = document.getElementsByClassName("piece1");
  var classPiece2 = document.getElementsByClassName("piece2");

  for (let x = 0; x < classPiece1.length; x++) {
    classPiece1[x].addEventListener("click", clickPiece, false);
  }
  for (let x = 0; x < classPiece2.length; x++) {
    classPiece2[x].addEventListener("click", clickPiece, false);
  }
}
function clickPiece() {
  console.log(event.toElement.id);
  socket.emit("click-piece", `${event.toElement.id}`);
}

//SOCKET IO
socket.on("click-response", data => {
  console.log(data);
});
</script>


