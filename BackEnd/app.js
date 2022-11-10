"use strict";

// 모듈 선언
const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");

const passportConfig = require("./src/passport");
const passport = require("passport");
const session = require("express-session");

const { sequelize } = require("./src/utils/connect");
const config = require("config");

const morgan = require("morgan");
const logger = require("./src/functions/winston");
/* level
const levels = {
    error: 0, -> High
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6 -> Low
};
*/

// 웹세팅
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(session({ secret: "MySecret", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

passportConfig();

app.use(morgan("common", { stream: logger.stream })); // 로그를 데이터베이스에 저장할 수 있어야함 log -> mysql

// 라우팅
const apiRouter = require("./src/routes");
app.use("/", apiRouter);

// 서버 연결
app.listen(config.get("server.port"), () => {
    logger.info(`Server Running on ${config.get("server.port")} Port!`);
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
