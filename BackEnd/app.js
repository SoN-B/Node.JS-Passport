"use strict";

// 모듈 선언
var express = require("express");
var app = express();

const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("config");
var passport = require("./config/passport");
var session = require("express-session");

// 웹세팅
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use(session({ secret: "MySecret", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// 라우팅
app.use("/", require("./src/routes/test"));

// 연결
app.listen(config.get("server.port"), () => {
    // 서버 연결, Port = 5000
    console.log(`Server Running on ${config.get("server.port")} Port!`);
});
