var express = require("express");
var bodyParser = require("body-parser");
const config = require("config");
const mongoose = require("mongoose");
var cors = require("cors");
var server = require("http").Server(express);
var io = require("socket.io")(app);

const usersRoute = require("./routes/user");
const roomsRoute = require("./routes/room");
const ranksRoute = require("./routes/rank");

var urlParser = bodyParser.urlencoded({ extended: false });
var app = express();
var port = 8000;

app.use(cors());
app.use(urlParser);
app.use(express.json());

//ROUTES
app.use("/api", usersRoute);
app.use("/api", roomsRoute);
app.use("/api", ranksRoute);

//use config module to get the privatekey, if no private key set, end the application
if (!config.get("myprivatekey")) {
  console.error("FATAL ERROR: myprivatekey is not defined.");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost/battleship", {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

app.get("/", function(req, res) {
  res.end("Hello");
});

io.on("connection", function(socket) {
  socket.emit("news", { hello: "world" });
  socket.on("my other event", function(data) {
    console.log(data);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}...`));
server.listen(80);
