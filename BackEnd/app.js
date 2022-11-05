"use strict";

// 모듈 선언
const express = require("express");
const app = express();

const fs = require("fs");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("config");
const passportConfig = require("./src/passport");
const passport = require("passport");
const session = require("express-session");

const accessLogStream = fs.createWriteStream(`${__dirname}/log/access.log`, { flags: "a" });
const { sequelize } = require("./src/utils/connect");

// 웹세팅
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev")); // 개발할 때, 콘솔에 찍는용도
app.use(morgan("common", { stream: accessLogStream })); // 로그를 데이터베이스에 저장할 수 있어야함 log -> mysql

app.use(cors());

app.use(session({ secret: "MySecret", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

passportConfig();

// app.use(function (req, res) {
//     res.locals.isAuthenticated = req.isAuthenticated();
//     // 현재 로그인이 되어있는지 아닌지를true,false
//     res.locals.currentUser = req.user; // (로그인된 user의 정보)
//     // 로그인이 되면 session으로 부터 user를 deserialize하여 생성
// });

// 라우팅
app.use("/", require("./src/routes/test"));

// 서버 연결
app.listen(config.get("server.port"), () => {
    // 서버 연결, Port = 5000
    console.log(`Server Running on ${config.get("server.port")} Port!`);
});

// DB 연결
sequelize
    .sync({ force: false })
    .then(() => {
        console.log("Success connecting DB");
    })
    .catch((err) => {
        console.error(err);
    });
