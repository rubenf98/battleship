const Joi = require("joi");
const mongoose = require("mongoose");
const { initial } = require("../helper");

const RoomSchema = new mongoose.Schema({
  player1: {
    type: String,
    required: true
  },
  player2: {
    type: String,
    required: false
  },
  winner: {
    type: String,
    required: false
  },
  type: {
    type: String,
    enum: ["public", "private"],
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "running", "finished"],
    default: "pending"
  },
  player1Board: {
    type: Array,
    minItems: 100,
    maxItems: 100,
  },
  player2Board: {
    type: Array,
    minItems: 100,
    maxItems: 100,
  },
  player1Ready: {
    type: Boolean,
    default: false
  },
  player2Ready: {
    type: Boolean,
    default: false
  },
  player1Socket: {
    type: String,
    default: null
  },
  player2Socket: {
    type: String,
    default: null
  },
  turn: {
    type: String,
    default: "player1"
  }
});

const Room = mongoose.model("Room", RoomSchema);

function Board1() {
  let min = Math.ceil(0);
  let max = Math.floor(9);
  let random = Math.floor(Math.random() * (max - min + 1)) + min;
  return initial[random];
}
function Board2() {
  let min = Math.ceil(0);
  let max = Math.floor(9);
  let random = Math.floor(Math.random() * (max - min + 1)) + min;
  return initial[random];;
}

function validateRoom(room) {
  const schema = {
    player1: Joi.string(),
    player2: Joi.string(),
    type: Joi.string()
      .valid(["public", "private"])
      .required()
  };

  return Joi.validate(room, schema);
}

exports.Room = Room;
exports.validate = validateRoom;
