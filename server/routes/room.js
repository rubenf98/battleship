const auth = require("../middleware/auth");
const { Room, validate } = require("../model/Room");
const { User } = require("../model/User");
const express = require("express");
const router = express.Router();

router.get("/room/:room", auth, async (req, res) => {
    // validate the request body first
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findById(req.user._id).select("_id");
    if (!user) return res.status(404).send("User not available!");

    console.log(user)

    room = new Room({
        player1: user._id,
        player2: null,
        type: req.body.type
    });

    await room.save();

    res.send({
        _id: room._id,
        player1: room.player1,
        player2: room.player2,
        type: room.type
    });
});

router.post("/room", auth, async (req, res) => {
    // validate the request body first
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findById(req.user._id).select("_id");
    if (!user) return res.status(404).send("User not available!");

    console.log(user)

    room = new Room({
        player1: user._id,
        player2: null,
        type: req.body.type
    });

    await room.save();

    res.send({
        _id: room._id,
        player1: room.player1,
        player2: room.player2,
        type: room.type
    });
});

module.exports = router;