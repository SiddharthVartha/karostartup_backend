const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const { login, register, displayCertificate } = require("../controllers/user");

router.post("/login", login);
router.post("/Register", register);
router.get("/displayCertificate", auth, displayCertificate);
module.exports = router;
