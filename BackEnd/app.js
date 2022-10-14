// 모듈 선언
var express = require("express");
var app = express();

var passport = require("./config/passport");
var session = require("express-session");
const bodyParser = require("body-parser");
const config = require("config");
var fs = require("fs");

// 웹세팅
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: "MySecret", resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

// 라우팅
app.get("/", (req, res) => {
    fs.readFile("test.html", (error, data) => {
        res.writeHead(200, { "Content-Type": "text/html" }); // 응답 헤더에 대한 정보를 기록하는 메서드, 응답의 콘텐츠 형식이 HTML
        res.end(data); // 주로 서버가 작동을 안하거나 오류가 있을 경우, 특정 문구를 나타내고 응답을 종료하고자 할 때 사용
    });
});

app.get("/login", (req, res) => {
    fs.readFile("fail.html", (error, data) => {
        res.writeHead(200, { "Content-Type": "text/html" }); // 응답 헤더에 대한 정보를 기록하는 메서드, 응답의 콘텐츠 형식이 HTML
        res.end(data); // 주로 서버가 작동을 안하거나 오류가 있을 경우, 특정 문구를 나타내고 응답을 종료하고자 할 때 사용
    });
});

app.get("/logout", function (req, res) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
});

app.get("/auth/naver", passport.authenticate("naver", null), (req, res) => {
    console.log("/auth/naver");
});

app.get("/auth/naver/callback", function (req, res, next) {
    passport.authenticate("naver", function (err, user) {
        console.log("passport.authenticate(naver)실행");
        if (!user) {
            res.redirect("http://localhost:5000/login");
        }
        req.logIn(user, function (err) {
            console.log("naver/callback user : ", user);
            res.redirect("http://localhost:5000/");
        });
    })(req, res);
});

// 연결
app.listen(config.get("server.port"), () => {
    // 서버 연결, Port = 5000
    console.log(`Server Running on ${config.get("server.port")} Port!`);
});
