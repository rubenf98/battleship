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
    updateSocketID(data.id_room, decoded._id, socket.id);
    playerReady(decoded._id, data.id_room, (call) => {
      if (call == 1) {
        defineBoard(data.id_room, (indices1, indices2, socket1, socket2) => {
          io.to(socket1).emit("both-ready", {
            boats: indices1,
            player: "player1"
          });
          io.to(socket2).emit("both-ready", {
            boats: indices2,
            player: "player2"
          });
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

async function updateSocketID(room_id, player_id, socket) {
  let room = await Room.findOne({ _id: room_id });
  if (room.player1 == player_id) {
    room.player1Socket = socket;
    await room.save();
  } else if (room.player2 == player_id) {
    room.player2Socket = socket;
    await room.save();
  }
}

async function defineBoard(room_id, callback) {
  let room = await Room.findOne({ _id: room_id });
  let socket1 = room.player1Socket;
  let socket2 = room.player2Socket;
  //Indices will hold the positions of boats
  var indices1 = [];
  var indices2 = [];

  //GET ALL BOATS PLAYER 1
  let boatsPos1 = room.player1Board.indexOf("boat");
  while (boatsPos1 != -1) {
    indices1.push(boatsPos1);
    boatsPos1 = room.player1Board.indexOf("boat", boatsPos1 + 1);
  }

  //GET ALL BOATS PLAYER 2
  let boatsPos2 = room.player2Board.indexOf("boat");
  while (boatsPos2 != -1) {
    indices2.push(boatsPos2);
    boatsPos2 = room.player2Board.indexOf("boat", boatsPos2 + 1);
  }
  callback(indices1, indices2, socket1, socket2);
}

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
    /* data{
            room_id: '5e1ce40fd08d0008f59e395b',
            piece_id: '2-52',
            token: (...)
    }*/
    splitPiece_id = data.piece_id.split("-");
    identifyEnemyPlayer = splitPiece_id[0];
    identifyEnemyPiece = splitPiece_id[1];
    if (identifyEnemyPlayer == 1) {
      let hit_value = room.player1Board[identifyEnemyPiece];
      if (hit_value == "boat") {
        room.player1Board[identifyEnemyPiece] = "hit";
        await room.save();
        callback("hit");
      } else {
        room.turn = playerNext;
        await room.save();
        callback("fail");
      }
    }
    if (identifyEnemyPlayer == 2) {
      let hit_value = room.player2Board[identifyEnemyPiece];
      if (hit_value == "boat") {
        room.player2Board[identifyEnemyPiece] = "hit";
        await room.save();
        callback("hit");
      } else {
        room.turn = playerNext;
        await room.save();
        callback("fail");
      }
    }

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
