"use strict";

const express = require("express");
const router = express.Router();

const passport = require("passport");

const ctrl = require("./service");

router.get("/", ctrl.home);

router.get("/login/naver", passport.authenticate("naver", null), ctrl.login_naver);
router.get("/login/naver/callback", ctrl.login_naver_callback);

router.get("/login/kakao", passport.authenticate("kakao", null), ctrl.login_kakao);
router.get("/login/kakao/callback", ctrl.login_kakao_callback);

router.get("/logout", ctrl.logout);

module.exports = router;
