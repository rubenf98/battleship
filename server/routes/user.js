const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const { User, validate } = require("../model/User");
const express = require("express");
const router = express.Router();

router.get("/user/current", auth, async (req, res) => {
    const user = await User.findById(req.user._id).select("-password");
    res.send(user);
});

router.post("/login", async (req, res) => {
    // validate the request body first
    const { error } = validate.validateLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //find an existing user
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("User not found.");

    bcrypt.compare(req.body.password, user.password, function (err, response) {
        if (err) throw err;
        if (response) {
            const token = user.generateAuthToken();
            res.header("x-auth-token", token).send({
                _id: user._id,
                name: user.name,
                email: user.email
            });
        } else {
            return res.status(400).send("Data does not match!");
        }
    });


});

router.post("/register", async (req, res) => {
    // validate the request body first
    const { error } = validate.validateRegister(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //find an existing user
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already registered.");

    user = new User({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email
    });

    user.password = await bcrypt.hash(user.password, 10);
    await user.save();

    res.send({
        _id: user._id,
        name: user.name,
        email: user.email
    });
});

module.exports = router;