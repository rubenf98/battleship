const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
});

Schema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, config.get('myprivatekey'), { expiresIn: 3600 });
    return token;
}

const User = mongoose.model('User', Schema);

function validateRegister(user) {
    const schema = {
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(3).max(255).required()
    };

    return Joi.validate(user, schema);
}

function validateLogin(user) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(3).max(255).required()
    };

    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = { validateRegister, validateLogin };