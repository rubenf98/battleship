const { Room, validate } = require("../model/Room");
const { User } = require("../model/User");

exports.store = async function (req, res, next) {
    // Validate request parameters, queries using express-validator

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findById(req.user._id).select("_id");
    if (!user) return res.status(403).send("you need to login!");

    let room = new Room({
        player1: user._id,
        player2: null,
        type: req.body.type,
        winner: null
    });

    room.save(function (err) {
        if (err) res.send("erro");
        else res.send(room);
    });
}

exports.destroy = async function (req, res, next) {
    const user = await User.findById(req.user._id).select("_id");
    if (!user) return res.status(403).send("you need to login!");

    const room = await Room.findById(req.params.room);
    if (!room) return res.status(404).send("room not found");

    if (room.player1 == user._id && room.player2 == null) {
        Room.deleteOne({ _id: room._id }, function (err) {
            if (!err) res.status(200).send("room deleted");
            else res.status(403).send("room can't be deleted");
        });
    }
}

exports.show = async function (req, res, next) {
    const user = await User.findById(req.user._id).select("_id");
    if (!user) return res.status(404).send("user not found");

    await Room.findById(req.params.room, (err, room) => {
        if (err) return res.status(404).send("room not found");

        if (
            (room.player1 == user._id || room.player2 == user._id) &&
            room.status != "finished"
        ) {
            console.log(room);
            res.status(200).send(room);
        } else {
            res.status(400).send("you can't access this room");
        }
    });
}

exports.joinSpecific = async function (req, res, next) {
    const user = await User.findById(req.user._id).select("_id");
    if (!user) return res.status(404).send("user not found");

    const room = await Room.findById(req.params.room);
    if (!room) return res.status(404).send("room not found");

    if (room.type == "private") {
        if (room.player2 == null) {
            if (room.player1 != user._id && room.player2 != user._id) {
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
            } else res.status(403).send("you already registered in this room");
        } else res.status(403).send("room already full");
    } else res.status(403).send("this room does not support link sharing");
}

exports.current = async function (req, res, next) {
    const user = await User.findById(req.user._id).select("_id");
    if (!user) return res.status(404).send("user not found");

    Room.find(
        {
            $or: [{ player1: user._id }, { player2: user._id }],
            $and: [{ status: "running" }]
        },
        "player1 player2 type status",
        function (err, rooms) {
            if (!err) {
                if (!rooms) return res.status(404).send("you have no current rooms");
                res.send(rooms);
            }
        }
    );
}

exports.history = async function (req, res, next) {
    const user = await User.findById(req.user._id).select("_id");
    if (!user) return res.status(404).send("user not found");

    Room.find(
        {
            $or: [{ player1: user._id }, { player2: user._id }],
            $and: [{ status: "finished" }]
        },
        "player1 player2 winner",
        function (err, rooms) {
            if (!err) {
                if (!rooms)
                    return res.status(404).send("you have not finished a game yet");
                res.send(rooms);
            }
        }
    );
}

exports.joinRandom = async function (req, res, next) {
    const user = await User.findById(req.user._id).select("_id");
    if (!user) return res.status(404).send("user not found");

    var id = req.user._id;

    let room = await Room.findOne({
        player2: null,
        status: "pending",
        player1: { $ne: id }
    });
    if (!room) return res.status(404).send("no rooms available");

    room.player2 = id;
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