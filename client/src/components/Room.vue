<template>
  <div>
    <Back />

    <div class="room-container">
      <div id="boards">
        <div class="board responsive-top-margin" id="board1"></div>
        <div class="split-container">
          <img src="/vs.png" alt />
        </div>
        <div class="board" id="board2"></div>
      </div>
      <div id="button-container">
        <img id="play-btn" v-on:click="startGame" src="/play-btn.png" alt />
      </div>
      <div v-if="share" class="link-share-container">
        <label class="link-share-label" for="link_share">Copy link and share it!</label>
        <input
          class="link-share-input"
          type="text"
          name="link_share"
          id="link_share"
          v-model="share"
        />
      </div>
    </div>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
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
  overflow: auto;
}

.room-container #boards {
  margin-top: 5%;
  width: 100%;
  display: none;
  justify-content: center;
  flex-wrap: wrap;
}
.room-container .board {
  display: grid;
  grid-template-columns: repeat(10, 40px);
  grid-template-rows: repeat(10, 40px);
  justify-content: center;
  margin: 3% 1%;
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

.room-container .split-container {
  display: flex;
  align-items: center;
}

.room-container .split-container img {
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

.link-share-container {
  display: flex;
  margin: 3% auto;
  justify-content: center;
  flex-direction: column;
  width: 30%;
  min-width: 250px;
}
.link-share-label {
  text-align: center;
  color: white;
  font-size: 2em;
  font-weight: bold;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
}
.link-share-input {
  border-radius: 6px;
  padding: 10px;
  margin: auto;
  width: 70%;
}

.room-container .hit {
  background-image: url("/icons/hit.svg");
  background-size: cover;
}

.room-container .fail {
  background-image: url("/icons/fail.svg");
  background-size: cover;
}

@media only screen and (max-width: 1267px) {
  .room-container .split-container {
    display: none;
  }
  .room-container .board {
    grid-template-columns: repeat(10, 30px);
    grid-template-rows: repeat(10, 30px);
    margin: 5% auto;
  }
  .link-share-label {
    font-size: 1.5em;
  }
  .link-share-container {
    width: 30%;
  }
}
@media only screen and (max-width: 500px) {
  .room-container .board {
    grid-template-columns: repeat(10, 25px);
    grid-template-rows: repeat(10, 25px);
  }

  .room-container .responsive-top-margin {
    margin-top: 80px;
  }

  .link-share-label {
    font-size: 1.2em;
  }
  .link-share-input {
    padding: 5px;
    margin: 5% auto;
  }
}
</style>

<script>
import axios from "axios";
import io from "socket.io-client";
var socket = io("http://localhost:3000");
import Back from "./layout/Back.vue";
var audio = new Audio("/sounds/song.mp3");

export default {
  name: "Room",
  props: {
    msg: String
  },
  data() {
    return {
      current_room: null,
      share: null
    };
  },
  components: {
    Back
  },
  mounted() {
    const vm = this;
    var pathname = window.location.pathname.split("/");
    var room_id = pathname[2];
    axios
      .get("http://localhost:8000/api/room/" + room_id, {
        headers: { "x-access-token": localStorage.token }
      })
      .then(res => {
        this.current_room = res.data;
        if (res.data.type == "private" && res.data.status == "pending") {
          this.share = "http://localhost:8080/room/join/" + res.data._id;
        }
      })
      .catch(function(e) {
        vm.$router.push({
          name: "menu",
          params: { feedback: e.response.data }
        });
      });

    createBoards();
    audio.play();
  },
  beforeRouteLeave(to, from, next) {
    if (
      confirm(
        "Do you really want to leave? This may result on you losing the game."
      )
    ) {
      audio.pause();
      audio.currentTime = 0;
      if (this.current_room.player2 == null) {
        console.log("here");
        axios.delete(
          "http://localhost:8000/api/room/" + this.current_room._id,
          {
            headers: {
              "x-access-token": localStorage.token
            },
            data: {
              room_id: this.current_room._id
            }
          }
        );
      }
      next();
    } else {
      next(false);
    }
  },
  methods: {
    startGame() {
      var pathname = window.location.pathname.split("/");
      var room_id = pathname[2];
      console.log(room_id);
      socket.emit("player-start", {
        token: localStorage.token.toString(),
        id_room: room_id
      });
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

function addEventListenerOnBoard(player) {
  var classPiece1 = document.getElementsByClassName("piece1");
  var classPiece2 = document.getElementsByClassName("piece2");

  if (player == "player2") {
    for (let x = 0; x < classPiece1.length; x++) {
      classPiece1[x].addEventListener("click", clickPiece, false);
    }
  }
  if (player == "player1") {
    for (let x = 0; x < classPiece2.length; x++) {
      classPiece2[x].addEventListener("click", clickPiece, false);
    }
  }
}

function clickPiece() {
  console.log("clicou");
  var pathname = window.location.pathname.split("/");
  var room_id = pathname[2];
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

  socket.on("message", data => {
    console.log(data);
  });
}

function boardFill(player, boatsPos) {
  let player_id = player.substr(player.length - 1);
  boatsPos.forEach(element => {
    let div = document.getElementById(`${player_id}-${element}`);
    div.style.backgroundColor = "grey";
  });
}

//SOCKET IO
socket.on("click-response", data => {
  let piece = document.getElementById(`${data.piece_id}`);
  //let enemyPlayer = data.piece_id.split("-");
  //enemyPlayer = enemyPlayer[0];
  if (data.result == "hit") {
    piece.classList.add("hit");
    piece.removeEventListener("click", clickPiece, false);
  } else {
    piece.classList.add("fail");
    piece.removeEventListener("click", clickPiece, false);
  }
  //READ DATA!
});
socket.on("not-your-turn", () => {
  alert("Wait for your turn");
});
socket.on("both-players-not-ready", () => {
  alert("You need to press start and wait for the other player");
});
socket.on("both-ready", data => {
  addEventListenerOnBoard(data.player);
  let message = document.getElementById("wait-message");
  boardFill(data.player, data.boats);

  message.innerHTML = "Playing...";
});
</script>
