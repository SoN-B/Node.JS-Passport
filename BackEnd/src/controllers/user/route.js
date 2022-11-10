"use strict";

const express = require("express");
const router = express.Router();

const { isLoggedIn, isNotLoggedIn } = require("../../middleware/auth");

const ctrl = require("./service");

router.post("/search/password", isNotLoggedIn, ctrl.search_password);
//router.post("/interested", isLoggedIn, ctrl.interested);

module.exports = router;
