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
    default: Board()
  },
  player2Board: {
    type: Array,
    minItems: 100,
    maxItems: 100,
    default: Board()
  },
  player1Ready: {
    type: Boolean,
    default: false
  },
  player2Ready: {
    type: Boolean,
    default: false
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

function Board() {
  let x = getRandomInt(0, 2);
  array = initial[x];
  return array;
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
