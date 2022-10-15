"use strict";

const express = require("express");
const router = express.Router();

var passport = require("../../config/passport");

const ctrl = require("./service");

router.get("/", ctrl.home);

router.get("/login", passport.authenticate("naver", null), ctrl.login_naver);
router.get("/auth/naver/callback", ctrl.login_naver_callback);

router.get("/logout", ctrl.logout);

module.exports = router;
