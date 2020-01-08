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
    points: {
        type: Number,
        default: 0
    },
    counter: {
        type: Number,
        default: 0
    },
    league: {
        type: String,
        enum: ['unranked', 'bronze', 'silver', 'gold', 'diamond'],
        default: 'unranked',
    }
});

Schema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, config.get('myprivatekey'), { expiresIn: 3600 });
    return token;
}

Schema.methods.resetCounter = function (user) {
    user.counter = 0;
    user.save();
    return true;
}

Schema.methods.updatePoints = function (result, user) {
    if (result == "reset") user.points = 0;

    //Only ranked players can gain/lose points
    if (user.league != "unranked") {

        if (result == "victory")
            user.points += 4;

        else if (result == "defeat") {

            //Only users that are on a league for more than 2 games can lose points
            if (user.counter > 2) {

                //Bronze players can't have negative points
                if (user.league == "bronze") user.points = 0;
                else user.points -= 2;

            }
        }

        //Increment counter of games on this league
        user.counter++;
    }
    //Increment counter of unranked games
    else user.counter++;

    user.save();
    return user.points;
}

Schema.methods.updateLeague = function (user) {
    if (user.league != "unranked") {

        if (user.points > 20) {
            user.resetCounter(user);
            switch (user.league) {
                case "bronze":
                    user.league = "silver";
                    user.updatePoints("reset", user);
                    break;
                case "silver":
                    user.league = "gold";
                    user.updatePoints("reset", user);
                    break;
                case "gold":
                    user.league = "diamond";
                    user.updatePoints("reset", user);
                    break;
                default: user.league = "diamond";
                    break;
            }
        }
        else if (user.points < 0 && user.counter > 2) {
            user.resetCounter(user);
            user.updatePoints("reset", user);
            
            switch (user.league) {
                case "diamond":
                    user.league = "gold";
                    break;
                case "gold":
                    user.league = "silver";
                    break;
                default: user.league = "bronze";
                    break;
            }
        }
    }
    //A player needs to play 5 games to get a rank 
    else {

        if (user.counter >= 5) {
            //Check wins and update league if needed
            user.league = "bronze";
            user.resetCounter(user);
        }
    }

    user.save();
    return true;
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