const bcrypt = require("bcrypt");
const { User, validate } = require("../model/User");

exports.logged = async function (req, res, next) {
    const user = await User.findById(req.user._id);
    if (!user) {
        res.send(false);
    }
    res.send(true);
}

exports.current = async function (req, res, next) {
    const user = await User.findById(req.user._id).select("-password");
    res.send(user);
}

exports.login = async function (req, res, next) {
    // validate the request body first
    const { error } = validate.validateLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("user not found.");

    //await user.updatePoints(req.body.game, user);
    //await user.updateLeague(user);

    bcrypt.compare(req.body.password, user.password, function (err, response) {
        if (err) throw err;
        if (response) {
            const token = user.generateAuthToken();
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, access-control-allow-origin, x-auth-token");
            res.header("Access-Control-Expose-Headers: x-auth-token")
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                points: user.points,
                league: user.league,
                counter: user.counter,
                token: token
            });
        } else {
            return res.status(400).send("Data does not match!");
        }
    });
}

exports.register = async function (req, res, next) {
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
        email: user.email,
        points: user.points,
        league: user.league,
        counter: user.counter
    });
}