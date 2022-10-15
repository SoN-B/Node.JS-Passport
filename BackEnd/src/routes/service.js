"use strict";

var passport = require("../../config/passport");
var fs = require("fs");

exports.home = (req, res) => {
    fs.readFile("test.html", (error, data) => {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
    });
};

exports.login_naver = (req, res) => {
    console.log("/login router 실행");
};

exports.login_naver_callback = (req, res) => {
    passport.authenticate("naver", (err, user) => {
        console.log("passport.authenticate(naver)실행");

        if (!user) {
            return res.status(400).json({
                message: "Naver user not found.",
                code: 400,
            });
        }
        req.logIn(user, (err) => {
            console.log("naver/callback user : ", user);
            return res.status(200).json({
                message: "Naver login success.",
                code: 200,
                user: user,
            });
        });
    })(req, res);
};

exports.logout = (req, res) => {
    console.log("logout");
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        return res.status(200).json({
            message: "Logout success.",
            code: 200,
        });
    });
};
