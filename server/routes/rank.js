const express = require("express");
const router = express.Router();

var RankController = require('../controller/rank')

router.get("/ranking/:league", RankController.show);
router.get("/ranking", RankController.index);

module.exports = router;