const { Room, validate } = require("./model/Room");
const { User } = require("./model/User");
const jwt = require("jsonwebtoken");
const config = require("config");

//SOCKET
const io = require("socket.io")(3000);
const encrypt = require("socket.io-encrypt");
io.use(encrypt("secret"));

// SOCKET IO
io.on("connection", (socket) => {
  console.log("user connected");

  //Response for pressing start
  socket.on("player-start", (data) => {
    const decoded = jwt.verify(data.token, config.get("myprivatekey"));
    updateSocketID(data.id_room, decoded._id, socket.id);
    playerReady(decoded._id, data.id_room, (call) => {
      if (call == 1) {
        defineBoard(data.id_room, (p1_send, p2_send) => {
          io.to(p1_send.socket).emit("both-ready", {
            myBoard: p1_send.myBoard,
            enemyBoard: p1_send.enemyBoard,
            player: "player1"
          });
          io.to(p2_send.socket).emit("both-ready", {
            myBoard: p2_send.myBoard,
            enemyBoard: p2_send.enemyBoard,
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
        verifyclick(data, (res, enemy_socket) => {
          if (res == "erro") {
            socket.emit("not-your-turn");
          } else {
            socket.emit("click-response", {
              result: res,
              piece_id: data.piece_id
            });
            io.to(enemy_socket).emit("enemy_play", {
              result: res,
              piece_id: data.piece_id
            });

            if (res == "hit") {
              verifyWinner(data, (result, enemy_player, socket1, socket2) => {
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
        message: data.message
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
  } else if (user._id == room.player2) {
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
  //SOCKETS
  let socket1 = room.player1Socket;
  let socket2 = room.player2Socket;
  //GET BOARDS
  let boardP1 = room.player1Board;
  let boardP2 = room.player2Board;

  // Remove boats from boards in order to send to oppenent
  let boardP1Send = boardP1;
  let boardP2Send = boardP2;
  var idx1 = boardP1Send.indexOf("boat");
  while (idx1 != -1) {
    boardP1Send[idx1] = "empty";
    idx1 = boardP1Send.indexOf("boat");
  }
  var idx2 = boardP2Send.indexOf("boat");
  while (idx2 != -1) {
    boardP2Send[idx2] = "empty";
    idx2 = boardP2Send.indexOf("boat");
  }

  room = await Room.findOne({ _id: room_id });
  boardP1 = room.player1Board;
  boardP2 = room.player2Board;

  var data_send_p1 = {
    socket: socket1,
    myBoard: boardP1,
    enemyBoard: boardP2Send
  };
  var data_send_p2 = {
    socket: socket2,
    myBoard: boardP2,
    enemyBoard: boardP1Send
  };

  /* preciso enviar para cada player: 
  socket, o seu tabuleiro inteiro e o tabuleiro inimigo só com hit e fails  */
  callback(data_send_p1, data_send_p2);
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
    splitPiece_id = data.piece_id.split("-");
    var identifyEnemyPlayer = splitPiece_id[0];
    var identifyEnemyPiece = splitPiece_id[1];
    if (identifyEnemyPlayer == 1) {
      let hit_value = room.player1Board[identifyEnemyPiece];
      console.log(hit_value);
      if (hit_value == "boat") {
        // DON´T TOUCH 1h14min, 14 JAN 2020
        var incObject = {};
        incObject["player1Board." + identifyEnemyPiece + ""] = "hit";
        console.log(incObject);
        //
        Room.updateOne({ _id: room._id }, incObject, function(err, res) {
          callback("hit", room.player1Socket);
        });
      } else {
        room.turn = playerNext;
        await room.save();
        // DON´T TOUCH 1h14min, 14 JAN 2020
        var incObject = {};
        incObject["player1Board." + identifyEnemyPiece + ""] = "fail";
        //
        Room.updateOne({ _id: room._id }, incObject, function(err, res) {
          callback("fail", room.player1Socket);
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
        Room.updateOne({ _id: room._id }, incObject, function(err, res) {
          callback("hit", room.player2Socket);
        });
      } else {
        room.turn = playerNext;
        await room.save();
        // DON´T TOUCH 1h14min, 14 JAN 2020
        var incObject = {};
        incObject["player2Board." + identifyEnemyPiece + ""] = "fail";
        console.log(incObject);
        //
        Room.updateOne({ _id: room._id }, incObject, function(err, res) {
          callback("fail", room.player2Socket);
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
  var win_result = board.indexOf("boat");
  var socket1 = room.player1Socket;
  var socket2 = room.player2Socket;

  if (win_result == -1) {
    if (identifyEnemyPlayer == 1) {
      room.status = "finished";
      room.winner = "player2";
      room.save();
    } else if (identifyEnemyPlayer == 2) {
      room.status = "finished";
      room.winner = "player1";
      room.save();
    }
  }
  callback(win_result, identifyEnemyPlayer, socket1, socket2);
}
