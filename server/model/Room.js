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
    type: {
        type: String,
        enum: ['public', 'private'],
        required: true,
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