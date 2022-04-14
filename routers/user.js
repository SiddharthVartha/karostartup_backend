const express = require("express");
const router = express.Router();
const { login, register } = require("../controllers/user");

router.post("/login", login);
router.post("/Register", register);
module.exports = router;
