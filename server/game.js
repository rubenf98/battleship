const { Room, validate } = require("./model/Room");

const io = require("socket.io")(3000);

// SOCKET IO
io.on("connection", (socket) => {
  console.log("user connected");
  socket.emit("message", "Socket.io");
  socket.on("start", () => {
    console.log("Game started");
  });
  socket.on("click-piece", (data) => {
    console.log(data);
    var send = verifyclick(data);
    socket.emit("click-response", send);
  });
});

function verifyclick(data) {
  //const room = Room.findById(room_id);
  //let board = room.player1Board;
  return data;
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
