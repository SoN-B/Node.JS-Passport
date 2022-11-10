"use strict";

const express = require("express");
const router = express.Router();
const fs = require("fs");

const authRoute = require("../controllers/auth/route");
const userRoute = require("../controllers/user/route");

router.get("/", (req, res) => {
    fs.readFile("test.html", (error, data) => {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
    });
});

router.use("/auth", authRoute);
router.use("/user", userRoute);

module.exports = router;
