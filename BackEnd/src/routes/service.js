"use strict";

var passport = require("../../config/passport");
var fs = require("fs");

exports.home = (req, res) => {
    fs.readFile("test.html", (error, data) => {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
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
