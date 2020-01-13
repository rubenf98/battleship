const { Room, validate } = require("./model/Room");
const { User } = require("./model/User");
const jwt = require("jsonwebtoken");
const config = require("config");
const io = require("socket.io")(3000);

// SOCKET IO
io.on("connection", (socket) => {
  console.log("user connected");

  //Response for pressing start
  socket.on("player-start", (data) => {
    const decoded = jwt.verify(data.token, config.get("myprivatekey"));
    console.log("user" + decoded._id)
    playerReady(decoded._id, data.id_room, (res) => {
      if (res == 1) {
        defineBoard(data.id_room, decoded._id, (indices, player) => {
          socket.emit("both-ready", { boats: indices, player: player });
        });
      }
    });
  });
  //Response for pressing on piece
  socket.on("click-piece", (data) => {
    getGameStatus(data, (status) => {
      if (status == "running") {
        verifyclick(data, (res) => {
          if (res === "erro") {
            socket.emit("not-your-turn");
          } else {
            socket.emit("click-response", res);
          }
        });
      } else {
        socket.emit("both-players-not-ready");
      }
    });
  });
});

async function getGameStatus(data, callback) {
  let room = await Room.findOne({ _id: data.room_id });
  let status = room.status;
  callback(status);
}

async function defineBoard(room_id, user_id, callback) {
  let room = await Room.findOne({ _id: room_id });
  var indices = [];

  if (room.player1 === user_id) {
    let boatsPos = room.player1Board.indexOf("boat");
    while (boatsPos != -1) {
      indices.push(boatsPos);
      boatsPos = array.indexOf("boat", boatsPos + 1);
    }

    callback(indices, "player1");

  }
  else if (room.player2 === user_id) {
    let boatsPos = room.player2Board.indexOf("boat");
    while (boatsPos != -1) {
      indices.push(boatsPos);
      boatsPos = array.indexOf("boat", boatsPos + 1);
    }
    callback(indices, "player2");
  }
}


//FIXED
async function playerReady(player_id, room_id, callback) {
  let room = await Room.findOne({ _id: room_id });

  if (player_id == room.player1) {
    room.player1Ready = true;
    await room.save();
  } else if (player_id == room.player2) {
    room.player2Ready = true;
    await room.save();
  }

  if (room.player1Ready == true && room.player2Ready == true) {
    room.status = "running";
    room.turn = "player1";
    await room.save();
    callback(1);
  } else {
    callback(0);
  }
}

async function verifyclick(data, callback) {
  const decoded = jwt.verify(data.token, config.get("myprivatekey"));
  const room = await Room.findById(data.room_id);
  let playerN = room.player1 == decoded._id ? "player1" : "player2";
  let playerNext = room.player1 != decoded._id ? "player1" : "player2";
  if (room.turn === playerN) {
    //Verify Array

    room.turn = playerNext;
    await room.save();
    callback(1);
  } else {
    //NOT YOUR TURN
    await room.save();
    callback("erro");
  }
}

// io.on("connection", (socket) => {
//   socket.on("new-user", (name) => {
//     socket.broadcast.emit("user-connected", name);
//   });
//   socket.on("send-chat-message", (message) => {
//     socket.broadcast.emit("chat-message", {
//       message: message,
//       name: users[socket.id]
//     });
//   });
//   socket.on("disconnect", () => {
//     socket.broadcast.emit("user-disconnected", users[socket.id]);
//     delete users[socket.id];
//   });
// });
