"use strict";

var naver = require("../passport/naverStrategy");
var kakao = require("../passport/kakaoStrategy");
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
    naver.authenticate("naver", (err, user) => {
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

exports.login_kakao = (req, res) => {
    console.log("/login router 실행");
};

exports.login_kakao_callback = (req, res) => {
    kakao.authenticate("kakao", (err, user) => {
        console.log("passport.authenticate(kakao)실행");

        if (!user) {
            return res.status(400).json({
                message: "Kakao user not found.",
                code: 400,
            });
        }
        req.logIn(user, (err) => {
            console.log("kakao/callback user : ", user);
            return res.status(200).json({
                message: "Kakao login success.",
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
    // req.session.save((err) => {
    //     if (err) throw err;
    // return res.status(200).json({
    //     message: "Logout success.",
    //     code: 200,
    // });
    // });
};
