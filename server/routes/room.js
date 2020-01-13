const auth = require("../middleware/auth");
const { Room, validate } = require("../model/Room");
const { User } = require("../model/User");
const express = require("express");
const router = express.Router();

//Join one random room
router.post("/room/random", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("_id");
  if (!user) return res.status(404).send("user not found");

  var id = req.user._id;

  let room = await Room.findOne({
    player2: null,
    status: "pending",
    player1: { $ne: id }
  });
  if (!room) return res.status(404).send("no rooms available");

  await room.save();

  res.send({
    _id: room._id,
    player1: room.player1,
    player2: room.player2,
    type: room.type,
    status: room.status,
    winner: room.winner,
    loser: room.loser
  });
});

//See my history rooms
router.get("/room/history", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("_id");
  if (!user) return res.status(404).send("user not found");

  Room.find(
    {
      $or: [{ player1: user._id }, { player2: user._id }],
      $and: [{ status: "finished" }]
    },
    "player1 player2 winner",
    function(err, rooms) {
      if (!err) {
        if (!rooms)
          return res.status(404).send("you have not finished a game yet");
        res.send(rooms);
      }
    }
  );
});

//See my current rooms
router.get("/room/private", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("_id");
  if (!user) return res.status(404).send("user not found");

  Room.find(
    {
      $or: [{ player1: user._id }, { player2: user._id }],
      $and: [{ status: "running" }]
    },
    "player1 player2 type status",
    function(err, rooms) {
      if (!err) {
        if (!rooms) return res.status(404).send("you have no current rooms");
        res.send(rooms);
      }
    }
  );
});

//Join one specific room
router.post("/room/:room", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("_id");
  if (!user) return res.status(404).send("user not found");

  const room = await Room.findById(req.params.room);
  if (!room) return res.status(404).send("room not found");

  if (room.type == "private") {
    if (room.player2 == null) {
      if (room.player1 != user._id) {
        room.player2 = user._id;
        await room.save();

        res.send({
          _id: room._id,
          player1: room.player1,
          player2: room.player2,
          type: room.type,
          status: room.status,
          winner: room.winner,
          loser: room.loser
        });
      }
      return res.status(403).send("you already registered in this room");
    }
    return res.status(403).send("room already full");
  }
  return res.status(403).send("this room does not support link sharing");
});

//Get one specific room
router.get("/room/:room", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("_id");
  if (!user) return res.status(404).send("user not found");

  const room = await Room.findById(req.params.room);
  if (!room) return res.status(404).send("room not found");

  res.send({
    _id: room._id,
    player1: room.player1,
    player2: room.player2,
    type: room.type,
    status: room.status,
    winner: room.winner,
    player1Board: room.player1Board,
    player2Board: room.player2Board
  });
});

//Create new room
router.post("/room", auth, async (req, res) => {
  // validate the request body first
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(req.user._id).select("_id");
  if (!user) return res.status(403).send("you need to login!");

  room = new Room({
    player1: user._id,
    player2: null,
    type: req.body.type,
    winner: null
  });

  await room.save();

  res.send({
    _id: room._id,
    player1: room.player1,
    player2: room.player2,
    type: room.type,
    status: room.status,
    winner: room.winner,
    player1Board: room.player1Board,
    player2Board: room.player2Board
  });
});

module.exports = router;
