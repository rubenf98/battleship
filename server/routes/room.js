const auth = require("../middleware/auth");
const games = require("../middleware/games");
const express = require("express");
const router = express.Router();

var RoomController = require('../controller/room')

//Join one random room
router.post("/room/random", auth, RoomController.joinRandom);

//See my history rooms
router.get("/room/history", auth, RoomController.history);

//See my current rooms
router.get("/room/private", auth, RoomController.current);

//Join one specific room
router.post("/room/join/:room", auth, RoomController.joinSpecific);

//Get one specific room
router.get("/room/:room", auth, RoomController.show);

//Create new room
router.post("/room", auth, games, RoomController.store);

//Delete specific room
router.delete("/room/:room", auth, RoomController.destroy);

module.exports = router;
