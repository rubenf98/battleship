<template>
  <div>
    <Back />

    <div class="room-container">
      <div id="boards">
        <div class="board" id="board1"></div>
        <div class="slip-container">
          <img src="/vs.png" alt />
        </div>
        <div class="board" id="board2"></div>
      </div>
      <div id="button-container">
        <img id="play-btn" v-on:click="startGame" src="/play-btn.png" alt />
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
  background-image: url("/room-wall.gif");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
  display: flex;
  flex-flow: column;
}

.room-container #boards {
  margin-top: 5%;
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

.room-container .slip-container {
  display: flex;
  align-items: center;
}

.room-container .slip-container img {
  width: 300px;
}

.room-container #play-btn {
  width: 100px;
}
.room-container #play-btn:hover {
  cursor: pointer;
  transform: scale(1.2);
}

.room-container #button-container {
  width: fit-content;
  display: flex;
  justify-content: center;
  width: 100%;
}

#wait-message {
  color: white;
  font-size: 3em;
}
.boatDisplay {
  background-color: black;
}
</style>

<script>
import io from "socket.io-client";
var socket = io("http://localhost:3000");
import Back from "./layout/Back.vue";
var audio = new Audio("/sounds/song.mp3");
var pathname = window.location.pathname.split("/");
var room_id = pathname[2];
export default {
  name: "Room",
  props: {
    msg: String
  },
  components: {
    Back
  },
  mounted() {
    createBoards();
    audio.play();
  },
  beforeRouteLeave(to, from, next) {
    audio.pause();
    audio.currentTime = 0;
    next();
  },
  methods: {
    startGame() {
      let btn = document.getElementById("play-btn");
      btn.style.display = "none";

      let waitMessage = document.createElement("p");
      waitMessage.id = "wait-message";
      waitMessage.innerHTML = "Waiting for your opponent";
      document.getElementById("button-container").appendChild(waitMessage);
      socket.emit("player-start", {
        token: localStorage.token.toString(),
        id_room: room_id
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
  socket.emit("click-piece", {
    room_id: room_id,
    piece_id: event.toElement.id,
    token: localStorage.token
  });
}

function createBoards() {
  let board1 = document.getElementById("board1");
  //var board = document.getElementById("board");
  for (let x = 0; x < 100; x++) {
    let element = document.createElement("div");
    element.id = `1-${x}`;
    board1.appendChild(element);
    element.classList.add("piece1");
  }
  var board2 = document.getElementById("board2");
  //var board = document.getElementById("board");
  for (let x = 0; x < 100; x++) {
    let element2 = document.createElement("div");
    element2.id = `2-${x}`;
    board2.appendChild(element2);

    element2.classList.add("piece2");
  }
  let display_boards = document.getElementById("boards");
  display_boards.style.display = "flex";

  addEventListenerOnBoard();

  socket.on("message", data => {
    console.log(data);
  });
}

function boardFill(player, boatsPos) {
  let player_id = player.substr(player.length - 1);
  console.log(player_id);
  console.log(boatsPos);
  boatsPos.forEach(element => {
    let div = document.getElementById(`${player_id}-${element}`);
    div.style.backgroundColor = "grey";
  });
}

//SOCKET IO
socket.on("click-response", data => {
  console.log(data);
});
socket.on("not-your-turn", () => {
  alert("Wait for your turn");
});
socket.on("both-players-not-ready", () => {
  alert("You need to press start and wait for the other player");
});
socket.on("both-ready", data => {
  let message = document.getElementById("wait-message");
  message.innerHTML = "Playing";
  boardFill(data.player, data.boats);
});
</script>


