"use strict";

var passport = require("../../config/passport");
var fs = require("fs");

exports.home = (req, res) => {
    fs.readFile("test.html", (error, data) => {
        res.writeHead(200, { "Content-Type": "text/html" }); // 응답 헤더에 대한 정보를 기록하는 메서드, 응답의 콘텐츠 형식이 HTML
        res.end(data); // 주로 서버가 작동을 안하거나 오류가 있을 경우, 특정 문구를 나타내고 응답을 종료하고자 할 때 사용
    });
};

exports.login = (req, res) => {
    console.log("/auth/naver");
};

exports.login_naver = (req, res) => {
    passport.authenticate("naver", (err, user) => {
        console.log("passport.authenticate(naver)실행");

        if (!user) {
            res.redirect("/login");
        }
        req.logIn(user, (err) => {
            console.log("naver/callback user : ", user);
            res.redirect("/");
        });
    })(req, res);
};

exports.logout = (req, res) => {
    console.log("logout");
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
};
