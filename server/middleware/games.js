const { Room } = require("../model/Room");

module.exports = function (req, res, next) {

    const user = req.user;
    try {
        Room.countDocuments({
            $or: [{ player1: user._id }, { player2: user._id }],
            $and: [{ status: "running" }]
        }, function (err, count) {
            if (!err) {
                console.log(count);
                if (count >= 6) {
                    res.status(400).send("You have too many active games");
                }
                next();
            }
        });
    } catch (ex) {
        res.status(400).send("Invalid token.");
    }



};