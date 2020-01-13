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
    default: Board1()
  },
  player2Board: {
    type: Array,
    minItems: 100,
    maxItems: 100,
    default: Board2()
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
    default: "null"
  }
});

const Room = mongoose.model("Room", RoomSchema);

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Board1() {
  let x = getRandomInt(0, 2);
  array1 = initial[x];
  return array1;
}
function Board2() {
  let y = getRandomInt(0, 2);
  array2 = initial[y];
  return array2;
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
