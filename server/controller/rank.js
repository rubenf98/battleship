const { User } = require("../model/User");
const { ranks } = require("../helper");

exports.show = async function (req, res, next) {
    if (ranks.includes(req.params.league)) {
        let players = await User.find({ league: req.params.league }, 'name points league').limit(10).sort('-points');

        res.send(players);
    }
}

exports.index = async function (req, res, next) {
    Promise.all([
        User.find({ league: ranks[0] }, 'name points league').sort('-points'),
        User.find({ league: ranks[1] }, 'name points league').sort('-points'),
        User.find({ league: ranks[2] }, 'name points league').sort('-points'),
        User.find({ league: ranks[3] }, 'name points league').sort('-points'),
        User.find({ league: ranks[4] }, 'name points league').sort('-points')
    ]).then(([diamond, gold, silver, bronze, unranked]) => {
        let players = diamond.concat(gold, silver, bronze, unranked).slice(0, 10);
        res.send(players);
    });
}