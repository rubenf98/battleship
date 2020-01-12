var express = require("express");
var bodyParser = require("body-parser");
const config = require("config");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const game = require("./game.js");

const usersRoute = require("./routes/user");
const roomsRoute = require("./routes/room");
const ranksRoute = require("./routes/rank");

var urlParser = bodyParser.urlencoded({ extended: false });
const app = express();
var port = 8000;
const corsOptions = {
  exposedHeaders: "x-access-token"
};
app.use(cors(corsOptions));
var server = http.Server(app);
//var io = socketio(server);

//middlewares
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
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.error("Could not connect to MongoDB..."));

app.get("/", function(req, res) {
  res.end("Hello");
});

//app.listen(port, () => console.log(`Listening on port ${port}...`));
server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
