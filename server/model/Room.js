const Joi = require('joi');
const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    player1: {
        type: String,
        required: true,
    },
    player2: {
        type: String,
        required: false,
    },
    winner: {
        type: String,
        required: false,
    },
    loser: {
        type: String,
        required: false,
    },
    type: {
        type: String,
        enum: ['public', 'private'],
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'running', 'finished'],
        default: 'pending',
    },
});

const Room = mongoose.model('Room', Schema);

function validateRoom(room) {
    const schema = {
        player1: Joi.string().required(),
        player2: Joi.string(),
        type: Joi.string().valid(["public", "private"]).required()
    };

    return Joi.validate(room, schema);
}

exports.Room = Room;
exports.validate = validateRoom;