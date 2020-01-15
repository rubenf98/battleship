const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();

var UserController = require('../controller/user')

router.get("/logged", auth, UserController.logged);

router.get("/user/current", auth, UserController.current);

router.post("/login", UserController.login);

router.post("/register", UserController.register);

module.exports = router;