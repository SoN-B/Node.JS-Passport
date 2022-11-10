"use strict";

const express = require("express");
const router = express.Router();

const passport = require("passport");
const { isLoggedIn, isNotLoggedIn } = require("../../middleware/auth");

const ctrl = require("./service");

router.post("/login", isNotLoggedIn, ctrl.login_local); // local login
router.post("/register", isNotLoggedIn, ctrl.register);

router.get("/login/naver", passport.authenticate("naver", null), ctrl.login_naver); // naver login
router.get("/login/naver/callback", ctrl.login_naver_callback);

router.get("/login/kakao", passport.authenticate("kakao", null), ctrl.login_kakao); // kakao login
router.get("/login/kakao/callback", ctrl.login_kakao_callback);

router.get("/logout", isLoggedIn, ctrl.logout);

module.exports = router;
