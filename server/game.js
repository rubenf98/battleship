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
            socket.emit("click-response", {
              result: res,
              piece_id: data.piece_id
            });
            if (res == "hit") {
              verifyWinner(data, (result, enemy_player, socket1, socket2) => {
                console.log(result);
                console.log(enemy_player);
                if (result == -1) {
                  if (enemy_player == 1) {
                    io.to(socket2).emit("winner-message");
                    io.to(socket1).emit("loser-message");
                  } else if (enemy_player == 2) {
                    io.to(socket1).emit("winner-message");
                    io.to(socket2).emit("loser-message");
                  }
                }
              });
            }
          }
        });
      } else {
        socket.emit("both-players-not-ready");
      }
    });
  });
  //Send chat message
  socket.on("send-chat-message", (data) => {
    getTarget(data, (target) => {
      //console.log("message: " + data.message)
      io.to(target).emit("chat-message", {
        message: data.message,
      });
    });
  });
});

async function getTarget(data, callback) {
  const user = jwt.verify(data.token, config.get("myprivatekey"));
  const room = await Room.findById(data.id_room);
  let target;
  if (user._id == room.player1) {
    target = room.player2Socket;
  }
  else if (user._id == room.player2) {
    target = room.player1Socket;
  }
  callback(target);
}

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
      console.log(hit_value);
      if (hit_value == "boat") {
        // DON´T TOUCH 1h14min, 14 JAN 2020
        var incObject = {};
        incObject["player1Board." + identifyEnemyPiece + ""] = "hit";
        console.log(incObject);
        //
        Room.updateOne({ _id: room._id }, incObject, function (err, res) {
          callback("hit");
        });
      } else {
        room.turn = playerNext;
        await room.save();
        // DON´T TOUCH 1h14min, 14 JAN 2020
        var incObject = {};
        incObject["player1Board." + identifyEnemyPiece + ""] = "fail";
        //
        Room.updateOne({ _id: room._id }, incObject, function (err, res) {
          callback("fail");
        });
      }
    }
    if (identifyEnemyPlayer == 2) {
      let hit_value = room.player2Board[identifyEnemyPiece];
      if (hit_value == "boat") {
        // DON´T TOUCH 1h14min, 14 JAN 2020
        var incObject = {};
        incObject["player2Board." + identifyEnemyPiece + ""] = "hit";
        console.log(incObject);
        //
        Room.updateOne({ _id: room._id }, incObject, function (err, res) {
          callback("hit");
        });
      } else {
        room.turn = playerNext;
        await room.save();
        // DON´T TOUCH 1h14min, 14 JAN 2020
        var incObject = {};
        incObject["player2Board." + identifyEnemyPiece + ""] = "fail";
        console.log(incObject);
        //
        Room.updateOne({ _id: room._id }, incObject, function (err, res) {
          callback("fail");
        });
      }
    }
  } else {
    //NOT YOUR TURN
    await room.save();
    callback("erro");
  }
}

async function verifyWinner(data, callback) {
  /* 
  data.room_id
  data.piece_id
   */
  let identifyEnemyPlayer = data.piece_id.split("-");
  identifyEnemyPlayer = identifyEnemyPlayer[0];
  const room = await Room.findById(data.room_id);
  var board;
  if (identifyEnemyPlayer == 1) {
    board = room.player1Board;
  } else if (identifyEnemyPlayer == 2) {
    board = room.player2Board;
  }
  win_result = board.indexOf("boat");
  var socket1 = room.player1Socket;
  var socket2 = room.player2Socket;
  callback(win_result, identifyEnemyPlayer, socket1, socket2);
}


